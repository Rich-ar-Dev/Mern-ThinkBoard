import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const rateLimiterInstance = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.tokenBucket(20, "5 s")
});

const rateLimiter = async (req, res, next) => {
  try {
    // Better identifier with multiple fallbacks
    const identifier = req.ip || 
                      req.connection.remoteAddress || 
                      req.socket.remoteAddress ||
                      req.headers['x-forwarded-for'] || 
                      'default-user';
    
    const result = await rateLimiterInstance.limit(identifier);
    
    if (!result.success) {
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000)
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(); // Allow request to continue if rate limiting fails
  }
};

export default rateLimiter;
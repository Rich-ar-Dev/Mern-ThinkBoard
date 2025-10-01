import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNote
}) => {  
  
  const handleDelete = async (e, id) =>{
    e.preventDefault();
    e.stopPropagation(); // Add this to prevent navigation

    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`); 
      
     setNote((prev) => prev.filter(note => note._id !== id))
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary">
      <Link to={`/note/${note._id || ''}`}>
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title || 'Untitled'}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content || 'No content'}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {note.createdAt ? formatDate(new Date(note.createdAt)) : 'No date'}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button 
                className="btn btn-ghost btn-xs text-error" 
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default NoteCard;
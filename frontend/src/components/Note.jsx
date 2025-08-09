import { useNavigate } from "react-router-dom";

const Note = ({ bgColor, note }) => {
  const navigate = useNavigate();
  console.log(`Component: ${bgColor}`);
  return (
    <div
      className={`cursor-pointer w-full p-4 mb-4 ${bgColor} text-bg-black rounded-lg sm:w-1/4 sm:inline-block sm:mr-4 md:w-1/5`}
      onClick={() => navigate(`/${note._id}`)}
    >
      {/* TITLE */}
      <h3 className="text-2xl font-semibold truncate">{note.title}</h3>
      <p className="mt-3 h-6 truncate sm:h-20 sm:overflow-hidden sm:whitespace-normal">
        {note.content}
      </p>
    </div>
  );
};

export default Note;

const NoteCard = ({ note, onDelete }) => {
  return (
    <div className="border p-4 rounded flex justify-between">
      <div>
        <h2 className="font-bold">{note.title}</h2>
        <p>{note.content}</p>
      </div>
      <button
        onClick={() => onDelete(note.id)}
        className="text-red-500 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default NoteCard;

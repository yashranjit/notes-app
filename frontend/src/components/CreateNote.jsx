import { useState } from "react";

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={() => {
          onCreate(title, content);
          setTitle("");
          setContent("");
        }}
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer"
      >
        Add Note
      </button>
    </div>
  );
};

export default CreateNote;

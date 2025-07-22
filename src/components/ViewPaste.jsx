import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="p-4 text-red-500">
        Paste not found for ID: {id}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between ">
        <input
          className="p-2 bg-gray-900 rounded-md mt-2 w-[65%] pl-3"
          type="text"
          value={paste.title}
          disabled
        />
      </div>
      <div>
        <textarea
          className="mt-4 min-w-[500px] p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={paste.content}
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

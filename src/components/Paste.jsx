import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

export const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = (pastes || []).filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 lg:p-12">
      <input
        className="p-3 rounded-xl w-full sm:w-[600px] mb-6 outline-0 bg-gray-800 text-white"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 items-center">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border border-white p-4 sm:p-6 md:p-10 lg:p-12 rounded-md shadow max-w-[900px] w-full text-white bg-gradient-to-br from-gray-900 to-violet-900"
            >
              {/* 🔵 Buttons at top right */}
              <div className="flex justify-end gap-4 mb-2 flex-wrap">
                <a href={`/?pasteId=${paste?._id}`} className="text-gray-400">
                  <i className="ri-pencil-fill"></i>
                </a>
                <a href={`/pastes/${paste?._id}`} className="text-gray-400">
                  <i className="ri-eye-fill"></i>
                </a>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="text-gray-400 hover:cursor-pointer"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="text-gray-400 hover:cursor-pointer"
                >
                  <i className="ri-file-copy-fill"></i>
                </button>
              </div>

              {/* 🔵 Title */}
              <div className="text-xl font-semibold text-blue-400 mb-2">
                {paste.title}
              </div>

              {/* ✅ Preserved formatting */}
              <div className="whitespace-pre-wrap break-words mb-3">
                {paste.content}
              </div>

              {/* ✅ Date formatted to YYYY-MM-DD */}
              <div className="text-sm text-gray-400">
                {paste.createdAt?.slice(0, 10)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center mt-10 text-lg">
            No pastes found.
          </div>
        )}
      </div>
    </div>
  );
};

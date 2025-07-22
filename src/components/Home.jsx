import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(35),
      createdAt: new Date().toISOString().slice(0, 10), // formatted date
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }
  function condition(){
    if(title.trim() !== "" && value.trim() !== ""){
      createPaste();
    }
    else{
      toast.error("Both title and content are required.");
    }
  }


  return (
    <div className="p-4 sm:p-6 md:p-10 lg:p-12">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <input
          className="p-2 bg-gray-900 rounded-md w-full sm:w-2/3 text-white"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          
        />
        <button
          onClick={condition}
          className="px-5 py-2 bg-blue-600 transition-all hover:bg-blue-800 hover:cursor-pointer rounded-md text-white"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div className=" rounded-md mt-4 w-full sm:w-full md:w-[900px] lg:w-[1100px]">
        <textarea
          className="w-full p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={15}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

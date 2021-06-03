import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";

import { addMainDescription } from "../../../CRUD/functions";

const DescriptionEditor = () => {
  const token = useSelector((state) => state.user.token);
  const [productId, setProductId] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    askBeforePasteHTML: false,
    maxWidth: "800px",
  };

  const handleClick = async () => {
    await addMainDescription(
      {
        productId,
        mainDescription: content,
      },
      token
    );
  };
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
      <div className="mt-10">
        Introdu id-ul produsului : <br />
        <input
          className="focus:outline-none border border-red-500 p-2"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <button
        onClick={() => handleClick()}
        className="bg-harlequin text-white p-2 mt-10 rounded-full hover:text-red-500"
      >
        Adauga
      </button>
    </div>
  );
};

export default DescriptionEditor;

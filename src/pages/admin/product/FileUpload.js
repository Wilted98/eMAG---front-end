import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Badge } from "antd";

const FileUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const handleRemove = (arg) => {
    let myArray = values.images;
    myArray.splice(arg, 1);
    setValues({ ...values, images: myArray });
  };
  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            //
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                window.alert("Imagine incarcata cu succes!");
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) =>
                window.alert("Imaginea nu a putut fi incarcata!", err)
              );
          },
          "base64"
        );
      }
    }
  };
  return (
    <div className="flex mt-5">
      <div className="flex mr-4">
        {values.images &&
          values.images.map((arg, index) => {
            return (
              <Badge
                onClick={() => handleRemove(index)}
                count="X"
                key={arg.public_id}
                className="cursor-pointer"
              >
                <img
                  alt="trrr"
                  className="w-14 h-14 rounded-lg object-cover"
                  src={arg.url}
                />
              </Badge>
            );
          })}
      </div>
      <div className="mt-4">
        {/* <label>
          <input
            className="text-red-500"
            type="file"
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label> */}
        <input
          id="uploadImage"
          type="file"
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
          style={{ display: "none" }}
        />
        <label
          htmlFor="uploadImage"
          className="border-2 border-dashed border-gray-400 p-4 rounded"
        >
          <span className="text-4xl font-bold">+</span>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;

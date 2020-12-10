import Axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const user = useSelector((state) => state.user);

  const fileUploadAndResize = (e) => {
    //   console.log(e.target.files);
    // resize
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            // console.log(uri);
            await Axios.post(
              `${process.env.REACT_APP_API}/uploadimages`,
              { image: uri },
              {
                headers: {
                  authtoken: user ? user.token : "",
                },
              }
            )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemoveImg = (public_id) => {
    setLoading(true);
    // console.log(public_id);
    Axios.post(
      `${process.env.REACT_APP_API}/removeimage`,
      { public_id },
      {
        headers: {
          authtoken: user ? user.token : "",
        },
      }
    )
    .then(res =>{
      setLoading(false)
      // console.log(res);
      const {images} = values
      let filteredImages = images.filter(item =>{
        return item.public_id !== public_id
      });
      setValues({...values, images: filteredImages})
    })
    .catch((err) => {
      setLoading(false);
      console.log("CLOUDINARY REMOVE ERROR", err);
    });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              key={image.public_id}
              count="X"
              style={{ cursor: "pointer" }}
              onClick={() => handleRemoveImg(image.public_id)}
            >
              <Avatar
                src={image.url}
                size={60}
                className="ml-3"
                shape="square"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;

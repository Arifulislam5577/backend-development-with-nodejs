import { v2 as cloudinary } from "cloudinary";
export const uplaodImg = async (img) => {
  const folder = "/testing";
  const imageConfig = {
    height: 400,
    width: 600,
    folder,
    crop: "fit",
    quality: 80,
  };

  const imgObj = await cloudinary.uploader.upload(img, imageConfig);

  return imgObj.secure_url;
};

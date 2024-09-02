import cloudinary from "cloudinary";
import dotenv from "dotenv";
import process from "process";

dotenv.config({ path: "config/config.env" });
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload_file = async (file, folder) => {
  const res = await cloudinary.v2.uploader.upload(file, {
    folder,
    resource_type: "auto",
  });
  return res;
};

export const delete_file = async (file) => {
  const res = await cloudinary.v2.uploader.destroy(file);
  if (res?.result === "ok") return true;
};

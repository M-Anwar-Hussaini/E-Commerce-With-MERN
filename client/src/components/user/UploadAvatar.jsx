import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";

export default function UploadAvatar() {
  const { user } = useSelector((store) => store.auth);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg",
  );
  const navigate = useNavigate();
  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Avatar Updated");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadAvatar({ avatar });
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <UserLayout>
      <MetaData title="Upload/Change Avatar" />
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Uploading" : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}

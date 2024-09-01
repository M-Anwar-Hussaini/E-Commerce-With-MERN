import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [updatePassword, { isLoading, isSuccess, error }] =
    useUpdatePasswordMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
      navigate("/me/profile");
    }
    if (error) {
      console.log(error);
      toast.error(error.data?.message);
    }
  }, [isSuccess, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword({ password, oldPassword });
  };

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Update Password</h2>
            <div className="mb-3">
              <label htmlFor="old_password_field" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="new_password_field" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? "Updating" : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}

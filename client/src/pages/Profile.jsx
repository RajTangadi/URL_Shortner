/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(currentUser);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log("formdata", formData);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      toast.error("Only image files are allowed!");
      setFile(null);
    }
  };

  // console.log("File1", file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log("fetching");
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });
      if (file) {
        formDataObj.append("avatar", file);
      }

      // for (let pair of formDataObj.entries()) {
      //   console.log("FormData:", pair[0], pair[1]); // Debug FormData contents
      // }

      // console.log("form data object", formDataObj);

      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: "POST",
        credentials: "include",
        body: formDataObj,
      });

      if (!res.ok) {
        const data = await res.json();
        dispatch(updateFailure(data.message));
        toast.error(data.message);
        return;
      }

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        toast.error(data.message);
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success("Profile updated successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      dispatch(updateFailure(error.message || "Error updating user"));
      toast.error(error.message || "Error updating user");
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("User deleted successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      dispatch(deleteUserFailure(error.message || "Error deleting user"));
      toast.error(error.message || "Error deleting user", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        toast.error(data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        return;
      }
      toast.success("Signed out successfully", {
        position: "top-center",
        autoClose: 1000,
      });
      // localStorage.removeItem("token");
      dispatch(signOutUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message || "Error signing out"));
      toast.error(error.message || "Error signing out", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-white">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
        <img
          src={currentUser?.avatar || "default_avatar.png"}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 mb-5"
        />

        <input
          type="text"
          placeholder="Username"
          name="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border-gray-500/50 p-3 rounded-lg bg-white focus:outline-none focus:border-transparent"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border-gray-500/50 p-3 rounded-lg bg-white focus:outline-none focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="border-gray-500/50 p-3 rounded-lg bg-white focus:outline-none focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;

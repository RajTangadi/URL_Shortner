import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  sigInStart,
  sigInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sigInStart());
    // const res = await fetch("/api/auth/login", {

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle network errors and non-2xx status codes
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          message: `Request failed with status ${res.status}`,
        }));

        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      // Handle API-level errors
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        throw new Error(data.message || "Registration failed");
      }

      // Success case
      toast.success("Registered Successfully", {
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

      dispatch(sigInSuccess(data));
      // localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      // Handle all errors in one place
      dispatch(signInFailure(error.message));
      toast.error(error.message, {
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

      // Optionally log error for debugging
      console.error("Signup error:", error);

      return null; // Indicate error to caller
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto text-white">
      <h1 className="text-3xl text-center font-semibold my-7"> Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          name="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          name="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 cursor-pointer rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>dont have an account ?</p>
        <Link to="/sign-up" className="text-blue-700">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Signin;

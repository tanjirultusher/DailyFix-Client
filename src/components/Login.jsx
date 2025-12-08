import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then((result) => {
        event.target.reset();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(location.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: error.message || "Login failed!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Logged in with Google!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: error.message || "Google login failed!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = "Login";
  });

  return (
    <div className="hero min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 text-lg text-white">
            Welcome back! Please log in to continue exploring our toy world.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="label font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered w-full"
                    placeholder="Enter your password"
                  />
                  <button
                    onClick={handleTogglePasswordShow}
                    className="btn btn-xs top-2 right-5 absolute"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <Link
                    to={`/forget-password`}
                    state={{ email: email }}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn bg-primary text-white mt-4 w-full text-lg hover:bg-primary/90"
                >
                  Login
                </button>
              </fieldset>
            </form>

            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>

            <p className="mt-3 text-center">
              Don’t have an account?{" "}
              <Link className="text-primary underline" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

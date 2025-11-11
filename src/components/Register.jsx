import { auth } from "../firebase/firebase.init";
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);

  const { createUser, signInWithGoogle, signOutUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long, with upper, lower, and special characters."
      );
      return;
    }

    if (!terms) {
      setError("Please accept our terms and conditions");
      return;
    }

    setError("");
    setSuccess(false);

    createUser(email, password)
        .then((result) => {
        const user = result.user;
        
        return updateProfile(user, {
         displayName: name,    
         photoURL: photoURL,  
        }).then(() => user);
    })
    .then((user) => {
    console.log("After profile update:", user);

    const newUser = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      uid: user.uid,
    };
        //create user in database
    fetch('http://localhost:3000/users',{
        method : 'POST',
        headers : {
                'content-type' : 'application/json'
        },
        body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data =>{
            console.log('data after user save', data);
        })

        signOutUser();
        setSuccess(true);
        event.target.reset();

      })
      .catch((error) => {
        console.error("error happened", error.message);
        setError(error.message);
      });
  };

  const handleGoogleSignUp = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const newUser = {
            name : result.user.displayName,
            email : result.user.email,
            image : result.user.photoURL,
            uid : result.user.uid

        }

        //create user in database
        fetch('http://localhost:3000/users',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data =>{
            console.log('data after user save', data);
        })

        navigate(location?.state || "/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    document.title = "Register";
  });

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-2 text-gray-600">
            Create your account to get started with our platform.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">

                {/* name field */}
                <label className="label font-semibold">Name</label>
                <input
                  type="text" name="name"
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
                />

                {/* photo url field */}
                <label className="label font-semibold">Photo URL</label>
                <input
                  type="text" name="photoURL"
                  className="input input-bordered w-full"
                  placeholder="Enter your Photo URL"
                />

                {/* email field */}
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                />
                {/* password field */}
                <label className="label font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered w-full"
                    placeholder="Password"
                  />
                  <button
                    onClick={handleTogglePasswordShow}
                    className="btn btn-xs top-2 right-5 absolute"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <label className="label cursor-pointer flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <span>Accept Terms and Conditions</span>
                </label>

                <button
                  type="submit"
                  className="btn btn-neutral mt-2 w-full text-md"
                >
                  Register
                </button>
              </fieldset>

              {success && (
                <p className="text-green-500">User created successfully!</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>

            <button
              onClick={handleGoogleSignUp}
              className="btn bg-white text-black border-[#e5e5e5] mt-3"
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

            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link className="text-blue-400 underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

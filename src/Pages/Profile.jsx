import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    document.title = user?.displayName + " Profile" || "User Profile";
  }, [user]);

  useEffect(() => {
    if (user?.uid) {
      fetch(`http://localhost:3000/users/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched user data:", data);
          setUserData(data);
        });
    }
  }, [user]);

  if (loading || !userData) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center items-center z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-center text-xl">
          <h2 className="text-xl font-bold text-black text-center">
            Personal Information
          </h2>
          <p className="text-black text-lg">Manage your profile and preferences</p>
        </div>
        <div className="space-y-6 bg-gray-300 rounded-lg p-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                referrerPolicy="no-referrer"
                src={userData?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-black">
                {userData?.name || "User"}
              </h3>
              <p className="text-black">{userData?.email}</p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse mr-2"></div>
                <span className="text-green-700 text-sm font-medium">
                  Online
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Email Address
                </label>
                <div className="gray-200 border border-black rounded-lg p-3">
                  <p className="text-black">{userData?.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Display Name
                </label>
                <div className="gray-200 border border-black rounded-lg p-3">
                  <p className="text-black">{userData?.name || "Not set"}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  User UID
                </label>
                <div className="gray-200 border border-black rounded-lg p-3">
                  <p className="text-black">
                    {userData?.uid}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Account Status
                </label>
                <div className="gray-200 border border-black rounded-lg p-3">
                  <p className="text-black">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updating, setUpdating] = useState(false);

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
          setUpdatedName(data.name || "");
          setUpdatedImage(data.image || "");
        });
    }
  }, [user]);

  const handleUpdateProfile = () => {
    setUpdating(true);
    fetch(`http://localhost:3000/users/${user.uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedName,
        image: updatedImage,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setUserData((prev) => ({ ...prev, name: updatedName, image: updatedImage }));
        setEditMode(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setUpdating(false));
  };

  if (loading || !userData) return <Loader />;

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg hover:scale-105 transition-transform duration-300">
            <img
              src={userData?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            {editMode ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={updatedImage}
                  onChange={(e) => setUpdatedImage(e.target.value)}
                  placeholder="Enter Image URL"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800">{userData?.name || "User"}</h2>
                <p className="text-gray-600 mt-1">{userData?.email}</p>
                <p className="text-primary font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
                  <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span> Online
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Email</h3>
            <p className="text-gray-800">{userData?.email}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Display Name</h3>
            <p className="text-gray-800">{userData?.name || "Not set"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">User UID</h3>
            <p className="text-gray-800">{userData?.uid}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Account Status</h3>
            <p className="text-gray-800">Active</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center md:justify-end gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleUpdateProfile}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black transition-colors"
                disabled={updating}
              >
                {updating ? "Updating..." : "Save"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

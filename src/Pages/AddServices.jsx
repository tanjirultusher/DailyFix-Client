import React, { use, useEffect, useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";


const AddServices = () => {

  useEffect(()=>{
    document.title = "Add Service";
  })

  const { user } = use(AuthContext);
  const [serviceTitle, setServiceTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.email) {
      alert("You must be logged in to add a service");
      return;
    }

    const newService = {
      serviceTitle,
      description,
      category,
      minPrice,
      maxPrice,
      image,
      providerEmail: user.email,
      providerName: user.displayName || "Unknown",
    };

    setLoading(true);

    fetch("http://localhost:3000/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Service saved:", data);
        alert("Service added successfully!");

        setServiceTitle("");
        setDescription("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
        setImage("");
      })
      .catch((err) => {
        console.error("Error saving service:", err);
        alert("Failed to add service");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center p-5">
      <div className="card w-full max-w-md shadow-lg bg-base-100 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Service</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Service Title"
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="input input-bordered w-1/2"
              required
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input input-bordered w-1/2"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <button
            type="submit"
            className={`btn btn-primary w-full mt-2 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServices;
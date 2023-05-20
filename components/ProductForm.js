import axios from "axios";
import { useState } from "react";
import Router from "next/router";
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [gotoProducts, setGotoProducts] = useState(false);

  async function SaveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }

    setGotoProducts(true);
  }
  if (gotoProducts) {
    Router.push("/products");
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res=await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      console.log(res.data);
    }
  }
  return (
    <form onSubmit={SaveProduct}>
      <label>Product Name:</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-24 mb-2 cursor-pointer flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
        {!images?.length && <p>No images in this product</p>}
      </div>
      <label>Price</label>
      <input
        type="number"
        placeholder="Product Price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button
        className="bg-blue-900 rounded-md text-white p-1 mt-2"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}

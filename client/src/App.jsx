import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/products", {
      method: "POST",
      body: JSON.stringify({
        title,
        price: price * 1,
        image: img,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleImg = (e) => {
    const selectedImg = e.target.files[0];
    previewImg(selectedImg);
  };

  const previewImg = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  console.log(img);

  return (
    <>
      <form
        className="w-1/3 mx-auto my-20 bg-slate-900 p-8 rounded"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <input
            type="text"
            className="w-full py-3 px-3 rounded shadow bg-gray-100"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            className="w-full py-3 px-3 rounded shadow bg-gray-100"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(e) => handleImg(e)}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center"
        >
          Submit
        </button>
      </form>

      {img && (
        <img src={img} alt="food" className="w-1/2 mx-auto h-1/2 mb-10" />
      )}
    </>
  );
};

export default App;

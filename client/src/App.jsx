import React from "react";
import useFetchData from "./hooks/useFetchData";
const App = () => {
  const { error, loading, data } = useFetchData(
    "https://fakestoreapi.com/products"
  );
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data?.map((item) => (
        <h1 key={item.id} className="text-xs border-b p-2 text-gray-500">
          {item.title}
        </h1>
      ))}
    </div>
  );
};

export default App;

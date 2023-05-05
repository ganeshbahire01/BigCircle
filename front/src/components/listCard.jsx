import React, { useEffect, useState } from "react";
import axios from "axios";

const ListCard = ({ _id, BookImg, BookTitle, BookAuthor, BookPrice }) => {
  const [loading, setLoading] = useState(false);
  const handelbtn = async () => {
    try {
      setLoading(true);
      //   Delete Request when user hit remove button this api will remove that book details from DB by the help of uniq id
      let res = await axios.delete(
        `https://exuberant-battledress-clam.cyclic.app/books/${_id}`
      );
      console.log(res.data);
      alert(res.data);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  // userID: String,
  //   BookImg: String,
  //   BookTitle: String,
  //   BookAuthor: String,
  //   BookPrice: Number,
  useEffect(() => {}, []);
  return (
    <div class="flex border rounded-lg overflow-hidden hover:bg-yellow-600">
      <img class="w-1/3" src={BookImg} alt="Book cover" />
      <div class="p-4 w-2/3">
        <h2 class="font-bold text-lg mb-2"> {BookTitle}</h2>
        <p class="text-gray-700 mb-2">{BookAuthor}</p>
        <p class="text-gray-700 mb-4">${BookPrice}</p>
        <button
          class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          onClick={handelbtn}
        >
          {loading ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default ListCard;

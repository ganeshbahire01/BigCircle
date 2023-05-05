import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
const Card = ({ volumeInfo, saleInfo }) => {
  let imgurl = volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail;
  let amount = saleInfo.listPrice && saleInfo.listPrice.amount;
  const [loading, setLoading] = useState(false);
  const handelbtn = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userID = user._id;
    let BookImg = imgurl;
    let BookTitle = volumeInfo.title;
    let BookAuthor = volumeInfo.authors;
    let BookPrice = amount;
    let payload = { userID, BookImg, BookTitle, BookAuthor, BookPrice };
    // we need payload that we can store in our DB in that we need information related to the book that user want to save
    //  onclick on save button only that card data will be going to save to our DB
    try {
      setLoading(true);
      // Post request with payload i.e information of that book that user want to save
      let res = await axios.post(
        "https://exuberant-battledress-clam.cyclic.app/books/addBook",
        payload
      );
      console.log(res.data);
      alert(res.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  if (imgurl && amount) {
    return (
      <div
        class="flex border rounded-lg overflow-hidden hover:bg-yellow-100"
        style={{ boxShadow: "rgba(0, 0, 0, 0.15)" }}
      >
        <img class="w-1/3" src={imgurl} alt="Book cover" />
        <div class="p-4 w-2/3">
          <h2 class="font-bold text-lg mb-2"> {volumeInfo.title}</h2>
          <p class="text-gray-700 mb-2">{volumeInfo.authors}</p>
          <p class="text-gray-700 mb-4">${amount}</p>
          <button
            class="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
            onClick={handelbtn}
          >
            <AiOutlineHeart class="mt-0.5" /> {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    );
  }
};

export default Card;

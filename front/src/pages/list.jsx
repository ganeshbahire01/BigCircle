import Skeleton from "@/components/Skeleton";
import ListCard from "@/components/listCard";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
const List = ({ res }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const Auhtnticate = () => {
  //   let token = localStorage.getItem("token");
  //   let user = JSON.parse(localStorage.getItem("user"));
  //   // if user is undefined or token is undefined that means user is not login so we return user to /login page
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  //   if (!token && !user) {
  //     router.push("/login");
  //   } else {
  //     // getList();
  //     router.push(`/list?id=${user._id}&token=${token}`);
  //   }
  // };
  // const getList = async () => {
  //   let user = JSON.parse(localStorage.getItem("user"));
  //   // we need user ID for getting Perticular users Reading Books list we get that from local storage
  //   let userID = user._id;
  //   try {
  //     setLoading(true);
  //     //   Fetch the list of books by that user ID
  //     let response = await axios.get(
  //       `https://exuberant-battledress-clam.cyclic.app/books/${userID}`
  //     );
  //     console.log(response.data);
  //     //   store that in data
  //     setList(response.data);
  //     setLoading(false);
  //   } catch (error) {}
  // };

  let FakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    // Auhtnticate();
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    // if user is undefined or token is undefined that means user is not login so we return user to /login page
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1500);
    if (!token && !user) {
      router.push("/login");
    } else {
      // getList();
      router.push(`/list?id=${user._id}&token=${token}`);
    }
  }, []);
  return (
    <div>
      <div class="flex justify-evenly m-30">
        <div
          style={{
            width: "80%",
            margin: "auto 20px",
            fontSize: "35px",
            fontWeight: "bold",
          }}
        >
          My Reading List
        </div>

        <Link
          href="/"
          style={{
            fontSize: "25px",
            fontWeight: "bold",

            alignItems: "center",
          }}
          class="flex text-green-600 hover:text-green-800"
        >
          <FaArrowLeft class="m-2" /> Go Back
        </Link>
      </div>
      <div class="mt-20">
        <div
          class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-6"
          style={{ width: "80%", margin: "auto" }}
        >
          {/* Map Over the Data and render it on DOM  */}
          {loading
            ? FakeArray.map((el) => <Skeleton key={el} />)
            : res.length > 0 &&
              res.map((book, i) => <ListCard {...book} key={i} />)}
          {res.length == 0 ? "Your List Is Empty Add Book In List" : ""}
        </div>
      </div>
    </div>
  );
};

export default List;

export const getServerSideProps = async (context) => {
  let query = context.query;
  console.log(query);
  if (query.id && query.token) {
    let response = await axios.get(
      `https://exuberant-battledress-clam.cyclic.app/books/${query.id}`,
      {
        headers: {
          Authorization: query.token,
        },
      }
    );
    const res = response.data;
    return {
      props: { res },
    };
  } else {
    return {
      props: { res: [] },
    };
  }
};

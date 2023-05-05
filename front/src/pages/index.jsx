import Card from "@/components/Card";
import React, { useEffect, useState } from "react";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [inputVal, setInpuVal] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUSer] = useState([]);
  const router = useRouter();
  const Auhtnticate = () => {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    // if user is undefined or token is undefined that means user is not login so we return user to /login page
    if (!token && !user) {
      router.push("/login");
      return;
    }
    setUSer(user);
  };
  // Fake Array for maping Skeleton Functionality
  let FakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const Logout = () => {
    // Remove Toke and USer Data from LocalStorage on Logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  const fetchBooks = async () => {
    try {
      setLoading(true);
      // Fetch books from Public API by Google
      let response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          inputVal || "react"
        }&key=AIzaSyBDmonRsng_AM6DAFxOekx755lkuDu5KqU&maxResults=40`
      );
      let data = await response.json();
      console.log(data.items);
      setBooks(data.items);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    Auhtnticate();
    fetchBooks();
    // re-render our dom whenever the input value is changed  for that it depends on the input value
  }, [inputVal]);
  return (
    <div class="mt-5">
      <div
        style={{
          width: "80%",
          margin: "auto",
        }}
        class="flex justify-between w-80% m-auto"
      >
        <div style={{ display: "flex" }}>
          <div>
            <AiOutlineAlignLeft
              size={"20px"}
              className="mt-2"
              onClick={() => setOpen(!open)}
            />
            <div
              style={{
                display: open ? "block" : "none",
                position: "absolute",
                marginTop: "10px",
                fontSize: "18px",
                backgroundColor: "gray",
                padding: "15px",
                borderRadius: "15px",
              }}
            >
              <ul>
                <li>{user.email}</li>
                <hr />
                <button
                  onClick={() => router.push("/list")}
                  style={{ marginTop: "10px" }}
                >
                  My Read List
                </button>
                <hr />
                <button onClick={Logout} style={{ marginTop: "10px" }}>
                  Logout
                </button>
              </ul>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for ?"
              className="w-full ml-2 pr-10 pl-12 py-1.5 bg-gray-400 placeholder-gray-500 red-800 rounded-lg border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 "
              value={inputVal}
              onChange={(e) => setInpuVal(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <GoSearch className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>
        <div>
          <Link href="/list">
            <AiOutlineHeart size={"30px"} class="ml-5" />
          </Link>
        </div>
      </div>
      <div
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "100px",
        }}
        class="flex flex-col sm:flex-row"
      >
        <div>
          <h2 style={{ fontSize: "30px" }}>New Relase This Week</h2>
          <p style={{ width: "50%", fontSize: "12px" }}>
            It's time to update your reading list with some of the latest and
            greatest releases in the literary world. From heart-pumping
            thrillers to captivating memoirs, this week's new releases offer
            something for everyone
          </p>
          <button
            class="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-10"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            Subscribe
          </button>
        </div>
        <div style={{ width: "80%" }}>
          <img
            style={{
              width: "50%",
              height: "80%",
              margin: "auto",
              padding: "auto",
            }}
            class="sm:m-10"
            src="https://st2.depositphotos.com/3927083/10774/v/950/depositphotos_107740296-stock-illustration-book-shop-logo.jpg"
          />
        </div>
      </div>
      <div class="mt-20">
        <div
          class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-6"
          style={{ width: "80%", margin: "auto" }}
        >
          {/* Map On Data to Show on DOM */}
          {loading
            ? FakeArray.map((el) => <Skeleton key={el} />)
            : books?.length >= 0 && books?.map((book,i) => <Card {...book} key={i} />)}
          {books?.length == 0 ? "No books available" : ""}
        </div>
      </div>

      <footer class="bg-white rounded-lg shadow  m-4 mt-20">
        <div class="flex justify-between w-full max-w-screen-xl mx-auto">
          <img
            style={{ width: "200px", height: "200px" }}
            src="https://s3-alpha-sig.figma.com/img/4589/5a84/8aabf1bdde6f35265ff40fb98689a2d3?Expires=1684108800&Signature=gtWD8rb8siltyC9aDNzTL9E8hh3cfJlKDRW3lugmoNNU7RH15xleYC0IT080F6yMBFiiWFb37vfLzgxX19gaM5EKHnUZdEfXabVoBQDDcUu7~k1r-RU-J0svcCfdgGJ0ate98iAb~Cv6IASe~Y-MDZjz7JFJH4EDbndBx2emFw6jKY~RqYRELuzSXe1tI1MIzsmH0ooY3hgDHJ0a330hmRQ78mG16hH-GdVcQQIjA1xu29chXnH-gt1socHId8fvxaj1X2nVCwCg-IfRWDfss-Z3xnIR8GcD7qcKNUsZOOIvbJBQyshIaxTAWsopqMV7OvT2~Q-9Dgg9APrRRL-Y7w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          />
          <p style={{ width: "350px", margin: "100px 0px" }}>
            Subscribe to stay tuned for new product and latest updates. Let’s do
            it!
          </p>
        </div>
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-black-100  sm:mb-0 ">
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6">
                  Feature
                </Link>
              </li>
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                  Gallary
                </Link>
              </li>
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                  Team
                </Link>
              </li>
            </ul>
            <div>
              <div class="flex relative w-50">
                <input
                  type="search"
                  id="search-dropdown"
                  class="block p-2.5 w-xl z-20 text-sm text-gray-900 border-3-yellow-100 border-l-2 border border-yellow-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Your Email Address"
                  required
                />
                <button class="block p-2.5 w-full z-20 text-sm text-yellow-900 border-3-yellow-100 border-l-2 border border-yellow-300 focus:ring-blue-500 focus:border-blue-500 bg-yellow-500">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-black-100 sm:mb-0">
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                  Sales And Refund
                </Link>
              </li>
              <li>
                <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                  Legal
                </Link>
              </li>
            </ul>
            <div>
              <div class="flex relative w-50">
                <img
                  src="https://img.freepik.com/premium-vector/purple-gradiend-social-media-logo_197792-1883.jpg"
                  class="w-10 h-10"
                />
                <img
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                  class="w-10 h-10 ml-10"
                />
                <img
                  src="https://logowik.com/content/uploads/images/new-facebook-logo-2019.jpg"
                  class="w-12 h-9 ml-10"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Books;

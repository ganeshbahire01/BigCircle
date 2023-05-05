import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  // email, password, mobile
  const router = useRouter();
  const SignUpRequest = async (e) => {
    e.preventDefault();
    let payload = { email, password, mobile };
    // Post request that will Register a user and store the data of the user to our DB
    // It needs payload that will be Schema of the user
    try {
      let req = await axios.post(
        "https://exuberant-battledress-clam.cyclic.app/users/register",
        payload
      );
      // console.log(req.data);
      alert(req.data.message);
      // if we get in response that Registration successful means user is registerd now go to login else it has already been registered

      if (req.data.message === "Registration successful") {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(email, password);
  };
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${"https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(2px)",
        }}
      />
      <div
        class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 "
        style={{ filter: "blur(0px)" }}
      >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-900 bg-gray-500 opacity-6 rounded-lg">
            Create Account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" onSubmit={SignUpRequest}>
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="mobile"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile Number
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="number"
                  autocomplete="number"
                  placeholder="Enter your Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Alredy Account ?
            <Link
              href="/login"
              class="font-semibold leading-6 text-indigo-600 hover:text-green-500"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

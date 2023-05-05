import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // email, password, mobile
  const router = useRouter();
  const SignUpRequest = async (e) => {
    e.preventDefault();
    let payload = { email, password };
    try {
      setLoading(true);
      // Login is also a post request in which user need to login by email and password that are basiclly payload
      let req = await axios.post(
        "https://exuberant-battledress-clam.cyclic.app/users/login",
        payload
      );
      console.log(req.data);
      setLoading(false);
      alert(req.data.message);
      // after request we get response if response is successful then only we navigate user to home page else not
      if (req.data.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(req.data.owner));
        localStorage.setItem("token", req.data.token);
        // Storing token in localStorage and user information that will help us to authenticate and also for saving the Reding list books to DB
        //  for saving Book to DB we need user id so that id is present in local storage
        //  also a token for validation
        router.push("/");
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
          height: "100%",
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
          {/* <img
            class="h-10"
            src="https://s3-alpha-sig.figma.com/img/4589/5a84/8aabf1bdde6f35265ff40fb98689a2d3?Expires=1684108800&Signature=gtWD8rb8siltyC9aDNzTL9E8hh3cfJlKDRW3lugmoNNU7RH15xleYC0IT080F6yMBFiiWFb37vfLzgxX19gaM5EKHnUZdEfXabVoBQDDcUu7~k1r-RU-J0svcCfdgGJ0ate98iAb~Cv6IASe~Y-MDZjz7JFJH4EDbndBx2emFw6jKY~RqYRELuzSXe1tI1MIzsmH0ooY3hgDHJ0a330hmRQ78mG16hH-GdVcQQIjA1xu29chXnH-gt1socHId8fvxaj1X2nVCwCg-IfRWDfss-Z3xnIR8GcD7qcKNUsZOOIvbJBQyshIaxTAWsopqMV7OvT2~Q-9Dgg9APrRRL-Y7w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt="Your Company"
          /> */}
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-900 bg-gray-500 opacity-6 rounded-lg">
            Login Here
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" onSubmit={SignUpRequest}>
            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm pl-12 pr-12 font-medium leading-6 text-gray-900 bg-white rounded-xl"
                >
                  Email
                </label>
              </div>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  placeholder="   Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm pl-10 pr-10 font-medium leading-6 text-gray-900 bg-white rounded-xl"
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
                  placeholder="   Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-400"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Checking..." : "Login"}
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-black-500">
            Dont Have Account ?
            <a
              href="/signup"
              class="font-semibold leading-6 text-indigo-600 hover:text-green-500"
            >
              Create New Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

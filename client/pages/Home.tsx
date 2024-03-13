import "../src/Home.css";
import LoginButton from "../src/components/LoginButton";

import { useState } from "react";
import axios from "axios";

import ResponseDataClass from "../src/modals/ResponseDataClass";
import InputValueClass from "../src/modals/InputValueClass";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const [responseData, setResponseData] = useState<ResponseDataClass[]>();
  const [inputValue, setInputValue] = useState<InputValueClass>({
    userName: "",
    firstName: "",
    lastName: "",
  });

  console.log(inputValue);
  const URL = `https://www.googleapis.com/customsearch/v1?key=${
    import.meta.env.VITE_GOOGLE_API_KEY
  }&cx=${
    import.meta.env.VITE_GOOGLE_SEARCHENGINE_ID
  }&num=10&searchType=image&q=${inputValue}&lr=lang_sv`;

  function handleFetch() {
    axios
      .get(URL)
      .then(function (response) {
        // handle success
        console.log(response);
        setResponseData(response.data.items);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.currentTarget.getAttribute("name");
    setInputValue({ ...inputValue, [inputName!]: e.currentTarget.value });
    console.log(inputValue);
  };

  const createUserHandler = () => {
    axios
      .post(
        "http://localhost:3000/users",
        {
          userName: inputValue.userName,
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch(function (response) {
        console.log(response);
      });
  };

  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <main className="flex h-screen  p-5 text-white">
          <div className="m-auto shadow-[0_1px_4px_rgba(0,0,0,0.6)] bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-md w-full h-full flex flex-col p-20">
            <h1>
              Welcome! <br /> Please log in.
            </h1>
            <LoginButton />
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="flex h-screen  p-5 text-white">
          <div className="m-auto bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-md w-full h-full flex flex-col p-20">
            <h1>
              Welcome! <br /> Please log in.
            </h1>
            <LoginButton />
          </div>
        </main>
      </>
    );
  }
}

export default Home;

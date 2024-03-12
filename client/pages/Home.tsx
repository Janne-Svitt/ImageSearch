import "../src/Home.css";
import LoginButton from "../src/components/LoginButton";

import { useState } from "react";
import axios from "axios";

import ResponseDataClass from "../src/modals/ResponseDataClass";
import InputValueClass from "../src/modals/InputValueClass";

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

  return (
    <>
      <main className="flex h-screen bg-slate-500">
        <div className="m-auto bg-slate-400 w-96 h-80 rounded-md flex flex-col p-20">
          <h1>
            Welcome! <br /> Please log in.
          </h1>
          <LoginButton />
        </div>
      </main>
    </>
  );
}

export default Home;

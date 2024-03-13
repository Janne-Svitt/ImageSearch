import { useAuth0 } from "@auth0/auth0-react";
import "../src/Home.css";
import LoginButton from "../src/components/LoginButton";
import LogoutButton from "../src/components/LogoutButton";
import { useState } from "react";
import axios from "axios";

import ResponseDataClass from "../src/modals/ResponseDataClass";
import InputValueClass from "../src/modals/InputValueClass";

function FavImg() {
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
  const { user } = useAuth0();

  return (
    <>
      <main className="flex h-screen bg-[#272727] border">
        <div
          className={
            isAuthenticated
              ? `m-auto bg-slate-400 w-[60vw] h-[40vw] rounded-md flex flex-row p-20 relative`
              : `m-auto bg-slate-400 w-96 h-80 rounded-md flex flex-col p-20`
          }
        >
          {isAuthenticated ? (
            <>
              {console.log(user)}

              <input
                type="text"
                name="googleSearch"
                id="googleSearch"
                onChange={changeHandler}
              />
              <button onClick={() => handleFetch()}>Fetch</button>
              <div>
                {responseData?.map((item, index) => (
                  <img key={index} src={item.link} style={{ width: "200px" }} />
                ))}
              </div>
              <LogoutButton />
            </>
          ) : (
            <>
              <LoginButton />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default FavImg;

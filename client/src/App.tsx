import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useState } from "react";
import axios from "axios";

import ResponseDataClass from "./modals/ResponseDataClass";
import InputValueClass from "./modals/InputValueClass";
import { MdAccountBox } from "react-icons/md";
import AccountInfo from "./components/AccountInfo";

function App() {
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
      <nav className=" bg-red-600 w-full h-20 fixed top-0 left-0">
        {isAuthenticated ? (
          <>
            <h3 className=" float-start">{user?.name}</h3>
            <AccountInfo /> <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </nav>
      <main className="flex h-screen bg-slate-500">
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

export default App;

import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useState } from "react";
import axios from "axios";
import MyComponents from "./components/MyComponent";
import ResponseDataClass from "./modals/ResponseDataClass";
import InputValueClass from "./modals/InputValueClass";

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
    axios.get(URL).then(function (response) {
      // handle success
      console.log(response);
      setResponseData(response.data.items);
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
      {isAuthenticated ? (
        <>
          <h1>Välkommen {user?.name}</h1>
          {console.log(user)}
          <MyComponents />
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginButton />
        </>
      )}
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

      <div className="  bg-[rgb(185,185,185)] mt-32 h-auto flex flex-col p-10 rounded-md">
        <label className="m-4 font-black text-black " htmlFor="userName">
          Användarnamn
        </label>
        <input
          className="w-34 m-auto"
          type="text"
          name="userName"
          id="userName"
          onChange={changeHandler}
        />
        <label className=" m-4 font-black text-black " htmlFor="firstName">
          Förnamn
        </label>
        <input
          className="w-34 m-auto"
          type="text"
          name="firstName"
          id="firstName"
          onChange={changeHandler}
        />
        <label className=" m-4 font-black text-black  " htmlFor="lastName">
          Efternamn
        </label>
        <input
          className="w-34 m-auto"
          type="text"
          name="lastName"
          id="lastName"
          onChange={changeHandler}
        />
        <div className="flex flex-row">
          <button className=" basis-1/2 bg-orange-700 m-6 h-10 rounded-md">
            Fetch
          </button>
          <button
            className=" basis-1/2 bg-orange-700 m-6 h-10 rounded-md"
            onClick={createUserHandler}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useState } from "react";
import axios from "axios";
import MyComponents from "./components/MyComponent";
import ResponseDataClass from "./modals/ResponseDataClass";

function App() {
  const [responseData, setResponseData] = useState<ResponseDataClass[]>();
  const [inputValue, setInputValue] = useState("");
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
    setInputValue(e.target.value);
  };

  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <>
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

      <div>
        <input
          type="text"
          name="googleSearch"
          id="googleSearch"
          onChange={changeHandler}
        />
        <button>Fetch</button>
        <button>Post</button>
      </div>
    </>
  );
}

export default App;

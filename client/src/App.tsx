import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import MyComponents from "./components/MyComponent";
import ResponseDataClass from "./modals/ResponseDataClass";

function App() {
  const [responseData, setResponseData] = useState<ResponseDataClass[]>();
  console.log(responseData);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/customsearch/v1?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }&cx=${import.meta.env.VITE_GOOGLE_SEARCHENGINE_ID}&q=NurpanArt`
      )
      .then(function (response) {
        // handle success
        console.log(response);
        setResponseData(response.data.items);
      });
  }, []);

  console.log(AxiosError);

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
          <ul>
            {responseData?.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
          <LoginButton />
        </>
      )}
    </>
  );
}

export default App;

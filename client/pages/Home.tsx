import "../src/Home.css";
import LoginButton from "../src/components/LoginButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import ResponseDataClass from "../src/modals/ResponseDataClass";

import SearchImg from "../src/components/SearchImg";

function Home() {
  const { isAuthenticated, user } = useAuth0();
  const [responseData, setResponseData] = useState({
    items: [],
    searchInformation: {
      formattedSearchTime: "",
      formattedTotalResults: "",
    },
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(
    function () {
      if (isAuthenticated) {
        axios.post(
          "http://localhost:3000/users",
          { userMail: user?.email, favImg: [] },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    },
    [isAuthenticated, user?.email]
  );

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
        setResponseData({
          items: response.data.items,
          searchInformation: response.data.searchInformation,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  if (isAuthenticated) {
    return (
      <>
        <div className="m-auto mt-5 bg-neutral-900 shadow-[0_4px_4px_rgba(0,0,0,0.6)] rounded-md w-[96%] p-5">
          <section className="flex  ">
            <input
              onChange={(e) => changeHandler(e)}
              type="text"
              className="text-black shadow-[0_2px_4px_rgba(0,0,0,0.6)] rounded-md mr-2 w-[75%] flex-auto p-4 h-2"
            />
            <button
              onClick={handleFetch}
              className=" text-white  bg-neutral-900 w-[5%] p-1 rounded-md self-center shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex-auto text-center hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] hover:text-sm hover:p-1"
            >
              Search
            </button>
          </section>

          {responseData.searchInformation.formattedTotalResults && (
            <section className="mt-2 text-stone-700 text-[11px]">
              <p>
                {responseData.searchInformation.formattedTotalResults} results
                on {responseData.searchInformation.formattedSearchTime} sec
              </p>
            </section>
          )}
        </div>

        <main className="bg-neutral-900 flex min-h-[500px] p-8 m-auto mt-5 mb-5 w-[96%] text-white shadow-[0_1px_4px_rgba(0,0,0,0.6)] ">
          <section>
            <ul className="grid grid-cols-4 gap-6">
              {responseData.items.map(
                (img: ResponseDataClass, index: number) => (
                  <li key={index} className="">
                    <SearchImg imgData={img} />
                  </li>
                )
              )}
            </ul>
          </section>
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="flex h-screen m-auto mt-5 mb-5 w-[96%] text-white shadow-[0_1px_4px_rgba(0,0,0,0.6)] ">
          <div className="m-auto bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 shadow-[0_1px_4px_rgba(0,0,0,0.6)] rounded-md w-full h-full flex flex-col p-20">
            <div className="m-auto text-center">
              <h1>Welcome to this Image Search Application made by Albin</h1>
              <h2>To continue you need to login!</h2>
              <LoginButton />
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Home;

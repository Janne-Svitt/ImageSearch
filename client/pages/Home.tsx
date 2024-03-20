import "../src/Home.css";
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
    spelling: {
      htmlCorrectedQuery: "",
      correctedQuery: "",
    },
  });
  const [inputValue, setInputValue] = useState("");
  const { loginWithRedirect } = useAuth0();

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

  function handleFetch(searchInput: string) {
    const URL = `https://www.googleapis.com/customsearch/v1?key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }&cx=${
      import.meta.env.VITE_GOOGLE_SEARCHENGINE_ID
    }&num=10&searchType=image&q=${searchInput}&lr=lang_sv`;

    axios
      .get(URL)
      .then(function (response) {
        // handle success
        console.log(typeof response.data.spelling === "undefined");
        if (typeof response.data.spelling === "undefined") {
          setResponseData({
            items: response.data.items,
            searchInformation: response.data.searchInformation,
            spelling: { htmlCorrectedQuery: "", correctedQuery: "" },
          });
        } else {
          setResponseData({
            items: response.data.items,
            searchInformation: response.data.searchInformation,
            spelling: response.data.spelling,
          });
        }
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
              value={inputValue}
              id="searchInputField"
              className="text-black shadow-[0_2px_4px_rgba(0,0,0,0.6)] rounded-md mr-2 w-[75%] flex-auto p-4 h-2"
            />
            <button
              onClick={() => handleFetch(inputValue)}
              className=" text-white  bg-neutral-900 w-[5%] p-1 rounded-md self-center shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex-auto text-center hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] hover:text-sm hover:p-1"
            >
              Search
            </button>
          </section>

          <section className="mt-2 text-stone-700 text-[11px]">
            {responseData.searchInformation.formattedTotalResults && (
              <p className="inline">
                {responseData.searchInformation.formattedTotalResults} results
                on {responseData.searchInformation.formattedSearchTime} sec
              </p>
            )}{" "}
            {responseData.spelling.correctedQuery !== "" ? (
              <p className=" text-[16px] text-red-500">
                Menade du:{" "}
                <span className="text-blue-500 hover:cursor-pointer hover:underline">
                  <i>
                    <b
                      onClick={() => {
                        setInputValue(responseData.spelling.correctedQuery);
                        handleFetch(responseData.spelling.correctedQuery);
                      }}
                    >
                      {responseData.spelling.correctedQuery}
                    </b>
                  </i>
                </span>
              </p>
            ) : (
              <></>
            )}
          </section>
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
        <main className="flex min-h-[500px] m-auto  text-white w-[96%]">
          <div className="m-auto bg-neutral-900 shadow-[0_1px_4px_rgba(0,0,0,0.6)] rounded-md w-1/2 h-full flex flex-col p-20">
            <div className="m-auto text-center">
              <h1>Welcome to this Image Search Application made by Albin</h1>
              <h2>To continue you need to login!</h2>
              <button
                className=" bg-neutral-900 w-28 p-3 rounded-md mt-5 self-center shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-center hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] hover:text-sm hover:p-4"
                onClick={() => loginWithRedirect()}
              >
                Login
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Home;

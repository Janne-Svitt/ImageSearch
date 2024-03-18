import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import "../src/Home.css";

import FavImgContainers from "../src/components/FavImgContainers";
import { useEffect, useState } from "react";
import axios from "axios";

function FavImg() {
  const { isAuthenticated, user } = useAuth0();
  const [userFavImgData, setUserFavImgData] = useState([]);
  useEffect(
    function () {
      axios
        .get("http://localhost:3000/usersFavImg", {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          setUserFavImgData(
            response.data.users.find(
              (userData) => userData.userMail === user?.email
            ).favImg
          );
        });
    },
    [user?.email]
  );

  if (isAuthenticated) {
    return (
      <main className="bg-neutral-900 flex min-h-[500px] p-8 m-auto mt-5 mb-5 w-[96%] text-white shadow-[0_1px_4px_rgba(0,0,0,0.6)] ">
        <ul className="grid grid-cols-4 gap-6">
          {userFavImgData.map((img, index) => (
            <li key={index}>
              <FavImgContainers imgData={img} />
            </li>
          ))}
        </ul>
      </main>
    );
  } else {
    return <Navigate to="/Login" replace={true} />;
  }
}

export default FavImg;

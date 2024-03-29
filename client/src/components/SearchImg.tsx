import { FaHeart } from "react-icons/fa6";
import ResponseDataClass from "../modals/ResponseDataClass";
import { useEffect, useState } from "react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

interface ISearchImgProps {
  imgData: ResponseDataClass;
}

const SearchImg = (props: ISearchImgProps) => {
  const { user } = useAuth0();
  const [heartToggle, setHeartToggle] = useState(false);
  const [userFavImgData, setUserFavImgData] = useState([]);

  // Fetch user fav images
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

  // Toggle if img is liked or not
  useEffect(
    function () {
      setHeartToggle(false);
    },
    [props.imgData]
  );

  // Send information to server to add img to fav images
  function handleClickAdd() {
    axios.post(
      "http://localhost:3000/usersAddFav",
      {
        userMail: user?.email,
        favImg: {
          kind: props.imgData.kind,
          title: props.imgData.title,
          htmlTitle: props.imgData.htmlTitle,
          link: props.imgData.link,
          displayLink: props.imgData.displayLink,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
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
  }

  return (
    <>
      <article className="bg-neutral-900 rounded-sm p-2 shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
        {heartToggle ||
        userFavImgData.find((img) => img.link === props.imgData.link) ? (
          <FaHeart
            style={{
              color: "red",
              fontSize: "20px",
              position: "absolute",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
        ) : (
          <FaHeartCirclePlus
            onClick={() => {
              handleClickAdd();
              setHeartToggle(true);
            }}
            style={{
              fontSize: "20px",
              position: "absolute",
              marginLeft: "10px",
              marginTop: "10px",
            }}
            className="text-white hover:text-slate-400 cursor-pointer"
          />
        )}

        <img
          src={props.imgData.link}
          alt=""
          className="rounded-md"
          onError={(e) => {
            e.currentTarget.src = "../../images/BrokenImagePlaceholder.png";
          }}
        />
        <p className="text-stone-700 text-sm text-center">
          {props.imgData.title}
        </p>
      </article>
    </>
  );
};

export default SearchImg;

import { IoTrashBinSharp } from "react-icons/io5";
import ResponseDataClass from "../modals/ResponseDataClass";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

interface ISearchImgProps {
  imgData: ResponseDataClass;
  setUserFavImgData: (userFavImg: []) => void;
}

const FavImgContainers = (props: ISearchImgProps) => {
  const { user } = useAuth0();

  // Send information for what img to remove from user fav images
  function removeHandler() {
    axios
      .delete("http://localhost:3000/usersRemoveFav", {
        data: {
          userMail: user?.email,
          favImg: {
            kind: props.imgData.kind,
            title: props.imgData.title,
            htmlTitle: props.imgData.htmlTitle,
            link: props.imgData.link,
            displayLink: props.imgData.displayLink,
          },
        },
      })
      .then(function (response) {
        props.setUserFavImgData(response.data.favImg);
        console.log(response);
      });
  }
  return (
    <>
      <article className="bg-neutral-900 rounded-sm p-2 shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
        <IoTrashBinSharp
          style={{
            fontSize: "20px",
            position: "absolute",
            marginLeft: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
          className=" text-red-600 hover:text-red-400"
          onClick={removeHandler}
        />
        <img src={props.imgData.link} alt="" className="rounded-md" />
        <p className="text-stone-700 text-sm text-center">
          {props.imgData.title}
        </p>
      </article>
    </>
  );
};

export default FavImgContainers;

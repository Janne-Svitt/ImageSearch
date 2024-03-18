import ResponseDataClass from "../modals/ResponseDataClass";

interface ISearchImgProps {
  imgData: ResponseDataClass;
}

const FavImgContainers = (props: ISearchImgProps) => {
  return (
    <>
      <article>
        <img src={props.imgData.link} alt="" className="rounded-md" />
        <p className="text-stone-700 text-sm text-center">
          {props.imgData.title}
        </p>
      </article>
    </>
  );
};

export default FavImgContainers;

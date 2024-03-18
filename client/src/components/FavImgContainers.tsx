import ResponseDataClass from "../modals/ResponseDataClass";

interface ISearchImgProps {
  imgData: ResponseDataClass;
}

const FavImgContainers = (props: ISearchImgProps) => {
  return (
    <>
      <article className="bg-neutral-900 rounded-sm p-2 shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
        <img src={props.imgData.link} alt="" className="rounded-md" />
        <p className="text-stone-700 text-sm text-center">
          {props.imgData.title}
        </p>
      </article>
    </>
  );
};

export default FavImgContainers;

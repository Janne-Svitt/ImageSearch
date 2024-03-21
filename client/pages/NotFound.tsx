import { GiBrokenArrow } from "react-icons/gi";

const NotFound = () => {
  return (
    <>
      <main className="m-auto w-[90%] h-screen flex flex-col place-content-center text-4xl text-center text-white">
        <div className="m-auto">
          <GiBrokenArrow className="m-auto text-[100px] mb-5" />
          <p>404. Page Not Found</p>
        </div>
      </main>
    </>
  );
};

export default NotFound;

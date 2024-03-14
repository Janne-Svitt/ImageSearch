import { useAuth0 } from "@auth0/auth0-react";
import { VscAccount } from "react-icons/vsc";
import "../index.css";

const AccountInfo = () => {
  const { user } = useAuth0();
  return (
    <>
      <div className="bg-neutral-900 shadow-[0_2px_4px_rgba(0,0,0,0.6)]  m-auto w-[220px] p-2 rounded-[110px]">
        <VscAccount
          style={{
            fontSize: "200px",
            margin: "auto",
            color: "white",
          }}
        />
      </div>
      <section className=" text-white mt-8 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] rounded-md p-5">
        <h3 className=" text-2xl mb-2">{user?.name}</h3>
        <label className=" text-gray-500 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] rounded-sm p-1">
          - Admin -
        </label>
      </section>
      <div className="bg-gray-500 h-px  rounded-lg mt-8 mb-8 mr-4 ml-4"></div>
      <section className=" text-white mt-8 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] rounded-md p-5">
        <p className=" text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
          consectetur veniam cupiditate vitae necessitatibus aliquam qui officia
          omnis eius a placeat maxime quis enim eveniet, eaque provident!
          Libero, obcaecati neque!
        </p>
      </section>
      <div className="bg-gray-500 h-px  rounded-lg mt-8 mr-4 ml-4"></div>
    </>
  );
};

export default AccountInfo;

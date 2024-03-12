import { useAuth0 } from "@auth0/auth0-react";
import { VscAccount } from "react-icons/vsc";

const AccountInfo = () => {
  const { user } = useAuth0();
  return (
    <>
      <VscAccount
        style={{
          fontSize: "200px",
          margin: "auto",
          marginTop: "2vw",
          color: "white",
        }}
      />
      <section className="m-4 text-white">
        <h3 className=" text-2xl">{user?.name}</h3>
        <label className=" text-gray-500">- Admin -</label>
      </section>
    </>
  );
};

export default AccountInfo;

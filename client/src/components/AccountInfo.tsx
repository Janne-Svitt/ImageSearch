import { useAuth0 } from "@auth0/auth0-react";
import { MdAccountBox } from "react-icons/md";

const AccountInfo = () => {
  const { user } = useAuth0();
  return (
    <div className="  absolute left-2 top-2 rounded-lg h-48">
      <MdAccountBox style={{ fontSize: "100px", margin: "auto" }} />
      <h3>{user?.name}</h3>
    </div>
  );
};

export default AccountInfo;

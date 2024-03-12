import AccountInfo from "../src/components/AccountInfo";
import "../src/Home.css";
const AccountSettings = () => {
  return (
    <main className="bg-black flex h-screen">
      <div className="bg-[#272727] h-full w-1/3 border">
        <AccountInfo />
      </div>
      <div className="bg-[#272727] h-full w-full border"></div>
    </main>
  );
};

export default AccountSettings;

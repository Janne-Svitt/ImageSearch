import AccountInfo from "../src/components/AccountInfo";
import "../src/index.css";

const AccountSettings = () => {
  return (
    <main className="bg-[#272727] flex w-full p-5">
      <div className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-md w-1/3 p-10  shadow-[10px_10px_10px_1px_rgba(0,0,0,0.3)]">
        <AccountInfo />
      </div>
      <div className="flex h-screen mr-2 ml-2">
        <div className="m-auto">
          <div className="bg-white m-auto mt-4 mb-4 rounded-lg w-2 h-2"></div>
          <div className="bg-white m-auto mt-4 mb-4 rounded-lg w-2 h-2"></div>
          <div className="bg-white m-auto mt-4 mb-4 rounded-lg w-2 h-2"></div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-md w-2/3 p-10  shadow-[10px_10px_10px_1px_rgba(0,0,0,0.3)]"></div>
    </main>
  );
};

export default AccountSettings;

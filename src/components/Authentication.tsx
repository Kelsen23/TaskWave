import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Authentication = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex items-center gap-30">
        <SignUp />
        <div className="text-gray-500 font-semibold mx-4">OR</div>
        <LogIn />
      </div>
    </div>
  );
};

export default Authentication;

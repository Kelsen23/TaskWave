import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Authentication = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex items-center gap-60">
        <SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <div className="text-gray-500 font-semibold mx-4">OR</div>
        <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
    </div>
  );
};

export default Authentication;

import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { motion } from "framer-motion";

const Authentication = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex items-center gap-50">
        <SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <div className="flex items-center gap-6 w-40">
          <div className="flex-grow border-t-2 border-gray-300" />
          <motion.span
            className="text-gray-500 font-semibold text-base select-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            OR
          </motion.span>
          <div className="flex-grow border-t-2 border-gray-300" />
        </div>
        <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
    </div>
  );
};

export default Authentication;

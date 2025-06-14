import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CircleAlert } from "lucide-react";

const Authentication = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { error } = useAuthStore();

  return (
    <div>
      <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
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

        <div className="absolute bottom-7 w-full max-w-md px-4">
          {error === "Username is already taken" && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                bounce: 0.25,
              }}
              exit={{ y: 50, opacity: 0 }}
              whileHover={{ y: -10 }}
            >
              <Alert className="border-red-500 bg-red-50 text-red-700 p-4 shadow-md rounded-lg">
                <CircleAlert />
                <AlertTitle>Unable to sign up</AlertTitle>
                <AlertDescription>Username is already taken.</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {error === "Email is already registered" && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                bounce: 0.25,
              }}
              exit={{ y: 50, opacity: 0 }}
              whileHover={{ y: -10 }}
            >
              <Alert className="border-red-500 bg-red-50 text-red-700 p-4 shadow-md rounded-lg">
                <CircleAlert />
                <AlertTitle>Unable to sign up</AlertTitle>
                <AlertDescription>
                  Email is already registered.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {error === "Invalid credentials" && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                bounce: 0.5,
              }}
              exit={{ y: 50, opacity: 0 }}
              whileHover={{ y: -10 }}
            >
              <Alert className="border-red-500 bg-red-50 text-red-600 p-4 shadow-md rounded-lg">
                <CircleAlert />
                <AlertTitle>Unable to login</AlertTitle>
                <AlertDescription>
                  <p>Account with these credentials doesn't exist</p>
                  <ul className="list-disc list-inside ml-2 mt-1 text-sm text-gray-700">
                    <li>Check if account exists</li>
                    <li>Verify your information and try again</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;

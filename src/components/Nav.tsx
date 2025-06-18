import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const Nav = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [profileIsHovered, setProfileIsHovered] = useState(false);

  const { isLoggedIn } = useAuthStore();

  return (
    <nav className="p-3 w-full flex justify-around items-center border-b-1 backdrop-blur-md bg-blue-300/10 border-blue-300">
      <div className="text-2xl font-bold select-none">
        <span>Task</span>
        <span className="text-blue-500">Wave🌊</span>
      </div>

      <div className="flex flex-row items-center gap-4">
        <motion.div
          onMouseEnter={() => setProfileIsHovered(true)}
          onMouseLeave={() => setProfileIsHovered(false)}
          className="relative"
        >
          <Avatar>
            <AvatarImage
              className="rounded-full w-10 h-10"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="@shadcn"
            />
          </Avatar>

          <AnimatePresence>
            {profileIsHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                  bounce: 0.8,
                }}
                className="pointer-events-none absolute bg-gray-50 top-12 left-1/2 -translate-x-1/2 z-10 text-black p-2 rounded-b-md rounded-t-none shadow-md whitespace-nowrap before:content-[''] before:absolute before:top-[-6px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-x-transparent before:border-b-gray-50 before:border-t-0"
              >
                {isLoggedIn?.username}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Menu
          onClick={() => setIsMenuOpen(true)}
          size={33}
          className="cursor-pointer hover:bg-gray-200 p-1 rounded-lg transition duration-200"
        />
      </div>
    </nav>
  );
};

export default Nav;

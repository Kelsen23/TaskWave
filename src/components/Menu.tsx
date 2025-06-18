import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { LogOut, X } from "lucide-react";

const Menu = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logOut } = useAuthStore();

  return (
    <motion.div
      initial={{ x: 200 }}
      animate={{ x: 0 }}
      exit={{ x: 200 }}
      transition={{ ease: "easeOut", duration: 0.4 }}
      style={{ willChange: "transform" }}
      className="fixed right-0 w-72 bg-white h-screen shadow-lg z-20 p-5"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-5 items-center mb-3">
          <X
            onClick={() => setIsMenuOpen(false)}
            size={30}
            className="cursor-pointer text-gray-600 rounded-full hover:bg-gray-200  hover:text-black transition ease-in duration-100 p-1"
          />
          <span className="flex font-bold text-2xl">Menu</span>
        </div>

        <div>
          <button
            onClick={logOut}
            className="group flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 ease-in-out"
          >
            <LogOut
              size={20}
              className="text-gray-500 group-hover:text-black transition"
            />
            <span className="group-hover:text-black">Log Out</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Menu;

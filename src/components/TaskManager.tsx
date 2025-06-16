import Nav from "./Nav";
import Filters from "./Filters";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { CirclePlus } from "lucide-react";
import { Trash2 } from 'lucide-react';

const TaskManager = () => {
  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center">
        <Filters />
        <div className="flex flex-row gap-4">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="cursor-pointer bg-white text-black flex items-center space-x-2"
          >
            <CirclePlus size={16} />
            <span>Create New Task</span>
          </HoverBorderGradient>

          <button className="flex flex-row gap-2 items-center bg-red-500 px-4 py-2 rounded-full text-white shadow-sm cursor-pointer hover:bg-white hover:text-red-500 transition-all ease-in duration-150">
            <Trash2 size={20} />
            <span>Delete All Tasks</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;

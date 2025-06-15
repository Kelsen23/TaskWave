import Nav from "./Nav";
import Filters from "./Filters";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { CirclePlus } from 'lucide-react';

const TaskManager = () => {
  return (
    <div>
      <Nav />
      <div className="flex flex-row items-center">
        <Filters />
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="cursor-pointer bg-white text-black flex items-center space-x-2"
        >
          <CirclePlus size={16} />
          <span>Create New Task</span>
        </HoverBorderGradient>
      </div>
    </div>
  );
};

export default TaskManager;

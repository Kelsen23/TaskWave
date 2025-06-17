import { Search } from "lucide-react";
import { PriorityCombobox } from "./ui/PriorityCombobox";
import { StatusCombobox } from "./ui/StatusCombobox";
import { useTaskStore } from "@/store/useTaskStore";
import { useEffect } from "react";

const Filters = () => {
  const {
    searchTerm,
    status,
    priority,
    setSearchTerm,
    setStatus,
    setPriority,
    filterTasks,
  } = useTaskStore();

  useEffect(() => {
    filterTasks();
  }, [searchTerm, status, priority]);

  return (
    <div className="m-16 mr-5 flex flex-row gap-3 items-center">
      <div className="relative w-72 flex flex-col">
        <p className="text-sm text-gray-500 ml-3 mb-1 select-none">
          Filter by searching
        </p>

        <div className="flex items-center">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search your tasks"
            className="w-full px-10 py-2 rounded-full border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm placeholder-gray-500 shadow-sm transition duration-200"
          />
          <Search size={18} className="absolute left-3 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-sm text-gray-500 ml-3 mb-1 select-none">
          Filter by status
        </p>

        <StatusCombobox setStatus={setStatus} />
      </div>

      <div className="flex flex-col">
        <p className="text-sm text-gray-500 ml-3 mb-1 select-none">
          Filter by priority
        </p>

        <PriorityCombobox setPriority={setPriority} />
      </div>
    </div>
  );
};

export default Filters;

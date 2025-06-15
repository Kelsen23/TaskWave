import { Search } from "lucide-react";
import { PriorityCombobox } from "./ui/PriorityCombobox";
import { StatusCombobox } from "./ui/StatusCombobox";

const Filters = () => {
  return (
    <div className="m-18 flex flex-row gap-3">
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Search your tasks"
          className="w-full px-10 py-2 rounded-full border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm placeholder-gray-500 shadow-sm transition duration-200"
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      <StatusCombobox />
      <PriorityCombobox />
    </div>
  );
};

export default Filters;

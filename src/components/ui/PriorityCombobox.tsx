import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function PriorityCombobox({
  setPriority,
}: {
  setPriority: (newPriority: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setPriority(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-all"
        >
          {value
            ? priorities.find((priority) => priority.value === value)?.label
            : "Select priority..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-1 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg">
        <Command>
          <CommandInput
            placeholder="Search priority..."
            className="h-8 mb-1 px-3 rounded-md border border-gray-200 bg-gray-50 focus:outline-none"
          />
          <CommandList className="border-none p-0">
            <CommandEmpty className="p-2 text-sm text-gray-500">
              No priority found.
            </CommandEmpty>
            <CommandGroup>
              {priorities.map((priority) => (
                <CommandItem
                  key={priority.value}
                  value={priority.value}
                  className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {priority.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-blue-500",
                      value === priority.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

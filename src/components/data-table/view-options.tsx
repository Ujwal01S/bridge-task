import { type Table as TableType } from "@tanstack/react-table";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "@radix-ui/react-separator";

interface IProps<TData> {
  table: TableType<TData>;
}

const ViewOptions = <TData,>({ table }: IProps<TData>) => {
  const isAnyColumnHidden = table.getIsAllColumnsVisible() ? (
    <EyeOff />
  ) : (
    <Eye />
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-fit'>
          {isAnyColumnHidden} columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='border-gray-400'>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
        <div className='flex items-center space-x-2 border-t-2 border-gray-400'>
          <Button
            variant='ghost'
            onClick={() => table.toggleAllColumnsVisible(true)}
          >
            Show All
          </Button>
          <Separator
            orientation='vertical'
            className='data-[orientation=vertical]:w-[1.2px] data-[orientation=vertical]:h-5  bg-gray-400 dark:bg-white'
          />
          <Button
            variant='ghost'
            onClick={() => table.toggleAllColumnsVisible(false)}
          >
            Hide All
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ViewOptions;

import { type Table as TableType } from "@tanstack/react-table";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
        <Button variant='outline'>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ViewOptions;

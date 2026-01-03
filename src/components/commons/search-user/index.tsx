import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface IProps {
  placeholder: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchInput = ({ onChange, placeholder, className, value }: IProps) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        onChange={onChange}
        className={cn("w-64", className)}
        value={value}
      />
    </>
  );
};

export default SearchInput;

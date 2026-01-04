import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface Props {
  disabled: boolean;
  mode: "create" | "update";
  submitLabel?: string;
  className?: string;
}

const SubmitButton = ({ disabled, mode, submitLabel, className }: Props) => {
  return (
    <Button type='submit' disabled={disabled} className={cn("", className)}>
      {disabled ? (
        <div className='flex gap-2 items-center'>
          <Spinner /> {mode === "create" ? "Creating..." : "Updating"}
        </div>
      ) : (
        submitLabel || (mode === "create" ? "Create" : "Update")
      )}
    </Button>
  );
};

export default SubmitButton;

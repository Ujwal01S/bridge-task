import { Button } from "@/components/ui/button";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";
import { memo } from "react";

interface IProps {
  total: number;
  isPending?: boolean;
}

const PaginationButton = memo(({ total }: IProps) => {
  const { limit, setSkip, skip } = usePaginationParams();

  const currentSkip = skip ?? 0;
  const currentLimit = limit ?? 10;

  const canGoPrevious = currentSkip > 0;

  const canGoNext = currentSkip + currentLimit < total;

  const handlePrevious = () => {
    const newSkip = Math.max(0, currentSkip - currentLimit);
    setSkip(newSkip);
  };

  const handleNext = () => {
    if (canGoNext) {
      setSkip(currentSkip + currentLimit);
    }
  };

  return (
    <div className='flex gap-3 items-center'>
      <Button onClick={handlePrevious} disabled={!canGoPrevious}>
        Previous
      </Button>
      <Button onClick={handleNext} disabled={!canGoNext}>
        Next
      </Button>
    </div>
  );
});

PaginationButton.displayName = "PaginationButton";

export default PaginationButton;

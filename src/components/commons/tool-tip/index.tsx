import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

interface IProps {
  tooltipInfo: string;
}

const QuestionToolTip = ({ tooltipInfo }: IProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type='button' className='inline-flex'>
          <CircleHelp className='w-4 h-4' />
        </button>
      </TooltipTrigger>
      <TooltipContent
        className='bg-white text-black border border-gray-200 shadow-md'
        sideOffset={10}
      >
        <p>{tooltipInfo}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default QuestionToolTip;

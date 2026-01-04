import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserModalStore } from "@/store/use-user-modal-store";
import { memo } from "react";

interface Props {
  open: boolean;
  onChange?: () => void;
}

const CustomModal = ({ open, onChange }: Props) => {
  const { content, title } = useUserModalStore();
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className='min-w-[50vw] min-h-[70vh] overflow-y-auto [&]:duration-0 [&]:data-[state=closed]:duration-0'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription className='sr-only'>{title}</DialogDescription>
        </DialogHeader>

        {content}
      </DialogContent>
    </Dialog>
  );
};

export default memo(CustomModal);

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { memo } from "react";

interface Props {
  open: boolean;
  onChange: () => void;
  onDelete: () => void;
  loading?: boolean;
  description?: string;
  name?: string;
}

const DeleteDialog = ({
  open,
  onChange,
  onDelete,
  loading,
  name = "this user",
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex space-x-2'>
          <Button variant='outline' onClick={onChange} disabled={loading}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={onDelete} disabled={loading}>
            {loading ? (
              <div className='flex gap-2'>
                <Spinner /> Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(DeleteDialog);

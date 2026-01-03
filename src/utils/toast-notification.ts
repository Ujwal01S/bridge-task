import { toast } from "sonner";

interface INotification {
  header: string;
  description: string;
}

export const successNotification = ({ description, header }: INotification) => {
  toast(header, {
    description,
    action: {
      label: "X",
      onClick: () => {},
    },
    style: {
      backgroundColor: "#59AC77",
      borderColor: "#59AC77",
      color: "white",
    },
    className: "sonner-toast",
    descriptionClassName: "text-white/90 text-sm",
    actionButtonStyle: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid rgba(255,255,255,0.3)",
      fontSize: "12px",
      padding: "4px 8px",
    },
  });
};

export const errorNotification = ({ header, description }: INotification) => {
  toast(header, {
    description,
    action: {
      label: "X",
      onClick: () => {},
    },
    style: {
      backgroundColor: "#F75270",
      borderColor: "#F75270",
      color: "white",
    },
    className: "sonner-toast",
    descriptionClassName: "text-white/90 text-sm",
    actionButtonStyle: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid rgba(255,255,255,0.3)",
      fontSize: "12px",
      padding: "4px 8px",
    },
  });
};

import DialogDelete from "./delete";
import DialogTitle from "./empty";
import Divider from "../divider";
import { Dialog as MUIDialog } from "@mui/material";
import { useMinWidth } from "@utils";

const Dialog = (props) => {
  const {
    children,
    checkedMinWidth = true,
    caption,
    onClose,
    ...other
  } = props;

  const matches = checkedMinWidth ? useMinWidth() : true;

  return (
    <MUIDialog open fullWidth maxWidth="md" fullScreen={!matches} {...other}>
      {matches && caption ? (
        <>
          <DialogTitle onClose={onClose}>{caption}</DialogTitle>
          <Divider />
        </>
      ) : null}
      {children}
    </MUIDialog>
  );
};

export { DialogDelete, DialogTitle, Dialog };

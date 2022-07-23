import { Dialog } from "@components";
import Container from "./container";

const Default = (props) => {
  return (
    <Dialog
      onClose={props?.onClose}
      caption={props.id ? "Edit Posts" : "Create Posts"}
    >
      <Container {...props} />
    </Dialog>
  );
};

export default Default;

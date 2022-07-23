import { Dialog } from "@components";
import Container from "./container";

const Default = (props) => {
  return (
    <Dialog
      onClose={props?.onClose}
      caption={props.id ? "Edit Brands" : "Create Brands"}
    >
      <Container {...props} />
    </Dialog>
  );
};

export default Default;

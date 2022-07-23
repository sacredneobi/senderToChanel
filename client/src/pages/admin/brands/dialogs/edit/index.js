import { observer } from "mobx-react-lite";
import Dialog from "./dialog";
import { useBrandsPost as usePost, useBrandsUpdate as useUpdate } from "@api";

const Default = observer((props) => {
  const { useContext, reload } = props;
  const { dialog = {} } = useContext ? useContext() : {};

  const [callbackPost] = usePost({ reload });
  const [callbackUpdate] = useUpdate({ reload });

  if (dialog.isShowEdit) {
    const handleOnClose = () => {
      dialog.setIsShowEdit(false);
    };

    const handleOnSave = (data) => {
      if (data?.id) {
        callbackUpdate(data);
      } else {
        callbackPost(data);
      }
      handleOnClose();
    };

    return (
      <Dialog
        id={dialog?.data?.select}
        onClose={handleOnClose}
        onSave={handleOnSave}
      />
    );
  }
  return null;
});

export default Default;

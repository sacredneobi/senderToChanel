import { observer } from "mobx-react-lite";
import Dialog from "./dialog";
import { usePostsPost as usePost, usePostsUpdate as useUpdate } from "@api";

const Default = observer((props) => {
  const { useContext, reload } = props;
  const { dialog = {} } = useContext ? useContext() : {};

  const [callbackPost] = usePost({ reload });
  const [callbackUpdate] = useUpdate({ reload });

  if (dialog.isShowEdit) {
    const handleOnClose = () => {
      dialog.setIsShowEdit(false);
    };

    const handleOnSave = (data, id) => {
      if (id) {
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

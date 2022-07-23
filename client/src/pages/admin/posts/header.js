import { memo } from "react";
import { Text, IconButton, Box, CircularProgress } from "@components";
import { areEqualObject } from "@utils/areRender";
import { usePostsContext as useContext } from "@context";
import { usePostSend } from "@api";

const Default = memo((props) => {
  const { caption, brand, id } = props;

  const { dialog } = useContext();
  const [callbackSend, loading] = usePostSend();

  const handleOnEdit = (event) => {
    dialog.setIsShowEdit(true, { select: id });
    event.stopPropagation();
  };

  const handleOnSend = (event) => {
    callbackSend({ id });
    event.stopPropagation();
  };

  const handleOnDelete = (event) => {
    dialog.setIsShowDelete(true, { select: id, onGetText: () => caption });
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        alignItems: "center",
        padding: (them) => them.spacing(0, 1, 0, 1),
      }}
    >
      <Text
        sx={{ color: "text.secondary", flexGrow: 1 }}
        caption={`№${id} для бренда "${
          brand?.caption ? brand.caption : "Ошибка определения бренда"
        }"`}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <IconButton
          textIcon="send"
          color="primary"
          edge={false}
          sx={{ padding: 0.5 }}
          onClick={handleOnSend}
        />
      )}
      <IconButton
        textIcon="edit"
        color="primary"
        edge={false}
        sx={{ padding: 0.5 }}
        onClick={handleOnEdit}
      />
      <IconButton
        textIcon="delete"
        color="error"
        edge={false}
        sx={{ padding: 0.5 }}
        onClick={handleOnDelete}
      />
    </Box>
  );
}, areEqualObject);

export default Default;

import { ImageList, ImageListItemBar, ImageListItem } from "@mui/material";
import IconButton from "../iconButton";

export default (props) => {
  const { items, onDelete, onDeleteById } = props;

  const handleOnClick = (media) => {
    return () => {
      if (typeof onDelete === "function") {
        onDelete((prev) =>
          prev.filter((item) =>
            item.id ? item.id !== media.id : item.img !== media.img
          )
        );
      }
      if (typeof onDeleteById === "function" && media.id) {
        onDeleteById((prev) => {
          prev.push(media.id);
          return [...prev];
        });
      }
    };
  };

  return (
    <ImageList sx={{ width: "100%", height: 350 }} cols={3} rowHeight={150}>
      {items.map((item, index) => (
        <ImageListItem key={index}>
          {onDelete ? (
            <ImageListItemBar
              title={item.isVideo ? "VIDEO" : "IMAGE"}
              sx={{ top: 0, bottom: "unset", zIndex: 100 }}
              actionIcon={
                <IconButton
                  textIcon="clear"
                  edge={false}
                  onClick={handleOnClick(item)}
                  sx={{ color: "rgba(255, 255, 255)" }}
                />
              }
            />
          ) : null}
          {item.isVideo ? (
            <video
              // autoPlay
              controls
              src={item.img ? item.img : `api/media?fileId=${item.path}`}
              style={{ width: "100%", height: "100%" }}
            >
              The “video” tag is not supported by your browser. Click [here] to
              download the video file.
            </video>
          ) : (
            <img
              src={item.img ? item.img : `api/media?fileId=${item.path}`}
              alt={item.file}
              loading="lazy"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};

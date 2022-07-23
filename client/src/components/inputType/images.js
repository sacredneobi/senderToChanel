import Icon from "../icon";

export default (props) => {
  const { caption, onSetData } = props;

  const handleChangeImage = (e) => {
    e.preventDefault();

    Array.prototype.forEach.call(e.target.files, (file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        if (typeof onSetData === "function") {
          onSetData((prev) => {
            console.log(reader, file);
            if (!prev.find((item) => item.img === reader.result)) {
              prev.push({
                file,
                img: reader.result,
                isVideo: file.type.includes("video"),
              });
            }
            return [...prev];
          });
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <label
      style={{
        border: "1px solid #ccc",
        display: "flex",
        gap: 10,
        padding: "6px 12px",
        cursor: "pointer",
        alignItems: "center",
        height: 56,
        borderRadius: 4,
      }}
    >
      <input
        type="file"
        multiple
        onChange={handleChangeImage}
        style={{ display: "none" }}
      />
      <Icon textIcon="file_download" /> {caption}
    </label>
  );
};

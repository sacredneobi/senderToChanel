import Icon from "../icon";

export default (props) => {
  const { onChange, caption } = props;

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
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Icon textIcon="file_download" /> {caption}
    </label>
  );
};

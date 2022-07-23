import { memo, useEffect } from "react";
import { Text } from "@components";
import { areEqualObject } from "@utils/areRender";

const Default = memo((props) => {
  const { caption, id, description, expanded } = props;

  useEffect(() => {
    if (expanded) {
      console.log(expanded, id);
      return () => {
        console.log("unMount", id);
      };
    }
  }, [expanded, id]);

  return (
    <>
      <Text sx={{ color: "text.secondary" }} caption={description} />
      <Text sx={{ color: "text.secondary" }} caption={caption} />
    </>
  );
}, areEqualObject);

export default Default;

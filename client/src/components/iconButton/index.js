import { IconButton } from "@mui/material";
import Icon from "../icon";
import { isFunc } from "@utils/";

const Default = (props) => {
  const {
    help = "button",
    textIcon,
    icon,
    onClick,
    children,
    iconSx,
    sx,
    edge = "start",
    ...other
  } = props;
  const MyIcon = icon;

  const handleOnClick = (event) => {
    isFunc(onClick, event);
  };

  const style =
    edge !== "start"
      ? sx
      : {
          marginRight: 5,
          ...sx,
        };

  return (
    <IconButton
      color="inherit"
      aria-label={help}
      edge={edge}
      onClick={handleOnClick}
      sx={style}
      {...other}
    >
      {icon && <MyIcon />}
      {textIcon && <Icon textIcon={textIcon} sx={{ ...iconSx }} />}
      {children}
    </IconButton>
  );
};

export default Default;

import { useState } from "react";
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
} from "@mui/material";
import Skeleton from "../skeleton";
import IconButton from "../iconButton";

const Default = (props) => {
  const {
    name,
    error,
    onChange,
    data,
    caption,
    loading,
    changeOnEnter,
    clear,
    ...other
  } = props;

  const [inputData, setInputData] = useState("");

  const handleOnKeyPress = (event) => {
    if (event.charCode === 13) {
      onChange(name)({ target: { value: inputData } });
    }
  };

  const handleOnChange = (event) => {
    setInputData(event.target.value);
  };

  const handleOnClick = () => {
    if (changeOnEnter) {
      setInputData("");
    }
    onChange(name)({ target: { value: "" } });
  };

  if (loading) {
    return <Skeleton height={56} />;
  }

  const isValue = changeOnEnter ? inputData : data?.[name] || "";

  if (clear) {
    return (
      <FormControl variant="outlined" fullWidth {...other}>
        <InputLabel htmlFor={name}>{caption}</InputLabel>
        <OutlinedInput
          sx={{ paddingRight: 0.5 }}
          id={name}
          error={!!error?.[name]}
          label={caption}
          onKeyPress={changeOnEnter ? handleOnKeyPress : null}
          value={isValue}
          onChange={changeOnEnter ? handleOnChange : onChange(name)}
          endAdornment={
            isValue !== "" ? (
              <InputAdornment position="end">
                <IconButton
                  textIcon="close"
                  onClick={handleOnClick}
                  edge={false}
                />
              </InputAdornment>
            ) : null
          }
        />
      </FormControl>
    );
  }

  return (
    <TextField
      error={!!error?.[name]}
      label={caption}
      helperText={error?.[name]}
      fullWidth
      onKeyPress={changeOnEnter ? handleOnKeyPress : null}
      value={changeOnEnter ? inputData : data?.[name] || ""}
      onChange={changeOnEnter ? handleOnChange : onChange(name)}
      {...other}
    />
  );
};

export default Default;

import { useState, useEffect, Fragment, memo } from "react";
import { TextField, CircularProgress, Autocomplete } from "@mui/material";
import Skeleton from "../skeleton";
import { isFunc } from "@utils";

function areEqual(prev, next) {
  return (
    prev.useGet === next.useGet &&
    prev.name === next.name &&
    prev.error?.[prev.name] === next.error?.[next.name] &&
    prev.caption === next.caption &&
    prev.onChange === next.onChange &&
    prev.data?.[prev.name]?.caption === next.data?.[next.name]?.caption
  );
}

export default memo((props) => {
  const {
    useGet,
    name,
    error,
    caption,
    onChange,
    data,
    freeSolo,
    loading: ownerLoading,
    onClear,
    ...other
  } = props;

  const [callbackGet, loadingData, abort] = useGet
    ? useGet()
    : [null, false, null];

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(data?.[name]?.caption || null);

  useEffect(() => {
    setValue(data?.[name]?.caption || null);
  }, [data?.[name]?.caption]);

  useEffect(() => {
    if (open) {
      if (typeof callbackGet === "function") {
        callbackGet(setOptions);
      }
      if (typeof abort === "function") {
        return abort;
      }
    }
  }, [open]);

  if (ownerLoading) {
    return <Skeleton height={56} />;
  }

  return (
    <Autocomplete
      freeSolo={freeSolo ? freeSolo : false}
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.caption === value}
      getOptionLabel={(option) => {
        const data = option?.caption ? option.caption : option;
        return data ? data : ">>>error get caption<<<";
      }}
      options={options}
      value={value}
      onInputChange={(event, value) => {
        if (freeSolo) {
          if (typeof onChange === "function") {
            onChange(name)({
              target: { value: value || null },
            });
          }
        }
      }}
      onChange={(event, value) => {
        if (!value) {
          isFunc(onClear);
        }
        setValue(value?.caption || null);
        if (typeof onChange === "function") {
          onChange(name)({
            target: { value: value || null },
          });
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error?.[name]}
          label={caption}
          helperText={error?.[name]}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loadingData ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
      {...other}
    />
  );
}, areEqual);

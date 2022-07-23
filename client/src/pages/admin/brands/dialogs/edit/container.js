import { Box, Input, Container } from "@components";
import { isFunc } from "@utils";
import { useCallback, useState, useEffect } from "react";
import { DialogContent } from "@mui/material";
import Actions from "./actions";
import { useBrandsGetById as useGetById } from "@api";
import useValidate from "./validate";
import style from "./style";

export default (props) => {
  const { onClose, onSave, id } = props;

  const [data, setData] = useState({});
  const [save, setSave] = useState(false);
  const [error, setError] = useState({});
  const [callbackGet, loading] = useGetById();
  const validate = useValidate();

  useEffect(() => {
    if (id) {
      callbackGet(id, setData);
    }
  }, [id, callbackGet]);

  const handleOnSave = useCallback(() => {
    setSave((prev) => !prev);
  }, []);

  useEffect(() => {
    if (save) {
      isFunc(onSave, { ...data, id });
    }
    setError(validate(data));
  }, [onSave, data, save, validate]);

  const handleChange = useCallback((param) => {
    return (event) => {
      setData((prev) => {
        prev[param] = event.target.value;
        return { ...prev };
      });
    };
  }, []);

  return (
    <>
      <DialogContent>
        <Box sx={style.root}>
          <Container
            error={error}
            data={data}
            onChange={handleChange}
            loading={loading}
          >
            <Input name="caption" caption="Заголовок" autoFocus />
            <Input name="description" caption="Описание" />
          </Container>
        </Box>
      </DialogContent>
      <Actions
        handleOnSave={handleOnSave}
        disabled={error.isError}
        onClose={onClose}
      />
    </>
  );
};

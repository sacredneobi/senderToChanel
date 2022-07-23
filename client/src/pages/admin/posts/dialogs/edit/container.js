import {
  Box,
  Input,
  Container,
  InputImages,
  Autocomplete,
  ImageList,
} from "@components";
import { isFunc } from "@utils";
import { useCallback, useState, useEffect } from "react";
import { DialogContent } from "@mui/material";
import Actions from "./actions";
import {
  usePostsGetById as useGetById,
  useBrandsGetAll as useGetAll,
} from "@api";
import useValidate from "./validate";
import style from "./style";

export default (props) => {
  const { onClose, onSave, id } = props;

  const [data, setData] = useState({});
  const [save, setSave] = useState(false);
  const [error, setError] = useState({});
  const [images, setImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [callbackGet, loading] = useGetById();
  const validate = useValidate();

  useEffect(() => {
    if (id) {
      callbackGet(id, setData, setImages);
    }
  }, [id, callbackGet]);

  const handleOnSave = useCallback(() => {
    setSave((prev) => !prev);
  }, []);

  useEffect(() => {
    if (save) {
      const files = new FormData();
      images.forEach((item, index) => {
        if (!item.id) {
          if (item.isVideo) {
            files.append(`video_${index}`, item.file);
          } else {
            files.append(`image_${index}`, item.file);
          }
        }
      });
      Object.keys(data).forEach((item) => {
        if (typeof data[item] === "object") {
          files.append(item + "_obj", JSON.stringify(data[item]));
        } else {
          files.append(item, data[item]);
        }
      });
      if (deleteImages.length > 0) {
        files.append("deleteImages", JSON.stringify(deleteImages));
      }
      files.append("id", id);
      isFunc(onSave, files, id);
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
          <Autocomplete
            name="brandId"
            caption="Бренд"
            freeSolo
            error={error}
            data={data}
            onChange={handleChange}
            useGet={useGetAll}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: 1,
            }}
          >
            <Container
              error={error}
              data={data}
              onChange={handleChange}
              loading={loading}
            >
              <Input name="price" caption="Цена" />
              <Input name="discount" caption="Цена со скидкой" />
            </Container>
          </Box>
          <InputImages onSetData={setImages} caption="Добавить файл" />
          <ImageList
            items={images}
            onDelete={setImages}
            onDeleteById={setDeleteImages}
          />
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

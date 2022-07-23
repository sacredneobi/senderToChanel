import { checkInput } from "@utils";
import { useCallback } from "react";

const validateData = [
  {
    name: "brandId",
    maxLength: {
      val: 200,
      errorMessage: "Символов должно не более ${val}",
    },
    minLength: {
      val: 3,
      errorMessage: "Символов должно не менее ${val}",
    },
  },
  {
    name: "price",
    minValue: { val: 0, errorMessage: "Должно быть больше ${val}" },
    maxValue: {
      val: 99999,
      errorMessage: "Должно быть меньше ${val}",
    },
  },
  {
    name: "discount",
    minValue: { val: 0, errorMessage: "Должно быть больше ${val}" },
    maxValue: {
      val: 99999,
      errorMessage: "Должно быть меньше ${val}",
    },
  },
];

const def = () => {
  return useCallback((data) => {
    return checkInput(data, validateData);
  }, []);
};

export default def;

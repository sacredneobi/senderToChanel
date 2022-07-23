import { checkInput } from "@utils";
import { useCallback } from "react";

const validateData = [
  {
    name: "caption",
    maxLength: {
      val: 200,
      errorMessage: "Символов должно не более ${val}",
    },
    minLength: {
      val: 3,
      errorMessage: "Символов должно не менее ${val}",
    },
  },
];

const def = () => {
  return useCallback((data) => {
    return checkInput(data, validateData);
  }, []);
};

export default def;

import { useCallback } from "react";
import useParamsApi from "./useParamsAPI";

const urlBase = "/api/postSend";

const useSend = () => {
  const { post, loading, abort } = useParamsApi(urlBase);

  return [
    useCallback(
      (data) => {
        post("", data);
      },
      [post]
    ),
    loading,
    abort,
  ];
};

export { useSend };

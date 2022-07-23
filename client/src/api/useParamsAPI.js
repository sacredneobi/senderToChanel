import useFetch from "use-http";

const useParams = (
  url,
  cachePolicy,
  langBase,
  prefix,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  return useFetch(url, {
    cachePolicy,
    data: [],
    onAbort: () => {
      console.log("abort request");
    },
    onError: (error) => {
      console.log(error, langBase, prefix);
    },
    headers,
  });
};

export default useParams;

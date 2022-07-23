import useAccessGet from "./access";
import { useSend as usePostSend } from "./postSend";
import {
  useGet as usePostsGet,
  useGetAll as usePostsGetAll,
  useGetById as usePostsGetById,
  useDelete as usePostsDelete,
  usePost as usePostsPost,
  useUpdate as usePostsUpdate,
} from "./posts";
import {
  useGet as useBrandsGet,
  useGetAll as useBrandsGetAll,
  useGetById as useBrandsGetById,
  useDelete as useBrandsDelete,
  usePost as useBrandsPost,
  useUpdate as useBrandsUpdate,
} from "./brands";

export {
  useAccessGet,
  usePostsGet,
  usePostsGetAll,
  usePostsGetById,
  usePostsDelete,
  usePostsPost,
  usePostsUpdate,
  useBrandsGet,
  useBrandsGetAll,
  useBrandsGetById,
  useBrandsDelete,
  useBrandsPost,
  useBrandsUpdate,
  usePostSend,
};

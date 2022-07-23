import { memo } from "react";
import { Table } from "@components";
import { usePostsGet as useGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import {
  PostsSelect as Select,
  PostsContext as Context,
  usePostsContext as useContext,
} from "@context";
import Header from "./header";
import Details from "./details";
import TopContainer from "./topContainer";
import Dialogs from "./dialogs";

const Content = (props) => {
  const { reload, useSearch, ...other } = useGet(50, 1);

  return (
    <>
      <Table
        {...other}
        userContext={Select}
        topContainer={(props) => (
          <TopContainer {...props} onSearch={useSearch} />
        )}
        itemsRender={{
          header: (props) => <Header {...props} />,
          details: (props) => <Details {...props} />,
        }}
        showCheck
      />
      <Dialogs useContext={useContext} reload={reload} />
    </>
  );
};

const Main = memo((props) => {
  return (
    <Select.Provider value={[]} name="SELECT FOR TABLE Posts">
      <Context>
        <Content />
      </Context>
    </Select.Provider>
  );
}, areEqualAlways);

const Default = (props) => {
  return <Main />;
};

export default { name: "Posts", component: Default };

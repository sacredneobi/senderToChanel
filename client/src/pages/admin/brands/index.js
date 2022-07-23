import { memo } from "react";
import { Table } from "@components";
import { useBrandsGet as useGet } from "@api";
import { areEqualAlways } from "@utils/areRender";
import {
  BrandsSelect as Select,
  BrandsContext as Context,
  useBrandsContext as useContext,
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
    <Select.Provider value={[]} name="SELECT FOR TABLE Brands">
      <Context>
        <Content />
      </Context>
    </Select.Provider>
  );
}, areEqualAlways);

const Default = (props) => {
  return <Main />;
};

export default { name: "Brands", component: Default };

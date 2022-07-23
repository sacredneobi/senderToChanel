import React, { createContext, useContext } from "react";
import { PostsStore as Store } from "@data";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ dialog: new Store() }} name="PostsStore CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };

import React, { createContext, useContext } from "react";
import { useFilterReducer } from "./reducers";

const FilterContext = createContext();
//Provider is a trype of React component that we wrap our application in so it to make the state data an available prop to all other components
const { Provider } = FilterContext;

const FilterProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useFilterReducer({
    filters: "",
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterProvider, useFilterContext };

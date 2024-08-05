import React, { ReactNode, createContext, useMemo } from "react";
import BaseService from "../../services";

interface PropsContext {
  intbuildService: BaseService;
}
interface PropsProvider {
  children: ReactNode;
}

export const ServiceContext = createContext<PropsContext>({
  intbuildService: new BaseService(),
});
const ServiceProvider: React.FC<PropsProvider> = ({ children }) => {
  const intbuildService = useMemo(() => new BaseService(), []);

  return (
    <ServiceContext.Provider value={{ intbuildService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;

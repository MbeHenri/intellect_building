import React, { ReactNode, createContext, useMemo } from "react";
import BaseService from "../../services";
import useAuth from "../Auth/hooks";

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
  const { user } = useAuth();

  const intbuildService = useMemo(
    () => (user ? new BaseService(user) : new BaseService()),
    [user]
  );

  return (
    <ServiceContext.Provider value={{ intbuildService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;

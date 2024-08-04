import React, { ReactNode, createContext, useCallback, useRef } from "react";
import { customScrollTo } from "../../utils/function";

interface PropsContext {
  phone?: string;
  email?: string;
  location?: string;
  city?: string;
  country?: string;
  linkLinkedIn?: string;
  topTarget?: React.RefObject<HTMLDivElement>;
  scrollToTopTarget?: (duration?: number) => void;
}
interface PropsProvider {
  children: ReactNode;
}

export const SiteContext = createContext<PropsContext>({});
const SiteProvider: React.FC<PropsProvider> = ({ children }) => {
  const phone = "+237 696528533";
  const email = "supportYou@intbuild.com";
  const location = "BASTOS";
  const city = "Yaounde";
  const country = "Cameroon";
  const linkLinkedIn = "unknow";

  const topTarget = useRef<HTMLDivElement>(null);
  const scrollToTopTarget = useCallback((duration?: number) => {
    if (topTarget.current) {
      //topTarget.current.scrollIntoView({ behavior: "smooth" });
      customScrollTo(
        topTarget.current.getBoundingClientRect().top + window.scrollY,
        duration ?? 1500
      );
    }
  }, []);
  return (
    <SiteContext.Provider
      value={{
        phone,
        email,
        location,
        city,
        country,
        linkLinkedIn,
        scrollToTopTarget,
        topTarget,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteProvider;

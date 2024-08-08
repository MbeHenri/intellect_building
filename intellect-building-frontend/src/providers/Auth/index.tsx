import React, { ReactNode, createContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../models/user";
import { useLocalStorage } from "../../utils/hooks";
import LoginService from "../../services/login";

interface PropsContext {
  user: UserAuth | null;
  connexion: (login: string, password: string) => Promise<void>;
  deconnexion: () => Promise<void>;
}
interface PropsProvider {
  children: ReactNode;
}

export const AuthContext = createContext<PropsContext>({
  user: null,
  connexion: async (login: string, password: string) => {},
  deconnexion: async () => {},
});
const AuthProvider: React.FC<PropsProvider> = ({ children }) => {
  // state for current user
  const { setValue, storedValue } = useLocalStorage<UserAuth | null>(
    "user",
    null
  );
  const user = useMemo(() => storedValue, [storedValue]);
  const setUser = useCallback(setValue, [setValue]);

  const navigate = useNavigate();

  // login service
  const loginService = useMemo(() => new LoginService(), []);

  // cette fonction est la fontion permettant de se conneter
  const connexion = useCallback(
    async (login: string, password: string) =>
      loginService
        .getToken(login, password)
        .then((user) => {
          setUser(user);
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        }),
    [loginService, setUser, navigate]
  );

  // cette fonction est la fonction permettant de se déconnecter
  // il utilisera potentiellement l'API de deconnexion
  const deconnexion = useCallback(async () => {
    setUser(null);
    navigate("/login", { replace: true });
  }, [setUser, navigate]);

  return (
    <AuthContext.Provider value={{ user, connexion, deconnexion }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

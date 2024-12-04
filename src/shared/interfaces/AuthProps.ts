export interface AuthProps {
  setAuthenticationStatus: React.Dispatch<
    React.SetStateAction<"register" | "login">
  >;
}

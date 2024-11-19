import { ReactNode } from "react";

const ContainerTask = ({ children }: { children: ReactNode }) => {
  return <section style={{ display: "flex" }}>{children}</section>;
};

export default ContainerTask;

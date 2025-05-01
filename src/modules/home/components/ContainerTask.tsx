import { CSSProperties, ReactNode } from "react";

const ContainerTask = ({ children, styles }: { children: ReactNode , styles?: CSSProperties}) => {
  return <section style={{ display: "flex", ...styles }}>{children}</section>;
};

export default ContainerTask;

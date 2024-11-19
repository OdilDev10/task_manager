import { Tabs, TabsProps } from "antd";
import { CSSProperties } from "react";

const CustomTabs = ({
  tabs,
  styles
}: {
  tabs: TabsProps["items"]; 
  styles: CSSProperties
}) => {
  return (
    <Tabs
      defaultActiveKey="2"
      items={tabs}
      style={styles}
    />
  );
};

export default CustomTabs;

import { TabPaneProps, Tabs, TabsProps } from "antd";
import { CSSProperties } from "react";
import TaskStatusEnum from "../enums/TaskStatusEnum";

const CustomTabs = ({
  tabs,
  styles,
  onChange,
}: {
  tabs: TabsProps["items"];
  styles: CSSProperties;
  onChange: (e: TaskStatusEnum) => void;
}) => {
  return (
    <Tabs
      defaultActiveKey="2"
      items={tabs}
      style={styles}
      onChange={(e: string) => {
        onChange(e as TaskStatusEnum);
      }}
    />
  );
};

export default CustomTabs;

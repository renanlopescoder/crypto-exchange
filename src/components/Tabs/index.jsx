import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Tabs } from "antd";
import useWebSocket, { ReadyState } from "react-use-websocket";

import Orderbook from "../Orderbook";

const { TabPane } = Tabs;

const initialPanes = [{ title: "Orderbook", content: <Orderbook />, key: "1" }];

function TabsComponent() {
  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);
  const [tabIndex, setTabIndex] = useState(0);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      eval(`${action}()`);
      return;
    }
    eval(`${action}(${targetKey})`);
  };

  const add = () => {
    setTabIndex(tabIndex + 1);

    const activeKey = `${tabIndex}`;
    const newPanes = [...panes];

    const isOrderbookActive = panes.some((item) => item.title === "Orderbook");

    if (!isOrderbookActive) {
      newPanes.push({
        title: "Orderbook",
        content: <Orderbook />,
        key: activeKey,
      });
    }

    setPanes(newPanes);
    setActiveKey(activeKey);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const newPanes = panes.filter((pane) => pane.key != targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }

    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
    >
      {panes.map((pane) => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default TabsComponent;

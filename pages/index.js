import React from "react";
import { Button, PageHeader, Statistic, Row } from "antd";

import { useMoralis } from "react-moralis";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

import Tabs from "../src/components/Tabs";

function Home() {
  const { authenticate, logout, isAuthenticated } = useMoralis();

  const authButton = () =>
    !isAuthenticated ? (
      <Button
        onClick={authenticate}
        type="primary"
        shape="round"
        icon={<LoginOutlined />}
      >
        Signin MetaMask
      </Button>
    ) : (
      <Button
        onClick={logout}
        type="primary"
        shape="round"
        icon={<LogoutOutlined />}
      >
        Logout
      </Button>
    );

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Crypto Exchange"
        subTitle="XBT/USD"
        extra={[authButton()]}
      >
        <Row>
          <Statistic title="Volume" value="605 M" />
          <Statistic
            title="FUNDING RATE"
            value="-0.004% / hr"
            style={{
              margin: "0 32px",
            }}
          />
          <Statistic title="Market Price" prefix="$" value={37059.0} />
        </Row>
        <br />
        <Tabs />
      </PageHeader>
    </>
  );
}

export default Home;

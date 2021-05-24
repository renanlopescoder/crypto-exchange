import React, { useState, useCallback, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Tag, Divider, Descriptions, Row, List, Col } from "antd";
import useWebSocket, { ReadyState } from "react-use-websocket";

function Orderbook() {
  const [socketUrl, setSocketUrl] = useState(
    "wss://www.cryptofacilities.com/ws/v1",
  );
  const [asks, setAsks] = useState([[0, 0]]);
  const [bids, setBids] = useState([[0, 0]]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [asksChart, setAsksChart] = useState({
    labels: [],
    datasets: [
      {
        label: "Asks",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  });
  const [bidsChart, setBidsChart] = useState({
    labels: [],
    datasets: [
      {
        label: "Bids",
        data: [],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Price x Size",
      },
    },
  };

  useEffect(() => {
    filterMessage(lastMessage);
  }, [lastMessage]);

  useEffect(() => {
    subscribe();

    return unsubscribe;
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const subscribe = useCallback(
    () =>
      sendMessage(
        JSON.stringify({
          event: "subscribe",
          feed: "book_ui_1",
          product_ids: ["PI_XBTUSD"],
        }),
      ),
    [],
  );

  const unsubscribe = () => {
    sendMessage(
      JSON.stringify({
        event: "unsubscribe",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"],
      }),
    );
  };

  const filterMessageArray = (array) => {
    let result = [];
    result = array.filter((item) => item[0] && item[1]);
    result = result.slice(0, 7);

    return result;
  };

  const formatChartData = (chartData, data) => {
    const result = Object.assign({}, chartData);
    result.labels = [];
    result.datasets[0].data = [];

    data.map((item) => {
      result.labels.push(formatPrice.format(item[0]));
      result.datasets[0].data.push(item[1]);
    });

    return result;
  };

  const filterMessage = (message) => {
    if (message) {
      const data = JSON.parse(message.data);
      if (data.asks && data.bids) {
        const asksArray = filterMessageArray(data.asks);
        const bidsArray = filterMessageArray(data.bids);

        if (asksArray.length >= 7) {
          const asksChartData = formatChartData(asksChart, asksArray);

          setAsksChart(asksChartData);
          setAsks(asksArray);
        }

        if (bidsArray.length >= 7) {
          const bidsChartData = formatChartData(bidsChart, bidsArray);

          setBidsChart(bidsChartData);
          setBids(bidsArray);
        }
      }
    }
  };

  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const displayData = (data, chartData) => (
    <Row>
      <Col xs={24} sm={24} md={12}>
        <Descriptions size="small" layout="vertical">
          <Row>
            <Col xs={7} sm={7} md={8}>
              <Descriptions.Item label="Price">
                <List
                  size="small"
                  bordered
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item style={{ fontSize: "10px" }}>
                      {formatPrice.format(item[0])}
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Col>
            <Col xs={6} sm={6} md={8}>
              <Descriptions.Item label="Size">
                <List
                  size="small"
                  bordered
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item style={{ fontSize: "10px" }}>
                      {item[1]}
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Col>
            <Col xs={11} sm={11} md={8}>
              <Descriptions.Item label="Total">
                <List
                  size="small"
                  bordered
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item style={{ fontSize: "10px" }}>
                      {formatPrice.format(item[0] * item[1])}
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Col>
          </Row>
        </Descriptions>
      </Col>
      <Col
        md={{ span: 8, offset: 1 }}
        lg={{ span: 8, offset: 1 }}
        sm={{ span: 24, offset: 0 }}
        xs={{ span: 24, offset: 0 }}
      >
        <Bar data={chartData} options={options} />
      </Col>
    </Row>
  );

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24}>
          Connection: <Tag color="green">{connectionStatus}</Tag>
          <Row>
            <Col xs={24} sm={24} md={12}>
              <Row>
                <Col xs={7} sm={7} md={8}>
                  Price
                </Col>
                <Col xs={7} sm={7} md={8}>
                  Size
                </Col>
                <Col xs={10} sm={10} md={8}>
                  Total
                </Col>
              </Row>
            </Col>
          </Row>
          {displayData(asks, asksChart)}
          <Divider />
          {displayData(bids, bidsChart)}
        </Col>
      </Row>
    </>
  );
}

export default Orderbook;

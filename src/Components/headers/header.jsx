import React from "react";
import { Menu, Layout, Breadcrumb, theme } from "antd";

const { Header } = Layout;

const items = new Array(2).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const header = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        padding: "0 20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="demo-logo">
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
          Weather App
        </h1>
      </div>
    </Header>
  );
};

export default header;

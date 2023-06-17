import React from "react";
import "./App.css";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Project } from "./pages/project";
import { Home } from "./pages/home";
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/">Home</Link>, "1", <DesktopOutlined />),
 // getItem(<Link to="/project">Project</Link>, "2", <PieChartOutlined />),
];

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ position: "sticky", top: 0 }}
          // selectedKeys={['1']}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/project/:projectId" element={<Project></Project>} />
            <Route path="/project" element={<Project></Project>} />
            <Route path="/" element={<Home></Home>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

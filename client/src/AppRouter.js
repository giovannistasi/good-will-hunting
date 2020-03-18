import React, { useState } from 'react';
import './AppRouter.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import { FileOutlined, UserOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsHelping, faHands } from '@fortawesome/free-solid-svg-icons'

import UserProfile from './components/UserProfile';
import RequestsDashboard from './components/RequestsDashboard';
import OffersDashboard from './components/OffersDashboard';
import Messages from './components/Messages';
import About from './components/About';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AppRouter() {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handsHelping = () => (
    <FontAwesomeIcon icon={faHandsHelping} />
  );
  const handsReceiving = () => (
    <FontAwesomeIcon icon={faHands} />
  );
  const HelpOfferIcon = props => <Icon component={handsHelping} {...props} />;
  const HelpRequestIcon = props => <Icon component={handsReceiving} {...props} />;

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/requests">
                <HelpRequestIcon />
                <span>All requests</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/offers">
                <HelpOfferIcon />
                <span>All offers</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <Link to="/user">
                  <span>
                    <UserOutlined />
                    <span>User</span>
                  </span>
                </Link>
              }
            >
              <Menu.Item key="3"><Link to="/messages">Messages</Link></Menu.Item>
              <Menu.Item key="4">Posted</Menu.Item>
              <Menu.Item key="5">Accepted</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <Link to="/about">
                <FileOutlined />
                <span>About</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route path="/user" component={UserProfile} />
                <Route path="/requests" component={RequestsDashboard} />
                <Route path="/offers" component={OffersDashboard} />
                <Route path="/about" component={About} />
                <Route path="/messages" component={Messages} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Codeworks 2020</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default AppRouter;
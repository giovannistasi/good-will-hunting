import React, { useState, useContext, useEffect } from 'react';
import { Context } from './global/Store'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import { Layout, Menu, message } from 'antd';
import Icon from '@ant-design/icons';
import { FileOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsHelping, faHands } from '@fortawesome/free-solid-svg-icons'

import About from './components/About';
import Login from './components/Login';
import Messages from './components/Messages';
import OffersDashboard from './components/OffersDashboard';
import RequestsDashboard from './components/RequestsDashboard';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AppRouter () {

  const [state, dispatch] = useContext(Context);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const HelpOfferIcon = props => <Icon component={() => (
    <FontAwesomeIcon icon={faHandsHelping} />
  )} {...props} />;
  const HelpRequestIcon = props => <Icon component={() => (
    <FontAwesomeIcon icon={faHands} />
  )} {...props} />;

  async function logOut () {
    await fetch('http://localhost:8080/logout', {
      method: 'GET'
    })
      .then(async (res) => {
        if (res.ok) {
          dispatch({ type: 'LOGIN', payload: false })
          cookies.remove('login', { path: '/' })
          return await res.json()
        } else {
          throw new Error('Something went wrong with your fetch');
        }
      })
      .then((json) => {
        message.success(`${json.status}`, 5)
      })
  }


  useEffect(() => {
    if (cookies.get('login')) {
      dispatch({type: 'LOGIN', payload: true})
    }
  }, [])

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
        >
          <div className="logo" style={{
            height: '30px',
            margin: '15px',
            background: 'rgba(255, 255, 255, 0.2)'
          }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {state.loggedIn ? null : <Menu.Item key="0">
              <Link to="/login">
                <LoginOutlined />
                <span>Log In</span>
              </Link>
            </Menu.Item>}
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
            {state.loggedIn ? (<SubMenu
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
            </SubMenu>) : null}
            <Menu.Item key="6">
              <Link to="/about">
                <FileOutlined />
                <span>About</span>
              </Link>
            </Menu.Item>
            {state.loggedIn ?
              <Menu.Item key="7"
                onClick={logOut}>
                <Link to="/">
                  <LogoutOutlined />
                </Link>
                <span>Log Out</span>
              </Menu.Item> : null}
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
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
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
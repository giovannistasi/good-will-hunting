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
import JobForm from './components/JobForm';
import Job from './components/Job';
import Cookies from 'js-cookie';
import apiService from './apiService';

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

  useEffect(() => {
    apiService.authenticate().then(user => {
      if (user) {
        dispatch({ type: 'LOGIN', payload: { loggedIn: true, userInfo: user } })
      }
    })
    apiService.fetchSkills().then(fetchedSkills => {
      dispatch({ type: 'SET-SKILLS', payload: [...state.skills, ...fetchedSkills] })
    })
  }, [])

  async function logOut () {
    await fetch('http://localhost:8080/logout', {
      method: 'GET'
    })
      .then(async (res) => {
        if (res.ok) {
          dispatch({ type: 'LOGIN', payload: false })
          Cookies.remove('connect.sid')
          return await res.json()
        } else {
          throw new Error('Something went wrong with your fetch');
        }
      })
      .then((json) => {
        message.success(`${json.status}`, 5)
      })
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0
          }}
          breakpoint="lg"
        >
          <div className="logo" style={{
            height: '30px',
            margin: '15px',
            background: 'rgba(255, 255, 255, 0.2)'
          }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultOpenKeys="sub1">
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
                // <Link to="/user">
                  <span>
                    <UserOutlined />
                    <span>User</span>
                  </span>
                // </Link>
              }
            >
              <Menu.Item key="3"><Link to="/user">Profile</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/messages">Messages</Link></Menu.Item>
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
                  <span>Log Out</span>
                </Link>
              </Menu.Item> : null}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%' }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ marginTop: 50, padding: 24, minHeight: 360 }}>
              <Switch>
                <Route path="/user" component={UserProfile} />
                <Route path="/requests" component={RequestsDashboard} />
                <Route path="/offers" component={OffersDashboard} />
                <Route path="/about" component={About} />
                <Route path="/messages" component={Messages} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/post" component={JobForm} />
                <Route path="/job/:id" component={Job} />
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
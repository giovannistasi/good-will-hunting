import React, { useState, useContext } from 'react';
import { Context } from '../global/Store';
import { Link } from "react-router-dom";
import { Layout, Menu, message } from 'antd';
import Icon from '@ant-design/icons';
import { FileOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsHelping, faHands } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie';
import logo from '../logo.svg';

const { Sider } = Layout;
const { SubMenu } = Menu;

const HelpOfferIcon = props => <Icon component={() => (
  <FontAwesomeIcon icon={faHandsHelping} />
)} {...props} />;

const HelpRequestIcon = props => <Icon component={() => (
  <FontAwesomeIcon icon={faHands} />
)} {...props} />;

function Sidebar () {

  const [state, dispatch] = useContext(Context);
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

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
      <Link to="/requests"><div className="logo" style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignContent: 'center',
      height: '30px',
      margin: '15px',
      // background: 'rgba(255, 255, 255, 0.2)'
      }} >
      {collapsed ? <img src={logo} style={{height: '30px', marginLeft: '12px'}}></img>
      : <img src={logo} style={{height: '30px', marginRight: '8px'}}></img>}
      {collapsed ? null : <h1 style={{color: 'white', fontFamily: "'Josefin Sans', 'sans-serif'", fontSize: '1.2em'}}>Goodwill Hunting</h1>}
      </div></Link>
      <Menu theme="dark" mode="inline" >
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
            <span>
              <UserOutlined />
              <span>User</span>
            </span>
          }
        >
          <Menu.Item key="3"><Link to="/user">Profile</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/messages">Messages</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/post">Post a new job</Link></Menu.Item>
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
  )
}

export default Sidebar;
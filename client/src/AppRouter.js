import React, { useContext, useEffect } from 'react';
import { Context } from './global/Store';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import AuthenticatedRoute from './AuthenticatedRoute';
import { Layout } from 'antd';

import Sidebar from './components/Sidebar';
import About from './components/About';
import Login from './components/Login';
import Messages from './components/Messages';
import OffersDashboard from './components/OffersDashboard';
import RequestsDashboard from './components/RequestsDashboard';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import JobForm from './components/JobForm';
import Job from './components/Job';
import OtherUserPage from './components/OtherUserPage/OtherUserPage';
import apiService from './apiService';

const { Header, Content, Footer } = Layout;

function AppRouter () {

  const [state, dispatch] = useContext(Context);

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

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%' }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ marginTop: 50, padding: 24, minHeight: 360 }}>
              <Switch>
                <AuthenticatedRoute path="/user" loggedIn={state.loggedIn} component={UserProfile} />
                <Route path="/profile/:id" component={OtherUserPage} />
                <Route path="/requests" component={RequestsDashboard} />
                <Route path="/offers" component={OffersDashboard} />
                <Route path="/about" component={About} />
                <AuthenticatedRoute path="/messages" loggedIn={state.loggedIn} component={Messages} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <AuthenticatedRoute path="/post" loggedIn={state.loggedIn} component={JobForm} />
                <Route path="/job/:id" component={Job} />
                <Route path="/" component={RequestsDashboard}></Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Goodwill Hunting</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default AppRouter;
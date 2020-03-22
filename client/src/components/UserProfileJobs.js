import React, { useContext, useEffect } from 'react';
import { Context } from '../global/Store';
import { Link } from 'react-router-dom';
import { Avatar, Card, Tabs, List } from 'antd';
import apiService from '../apiService';

function UserProfileJobs () {

  const [state, dispatch] = useContext(Context);
  const { TabPane } = Tabs;

  useEffect(() => {
    apiService.fetchListingsByUserId()
      .then(data => {
        dispatch({ type: 'SET-JOBS', payload: data })
      })
  }, []);

  const listings = jobs => {
    console.log(jobs);

    return (
      <List
        itemLayout="horizontal"
        dataSource={jobs}
        style={{
          height: '150px',
          'overflowY': 'scroll'
        }}
        renderItem={item => (
          <Link to="/job">
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          </Link>
        )}
      />
    )
  }

  return (
    <Card style={{ 'marginTop': '2vh', width: '60vw', height: '45vh' }} >
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Accepted" key="1">
          <Tabs defaultActiveKey="3" tabPosition="left">
            <TabPane tab="Ongoing" key="3">
              {listings(state.jobs)}
            </TabPane>
            <TabPane tab="Past" key="4">
              {listings(state.jobs)}
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Posted" key="2">
          <Tabs defaultActiveKey="5" tabPosition="left">
            <TabPane tab="Ongoing" key="5">
              {listings(state.jobs)}
            </TabPane>
            <TabPane tab="Past" key="6">
              {listings(state.jobs)}
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default UserProfileJobs;
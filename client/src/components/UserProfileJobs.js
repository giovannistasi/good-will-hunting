import React, { useContext, useEffect } from 'react';
import { Context } from '../global/Store';
import { Link } from 'react-router-dom';
import { Card, Tabs, List } from 'antd';
import apiService from '../apiService';

function UserProfileJobs () {

  const [state, dispatch] = useContext(Context);
  const { TabPane } = Tabs;

  useEffect(() => {
    apiService.fetchListingsAll()
      .then(jobs => {
        dispatch({ type: 'SET-JOBS', payload: jobs });
      })
  }, [])

  const listings = (jobs, status) => {
    console.log(jobs);

    let filteredJobs = jobs;
    switch (status) {
      case 'accepted ongoing':
        filteredJobs = filteredJobs.filter(job => {
          return (job.Volunteers.some(volunteer => volunteer.userId === state.userInfo.userId) && !job.completed)
        })
        break;
      case 'accepted past':
        filteredJobs = filteredJobs.filter(job => {
          return (job.Volunteers.some(volunteer => volunteer.userId === state.userInfo.userId) && job.completed)
        })
        break;
      case 'posted ongoing':
        filteredJobs = filteredJobs.filter(job => {
          return (job.Users[0].users_listings.UserUserId === state.userInfo.userId && !job.completed)
        })
        break;
      case 'posted past':
        filteredJobs = filteredJobs.filter(job => {
          return (job.Users[0].users_listings.UserUserId === state.userInfo.userId && job.completed)
        })
        break;
      default:
        break;
    }

    return (
      <List
        itemLayout="horizontal"
        dataSource={filteredJobs}
        style={{
          height: '200px',
          'overflowY': 'scroll',
        }}
        renderItem={item => (
          <Link to={'/job/' + item.listingId}>
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          </Link>
        )}
      />
    )
  }

  return (
    <Card style={{ marginTop: '2vh', width: '60vw', minHeight: '400px' }} >
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Accepted" key="1">
          <Tabs defaultActiveKey="3" tabPosition="left">
            <TabPane tab="Ongoing" key="3">
              {listings(state.jobs, 'accepted ongoing')}
            </TabPane>
            <TabPane tab="Past" key="4">
              {listings(state.jobs, 'accepted past')}
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Posted" key="2">
          <Tabs defaultActiveKey="5" tabPosition="left">
            <TabPane tab="Ongoing" key="5">
              {listings(state.jobs, 'posted ongoing')}
            </TabPane>
            <TabPane tab="Past" key="6">
              {listings(state.jobs, 'posted past')}
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default UserProfileJobs;
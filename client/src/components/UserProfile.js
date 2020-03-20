import React, { useEffect, useContext, useState } from 'react';
import { Card, Tabs, Avatar, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import apiService from '../apiService'
import { Context } from '../global/Store'
import moment from 'moment'
const { TabPane } = Tabs;

function UserProfile() {

  const [state, dispatch] = useContext(Context);
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    console.log(state);

    const fetched = apiService.fetchListings(state.userInfo)
    setJobs(fetched);

  }, []);

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  let listings = undefined

  if (jobs) {
    listings = (
      <List
        itemLayout="horizontal"
        dataSource={data}
        style={{
          height: '150px',
          'overflow-y': 'scroll'
        }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    )
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ 'margin-right': '2vh' }}>
          <Card hoverable="true" style={{ cursor: 'default', width: '60vw', height: '30vh' }}>
            <div style={{ display: 'flex' }}>
              <Avatar size={130} src={state.userInfo && state.userInfo.picture} />
              <div style={{ 'margin-left': '4vh' }}>
                <p>Name: {state.userInfo && state.userInfo.firstName + ' ' + state.userInfo.lastName}</p>
                <p>Skills: {state.userInfo && state.userInfo.Skills[0].skillName + ', ' + state.userInfo.Skills[1].skillName}</p>
                <p>Member since: {state.userInfo && moment(state.userInfo.createdAt).format('DD-mm-YYYY')}</p>
                <p>Credits: {state.userInfo && state.userInfo.credits}</p>
              </div>
            </div>
          </Card>
          <Card style={{ 'margin-top': '2vh', width: '60vw', height: '45vh' }} >
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Accepted" key="1">
                <Tabs defaultActiveKey="3" tabPosition="left">
                  <TabPane tab="Ongoing" key="3">
                    {listings}
                  </TabPane>
                  <TabPane tab="Past" key="4">
                    {listings}
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab="Posted" key="2">
                <Tabs defaultActiveKey="5" tabPosition="left">
                  <TabPane tab="Ongoing" key="5">
                    {listings}
                  </TabPane>
                  <TabPane tab="Past" key="6">
                    {listings}
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <Card style={{ width: '30vw', height: '77vh' }}>
          {/* <p>All my orders</p>
          <p>Pending shipments</p>
          <p>Pending payments</p>
          <p>Finished orders</p> */}
        </Card>
    </div>
    </div >

  )
}

export default UserProfile;
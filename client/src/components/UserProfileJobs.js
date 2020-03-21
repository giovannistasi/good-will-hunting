import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { Avatar, Card, Tabs, List } from 'antd';

function UserProfileJobs() {

  const [state, dispatch] = useContext(Context);
  const { TabPane } = Tabs;

  const listings = (
    <List
      itemLayout="horizontal"
      dataSource={state.jobs}
      style={{
        height: '150px',
        'overflowY': 'scroll'
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

  return (
    <Card style={{ 'marginTop': '2vh', width: '60vw', height: '45vh' }} >
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
  )
}

export default UserProfileJobs;
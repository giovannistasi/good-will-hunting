import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tabs, List } from 'antd';

function OtherUserPageJobs ({ jobs }) {

  const { TabPane } = Tabs;

  const listings = (
      <List
        itemLayout="horizontal"
        dataSource={jobs}
        style={{
          height: '30vh',
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

  return (
    <Card style={{ marginTop: '2vh', width: '60vw', minHeight: '400px' }} >
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

export default OtherUserPageJobs;
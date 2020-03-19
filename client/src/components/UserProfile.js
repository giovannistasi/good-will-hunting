import React from 'react';
import { Card, Tabs, Avatar, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './UserProfile.css'

const { TabPane } = Tabs;

function UserProfile() {

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
  const listings = (
    <div style={{ 'overflow-y': 'auto'}}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  )

  const listings2 = (
    <div style={{overflow: 'hidden'}}>

    </div>
  )


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ 'margin-right': '2vh' }}>
          <Card hoverable="true" style={{ cursor: 'default', width: '50vw', height: '30vh' }}>
            <div style={{ display: 'flex' }}>
              <Avatar size={130} icon={<UserOutlined />} />
              <div style={{ 'margin-left': '4vh' }}>
                <p>Name</p>
                <p>Skills</p>
                <p>Short bio</p>
              </div>
            </div>
          </Card>
          <Card style={{ 'margin-top': '2vh', width: '50vw', height: '45vh' }} >
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
                    Upcoming events
                  </TabPane>
                  <TabPane tab="Past" key="6">
                    Past events
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <Card style={{ width: '40vw', height: '77vh' }}>
          <p>All my orders</p>
          <p>Pending shipments</p>
          <p>Pending payments</p>
          <p>Finished orders</p>
        </Card>
      </div>
    </div>

  )
}

export default UserProfile;
import React from 'react';
import { Card, Tabs, Avatar, Collapse } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { TabPane } = Tabs;

function UserProfile() {
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
            <Tabs defaultActiveKey="1"  type="card">
              <TabPane tab="Accepted" key="1">
                <Tabs defaultActiveKey="3" tabPosition="left">
                  <TabPane tab="Ongoing" key="3">
                    Upcoming events
                  </TabPane>
                  <TabPane tab="Past" key="4">
                    Past events
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
import React, { useEffect, useContext } from 'react';
import { Card, Tabs, Avatar, List, Select } from 'antd';
import apiService from '../apiService';
import { Context } from '../global/Store';
import moment from 'moment';
import Cookies from 'universal-cookie';
const { TabPane } = Tabs;
const cookies = new Cookies();

const { Option } = Select;

function UserProfile() {

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    apiService.fetchListings()
      .then(data => dispatch({ type: 'SET-JOBS', payload: data }))
  }, []);

  const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];

  const listings = (
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

  const skills = ['cooking', 'gardening', 'plumbing', 'carpentry', 'stuff like that'];

  function selectSkill(skill) {
    console.log(skill);
    
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
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={selectSkill}
            placeholder="Select a skill"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              skills.map(skill => 
              <Option value={skill}>{skill}</Option>)
            }
          </Select>
        </Card>
      </div>
    </div >

  )
}

export default UserProfile;
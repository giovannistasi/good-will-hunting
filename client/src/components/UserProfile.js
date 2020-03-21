import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Tabs, Avatar, List, Select, Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import apiService from '../apiService';
import { Context } from '../global/Store';
import moment from 'moment';
const { TabPane } = Tabs;

const { Option } = Select;

function UserProfile () {

  const [state, dispatch] = useContext(Context);
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    apiService.fetchListingsByUserId()
      .then(data => dispatch({ type: 'SET-JOBS', payload: data }))
  }, []);

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

  function selectSkill (skill) {
    if (state.userSkills.length >= 9 || state.userSkills.includes(skill)) return;
    const newSkill = apiService.postUserSkill(skill)
    dispatch({ type: 'SET-USER-SKILLS', payload: [...state.userSkills, newSkill.skillName] })
  }

  const handleClose = removedSkill => {

    const skills = state.userSkills.filter(skill => skill !== removedSkill);
    dispatch({ type: 'SET-USER-SKILLS', payload: skills })
  };

  useEffect(() => {
    const input = document.querySelector(".skill-input") || null;
    if (input) {
      input.focus()
    } else {
      return;
    }
  }, [inputVisible]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let skills = state.userSkills;
    if (inputValue && skills.indexOf(inputValue) === -1) {
      skills = [...skills, inputValue];
    }
    dispatch({ type: 'SET-USER-SKILLS', payload: skills })
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ 'marginRight': '2vh' }}>
          <Card hoverable="true" style={{ cursor: 'default', width: '60vw', height: '30vh' }}>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Avatar size={130} src={state.userInfo && state.userInfo.picture} />
                <div style={{ 'marginLeft': '4vh' }}>
                  <p>Name: {state.userInfo && state.userInfo.firstName + ' ' + state.userInfo.lastName}</p>
                  <p>Skills: {state.userInfo && state.userInfo.Skills.length && state.userInfo.Skills[0].skillName + ', ' + state.userInfo.Skills[1].skillName}</p>
                  <p>Member since: {state.userInfo && moment(state.userInfo.createdAt).format('DD-mm-YYYY')}</p>
                  <p>Credits: {state.userInfo && state.userInfo.credits}</p>
                </div>
              </div>
              <Link to="/post"><Button type="primary">Create a new job</Button></Link>
            </div>

          </Card>
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
        </div>
        <Card style={{ width: '35vw', height: '77vh', 'margin-right': '2vh' }}>
          <h1 style={{ margin: '0px 0px 10px 0px' }} >Skills</h1>
          <Select
            showSearch
            style={{ width: '100%' }}
            onChange={selectSkill}
            placeholder="Select a skill"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              state.skills.map(skill =>
                <Option value={skill}>{skill}</Option>)
            }
          </Select>

          <br></br>
          <br></br>

          <div>
            {state.userSkills.map((skill, index) => {
              const isLongSkill = skill.length > 20;
              const skillElem = (
                <Tag style={{ 'margin': '2.5px 5px 2.5px 0px' }} key={skill} closable={index !== -1} onClose={() => handleClose(skill)}>
                  {isLongSkill ? `${skill.slice(0, 20)}...` : skill}
                </Tag>
              );
              return isLongSkill ? (
                <Tooltip title={skill} key={skill}>
                  {skillElem}
                </Tooltip>
              ) : (
                  skillElem
                );
            })}
            {inputVisible && (
              <Input
                className="skill-input"
                style={{ margin: '2.5px 5px 2.5px 0px', width: 78 }}
                type="text"
                size="small"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (state.userSkills.length <= 9) && (
              <Tag className="site-skill-plus" onClick={showInput}>
                <PlusOutlined /> New Skill
              </Tag>
            )}
          </div>
        </Card>
      </div>
    </div >

  )
}

export default UserProfile;
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../global/Store';
import { Card, Input, Select, Tag, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import apiService from '../apiService';


function UserProfileSkills () {

  const [state, dispatch] = useContext(Context);
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    apiService.fetchListingsByUserId()
      .then(data => {
        dispatch({ type: 'SET-JOBS', payload: data })
      })
    apiService.fetchSkillsByUserId()
      .then(data => {
        let skills = [];
        console.log(data);
        data.map(skill => skills.push(skill))
        dispatch({ type: 'SET-USER-SKILLS', payload: skills })
      })
  }, []);

  useEffect(() => {
    const input = document.querySelector(".skill-input") || null;
    if (input) {
      input.focus()
    } else {
      return;
    }
  }, [inputVisible])

  function selectSkill (skill) {
    if (state.userSkills.length >= 9 || state.userSkills.includes(skill)) return;
    apiService.postUserSkill(skill)
      .then((newSkill) => {
        dispatch({ type: 'SET-USER-SKILLS', payload: [...state.userSkills, newSkill.skillName] })
      })
  }

  const handleClose = removedSkill => {
    apiService.deleteSkillByUserId(removedSkill)
      .then(() => {
        const skills = state.userSkills.filter(skill => skill !== removedSkill);
        skills.map(skill => dispatch({ type: 'SET-USER-SKILLS', payload: [...state.userSkills, skill] }))
      })
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    console.log(state);
    let skills = state.userSkills;
    if (inputValue && skills.indexOf(inputValue) === -1) {
      apiService.postUserSkill(inputValue).then((newSkill) => {
        dispatch({ type: 'SET-USER-SKILLS', payload: [...state.userSkills, newSkill] })
      })
    }
    
    setInputVisible(false);
    setInputValue('');
  };
  console.log(state.userSkills);

  return (
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
          if (skill) {
            const isLongSkill = skill.skillName.length > 20;
            const skillElem = (
              <Tag style={{ 'margin': '2.5px 5px 2.5px 0px' }} key={skill.skillId} closable={index !== -1} onClose={() => handleClose(skill)}>
                {isLongSkill ? `${skill.skillName.slice(0, 20)}...` : skill.skillName}
              </Tag>
            );
            return isLongSkill ? (
              <Tooltip title={skill.skillName} key={skill.skillId}>
                {skillElem}
              </Tooltip>
            ) : (
                skillElem
              );
          }
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
  )
}

export default UserProfileSkills;
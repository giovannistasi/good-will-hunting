import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../global/Store';
import { Card, Input, Select, Tag, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import apiService from '../apiService';


function UserProfileSkills() {

  const [state, dispatch] = useContext(Context);
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    apiService.fetchListingsByUserId()
      .then(data => {
        dispatch({ type: 'SET-JOBS', payload: data })
      })
  }, []);

  function selectSkill(skill) {
    if (state.userSkills.length >= 9 || state.userSkills.includes(skill)) return;
    dispatch({ type: 'SET-USER-SKILLS', payload: [...state.userSkills, skill] })
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
  )
}

export default UserProfileSkills;
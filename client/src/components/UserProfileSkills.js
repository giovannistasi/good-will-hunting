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
    apiService.postUserSkill(skill).then((newSkill) => {
      dispatch({ type: 'SET-USER-SKILLS', payload: [...state.userSkills, newSkill] })
      dispatch({ type: 'SET-SKILLS', payload: [...state.skills, newSkill] })
    })
  }

  const deleteSkill = removedSkill => {
    console.log(removedSkill);
    apiService.deleteSkillById(removedSkill).then(() => {
      const skills = state.userSkills.filter(skill => skill.skillId !== removedSkill.skillId);
      dispatch({ type: 'SET-USER-SKILLS', payload: [...state.userSkills] })
      dispatch({ type: 'SET-SKILLS', payload: skills })
    })
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const createNewSkill = () => {
    let skills = state.userSkills;
    if (inputValue && skills.indexOf(inputValue) === -1) {
      apiService.postUserSkill(inputValue).then((newSkill) => {
        dispatch({ type: 'SET-USER-SKILLS', payload: [...state.userSkills, newSkill] })
      })
    }

    setInputVisible(false);
    setInputValue('');
  };

  return (
    <Card style={{ width: '35vw', minHeight: '600px', 'marginRight': '2vh' }}>
      <h1 style={{ margin: '0px 0px 10px 0px' }} >Skills</h1>
      <Select
        showSearch
        style={{ width: '100%' }}
        onChange={selectSkill}
        placeholder="Select existing skill"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {
          state.skills.map(skill =>
            <Option key={skill.skillId} value={skill.skillName}>{skill.skillName}</Option>)
        }
      </Select>

      <br></br>
      <br></br>

      <div>
        {state.userSkills.map((skill, index) => {
          if (skill) {
            const isLongSkill = skill.length > 20;
            const skillElem = (
              <Tag style={{ 'margin': '2.5px 5px 2.5px 0px', display: 'block', textAlign: 'center', width: 'fit-content' }} key={skill.skillId} closable={index !== -1} onClose={() => deleteSkill(skill)}>
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
            onBlur={createNewSkill}
            onPressEnter={createNewSkill}
          />
        )}
        {!inputVisible && (state.userSkills.length <= 9) && (
          <Tag className="site-skill-plus" onClick={showInput}>
            <PlusOutlined /> Create New Skill
          </Tag>
        )}
      </div>
    </Card>
  )
}

export default UserProfileSkills;
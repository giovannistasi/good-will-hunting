import React from 'react';
import { Card, Tag, Tooltip } from 'antd';

function OtherUserPageSkills ({ skills }) {

  return (
    <Card style={{ textAlign: 'center', width: '35vw', minHeight: '600px', 'marginRight': '2vh' }}>
      <h1 style={{ margin: '0px 0px 10px 0px' }} >Skills</h1>

      <div>
        {skills && skills.map((skill) => {
          if (skill) {
            const isLongSkill = skill.length > 20;
            const skillElem = (
              <Tag style={{ 'margin': '2.5px 5px 2.5px 0px', display: 'block', textAlign: 'center', width: 'fit-content' }} key={skill.skillId}>
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
          }}
        )}
      </div>
    </Card>
  )
}

export default OtherUserPageSkills;
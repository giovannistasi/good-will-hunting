import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { Link } from 'react-router-dom';
import { Button, Card, Avatar } from 'antd';
import moment from 'moment';


function UserProfileBio() {

  const [state, dispatch] = useContext(Context);

  return (
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
  )
}

export default UserProfileBio;
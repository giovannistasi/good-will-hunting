import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { Link } from 'react-router-dom';
import { Button, Card, Avatar, Typography } from 'antd';
import moment from 'moment';

function UserProfileBio () {

  const [state, dispatch] = useContext(Context);
  const { Paragraph } = Typography;

  const onChangeName = name => {
    console.log('Content change:', name);
    //TODO: dispatch and change name in db
  }


  return (
    <Card hoverable="true" style={{ cursor: 'default', width: '60vw', height: '30vh' }}>
      <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <Avatar size={130} src={state.userInfo && state.userInfo.picture} />
          <div style={{ 'marginLeft': '4vh' }}>
            Name:<Paragraph editable={{ onChange: onChangeName }}> {state.userInfo && state.userInfo.firstName + ' ' + state.userInfo.lastName}</Paragraph>
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
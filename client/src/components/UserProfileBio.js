import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { Link } from 'react-router-dom';
import { Button, Card, Avatar, Typography, Skeleton } from 'antd';
import moment from 'moment';

function UserProfileBio () {

  const [state] = useContext(Context);
  const { Paragraph } = Typography;

  const changeBio = bio => {
    console.log('Content change:', bio);
    //TODO: dispatch and change bio in db
  }


  return (
    <Card hoverable="true" style={{ cursor: 'default', width: '60vw', height: '30vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {state.userInfo ?
          <div style={{ display: 'flex' }}>
            <Avatar size={100} src={state.userInfo && state.userInfo.picture} />
            <div style={{ 'marginLeft': '4vh' }}>
              Name: {state.userInfo && state.userInfo.firstName + ' ' + state.userInfo.lastName}
              <div>Bio: <Paragraph editable={{ onChange: changeBio }}>Write something about yourself</Paragraph></div>
              <div>Member since: {state.userInfo && moment(state.userInfo.createdAt).format('MMMM Do YYYY')}</div>
              <div>Credits: {state.userInfo && state.userInfo.credits}</div>
            </div>
          </div> :
          <Skeleton avatar paragraph={{ rows: 4 }} />
        }
        <Link to="/post"><Button type="primary">Create a new job</Button></Link>
      </div>

    </Card>
  )
}

export default UserProfileBio;
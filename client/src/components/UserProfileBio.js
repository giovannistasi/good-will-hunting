import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { Link } from 'react-router-dom';
import { Button, Card, Avatar, Typography, Skeleton } from 'antd';
import moment from 'moment';

function UserProfileBio () {

  const [state, dispatch] = useContext(Context);
  const { Paragraph } = Typography;

  const changeBio = bio => {
    console.log('Content change:', bio);
    //TODO: dispatch and change bio in db
  }


  return (
    <Card hoverable="true" style={{ cursor: 'default', width: '60vw', height: '30vh' }}>
      <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
        {state.userInfo ?
          <div style={{ display: 'flex' }}>
            <Avatar size={100} src={state.userInfo && state.userInfo.picture} />
            <div style={{ 'marginLeft': '4vh' }}>
              Name: {state.userInfo && state.userInfo.firstName + ' ' + state.userInfo.lastName}
              <p>Bio: <Paragraph editable={{ onChange: changeBio }}>Write something about yourself</Paragraph></p>
              <p>Member since: {state.userInfo && moment(state.userInfo.createdAt).format('DD-mm-YYYY')}</p>
              <p>Credits: {state.userInfo && state.userInfo.credits}</p>
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
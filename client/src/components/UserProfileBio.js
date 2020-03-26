import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { Link } from 'react-router-dom';
import { Button, Card, Avatar } from 'antd';
import moment from 'moment';

function UserProfileBio () {

  const [state] = useContext(Context);
  // const { Paragraph } = Typography;

  // const changeBio = bio => {
  //   //TODO: dispatch and change bio in db
  // }


  return (
    <Card hoverable="true" style={{ cursor: 'default', width: '60vw', height: '200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <Avatar size={100} src={state.userInfo && state.userInfo.picture} />
            <div style={{ 'marginLeft': '40px' }}>
              <p style={{fontFamily: "'Ubuntu', 'sans-serif'"}}><b>Name:</b> {state.userInfo && state.userInfo.firstName + ' ' + state.userInfo.lastName}</p>
              {/* <div style={{display: 'flex', fontFamily: "'Ubuntu', 'sans-serif'"}}><b style={{marginRight: '4px'}}>Bio:</b> <Paragraph editable={{ onChange: changeBio }}>Write something about yourself</Paragraph></div> */}
              <p style={{fontFamily: "'Ubuntu', 'sans-serif'"}}><b style={{marginRight: '5px'}}>Member since:</b>{state.userInfo && moment(state.userInfo.createdAt).format('MMMM Do YYYY')}</p>
              <p style={{fontFamily: "'Ubuntu', 'sans-serif'"}}><b style={{marginRight: '5px'}}>Credits:</b> {state.userInfo && state.userInfo.credits}</p>
            </div>
          </div> 
        <Link to="/post"><Button type="primary">Create a new job</Button></Link>
      </div>

    </Card>
  )
}

export default UserProfileBio;
import React, { useContext } from 'react';
import { Card, Avatar, Skeleton } from 'antd';
import moment from 'moment';

function OtherUserPageBio ({ userInfo }) {

  return (
    <Card hoverable="true" style={{ cursor: 'default', width: '60vw', height: '30vh' }}>
      <div style={{ display: 'flex' }}>
        <Avatar size={100} src={userInfo && userInfo.picture} />
        <div style={{ 'marginLeft': '40px' }}>
          <p style={{ fontFamily: "'Ubuntu', 'sans-serif'" }}><b>Name:</b> {userInfo && userInfo.firstName + ' ' + userInfo.lastName}</p>
 
          <p style={{ fontFamily: "'Ubuntu', 'sans-serif'" }}><b style={{ marginRight: '5px' }}>Member since:</b>{userInfo && moment(userInfo.createdAt).format('MMMM Do YYYY')}</p>
          <p style={{ fontFamily: "'Ubuntu', 'sans-serif'" }}><b style={{ marginRight: '5px' }}>Credits:</b> {userInfo && userInfo.credits}</p>
        </div>
      </div>
    </Card>
  )
}

export default OtherUserPageBio;
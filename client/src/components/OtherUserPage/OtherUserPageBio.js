import React, { useContext } from 'react';
import { Card, Avatar, Skeleton } from 'antd';
import moment from 'moment';

function OtherUserPageBio ({ userInfo }) {

  return (
    <Card hoverable="true" style={{ cursor: 'default', width: '60vw', height: '30vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {userInfo ?
          <div style={{ display: 'flex' }}>
            <Avatar size={100} src={userInfo && userInfo.picture} />
            <div style={{ 'marginLeft': '40px' }}>
              Name: {userInfo && userInfo.firstName + ' ' + userInfo.lastName}
              <div>Bio: {userInfo && userInfo.bio}</div>
              <div>Member since: {userInfo && moment(userInfo.createdAt).format('MMMM Do YYYY')}</div>
              <div>Credits: {userInfo && userInfo.credits}</div>
            </div>
          </div> :
          <Skeleton avatar paragraph={{ rows: 4 }} />
        }
      </div>
    </Card>
  )
}

export default OtherUserPageBio;
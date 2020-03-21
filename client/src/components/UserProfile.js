import React from 'react';

import UserProfileBio from './UserProfileBio';
import UserProfileJobs from './UserProfileJobs';
import UserProfileSkills from './UserProfileSkills';

function UserProfile() {

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ 'marginRight': '2vh' }}>
          <UserProfileBio />
          <UserProfileJobs />
        </div>
        <UserProfileSkills />
      </div>
    </div >

  )
}

export default UserProfile;
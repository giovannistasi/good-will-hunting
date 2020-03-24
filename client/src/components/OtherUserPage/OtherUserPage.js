import React, { useContext, useState } from 'react';
import { Context } from '../../global/Store';
import { useLocation, useParams, Redirect } from 'react-router-dom';

import OtherUserPageBio from './OtherUserPageBio';
import OtherUserPageJobs from './OtherUserPageJobs';
import OtherUserPageSkills from './OtherUserPageSkills';
import apiService from '../../apiService';

function OtherUserPage () {

  const [state] = useContext(Context);
  const [ownProfile, setOwnProfile] = useState(false);
  const [user, setUser] = useState({});
  const location = useLocation();

  const { id } = useParams();

  React.useEffect(() => {
    apiService.getUserById(id)
      .then(user => {
        console.log(user);
        setUser(user);
      })
  }, [])

  React.useEffect(() => {
    if (state.userInfo.userId === id)
      setOwnProfile(true);
    // console.log(location.state.user);
  }, [id, state, location]);

  return ownProfile ? <Redirect to={'/user'} /> : (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '2vh' }}>
          <OtherUserPageBio userInfo={user} />
          <OtherUserPageJobs jobs={user.Listings} />
        </div>
        <OtherUserPageSkills skills={user.Skills} />
      </div>
    </div >
  )
}

export default OtherUserPage;
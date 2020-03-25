import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../global/Store';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Avatar, Checkbox } from 'antd';
import Icon from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faHandshake, faUndo } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import apiService from '../apiService';
import SimpleMap from './Map';

const { Meta } = Card;

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const createIcon = icon => {
  return function (props) {
    return (
      <Icon component={() => (
        <FontAwesomeIcon icon={icon} />
      )} {...props} />)
  }
}

function Job () {

  const [volunteers, setVolunteers] = useState([]);
  const [hasVolunteered, setHasVolunteered] = useState(false);

  const { id } = useParams();
  const [state, dispatch] = useContext(Context);
  const job = state.jobs.find(job => job.listingId === id);
  const userId = state.userInfo.userId

  let userPic = '';
  let creditValue;
  let confirmedCompleteArr = [];
  let isUsersJob = false;
  if (job) {
    userPic = job.Users[0].picture
    isUsersJob = state.userInfo.userId === job.Users[0].userId
    creditValue = job.creditValue;
  }


  useEffect(() => {
    apiService.fetchListingsAll().then(jobs => {
      dispatch({ type: 'SET-JOBS', payload: jobs });
    });
  }, []);

  useEffect(() => {
    if (job) {
      setVolunteers(job.Volunteers);
      if (job.Volunteers.some(volunteer => volunteer.userId === state.userInfo.userId))
        setHasVolunteered(true);
    }
  }, [state])

  const description = () => {
    if (job) return (
      <div>
        <div>{job.description}</div>
        <br />
        <div>{moment(job.eventTime).format('MMMM Do YYYY h:mm a')}</div>
      </div>
    )
  }

  function onCheck (e) {
    if (e.target.checked) {
      confirmedCompleteArr.push(e.target.userId);
    } else {
      confirmedCompleteArr = confirmedCompleteArr.filter(el => el !== e.target.userId)
    }
  }

  function handleConfirmed () {
    apiService.creditExchange(confirmedCompleteArr, userId, creditValue, id)
  }

  async function volunteer () {
    await apiService.volunteer(id);
    setHasVolunteered(!hasVolunteered)
    apiService.fetchListingsAll()
      .then(jobs => {
        dispatch({ type: 'SET-JOBS', payload: jobs });
      })
  }


  return job ?
    (
      <div style={{ display: 'flex' }}>
        <Card
          style={{ width: '40vw', marginRight: '3vw' }}
          cover={
            <div style={{ height: '40vh', width: '40vw' }}>
              <SimpleMap center={{ lat: parseFloat(job.latitude), lng: parseFloat(job.longitude) }} />
            </div>
          }
          actions={[
            <Button style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={createIcon(faCoins)} text={`${job.creditValue} credits`} key="list-vertical-credits" /></Button>,
            <Button style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={UsergroupAddOutlined} text={`${job.maxParticipants} spots available`} key="list-vertical-avaliable-spots" /></Button>,
            <div>
              {hasVolunteered ?
                <Button onClick={volunteer} style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={createIcon(faUndo)} text={`Unvolunteer`} key="list-vertical-volunteer" /></Button> :
                <Button onClick={volunteer} disabled={!job.maxParticipants || isUsersJob} style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={createIcon(faHandshake)} text={`Volunteer`} key="list-vertical-volunteer" /></Button>}
            </div>,
          ]}
        >
          <Meta
            avatar={<Avatar src={userPic} />}
            title={job.title}
            description={description()}
          />
        </Card>
        {isUsersJob ?
          <Card style={{ width: '18vw' }}>
            <h1>Participants</h1>
            {volunteers && volunteers.map(volunteer => {
              return <div><Checkbox userId={volunteer.userId} onChange={onCheck}><Link to={'/profile/' + volunteer.userId}>{volunteer.firstName + ' ' + volunteer.lastName}</Link></Checkbox></div>
            })}
            <br />
            <Button onClick={handleConfirmed} style={{ border: 'none', backgroundColor: 'inherit' }}>Confirm</Button>
          </Card>
          :
          <Card style={{ width: '18vw' }}>
            <h1>Participants</h1>
            {volunteers && volunteers.map(volunteer => {
              return <div><Link to={'/profile/' + volunteer.userId}>{volunteer.firstName + ' ' + volunteer.lastName}</Link></div>
            })}
          </Card>}
      </div>
    ) : null;
}

export default Job;

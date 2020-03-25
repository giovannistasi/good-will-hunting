import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../global/Store';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Checkbox } from 'antd';
import Icon from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import apiService from '../apiService';

const { Meta } = Card;

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const HelpOfferIcon = props => <Icon component={() => (
  <FontAwesomeIcon icon={faHandsHelping} />
)} {...props} />;

const CreditsIcon = props => <Icon component={() => (
  <FontAwesomeIcon icon={faCoins} />
)} {...props} />;

function Job () {

  const [volunteers, setVolunteers] = useState([]);

  const { id } = useParams();
  const [state, dispatch] = useContext(Context);
  const job = state.jobs.find(job => job.listingId === id);
  const userId = state.userInfo.userId
  let creditValue;
  let confirmedCompleteArr = [];
  let isUsersJob = false;
  if (job) {
    isUsersJob = state.userInfo.userId === job.Users[0].userId
    creditValue = job.creditValue;
  }


  useEffect(() => {
    apiService.fetchListingsAll()
      .then(jobs => {
        dispatch({ type: 'SET-JOBS', payload: jobs });
      })
  }, [])

  useEffect(() => {
    if (job) {
      const listingVolunteers = job.Volunteers;
      setVolunteers(listingVolunteers);
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
    console.log(e.target.userId);
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

    apiService.fetchListingsAll()
      .then(jobs => {
        dispatch({ type: 'SET-JOBS', payload: jobs });
      })
  }

  return job ?
    (
      <div style={{ display: 'flex' }}>
        <Card
          style={{ width: '50vw', marginRight: '3vw' }}
          cover={
            <img
              alt="example"
              src="https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png"
            />
          }
          actions={[
            <IconText icon={CreditsIcon} text={`${job.creditValue} credits`} key="list-vertical-credits" />,
            <IconText icon={UsergroupAddOutlined} text={`${job.maxParticipants} spots available`} key="list-vertical-avaliable-spots" />,
            <Button onClick={volunteer} /* disabled={!job.maxParticipants} */ style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={HelpOfferIcon} text={`Volunteer`} key="list-vertical-volunteer" /></Button>,
          ]}
        >
          <Meta
            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
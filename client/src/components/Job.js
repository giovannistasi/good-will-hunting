import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../global/Store';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'antd';
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
        <br></br>
        <div>{moment(job.eventTime).format('MMMM Do YYYY h:mm a')}</div>
      </div>
    )
  }

  function clickCredits () {
    console.log(job);
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
          style={{ width: '40vw', marginRight: '3vw' }}
          cover={
            <img
              alt="example"
              src="https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png"
            />
          }
          actions={[
            <Button onClick={clickCredits} style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={CreditsIcon} text={`${job.creditValue} credits`} key="list-vertical-credits" /></Button>,
            <Button onClick={clickCredits} style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={UsergroupAddOutlined} text={`${job.maxParticipants} spots available`} key="list-vertical-avaliable-spots" /></Button>,
            <Button onClick={volunteer} disabled={!job.maxParticipants} style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={HelpOfferIcon} text={`Volunteer`} key="list-vertical-volunteer" /></Button>,
          ]}
        >
          <Meta
            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={job.title}
            description={description()}
          />
        </Card>
        <Card style={{ width: '18vw' }}>
          <h1>Participants</h1>
          {volunteers && volunteers.map(volunteer => {
            return <div><Link to={'/profile/' + volunteer.userId}>{volunteer.firstName + ' ' + volunteer.lastName}</Link></div>
          })}
        </Card>
      </div>
    ) : null;
}

export default Job;
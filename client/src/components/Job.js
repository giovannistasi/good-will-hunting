import React, { useContext, useEffect } from 'react';
import { Context } from '../global/Store';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'antd';
import Icon from '@ant-design/icons';
import { UsergroupAddOutlined, EditOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
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

const CreditsIcon = props => (
  <Icon component={() => <FontAwesomeIcon icon={faCoins} />} {...props} />
);

function Job() {
  const { id } = useParams();
  const [state, dispatch] = useContext(Context);
  const job = state.jobs.find(job => job.listingId === id);

  useEffect(() => {
    apiService.fetchListingsAll().then(jobs => {
      dispatch({ type: 'SET-JOBS', payload: jobs });
    });
  }, []);

  const description = () => {
    if (job)
      return (
        <div>
          <div>{job.description}</div>
          <br></br>
          <div>{moment(job.eventTime).format('MMMM Do YYYY h:mm a')}</div>
        </div>
      );
  };

  function clickCredits() {
    console.log('click');
  }

  function volunteer() {
    apiService.volunteer(id).then(
      apiService
        .fetchListingsAll()
        .then(jobs => {
          dispatch({ type: 'SET-JOBS', payload: jobs });
        })
        .then(() => {
          const listingVolunteers = state.jobs.find(job => job.listingId === id)
            .Volunteers;
          console.log(state.jobs.find(job => job.listingId === id));
          console.log(listingVolunteers);
        }),
    );
  }

  return job ? (
    <div>
      <Card
        style={{ width: '40vw' }}
        cover={
          <div>
            <SimpleMap />
          </div>
        }
        actions={[
          <Button
            onClick={clickCredits}
            style={{ border: 'none', backgroundColor: 'inherit' }}
          >
            <IconText
              icon={CreditsIcon}
              text={`${job.creditValue} credits`}
              key="list-vertical-credits"
              onClick={clickCredits}
            />
          </Button>,
          <Button
            onClick={clickCredits}
            style={{ border: 'none', backgroundColor: 'inherit' }}
          >
            <IconText
              icon={UsergroupAddOutlined}
              text={`${job.maxParticipants} spots available`}
              key="list-vertical-avaliable-spots"
            />
          </Button>, // TODO: logic to change button when job.maxParticipants === state.jobs.find(job => job.listingId === id).Volunteers.length
          <Button
            onClick={volunteer}
            style={{ border: 'none', backgroundColor: 'inherit' }}
          >
            Volunteer
          </Button>,
        ]}
      >
        <Meta
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={job.title}
          description={description()}
        />
      </Card>
    </div>
  ) : null;
}

export default Job;

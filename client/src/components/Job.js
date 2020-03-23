import React, { useContext, useEffect } from 'react';
import { Context } from '../global/Store';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'antd';
import Icon from '@ant-design/icons';
import { UsergroupAddOutlined, EditOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import apiService from '../apiService';

const { Meta } = Card;

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const CreditsIcon = props => <Icon component={() => (
  <FontAwesomeIcon icon={faCoins} />
)} {...props} />;



function Job () {

  const { id } = useParams();
  const [state, dispatch] = useContext(Context);
  const job = state.jobs.find(job => job.listingId === id);

  useEffect(() => {
    apiService.fetchListingsAll()
      .then(jobs => {
        dispatch({ type: 'SET-JOBS', payload: jobs });
      })
  }, [])

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
    console.log('click');
  }

  return job ?
    (

      <div>
        <Card
          style={{ width: '40vw' }}
          cover={
              <img
                alt="example"
                src="https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png"
              />
          }
          actions={[
            <Button onClick={clickCredits} style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={CreditsIcon} text={`${job.creditValue} credits`} key="list-vertical-credits" onClick={clickCredits} /></Button>,
            <Button onClick={clickCredits} style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={UsergroupAddOutlined} text={`${job.maxParticipants} spots available`} key="list-vertical-avaliable-spots" /></Button>,
            <Button onClick={clickCredits} style={{ border: 'none', backgroundColor: 'inherit' }}><EditOutlined key="edit" onClick={clickCredits} /></Button>,
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
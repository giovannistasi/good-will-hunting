import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { useParams } from 'react-router-dom';
import moment from 'moment'

function Job () {

  const { id } = useParams();
  const [state] = useContext(Context);
  const job = state.jobs.find(job => job.listingId === id);
<<<<<<< HEAD
  return job ?
    (
      <div>
        <div><i>This is listing {id}</i></div>
        <h2>{job.title}</h2>
        <div>{job.description}</div>
        <div>{moment(job.eventTime).format('MMMM Do YYYY h:mm a')}</div>
        <div>{job.address}</div>
        <div>{job.creditValue}</div>
        <div>{job.maxParticipants}</div>
      </div>
    ) : null;
=======
  console.log(job);

  return (
    <div>
      <div><i>This is listing {id}</i></div>
      <h2>{job.title}</h2>
      <div>{job.description}</div>
      <div>{moment(job.eventTime).format('MMMM Do YYYY h:mm:ss a')}</div>
      <div>{job.address}</div>
      <div>{job.creditValue}</div>
      <div>{job.maxParticipants}</div>
    </div>
  )
>>>>>>> 53a6feeef31463f03b2cfe22fb803770893b1eb2
}

export default Job;
import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { useParams } from 'react-router-dom';
import moment from 'moment'

function Job () {

  const { id } = useParams();
  const [state] = useContext(Context);
  const job = state.jobs.find(job => job.listingId === id);
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
}

export default Job;
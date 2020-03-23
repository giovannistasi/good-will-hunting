import React, { useContext, useEffect } from 'react';
import { Context } from '../global/Store';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import apiService from '../apiService';

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
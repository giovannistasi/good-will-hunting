import React, { useContext } from 'react';
import { Context } from '../global/Store';
import { useParams } from 'react-router-dom';

function Job () {

  const { id } = useParams();
  const [state, dispatch] = useContext(Context);
  const job = state.jobs.find(job => job.listingId === id);
  
  return (
    <div>
      <div>This is listing {id} </div> 
      <div>{job.description}</div>
    </div>
  )
}

export default Job;
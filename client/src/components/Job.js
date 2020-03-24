import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../global/Store';
import { useParams } from 'react-router-dom';
import { Card, Button, Checkbox } from 'antd';
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
  const CheckboxGroup = Checkbox.Group;
  const [volunteers, setVolunteers] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)


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

  function volunteer () {
    apiService.volunteer(id).then(
      apiService.fetchListingsAll()
        .then(jobs => {
          dispatch({ type: 'SET-JOBS', payload: jobs });
        }).then(() => {
          const listingVolunteers = state.jobs.find(job => job.listingId === id).Volunteers
          setVolunteers(listingVolunteers);
          console.log(volunteers);

          console.log(state.jobs.find(job => job.listingId === id));
          console.log(listingVolunteers);
        })
    )
  }

  const onChange = (checkedList) => {
    // setIndeterminate(!!checkedList.length && (checkedList.length < volunteers.length))
    setCheckAll(checkedList.length === volunteers.length)
  }

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? volunteers : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
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
            <Button onClick={clickCredits} style={{ border: 'none', backgroundColor: 'inherit' }}><IconText icon={UsergroupAddOutlined} text={`${job.maxParticipants - volunteers.length} spots available`} key="list-vertical-avaliable-spots" /></Button>, // TODO: logic to change button when job.maxParticipants === state.jobs.find(job => job.listingId === id).Volunteers.length
            <Button onClick={volunteer} style={{ border: 'none', backgroundColor: 'inherit' }}>Volunteer</Button>,
          ]}

        >
          <Meta
            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={job.title}
            description={description()}
          />
        </Card>
        <div>
          <div style={{ borderBottom: '1px solid #E9E9E9' }}>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Check all
          </Checkbox>
          </div>
          <br />
          <CheckboxGroup options={volunteers && volunteers} value={checkedList} onChange={onChange} />
        </div>
      </div>
    ) : null;
}

export default Job;
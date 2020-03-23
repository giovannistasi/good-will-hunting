import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import apiService from '../apiService';


let listData = [];
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: '/job/',
//     title: `Request #${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//     content:
//       'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   });
// }

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const CreditsIcon = props => <Icon component={() => (
  <FontAwesomeIcon icon={faCoins} />
)} {...props} />;

function RequestsDashboard () {

  useEffect(() => {
    apiService.fetchListingsAll()
      .then(jobs => {
        // jobs.forEach(job => listData.push(job))
        listData = jobs;
      })

  }, [])

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 4,
      }}
      dataSource={listData}

      renderItem={item => (
        <Link to={'/job/' + item.listingId}>
          <List.Item
            style={{color: 'black', 'text-decoration': 'none'}}
            key={item.title}
            actions={[
              <IconText icon={CreditsIcon} text={`${item.creditValue} credits`} key="list-vertical-credits" />,
              <IconText icon={UsergroupAddOutlined} text={`${item.maxParticipants} spots available`} key="list-vertical-avaliable-spots" />,
            ]}
            extra={
              <img
                width={250}
                alt="logo"
                src="https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.Users[0].picture} />}
              title={<h1><a href={item.href}>{item.title}</a></h1>}
              description={`Posted by ${item.Users[0].firstName} ${item.Users[0].lastName}`}
            />
            {item.description}
            {/* TODO: add button to volunteer for job */}
          </List.Item>
        </Link>
      )}
    />
  );
}

export default RequestsDashboard;
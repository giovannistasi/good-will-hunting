import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import apiService from '../apiService';


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

  const [listData, setListData] = useState([]);

  useEffect(() => {
    apiService.fetchListingsAll()
      .then(jobs => {
        setListData(jobs);
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
            style={{ color: 'black', textDecoration: 'none' }}
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
              avatar={<Avatar src={item.Users[0] && item.Users[0].picture} />}
              title={item.title}
              description={`Posted by ${item.Users[0] && item.Users[0].firstName} ${item.Users[0] && item.Users[0].lastName}`}
            />
            {item.description}
          </List.Item>
        </Link>
      )}
    />
  );
}

export default RequestsDashboard;
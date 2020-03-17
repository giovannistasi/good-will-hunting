import React from 'react';
import { List, Avatar } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'



const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: '/listing',
    title: `Request #${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Looking for someone who can center divs in CSS.',
    content:
      'I am the owner of a coding bootcamp in Europe, but I don\'t know how to code. I\'m looking for someone to do the dirty work for me and center the divs on my website. This is additional text that serves no purpose other than taking up some space. Hit me up if interested',
  });
}

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const CreditsIcon = props => <Icon component={() => (
  <FontAwesomeIcon icon={faCoins} />
)} {...props} />;

function RequestsDashboard() {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={listData}
      footer={
        <div>
          <b>Something</b> something else
      </div>
      }
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={CreditsIcon} text="200 credits" key="list-vertical-credits" />,
            <IconText icon={UsergroupAddOutlined} text="2 spots available" key="list-vertical-avaliable-spots" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}

export default RequestsDashboard;
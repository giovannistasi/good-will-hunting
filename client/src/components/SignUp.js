import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

function SignUp () {

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadPicture = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
  };

  const cloudRequest = e => {
    const formData = new FormData();
    formData.append('upload_preset', 'xv3k736w');
    formData.append('file', e.file);
    fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const onFinish = values => {
    const { firstName, lastName, email, password, password2, address } = values;
    const signUpData = {
      firstName,
      lastName,
      email,
      password,
      password2,
      address,
      picture: imageUrl
    }
    fetch(`http://localhost:8080/register`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        {...layout}
        onFinish={onFinish}
      >
        <Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last name">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter a password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="password2"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Address">
          <Input />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Profile picture"
        >
          <Upload
            name="avatar"
            customRequest={cloudRequest}
            accept=".png, .jpg"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={uploadPicture}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp;
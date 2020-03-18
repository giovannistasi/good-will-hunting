import React from 'react';
import {
  Form,
  Input,
  Button,
  Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function SignUp() {
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        {...layout}
      >
        <Form.Item label="First name">
          <Input />
        </Form.Item>
        <Form.Item label="Last name">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Password2"
          name="password2"
          rules={[{ required: true, message: 'Please input your second password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Address">
          <Input />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Profile picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button>
              <UploadOutlined /> Click to upload
          </Button>
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
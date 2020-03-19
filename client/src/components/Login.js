import React from 'react';
import { message, Form, Input, Button, Checkbox } from 'antd';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 10,
  },
};

const onFinish = async values => {
  await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    body: JSON.stringify({ email: values.email, password: values.password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong with your fetch');
      }
    })
    .then((json) => {
      json.message && message.warning(`${json.message}`, 5)
    })
};

const onFinishFailed = errorInfo => {
  console.error('Failed:', errorInfo);
};

function Login () {
  return (
    <form action="http://localhost:8000/login" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
    // <Form
    //   {...layout}
    //   name="basic"
    //   initialValues={{
    //     remember: true,
    //   }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    // >
    //   <Form.Item
    //     label="Email"
    //     name="email"
    //     rules={[
    //       {
    //         type: 'email',
    //         required: true,
    //         message: 'Please input your email!',
    //       },
    //     ]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="Password"
    //     name="password"
    //     rules={[
    //       {
    //         required: true,
    //         message: 'Please input your password',
    //       },
    //     ]}
    //   >
    //     <Input.Password />
    //   </Form.Item>

    //   <Form.Item {...tailLayout} name="remember" valuePropName="checked">
    //     <Checkbox>Remember me</Checkbox>
    //   </Form.Item>

    //   <Form.Item {...tailLayout}>
    //     <Button type="primary" htmlType="submit">
    //       Log in
    //     </Button>
    //   </Form.Item>
    // </Form>
  )
}

export default Login;
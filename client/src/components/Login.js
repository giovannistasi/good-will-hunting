import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { Context } from '../global/Store'
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

function Login () {

  const [state, dispatch] = useContext(Context);

  const onFinish = async values => {
    await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify({ email: values.email, password: values.password })
    })
      .then(async (res) => {
        if (res.ok) {
          let user = await res.json()
          if (user.userId) {
            // message.success('You are now logged in')
            dispatch({ type: 'LOGIN', payload: { loggedIn: true, userInfo: user } });
          }
          return user
        } else {
          throw new Error('Something went wrong with your fetch');
        }
      })
      .then((msg) => {
        msg.message && message.warning(`${msg.message}`, 5)
      })
  };

  return (
    <Route>
      {state.loggedIn ? <Redirect to="/user" /> :
        < Form
          {...layout}
          style={{ marginTop: 50 }}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Link to="/signup"><p style={{}}>Don't have an account? Sign up here</p></Link>
          </Form.Item>

        </Form >

      }
    </Route>

  )
}

export default Login;
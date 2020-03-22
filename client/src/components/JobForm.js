import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';

function JobForm () {

  const [eventTime, setEventTime] = useState(new Date());
  const [maxParticipants, setMaxParticipants] = useState(1);

  const { Option } = Select;
  const { TextArea } = Input;

  const options = [];
  for (let i = 1; i < 10; i++) {
    options.push(<Option key={i}>{i}</Option>);
  }
  options.push(<Option key="10+">10+</Option>);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  // function onChange (value, dateString) {
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  // }

  function timeSelect (value) {
    setEventTime(value._d)
  }

  function changeMaxParticipants (value) {
    setMaxParticipants(value);
  }

  function submitForm (values) {
    const { title, description, address } = values;
    const formData = {
      title,
      description,
      address,
      maxParticipants,
      eventTime
    }

  }

  return (
    <div style={{
      'justify-content': 'center',
      'display': 'flex',
      'flex-direction': 'column'
    }}>
      <h1 style={{ 'margin': 'auto', 'padding-bottom': '3vh' }}>Post a new job</h1>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        {...layout}
        style={{ width: '60vw', height: "50vh" }}
        onFinish={submitForm}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea autoSize={{ minRows: 4, maxRows: 7 }} />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="maxParticipants" label="Participants" rules={[{ required: true }]}>
          <Select placeholder="How many people can apply?" onChange={changeMaxParticipants} >
            {options}
          </Select>
        </Form.Item>
        <Form.Item name="eventTime" label="Date and time" rules={[{ required: true }]}>
          <DatePicker showTime={{ format: 'HH' }} onOk={timeSelect} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default JobForm;
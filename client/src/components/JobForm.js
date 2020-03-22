import React from 'react';
import { Form, Input, DatePicker, Select } from 'antd';

function JobForm () {

  const { Option } = Select;
  const { TextArea } = Input;


  function onChange (value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOk (value) {
    console.log('onOk: ', value);
  }

  function changeMaxParticipants(value) {
    console.log(`Selected: ${value}`);
  }

  const options = [];
  for (let i = 1; i < 10; i++) {
    options.push(<Option key={i}>{i}</Option>);
  }
  options.push(<Option key="10+">10+</Option>);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Form>
          <Form.Item >
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Select defaultValue="1" onChange={changeMaxParticipants} style={{ width: 200 }}>
              {options}
            </Select>
          </Form.Item>
        </Form>

        <TextArea rows={4} />
      </div>
      <DatePicker showTime={{ format: 'HH' }} onChange={onChange} onOk={onOk} />
    </div>
  )
}

export default JobForm;
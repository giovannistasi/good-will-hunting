import React from 'react';
import { Form, Input, DatePicker } from 'antd';

function JobForm () {

  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  function onOk(value) {
    console.log('onOk: ', value);
  }

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Form>
          <Form.Item >
            <Input></Input>
          </Form.Item>
        </Form>
        
        <TextArea rows={4} />
      </div>
      <DatePicker showTime onChange={onChange} onOk={onOk} />
    </div>
  )
}

export default JobForm;
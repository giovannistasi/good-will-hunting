import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Form, Input, DatePicker, Select, Button, InputNumber } from 'antd';
import apiService from '../apiService';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

function JobForm() {
  const [eventTime, setEventTime] = useState(new Date());
  const [maxParticipants, setMaxParticipants] = useState(1);
  const [creditValue, setCreditValue] = useState(1);
  const [jobId, setJobId] = useState(false);
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

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

  function timeSelect(value) {
    setEventTime(value._d);
  }

  function changeMaxParticipants(value) {
    setMaxParticipants(value);
  }

  function changeCreditValue(value) {
    setCreditValue(value);
  }

  function submitForm(values) {
    const { title, description, address } = values;
    const formData = {
      title,
      description,
      address,
      maxParticipants,
      creditValue,
      eventTime,
    };
    apiService.postListing(formData).then(job => {
      setJobId(job.listingId);
    });
  }

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <Route>
      {jobId ? (
        <Redirect to={'/job/' + jobId} />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ margin: 'auto', paddingBottom: '3vh' }}>
            Post a new job
          </h1>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            {...layout}
            style={{ width: '60vw', height: '50vh' }}
            onFinish={submitForm}
          >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea autoSize={{ minRows: 4, maxRows: 7 }} />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <div>
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <p>Latitude: {coordinates.lat}</p>
                      <p>Longitude: {coordinates.lng}</p>

                      <input
                        {...getInputProps({ placeholder: 'Type address' })}
                      />

                      <div>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map(suggestion => {
                          const style = {
                            backgroundColor: suggestion.active
                              ? '#41b6e6'
                              : '#fff',
                          };

                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, { style })}
                            >
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </div>
            </Form.Item>
            <Form.Item
              name="maxParticipants"
              label="Participants"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="How many people can apply?"
                onChange={changeMaxParticipants}
              >
                {options}
              </Select>
            </Form.Item>
            <Form.Item
              name="creditValue"
              label="Credits rewarded"
              rules={[{ required: true }]}
            >
              <InputNumber
                defaultValue={1}
                onChange={changeCreditValue}
              ></InputNumber>
            </Form.Item>
            <Form.Item
              name="eventTime"
              label="Date and time"
              rules={[{ required: true }]}
            >
              <DatePicker showTime={{ format: 'HH' }} onOk={timeSelect} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Route>
  );
}

export default JobForm;

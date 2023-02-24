import { Button, Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import EntitySelect from '../../core/components/entitySelect';
import ImageUpload from '../../core/components/imageUpload';
import bimClient from '../../core/connection/bimClient';
import { processMessage } from '../../core/utils/message.utils';

const SecurityForm = ({ user, rerender }) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState();

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 6,
    },
  }

  const buttonItemLayout = {
    wrapperCol: {
      span: 4,
      offset: 4,
    },
  }

  const submitForm = () => {
    const numErrors = form.getFieldsError().filter(e => e.errors.length > 0).length;
    if (numErrors > 0)
      return;
    var formData = { ...form.getFieldsValue() };
    if (formData) {
      bimClient.put(`users/change_passwd/${user.id}`, formData).then(json => {
        if (json.status === 200) {
          if (json.data.error)
            processMessage(json.data)
          else
            processMessage('The user profile successfully updated')
        }
      });
    }

  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      initialValues={user}
      onValuesChange={(_values) => { setValues({ ...values, ..._values }) }}
    >
      <Form.Item name="currPasswd" label="Old password"
        rules={[
          {
            required: true,
            message: 'Please input old password!',
          },
        ]}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item name="newPasswd" label="New password"
        rules={[
          {
            required: true,
            message: 'Please input new password!',
          },
        ]}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item name="confirmNewPassword" label="Confirm new password"
        rules={[
          {
            required: true,
            message: 'Please input confirm new password!',
          },
        ]}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" disabled={
          // !form.isFieldsTouched(true) ||
          // form.getFieldsError().length > 0
          false
        } onClick={submitForm}>Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default SecurityForm;
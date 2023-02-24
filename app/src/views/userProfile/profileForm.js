import { Button, Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import EntitySelect from '../../core/components/entitySelect';
import ImageUpload from '../../core/components/imageUpload';
import bimClient from '../../core/connection/bimClient';
import { processMessage } from '../../core/utils/message.utils';

const SelectDepartment = (props) => {
  const { onChange, rerender } = props;
  useEffect(() => {
    console.log('rerendering ...');
  }, [rerender])
  return (
    <>
      <EntitySelect
        {...props}
        source={'departments'}
        keyField={'id'}
        displayField={'name'}
        onSelect={onChange}
      ></EntitySelect>
    </>
  )
}

const ProfileForm = ({ user, rerender }) => {
  console.log(user);
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
      bimClient.put(`users/${user.id}`, formData).then(json => {
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
      <Form.Item name="avatarUrl" label="Avatar">
        <ImageUpload maxImageNumber={1} notAllowEditImage></ImageUpload>
      </Form.Item>
      <Form.Item name="username" label="User name">
        <Input disabled={true}></Input>
      </Form.Item>
      <Form.Item name="departmentId" label="Department">
        <SelectDepartment disabled={false}></SelectDepartment>
      </Form.Item>
      <Form.Item name="fullName" label="Full name"
        rules={[
          {
            required: true,
            message: 'Please input your full name!',
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item name="email" label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item name="phone" label="Phone"
        rules={[
          {
            type: 'phone',
            message: 'The input is not valid phone number!',
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item name="address" label="Address"
      >
        <Input></Input>
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

export default ProfileForm;
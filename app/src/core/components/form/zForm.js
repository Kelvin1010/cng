import {
  DatePicker,
  Form,
  Select,
  Button
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import Field from './field';
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

const ZForm = forwardRef((props, ref) => {
  const { name, fieldsSpec, data } = props;
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [subjectValues, setSubjectValues] = useState({});
  const [mappedFieldsSpec, setMappedFieldsSpec] = useState([]);
  const onUpdateDepends = (name, value) => {
    const newSubValues = { ...subjectValues };
    newSubValues[name] = value;
    setSubjectValues(newSubValues);
  }

  // useImperativeHandle(ref, () => ({
  //   getAlert() {
  //     alert("getAlert from Child");
  //   }
  // }));

  useEffect(() => {
    const newFieldsSpec = fieldsSpec.map(f => {
      if (f.dependOn) {
        const subject = fieldsSpec.find(e => e.name == f.dependOn.name);
        if (subject) {
          if (subject.initialValue != f.dependOn.value){
            f.visible = 'false';
          }
          else f.visible = 'true';
          subject.onUpdateDepends = onUpdateDepends;
        }
      }
      return f;
    })

    setMappedFieldsSpec(newFieldsSpec);

  }, [fieldsSpec])
  
  return (
    <Form
      validateTrigger={['onChange', 'onEmptied', 'onEnded']}
      
      ref={ref}
      name={name}
      {...formItemLayout}
      onFinish={onFinish}
    >
      {
        mappedFieldsSpec ? mappedFieldsSpec.map((f) => 
        { 
          return (<Field isEdit={data? true: false} subjectValues={subjectValues} form={ref} key={f.name} {...f} initialValue={data? data[f.name]: f.initialValue} ></Field>) 
        }) : ''
      }
      {/* <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form >
  );
});

export default ZForm;
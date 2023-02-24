import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React from 'react';
import { DEFAULT_BASE_URL, API_VERSION } from "../connection/constants";
import { useToken } from '../hooks/ctx.hooks';
const uploadEnpoint = `${DEFAULT_BASE_URL}/${API_VERSION}/upload`;
const props = {
  name: 'file',
  action: uploadEnpoint,
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const FileUpload = ({ onChange }) => {
  const token = useToken();
  props.headers = {
    authorization: token,
  };

  if (onChange)
    props.onChange = onChange;

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  )
};

export default FileUpload;
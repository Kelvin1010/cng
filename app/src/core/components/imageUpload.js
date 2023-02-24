import { message, Upload } from 'antd';

import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import { DEFAULT_BASE_URL, API_VERSION } from "../connection/constants";
import { useToken } from '../hooks/ctx.hooks';

const uploadEnpoint = `${DEFAULT_BASE_URL}/${API_VERSION}/upload`;

const beforeUpload = (file) => {
  const isJpgOrPng = (file.type == 'image/jpeg' || file.type == 'image/png');
  
  if (!isJpgOrPng) {
    console.log(file.type, file.size, isJpgOrPng);
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ImageUpload = ({ currentFileList, onChange, notAllowEditImage, maxImageNumber = 5 }) => {
  const [fileList, setFileList] = useState([
  ]);

  useEffect(() => {
    if (currentFileList) {
      setFileList(currentFileList)
    }
  }, [currentFileList])

  const __onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onChange) {
      onChange({ fileList: newFileList })
    }
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const token = useToken();

  const headers = {
    authorization: token,
  };

  if (notAllowEditImage)
    return (
      <>
        <Upload
          action={uploadEnpoint}
          headers={headers}
          listType="picture-card"
          fileList={fileList}
          onChange={__onChange}
          onPreview={onPreview}
          // beforeUpload={beforeUpload}
          className="avatar-uploader"
        >
          {fileList.length < maxImageNumber && '+ Upload'}
        </Upload>
      </>
    )
  else
    return (
      <>
        <ImgCrop rotate>
          <Upload
            action={uploadEnpoint}
            headers={headers}
            listType="picture-card"
            fileList={fileList}
            onChange={__onChange}
            onPreview={onPreview}
            // beforeUpload={beforeUpload}
            className="avatar-uploader"
          >
            {fileList.length < maxImageNumber && '+ Upload'}
          </Upload>
        </ImgCrop>
      </>

    );
};

export default ImageUpload;
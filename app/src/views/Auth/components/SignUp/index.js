import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import { signUp } from '../../services/auth.service';

const { Link } = Typography;

export default function SignUp() {
  const initialValues = {
    fullName: '',
    username: '',
    email: '',
    passwd: '',
    rePasswd: '',
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (formValue) => {
    setLoading(true);
    signUp(
      formValue.fullName,
      formValue.username,
      formValue.email,
      formValue.passwd
    )
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          message.success('Signed up successfully.');
          navigate('/auth/login');
        } else {
          if (response.data.error) {
            message.error(response.data.error.msg);
          } else {
            message.error('Sign up failed.');
          }
        }
      })
      .catch((error) => {
        message.error(error.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className='auth_container'>
      <img src="/LogoCIC_126x55.png" height={48} alt="Logo" />
      <br></br>
      <h1 className="auth_page_title">Hệ thống thông tin công trình</h1>
      <div className="auth_form">
        <h4 className="auth_form_title">Đăng ký tài khoản</h4>
        <Form
          initialValues={initialValues}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Họ tên.',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Họ tên"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Username.',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập E-mail.',
              },
              {
                type: 'email',
                message: 'E-mail không hợp lệ.',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="passwd"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu.',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="rePasswd"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && value !== getFieldValue('passwd')) {
                    return Promise.reject(
                      new Error('Mật khẩu xác nhận không khớp.')
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Nhập lại mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              Đăng ký
            </Button>
            <Link href="#/auth/sign_in">Quay lại</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

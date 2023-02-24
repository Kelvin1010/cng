import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import {
  getRememberUsername,
  signIn,
  signOut,
  storeUserInfo,
} from '../../services/auth.service';

import { currentUser, setCurrentUser } from '../../stores/authSlice';
import { useTranslation } from 'react-i18next';

const { Link } = Typography;

export default function SignIn() {
  // Always sign out when opening the Sign in page
  signOut();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (formValue) => {
    setLoading(true);
    signIn(formValue.username, formValue.passwd)
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.success &&
          response.data.payload
        ) {
          const user = response.data.payload;
          setCurrentUser({ ...user });
          storeUserInfo(user, formValue.remember);
          message.success('Signed in successfully.');
          navigate('/'); // TODO Check hash route again
        } else {
          if (response.data.error) {
            message.error(response.data.error.msg);
          } else {
            message.error('Sign in failed.');
          }
        }
      })
      .catch((error) => {
        message.error(error.toString());
      })
      .finally(() => setLoading(false));
  };

  // Initial remember username
  const username = getRememberUsername();
  const initialValues = {
    username: username || '',
    passwd: '',
    remember: username ? true : false,
  };

  return (
    <div className='auth_container'>
      
      <img src="/VPI_logo.png" height={64} alt="Logo" />
      <br></br>
      <h1 className="auth_page_title">VPI Practure Prediction Application</h1>
      <div className="auth_form">
        <h4 className="auth_form_title">{t("Sign In to the System")}</h4>
        <Form
          initialValues={initialValues}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="passwd"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t("Remember me")}</Checkbox>
            </Form.Item>

            {/* <Link to="#/forgot" style={{ float: 'right' }}>
            Forgot password
          </Link> */}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              {t("Sign in")}
            </Button>
            {t('or')} <Link href="#/auth/register">{t("Register")}</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

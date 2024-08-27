import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, message  } from 'antd';
import bannerImage from "../assets/banner1.png";

const { Title, Text } = Typography;

export function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
    form.resetFields(); 
    message.open({
      type: 'success',
      content: !isLogin ?'User Created Successfully!' : "Login Successfully",
      duration : 5
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const toggleForm = () => {
    form.resetFields(); 
    setIsLogin(!isLogin);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
      <Row gutter={32} style={{ maxWidth: '1000px', width: '100%' }}>
        <Col xs={24} md={14} style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={bannerImage}
            alt="signup-background"
            style={{ width: '100%', height: '100%', borderRadius: '8px' }}
          />
        </Col>
        <Col xs={24} md={10} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px' }}>
          <Title level={3} style={{ textAlign: 'center' }}>
            {isLogin ? 'Login to your account' : 'Create an account.'}
          </Title>
          <Form
            form={form}
            name={isLogin ? 'login' : 'signup'}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ maxWidth: '300px', margin: 'auto' }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: 'email', message: 'The input is not a valid email!' },
                { required: true, message: 'Please input your email!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {!isLogin && (
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}

            {isLogin && (
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </Form.Item>

            {isLogin && (
              <Form.Item>
                <a href="#" style={{ float: 'right' }}>Forgot password?</a>
              </Form.Item>
            )}

            <Form.Item style={{ textAlign: 'center' }}>
              <Text>
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <a onClick={toggleForm} style={{ cursor: 'pointer', color: '#1677ff' }}>
                      Sign up here
                    </a>.
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <a onClick={toggleForm} style={{ cursor: 'pointer', color: '#1677ff' }}>
                      Login here
                    </a>.
                  </>
                )}
              </Text>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

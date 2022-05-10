import * as React from 'react';
import { withRouter } from 'react-router';
import './index.less';
import { Button, Image, Form, Input, Checkbox, message } from 'antd';
import logo from '../../assets/wang/WechatIMG1.jpeg';
import backImg from '../../assets/wang/WechatIMG2.jpeg';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface FormProps {
  username: string;
  password: string;
}

const Login = (props: any) => {
  const onFinish = (values: FormProps) => {
    if (values.username === '与桃桃子' && values.password === 'wang520') {
      props.history.push('/home');
      message.success('登录成功');
    } else {
      message.error('哈哈哈，是不是不记得密码了! 账号:与桃桃子;密码:wang520!哈哈哈');
    }
  };
  return (
    <div className="login-body">
      <div className="login-container">
        <Image src={logo} height="80px" width="80px" style={{ borderRadius: '50%' }} />
        <div className="loginForm">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(values) => onFinish(values)}
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入小王王的大名!' }]} initialValue='与桃桃子'>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入小王王的大名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码哦!' }]} initialValue='wang520'>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码是小周❤️小王哦"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);

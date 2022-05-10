import React, { useEffect, useState } from 'react';
import { Layout, Popconfirm, Image } from 'antd';
import './index.less';
const { Header, Content } = Layout;
import useDate from '../../common/customhooks/useDate';
import { withRouter } from 'react-router';
import { ROUTER_ENTRY } from '@common/constants/router';
import logo from '../../assets/wang/WechatIMG1.jpeg';
import { useSelector } from 'react-redux';

const Home = (props: any) => {
  const [city, setCity] = useState('');
  const currentTime = useDate();
  // const appName = useSelector((state: any) => state.globalModel.appName);
  useEffect(() => {
    let BMap = window.BMap;
    var myCity = new BMap.LocalCity();
    myCity.get(async (result: any) => {
      setCity(result.name);
    });
    let num = ROUTER_ENTRY.length % 8;
    for (let i = 0; i < 8 - num; i++) {
      ROUTER_ENTRY.push('');
    }
  }, []);

  const loginOut = () => {
    props.history.push('/');
  };

  const handleClick = (url: string) => {
    let reg = /(http|https):\/\/([\w.]+\/?)\S*/;
    if (reg.test(url)) {
      props.history.push({
        pathname: '/webview',
        state: { url: url },
      });
    } else {
      props.history.push(url);
    }
  };

  return (
    <div className="home-page">
      <Layout>
        <Header>
          <div className="header-container">
            <div className="left">
              <img src={logo} alt="小可爱" className="logo" />
              <span className="city">{city}</span>
              <span>{currentTime}</span>
            </div>
            <div className="header-title">我的</div>

            <div className="login-out">
              <Popconfirm title="确定要退出么？" onConfirm={loginOut} okText="确定" cancelText="取消">
                <a href="#">退出</a>
              </Popconfirm>
            </div>
          </div>
        </Header>
        <Content>
          <div className="body-container">
            {ROUTER_ENTRY.map((router: any, index: any) => {
              if (router === '') {
                return (
                  <div key={index} style={{ visibility: 'hidden' }} className="item-container-cls">
                    123123
                  </div>
                );
              } else {
                return (
                  <div
                    className="item-container-cls"
                    onClick={() => {
                      handleClick(router.url);
                    }}
                  >
                    <Image src={logo} className="item-cls" width="120px" height="90px" preview={false} />
                    <div style={{ width: '120px', height: '24px' }}>{router.text}</div>
                  </div>
                );
              }
            })}
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default withRouter(Home);

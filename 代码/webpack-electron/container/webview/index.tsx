import * as React from 'react';
import { Layout, Button } from 'antd';
const { Header, Content } = Layout;
import './index.less';
import { withRouter } from 'react-router';
const WebView = (props:any) => {
  let url = props.location.state.url;
  const returnHome = () => {props.history.goBack();};
  return (
    <Layout>
      <Header>
        <div>
          <Button onClick={returnHome} shape="round">
            返回
          </Button>
        </div>
      </Header>
      <Content>
        <webview id="wb" src={url} className="webview" />
      </Content>
    </Layout>
  );
};

export default withRouter(WebView);

import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Layout, Button, Modal } from 'antd';
import './index.less';
const { Header, Content } = Layout;

const Task = (props: any) => {
  const returnHome = () => {
    props.history.goBack();
  };
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
        <div className="task-body">
        </div>
      </Content>
    </Layout>
  );
};

export default withRouter(Task);

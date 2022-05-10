import * as React from 'react';
import { Select, Form, Button } from 'antd';
import { getTaskModel } from '@common/customhooks/getUserData';

const { Option } = Select;

const SelectModule = (props:any) => {
  const [form] = Form.useForm();
  const onFinish = (selectData: any) => {
   props.selectTask(selectData)
  };

  return (
    <div className="select-module">
      <Form name="select" layout="inline" form={form} onFinish={onFinish}>
        <Button disabled style={{ borderRight: 'none', borderRadius: 'none' }}>
          任务
        </Button>
        <Form.Item name="task" initialValue="全部">
          <Select defaultValue="全部" style={{ width: 240 }}>
            <Option value="全部">全部</Option>
            <Option value="已完成">已完成</Option>
            <Option value="进行中">进行中</Option>
            <Option value="未开始">未开始</Option>
          </Select>
        </Form.Item>
        <Button disabled style={{ borderRight: 'none', borderRadius: 'none' }}>
          是否打款
        </Button>
        <Form.Item name="price" initialValue="全部">
          <Select defaultValue="全部" style={{ width: 240 }}>
            <Option value="全部">全部</Option>
            <Option value="已打款">已打款</Option>
            <Option value="未打款">未打款</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectModule;

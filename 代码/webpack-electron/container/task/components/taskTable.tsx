import * as React from 'react';
import moment from 'moment';
import { Table, Tag, Space, Popover, Radio } from 'antd';

const TaskTable = (props: any) => {
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => {
        const endTime = moment(record.endTime);
        const nowTime = moment(moment(new Date()).format('YYYY-MM-DD'));
        const weekEnd = moment().weekday(7).format('YYYY-MM-DD');
        let diffDay = endTime.diff(nowTime, 'day');
        return (
          <div>
            <a>{text}</a>
            {diffDay < 0 && record.status !== '已完成' ? (
              <Tag color="red" style={{ marginLeft: '8px' }}>
                已过期
              </Tag>
            ) : diffDay === 1 && record.status !== '已完成' ? (
              <Tag color="red" style={{ marginLeft: '8px' }}>
                任务还有一天到期，小王加油哦！
              </Tag>
            ) : diffDay === 0 && record.status !== '已完成' ? (
              <Tag color="red" style={{ marginLeft: '8px' }}>
                任务今天到期，小王继续加油哦！
              </Tag>
            ) : null}
          </div>
        );
      },
    },
    {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
      render: (text: any) => <span>¥{text}</span>,
    },
    {
      title: '任务来源',
      dataIndex: 'taskSource',
      key: 'taskSource',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag === '复杂' ? 'red' : 'green';
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '任务状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: any, record: any) => (
        <>
          <Popover
            content={() => {
              return (
                <Radio.Group
                  defaultValue={record.status}
                  onChange={(e) => {
                    props.changeStatus(e, record);
                  }}
                >
                  <Space direction="vertical">
                    <Radio value="未开始">未开始</Radio>
                    <Radio value="进行中">进行中</Radio>
                    <Radio value="已完成">已完成</Radio>
                  </Space>
                </Radio.Group>
              );
            }}
          >
            <Tag color={status === '已完成' ? 'blue' : 'red'}>{status}</Tag>
          </Popover>
        </>
      ),
    },
    {
      title: '是否收款',
      key: 'getMoney',
      dataIndex: 'getMoney',
      render: (getMoney: any, record: any) => (
        <>
          <Popover
            content={() => {
              return (
                <Radio.Group
                  defaultValue={record.getMoney}
                  onChange={(e) => {
                    props.changeGetMoney(e, record);
                  }}
                >
                  <Space direction="vertical">
                    <Radio value="未打款">未打款</Radio>
                    <Radio value="已打款">已打款</Radio>
                  </Space>
                </Radio.Group>
              );
            }}
          >
            <Tag color={getMoney === '已打款' ? 'blue' : 'red'}>{getMoney}</Tag>
          </Popover>
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              props.setEditData(record);
              props.setIsShowAddModal(true);
            }}
          >
            编辑
          </a>
          {/* <Popover
            content={() => {
              return (
                <Radio.Group defaultValue={record.status} onChange={(e)=>{
                  props.changeStatus(e,record)}}>
                  <Space direction="vertical">
                    <Radio value='未开始'>未开始</Radio>
                    <Radio value='进行中'>进行中</Radio>
                    <Radio value='已完成'>已完成</Radio>
                  </Space>
                </Radio.Group>
              );
            }}
          >
            <a>修改状态</a>
          </Popover> */}

          <a>详情</a>
          <a
            onClick={() => {
              props.deleteTask(record.key);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={props.data} bordered={false} pagination={{pageSize:8}} />;
};

export default TaskTable;

import React, { useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker, message } from 'antd';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { v4 as uuidv4 } from 'uuid';
import { getTaskModel, addTaskModel, editTaskModel } from '@common/customhooks/getUserData';
const { Option } = Select;
const { RangePicker } = DatePicker;

const AddTaskModal = (props: any) => {
  const { setIsShowAddModal, isShowAddModal, setData, editData, setEditData } = props;

  useEffect(() => {
    onReset();
  }, [editData]);

  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const tailLayout = {
    wrapperCol: { offset: 2, span: 22 },
  };

  const onFinish = (data: any) => {
    const reqBody = {
      key: editData ? editData.key : uuidv4(),
      name: data.name,
      price: data.price,
      taskSource: data.taskSource,
      startTime: data.time[0].format('YYYY-MM-DD'),
      endTime: data.time[1].format('YYYY-MM-DD'),
      tags: [data.tags],
      status: data.status,
      getMoney: data.getMoney,
    };
    if (editData) {
      editTaskModel(editData.key, reqBody).then((res: boolean) => {
        if (res) {
          changeAddModal();
          message.success('修改任务成功');
          getTaskModel().then((res1: any) => {
            setData(res1);
          });
        }
      });
    } else {
      addTaskModel(reqBody).then((res: boolean) => {
        if (res) {
          setIsShowAddModal(false);
          message.success('新建任务成功');
          getTaskModel().then((res1: any) => {
            setData(res1);
          });
          onReset();
        }
      });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const changeAddModal = () => {
    setIsShowAddModal(!isShowAddModal);
    onReset();
    setEditData();
  };

  return (
    <div className="add-task" style={{ width: isShowAddModal ? '560px' : 0 }}>
      {isShowAddModal ? (
        <div className="add-modal-header" onClick={changeAddModal}>
          <div></div>
          <div>{editData ? '编辑' : '创建'}</div>
          <CloseOutlined />
        </div>
      ) : null}
      <div className="add-modal-body" style={{ display: isShowAddModal ? 'block' : 'none' }}>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={editData ? editData : {}}>
          <Form.Item name="name" label="任务名称" rules={[{ required: true, message: '请输入任务名称' }]}>
            <Input defaultValue={editData ? editData.name : ''} placeholder="请输入任务名称" />
          </Form.Item>
          <Form.Item name="price" label="任务金额" rules={[{ required: true, message: '请输入任务金额' }]}>
            <InputNumber addonAfter="元" placeholder="请输入任务金额" />
          </Form.Item>
          <Form.Item name="taskSource" label="任务来源" rules={[{ required: true, message: '请选择任务来源' }]}>
            <Select placeholder="请选择任务来源" allowClear>
              <Option value="稿定">稿定</Option>
              <Option value="微信">微信</Option>
              <Option value="QQ">QQ</Option>
              <Option value="站酷">站酷</Option>
              <Option value="其它">其它</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="time"
            label="开始时间"
            rules={[{ required: true, message: '请选择任务时间' }]}
            initialValue={
              editData && [moment(editData.startTime, 'YYYY-MM-DD'), moment(editData.endTime, 'YYYY-MM-DD')]
            }
          >
            <RangePicker locale={locale} />
          </Form.Item>
          <Form.Item name="tags" label="难易程度" rules={[{ required: true, message: '请选择任务难易程度' }]}>
            <Select placeholder="请选择任务难易程度" allowClear>
              <Option value="简单">简单</Option>
              <Option value="一般">一般</Option>
              <Option value="复杂">复杂</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="任务状态"
            rules={[{ required: true, message: '请选择任务难易程度' }]}
            initialValue="未开始"
          >
            <Select placeholder="请选择任务状态" allowClear>
              <Option value="未开始">未开始</Option>
              <Option value="进行中">进行中</Option>
              <Option value="已完成">已完成</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="getMoney"
            label="是否打款"
            rules={[{ required: true, message: '请填写是否打款' }]}
            initialValue="未打款"
          >
            <Select placeholder="请选择是否打款" allowClear>
              <Option value="未打款">未打款</Option>
              <Option value="已打款">已打款</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="confirmBtn">
              确定
            </Button>
            <Button htmlType="button" onClick={onReset} disabled={editData}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>

      {isShowAddModal ? (
        <div className="close-icon" onClick={changeAddModal}>
          <RightOutlined />
        </div>
      ) : null}
    </div>
  );
};

export default AddTaskModal;

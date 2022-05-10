import fileAction from '@common/customhooks/file';
import { getAppPath } from '@common/customhooks/appPath';
import moment from 'moment';

export const getTableData = () => {
  // 获取表格数据
  new Promise((resolve) => {
    getAppPath().then((rootPath: string) => {
      fileAction.read(`${rootPath}app/renderWang/container/task/task.json`).then((data: any) => {
        resolve(JSON.parse(data).context);
      });
    });
  });
};

// 获取统计数据
export const getStatistic = (data: []) => {
  let statistic = {
    num: 0,
    complete: 0,
    uncomplete: 0,
    price: 0,
    getPrice: 0,
    ungetPrice: 0,
    monthMoney: 0,
    monthGetMoney: 0,
    monthUnGetMoney: 0,
    lastMonthMoney: 0,
  };
  //  计算任务总数
  statistic['num'] = data.length;
  // 计算完成任务数
  statistic['complete'] = data.filter((item: any) => {
    return item.status === '已完成';
  }).length;
  // 计算未完成任务数
  statistic['uncomplete'] = data.filter((item: any) => {
    return item.status !== '已完成';
  }).length;
  // 计算任务总金额
  let num: number = 0;
  for (let i = 0; i < data.length; i++) {
    num = num + data[i]['price'];
  }
  statistic['price'] = Number(num.toFixed(0));
  // 计算任务到账金额
  let getPrice: number = 0;
  for (let i = 0; i < data.length; i++) {
    if(data[i]['getMoney'] === '已打款') {
      getPrice = getPrice + data[i]['price'];
    }
  }
  statistic['getPrice'] = Number(getPrice.toFixed(0));
  // 计算任务未到账金额
  statistic['ungetPrice'] = Number((num - getPrice).toFixed(0));
  // 计算本月任务总额
  let month = moment(new Date()).month();
  for (let i = 0; i < data.length; i++) {
    if(month === moment(data[i]['endTime']).month()) {
      statistic['monthMoney'] = Number((statistic['monthMoney'] + data[i]['price']).toFixed(0))
    }
    if(data[i]['getMoney'] === '已打款' && month === moment(data[i]['endTime']).month()) {
      statistic['monthGetMoney'] = Number((statistic['monthGetMoney'] + data[i]['price']).toFixed(0))
    }
    if(data[i]['getMoney'] === '未打款' && month === moment(data[i]['endTime']).month() && data[i]['getMoney'] === '未打款') {
      statistic['monthUnGetMoney'] = Number((statistic['monthUnGetMoney'] + data[i]['price']).toFixed(0))
    }
  }
  // 计算上月任务总额
  let lastMonth = month === 0 ? 11 : moment(new Date()).month() - 1;
  for (let i = 0; i < data.length; i++) {
    if(lastMonth === moment(data[i]['endTime']).month()) {
      statistic['lastMonthMoney'] = Number((statistic['lastMonthMoney'] + data[i]['price']).toFixed(0))
    }
  }

  return statistic;
};

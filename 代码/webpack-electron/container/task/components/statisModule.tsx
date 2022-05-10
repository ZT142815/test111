import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import SelectModule from './selectModule';
import { getStatistic } from '../customhooks';

const StatisModule = (props: any) => {
  const { createTask, data } = props;
  const [statisticData, setStatisticData] = useState({
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
  });
  useEffect(() => {
    let res = getStatistic(data);
    setStatisticData(res);
  }, [data]);
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-item">
          <div className="item">
            <div className="item-titel">任务总数</div>
            <div className="item-num">{statisticData.num}</div>
          </div>
          <div className="item">
            <div className="item-titel">已完成</div>
            <div className="item-num">{statisticData.complete}</div>
          </div>
          <div className="item">
            <div className="item-titel">未完成</div>
            <div className={statisticData.uncomplete > 0 ? "item-num item-num-red" : "item-num "}>{statisticData.uncomplete}</div>
          </div>
          <div style={{height:'60px',borderRight:'1px solid #434343'}}></div>
          <div className="item">
            <div className="item-titel">任务总金额</div>
            <div className="item-num">{statisticData.price === 0 ? statisticData.price : `¥${statisticData.price}`}</div>
          </div>
          <div className="item">
            <div className="item-titel">到账金额</div>
            <div className="item-num">{statisticData.getPrice === 0 ? statisticData.getPrice : `¥${statisticData.getPrice}`}</div>
          </div>
          <div className="item">
            <div className="item-titel">未到账金额</div>
            <div className={statisticData.ungetPrice > 0 ? "item-num item-num-red" : "item-num "}>{statisticData.ungetPrice === 0 ? statisticData.ungetPrice : `¥${statisticData.ungetPrice}`}</div>
          </div>
          <div style={{height:'60px',borderRight:'1px solid #434343'}}></div>
          <div className="item">
            <div className="item-titel">上月任务总额</div>
            <div className="item-num">{statisticData.lastMonthMoney === 0 ? statisticData.lastMonthMoney : `¥${statisticData.lastMonthMoney}`}</div>
          </div>
          <div style={{height:'60px',borderRight:'1px solid #434343'}}></div>
          <div className="item">
            <div className="item-titel">本月任务总额</div>
            <div className="item-num">{statisticData.monthMoney === 0 ? statisticData.monthMoney : `¥${statisticData.monthMoney}`}</div>
          </div>
          <div className="item">
            <div className="item-titel">本月收款总额</div>
            <div className="item-num">{statisticData.monthGetMoney === 0 ? statisticData.monthGetMoney : `¥${statisticData.monthGetMoney}`}</div>
          </div>
          <div className="item">
            <div className="item-titel">本月未到账金额</div>
            <div className={statisticData.monthUnGetMoney > 0 ? "item-num item-num-red" : "item-num "}>{statisticData.monthUnGetMoney === 0 ? statisticData.monthUnGetMoney : `¥${statisticData.monthUnGetMoney}`}</div>
          </div>
        </div>
        <div className="add-task-btn">
          <Button type="primary" onClick={createTask}>
            新建任务
          </Button>
        </div>
      </div>
      <SelectModule selectTask={props.selectTask} />
    </div>
  );
};

export default StatisModule;

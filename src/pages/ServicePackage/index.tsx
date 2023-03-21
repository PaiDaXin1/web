import {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  QueryFilter,
  ProTable, TableDropdown
} from '@ant-design/pro-components';
import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { request } from 'umi';
import { GetReportPayorder } from '@/services/api/service'

const packageUsageRecord: React.FC = () => {

  const parRef = useRef()
  const reportType: any = {
    '01': {
      label: '车辆照片',
      value: '01',
    },
    '02': {
      label: '车牌视频',
      value: '02',
    },
    '03': {
      label: '车辆360全景',
      value: '03',
    },
    '04': {
      label: '发动机高保真音频',
      value: '04',
    },
    '10': {
      label: '车辆检测报告',
      value: '10',
    },
    '20': {
      label: '车辆评估报告',
      value: '20',
    },
    '30': {
      label: '车辆尽调报告',
      value: '30',
    },
    '40': {
      label: '车辆司法检测报告',
      value: '40',
    },
  };

  const columns: any = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      valueType: 'indexBorder',
      
    },
    {
      title: '服务名称',
      key: 'reportNo',
      dataIndex: 'reportNo',
      width: 80,
      render: (text: any, record: any, index: any, action: any) => {
        // console.log("🚀 ~ file: index.tsx:94 ~ record", record)
        return <div> {record?.reportNo}</div>
      },
    },
    {
      title: '购买方式',
      width: 180,
      dataIndex: 'containers',
      align: 'right',
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: '基础价格',
      width: 80,
      dataIndex: 'status',
      initialValue: 'all',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        close: { text: '关闭', status: 'Default' },
        running: { text: '运行中', status: 'Processing' },
        online: { text: '已上线', status: 'Success' },
        error: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '销售价格',
      width: 80,
      dataIndex: 'creator',
      valueEnum: {
        all: { text: '全部' },
        付小小: { text: '付小小' },
        曲丽丽: { text: '曲丽丽' },
        林东东: { text: '林东东' },
        陈帅帅: { text: '陈帅帅' },
        兼某某: { text: '兼某某' },
      },
    },
    {
      title: '销售时间',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (text: any, record: any, index: any, action: any) => {
        return <div>{record?.orderTime}</div>
      }
    },
    {
      title: '状态',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: () => [

      ],
    },
    {
      title: '用户',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: () => [

      ],
    },
    {
      title: '操作',
      width: 180,
      fixed: 'right',
      render: (text: any, recrod: any, index: any, action: any) => {
        return [
          <Popconfirm
            title="确定退款?"
            okText="是"
            cancelText="否"
          >
            <Button
              size={'small'}
              type="primary"
              disabled={recrod?.status != '10'}
            >
              退费
            </Button>
          </Popconfirm>
        ]
      }
    },
  ];

  // const access = useAccess();
  const [par, setPar] = useState({})
  const [tabHeight, setTabHeight] = useState(0);
  const [selectedRows, setSelectedRows] = useState([])
  useEffect(() => {
    const h = document?.getElementById('tabId')?.offsetHeight || 0;
    setTabHeight(h + 200);
  }, []);

  return (
    <>
      <div className={'box_col_100'}>
        <QueryFilter<any>
          defaultCollapsed={false}
          onFinish={async (values) => {
            console.log(values);
            setPar(values);
            parRef?.current?.reloadAndRest();
          }}
          onReset={() => {
            setPar({});
            // @ts-ignore
            parRef?.current?.reloadAndRest();
          }}
        >
          <ProFormText
            name={'keyword'}
            label=""
            style={{ width: '100%', textTransform: 'uppercase' }}
            placeholder="请输入相关信息"
          />
        </QueryFilter>
        <div id={'tabId'} className={'box_col_100'}>
          <ProTable<any>
            rowKey={'reportNo'}
            pagination={{
              showQuickJumper: true,
            }}
            columns={columns}
            scroll={{ y: tabHeight }}
            search={false}
            rowSelection={{
              onChange: (_, selectedRows) => {
                console.log(selectedRows, 'ssssss111sssss');

              }
            }}
            tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
              console.log(selectedRowKeys, selectedRows, 'sssssssssss');
              return (
                <Space size={24}>

                </Space>
              );
            }}
            options={false}
            actionRef={parRef}
            dateFormatter="string"
            headerTitle="服务包购买订单记录"
            request={async (params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log(params, sorter, filter, 'ssssssssss');
              // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
              // 如果需要转化参数可以在这里进行修改
              params['pageNum'] = params.current;
              const res = await GetReportPayorder({ ...params, ...par });
              console.log("🚀 ~ file: index.tsx:217 ~ res", res)
              return {
                data: res?.records,
                // success 请返回 true，
                // 不然 table 会停止解析数据，即使有数据
                success: true,
                // 不传会使用 data 的长度，如果是分页一定要传
                total: res?.total,
              };
            }}

          />
        </div>
      </div>
    </>
  );
};


export default packageUsageRecord;

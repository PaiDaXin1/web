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
            title: '服务名称',
            key: 'reportNo',
            dataIndex: 'reportNo',
            width: 80,
            render: (text: any, record: any, index: any, action: any) => {
                console.log("🚀 ~ file: index.tsx:94 ~ record", record)

                return <div> {record?.reportNo}</div>
            },
        },
        {
            title: '购买方式',
            width: 180,
            dataIndex: 'containers',
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
    ];

    // const access = useAccess();
    const [par, setPar] = useState({})
    const [tabHeight, setTabHeight] = useState(0);
    useEffect(() => {
        const h = document?.getElementById('tabId')?.offsetHeight || 0;
        console.log('打印 ~ file: index.tsx ~ line 316 ~ useEffect ~ h', h);
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
                        columns={columns}
                        scroll={{ y: tabHeight }}
                        search={false}
                        options={{search:true}}
                        actionRef={parRef}
                        request={async (params) => {
                            console.log(params);
                            const res = await GetReportPayorder({ ...params, ...par });

                            return {
                                data: res?.records,
                                // success 请返回 true，
                                // 不然 table 会停止解析数据，即使有数据
                                success: true,
                                // 不传会使用 data 的长度，如果是分页一定要传
                                total: res?.total,
                            };
                        }}
                        rowKey="key"
                        headerTitle="套餐使用记录"
                        tableAlertOptionRender={() => {
                            return (
                                <Space size={16}>
                                    <a>批量删除</a>
                                    <a>导出数据</a>
                                </Space>
                            );
                        }}
                    />

                </div>
            </div>
        </>
    );
};
export enum MethodEnum {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export async function GET<T>(
    url: string,
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<T>(url, {
        method: MethodEnum.GET,
        params,
        ...(options || {}),
    });
}
export async function POST_FORM<T>(
    url: string,
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<T>(url, {
        method: MethodEnum.POST,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        requestType: 'form',
        params: { pageNum: params?.pageNum, pageSize: params?.pageSize },
        data: params,
        ...(options || {}),
    });
}

export async function GetReportPayorder(params: any) {
    console.log("🚀 ~ file: fpService.ts:201 ~ GetReportPayorder ~ params", params)
    return POST_FORM<any>('https://www.fastmock.site/mock/25598054f29999bfb08a6cb9ba4279c4/shangdiandian/biz/reportPayorder/page', params);
}

export default packageUsageRecord;

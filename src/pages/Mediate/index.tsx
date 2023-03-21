import {
    ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
    QueryFilter,
    ProTable, TableDropdown
} from '@ant-design/pro-components';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { request } from 'umi';
// import ModeFrom from '@/pages/PackageService/companies/ModeFrom'
import { GetReportPage } from '@/services/api/service'

const Mediate: React.FC = () => {
    const [par, setPar] = useState({})
    const [addmodeFrom, setAddmodeFrom] = useState<boolean>(false)
    const [newlyBuild, setNewlyBuild] = useState<boolean>(false)

    const parRef = useRef()
    const columns: any = [
        {
            title: '服务项',
            key: 'reportNo',
            dataIndex: 'reportNo',
            width: 80,
            render: (text: any, record: any, index: any, action: any) => {
                return <div> {record?.reportNo}</div>
            },
        },
        {
            title: '次数',
            width: 180,
            key: 'number',
            dataIndex: 'number',
            sorter: (a, b) => a.containers - b.containers,
        },
        // {
        //     title: '服务报告包内容',
        //     width: 80,
        //     key: 'name',
        //     dataIndex: 'name',
        //     initialValue: 'all',
        //     render: (text: any, recrod: any, index: any, action: any) => {
        //         return <div> {recrod?.name}</div>
        //     }
        // },
        {
            title: '服务描述',
            width: 80,
            dataIndex: 'status',
            initialValue: 'all',
            render: (text: any, recrod: any, index: any, action: any) => { }
        },
        {
            title: '操作',
            width: 150,
            fixed: 'right',
            render: (text: any, recrod: any, index: any, action: any) => {
                return [
                    <><Button
                        style={{ marginRight: '12px' }}
                        size={'small'}
                        type="primary"
                        onClick={() => {
                            setAddmodeFrom(true);
                            // console.log('sssssssssssssssssssssssss');
                        }}
                    >
                        增加子项
                    </Button><Button
                        style={{ marginRight: '12px' }}
                        size={'small'}
                        type="primary"
                    >
                            维护
                        </Button><Popconfirm
                            title="确定退款?"
                            okText="是"
                            cancelText="否"
                        >
                            <Button
                                size={'small'}
                                type="primary"
                                disabled={recrod?.status != '10'}
                            >
                                删除
                            </Button>
                        </Popconfirm></>
                ]
            }
        },
    ];
    const expandedRowRender = () => {
        return (
            <ProTable
                columns={[
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                    { title: 'Name', dataIndex: 'name', key: 'name' },

                    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
                    {
                        title: 'Action',
                        dataIndex: 'operation',
                        key: 'operation',
                        valueType: 'option',
                        render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
                    },
                ]}
                headerTitle={false}
                search={false}
                options={false}
                dataSource={par || [par]}
                pagination={false}
            />
        );
    }

    // const access = useAccess();
    const [tabHeight, setTabHeight] = useState(0);
    useEffect(() => {
        const h = document?.getElementById('tabId')?.offsetHeight || 0;
        console.log('打印 ~ file: index.tsx ~ line 316 ~ useEffect ~ h', h);
        setTabHeight(h + 200);
    }, []);
    return (
        <>
            <div className={'pageContent box_col'}
                style={{ backgroundColor: '#ffffff' }}>
                {addmodeFrom === true &&
                    (<ModeFrom
                        record={par}
                        onVisibleChange={(val: any) => {
                            console.log(val);
                            setAddmodeFrom(val);
                            try {
                                // @ts-ignore
                                parRef?.current?.reloadAndRest();
                            } catch (e) { }
                        }}
                    />)}

                {newlyBuild === true &&
                    (<ModeFrom
                        record={par}
                        onVisibleChange={(val: any) => {
                            console.log(val);
                            setNewlyBuild(val);
                            try {
                                // @ts-ignore
                                parRef?.current?.reloadAndRest();
                            } catch (e) { }
                        }}
                    />)}

                <div id='table'>
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
                            pagination={{
                                showQuickJumper: true,
                            }}
                            columns={columns}
                            scroll={{ y: tabHeight }}
                            search={false}
                            rowKey={'reportNo'}
                            options={false}
                            dateFormatter="string"
                            actionRef={parRef}
                            headerTitle="套餐服务包"
                            request={async (
                                // 第一个参数 params 查询表单和 params 参数的结合
                                // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
                                params,
                                sort,
                                filter,
                            ) => {
                                // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                                // 如果需要转化参数可以在这里进行修改
                                params['pageNum'] = params.current;
                                const res = await GetReportPage({ ...params, ...par });
                                // console.log("🚀 ~ file: index.tsx:217 ~ res", res)
                                return {
                                    data: res?.result?.records,
                                    // success 请返回 true，
                                    // 不然 table 会停止解析数据，即使有数据
                                    success: true,
                                    // 不传会使用 data 的长度，如果是分页一定要传
                                    total: res?.result?.total,
                                };
                            }}
                            expandable={{ expandedRowRender }}
                            toolBarRender={() => [
                                <Button key="button" icon={<PlusOutlined />} type="primary"
                                    onClick={() => {
                                        setNewlyBuild(true)
                                    }}>
                                    新建
                                </Button>,
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};



export default Mediate;

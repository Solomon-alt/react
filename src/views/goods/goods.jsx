import React, { useEffect, useState } from 'react'
import { getGoods ,delGoods} from '../../store/actions/goods/goods'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Table, Pagination, Modal, Form, message } from 'antd';
import { EditOutlined, DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';


const { Search } = Input;


const Goods = () => {

    const [form] = Form.useForm();

    const { confirm } = Modal;

    // 搜索商品===================================================================================
    const onSearch = value => {
        dispatch(getGoods({
            pagenum: 1,
            pagesize: 10,
            query: value
        }))
    }
    let dispatch = useDispatch()
    useEffect(() => {
       
        dispatch(getGoods({ pagenum: 1, pagesize: 10, query: '' }))
    }, [])
    let goods = useSelector(state => state.goods.goods)

    //表格========================================================================================
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            align: 'center'
        },
        {
            title: '商品名称',
            dataIndex: 'goods_name',
            key: 'goods_name',
            align: 'center',
        },
        {
            title: '商品价格',
            dataIndex: 'goods_price',
            key: 'goods_price',
            align: 'center',
        },
        {
            title: '商品重量',
            dataIndex: 'goods_weight',
            key: 'goods_weight',
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'timer',
            key: 'timer',
            align: 'center',
        },
        {
            title: '操作',
            key: 'goods_id',
            align: 'center',
            render: text => (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <Button type="primary" onClick={() => showModal(text)} icon={<EditOutlined />} />
                    <Button type="primary" danger onClick={()=>showPromiseConfirm(text)} icon={<DeleteOutlined />} />
                </div>
            )
        },


    ];

    const data = goods.goods
    //编辑Modal=====================================================================================

    const [isModalVisible, setIsModalVisible] = useState(false);
    //编辑按钮======================================================================================
    const showModal = (text) => {
        setIsModalVisible(true);
        console.log(text);
        form.setFieldsValue({
            goods_name: text.goods_name,
            goods_price: text.goods_price,
            goods_number: text.goods_number,
            goods_weight: text.goods_weight,
        })
    };
    //提交表单且数据验证成功后回调事件
    let onFinish = (value) => {
        console.log(value);
        setIsModalVisible(false);
    }

    //取消按钮======================
    let cancel=()=>{
        message.info('您取消了编辑')
        setIsModalVisible(false);
    }
    //删除商品===============================================================================
    function showPromiseConfirm(text) {
        confirm({
          title: '提示',
          icon: <ExclamationCircleOutlined />,
          content: '此操作将永久删除该商品, 是否继续?',
          onOk() {
            console.log(text);
            dispatch(delGoods({ id:text.goods_id ,pagenum: 1, pagesize: 10, query: '' }))
          },
          onCancel() {
              message.info('您取消了删除')
          },
        });
      }

    //改编页码===============================================================================
    let onChange = (page, pageSize) => {
        console.log(page, pageSize);
        dispatch(getGoods({ pagenum: page, pagesize: pageSize, query: '' }))
    }


    return (
        <div>
            {/* 搜索框和添加商品 */}
            <div style={{
                display: 'flex',
                width: 500,
                margin: '30px 0'
            }}>
                <Search placeholder="请输入搜索内容" allowClear onSearch={onSearch} enterButton size='large' />
                <Button type="primary" size='large' style={{
                    marginLeft: '40px',
                }}>添加商品</Button>
            </div>


            {/* 表格 */}
            <div>
                <Table columns={columns} pagination={false} bordered dataSource={data} />
            </div>

            {/* 分页 */}
            <div style={{
                marginTop: '30px'
            }}>
                <Pagination
                    total={goods.total}
                    pageSizeOptions={[10, 20, 30, 50]}
                    showSizeChanger
                    showQuickJumper
                    onChange={onChange}
                    showTotal={total => `共 ${total}条`}
                />
            </div>

            {/* 编辑弹出框 */}
            <div>
                <Modal title="编辑商品" visible={isModalVisible} centered keyboard footer={null} maskClosable={false} closable={false}>

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        validateTrigger="onBlur"
                        form={form}
                    >
                        <Form.Item
                            label="商品名称"
                            name="goods_name"
                            rules={[{ required: true, message: '商品名称不能为空!' }]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="商品价格"
                            name="goods_price"
                            rules={[{ required: true, message: '商品价格不能为空!' }]}
                        >
                            <Input type="number" allowClear />
                        </Form.Item>

                        <Form.Item
                            label="商品数量"
                            name="goods_number"
                            rules={[{ required: true, message: '商品数量不能为空!' }]}
                        >
                            <Input type="number" allowClear />
                        </Form.Item>

                        <Form.Item
                            label="商品重量"
                            name="goods_weight"
                            rules={[{ required: true, message: '商品重量不能为空!' }]}
                        >
                            <Input type="number" allowClear />
                        </Form.Item>


                        <Form.Item>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}>
                                <div> <Button type="primary" onClick={cancel}>取消</Button></div>
                                <div> <Button type="primary" htmlType="submit">确定</Button></div>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}
export default Goods
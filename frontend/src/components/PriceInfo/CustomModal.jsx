import React, { useState, useEffect, useRef } from 'react'

import { Modal, message, Form, Input, Space, Select, Tooltip, Typography, Switch } from 'antd'
const { Option } = Select
const { confirm } = Modal

import { ExclamationCircleOutlined } from '@ant-design/icons';

import CustomButton from './CustomButton';

import serverConfig from '../../../server.config'
const server = serverConfig.server
const { onSale, downSale } = serverConfig.interface

const App = (props) => {
    const { saleFlag, callback, id } = props
    const [visible, setVisible] = useState(false)
    const showUpConfirm = () => {
        setVisible(true)
    }
    const hideUpConfirm = () => {
        setVisible(false)
    }
    // show Delete function
    const getModalInfo = (e) => {
        setVisible(false)
        callback({
            status: true,
            info: e
        })

    }
    return (
        saleFlag ? (
            <div>
                <CustomButton icon="accountBook" text="List it" onClick={showUpConfirm} />
                <ModalForm id={id} visible={visible} onCancel={hideUpConfirm} onFinish={getModalInfo} />
            </div>
        ) : (
            // <CustomButton icon="invisible" text="Unlist it" onClick={showDeleteConfirm} />
            <></>
        )
    )
}
const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;
    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible]);
};


const ModalForm = ({ visible, onCancel, onFinish, id }) => {
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm();
    const [timeSelection, setTimeSelection] = useState(false)
    useResetFormOnCloseModal({
        form,
        visible,
    });
    const onOk = () => {
        message.error("Sorry, this function is still under construction :)")
    }
    return (
        <Modal title="" visible={visible} onOk={onOk} onCancel={onCancel} confirmLoading={confirmLoading}>
            <Form form={form} layout="vertical" name="userForm">
                <Form.Item
                    label="Price"

                >
                    <Space>
                        <Form.Item
                            name="price"
                            noStyle
                            rules={[{ required: true, message: 'Please input the price' }]}
                        >
                            <Input style={{ width: 160 }} placeholder="price" />
                        </Form.Item>
                        PEMs
                    </Space>
                </Form.Item>
                <Form.Item label="" valuePropName="checked" name="notDisplayAll">
                    Would you like to donate the earnings of this work for our latest event
                    <Tooltip title="Charity Events">
                        <Typography.Link href="/more"> #StandWithUkraine</Typography.Link>
                    </Tooltip>?&nbsp;<Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default App
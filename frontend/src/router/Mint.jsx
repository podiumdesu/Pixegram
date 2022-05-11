import React, { useState } from 'react'
import Banner from '../layout/Banner'
import {
    Form,
    Input,
    Button,
    Select,
    message,
} from "antd";

const URL_ADDR = import.meta.env.VITE_APP_URL

import { initContract } from '../contracts/index'
import axios from 'axios';

const IPFSClient = window.IpfsHttpClient.create({ 
    host: 'ipfs.infura.io', 
    port: 5001,
    protocol: 'https'
})

const New = () => {
    const [form] = Form.useForm();
    const [fileUrl, updateFileUrl] = useState("")

    const onOk = async () => {
        form.submit();
        const values = form.getFieldsValue(true);
        const uploadJson = { ...values, picCover: fileUrl }

        const { path } = await IPFSClient.add(Buffer.from(JSON.stringify(uploadJson)))
        console.log(path)
        const res = await initContract.initNft(path)

        if (res.hash) {
            message.success(`Successfully mint! ${res.hash}`)
        }

        await setTimeout(() => {}, 2000)
        
        const currentId = await initContract.getItemNum()

        window.location.href=`${URL_ADDR}/detail/${parseInt(currentId, 16)+1}`
    }

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await IPFSClient.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            updateFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
            message.error(`Error uploading file: ${error}`)
        }
    }

    return (
        <div className="mb-20 overflow-hidden">
            <div>
                <Banner />
            </div>
            <div className="mx-20 mt-24">
                <div className="mt-4 mr-60 flex flex-col items-center">
                    {/* TODO: Please pack the FORM as a component, sweety. */}
                    <Form
                        form={form}
                        name="userForm"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        autoComplete="off"
                        className="w-full "
                    >
                        <Form.Item
                            label="tokenURI"
                            name="tokenURI"
                        >
                            {
                                fileUrl.length > 0 ? (
                                    <div className="mt-1">
                                        <p>{fileUrl}</p>
                                        <img className="w-1/2 my-4" src={fileUrl} />
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                            <div className="flex flex-col w-1/2">
                                <label className="text-center py-1 
                                                        transition duration-200 ease-in-out 
                                                        border rounded border-light-blue text-light-blue
                                                        hover:text-white hover:bg-light-blue">
                                    <input hidden type="file" onChange={onChange} />
                                    <i /> {fileUrl.length > 0 ? "Repick" : "Upload your drawing"}
                                </label>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Give it a special name" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: "Please select the type" }]}
                        >
                            <Select placeholder="which type?">
                                <Option value="cute">cute</Option>
                                <Option value="anime">anime</Option>
                                <Option value="scene">scene</Option>
                                <Option value="forest">forest</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Intro"
                            name="intro"
                            rules={[{ required: true, message: "Some description" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="mr-10"
                                onClick={onOk}
                                shape="round"
                            >
                                Upload
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default New
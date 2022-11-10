import React, {useState}from 'react'
import './profile.css'

import { Layout, Divider, Avatar, Button, Input, Upload, message, Form} from 'antd'
import Sider from 'antd/lib/layout/Sider'
import  Header from 'antd/lib/layout/layout'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea'
import Search from 'antd/lib/input/Search'



function Profile() {
    const [curUser,setCurUser] = useState(localStorage.getItem("curUser"))
    const [Tel,setTel] = useState(localStorage.getItem("tel"))
    const [Email,setEmail] = useState(localStorage.getItem("email"))
    const [Zipcode,setZip] = useState(localStorage.getItem("zip"))
    const [Password,setPassword] = useState(localStorage.getItem("pwd"))
    const [nameInput,setNameInput]=useState("")
    const [telInput,setTelInput]=useState("")
    const [emailInput,setEmailInput]=useState("")
    const [zipInput,setZipInput]=useState("")
    const [pwdInput,setPwdInput]=useState("")
    const [form]=Form.useForm();
    const onFinish = (values) => {
    if(values.username!=="" && values.username!=undefined){
      setCurUser(values.username);
    //   localStorage.setItem("curUser",values.username)
    }
    if(values.tel!=="" && values.tel!=undefined){
      setTel(values.tel);
      localStorage.setItem("tel",values.tel)
    }
    if(values.email!=="" && values.email!=undefined){
      setEmail(values.email);
        localStorage.setItem("email",values.email)
    }
    if(values.zipcode!==""  && values.zipcode!=undefined){
      setZip(values.zipcode);
        localStorage.setItem("zip",values.zipcode)
    }
    if(values.password!==""  && values.password!=undefined){
        setPassword(values.password);
      }
    form.setFieldsValue({ username: '' });
    // setNameInput("");
    };

    const props = {
        // name: 'file',
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // headers: {
        //   authorization: 'authorization-text',
        // },
        //
        // onChange(info) {
        //   if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        //   }
        //
        //   if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);
        //   } else if (info.file.status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        //   }
        // },
      };

    return(
        <>
            <Sider className="sider">
                <div className='navi'>
                <a href='/main'>Main Page</a>
                
                </div>
                <div>
                    <Avatar className='selfie' shape='square' src="https://joeschmoe.io/api/v1/random"/>
                    <Upload className='newstatus' {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                <div>
                    <p className='status' style={{fontWeight:'bold'}}> Current Info: </p>
                    <p className='status' style={{fontWeight:'bold'}}>{curUser}</p>
                    <p className='status' style={{fontWeight:'bold'}}>{Tel}</p>
                    <p className='status' style={{fontWeight:'bold'}}>{Email}</p>
                    <p className='status' style={{fontWeight:'bold'}}>{Zipcode}</p>
                    <p className='status' style={{fontWeight:'bold'}}>{Password}</p>
                    <Form
            layout='vertical'
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off" >

            <Form.Item
                label="Username"
                name="username"
            >
                <Input data-testid='usernameInput'/>
            </Form.Item>

            <Form.Item
                label="Tel"
                name="tel"
                rules={[
                {
                    pattern:/[0-9]{3}-[0-9]{3}-[0-9]{4}/,
                    message: 'Please input valid tel!',
                }
                ]}
            >
                <Input value={telInput} data-testid='telInput'/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    pattern:/\w+@\w+(\.\w+){1,4}/,
                    message: 'Please input valid email!',
                }
                ]}
            >
                <Input value={emailInput} data-testid='emailInput'/>
            </Form.Item>

            <Form.Item
                label="Zipcode"
                name="zipcode"
                rules={[
                {
                    pattern:/[0-9]{5}/,
                    message: 'Please input valid zipcode!',
                }
                ]}
            >
                <Input value={zipInput} data-testid='zipInput'/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
            >
                <Input.Password value={pwdInput} data-testid='pwdInput'/>
            </Form.Item>
            <Form.Item>
                <Button data-testid="updateBtn" type="primary" htmlType="submit"
                style={{marginLeft:'3%',
                marginRight:'3%',
                width:'94%'}}>
                Update
                </Button>
            </Form.Item>
            </Form>
                </div>
            </Sider>
        </>
    )
}

export default Profile;
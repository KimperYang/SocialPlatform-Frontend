import React from 'react'
import { Button, Form, Input } from 'antd';
import './registeration.css'
import { useNavigate } from 'react-router-dom';

export default function Registeration() {
    
    const navigate=useNavigate();

    const onFinish = (values) => {
        if(localStorage.getItem("userlists")==null){
            var userlists="";
        }
        else{var userlists=localStorage.getItem("userlists");}
        if(userlists.includes(values.username)){
            // alert("This username already exists!");
            localStorage.removeItem("curUser")
        }
        else{
            localStorage.setItem("userlists",userlists+values.username);
            localStorage.setItem("curUser",values.username);
            localStorage.setItem("pwd",values.password);
            localStorage.setItem("zip",values.zipcode);
            localStorage.setItem("email",values.email);
            localStorage.setItem("tel",values.tel)
            navigate('/main');
        }
      };
    

    return(
        <div className='reg'>
            {/* <div>

            </div> */}
        
        
         <Form
            layout='vertical'
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 20,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off" >

            <Form.Item
                label="Username"
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input data-testid='usernameInput'/>
            </Form.Item>

            <Form.Item
                label="Display name"
                name="displayname"
                rules={[
                {
                    required: false,
                    message: 'Please input your displayname!',
                },
                ]}
            >
                <Input data-testid='displayInput'/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                {
                    pattern:/\w+@\w+(\.\w+){1,4}/,
                    message: 'Please input valid email!',
                }
                ]}
            >
                <Input data-testid='emailInput'/>
            </Form.Item>
            
            <Form.Item
                label="Tel"
                name="tel"
                rules={[
                {
                    required: true,
                    message: 'Please input your tel!',
                },
                {
                    pattern:/[0-9]{3}-[0-9]{3}-[0-9]{4}/,
                    message: 'Please input valid tel!',
                }
                ]}
            >
                <Input data-testid='telInput'/>
            </Form.Item>
            
            <Form.Item
                label="Birthdate(YYYYMMDD)"
                name="birthdate"
                rules={[
                {
                    required: true,
                    message: 'Please input your birthdate!',
                },
                {
                    pattern:/[0-9]{8}/,
                    message: 'Please input valid birthdate!',
                }
                ]}
            >
                <Input data-testid='bdayInput'/>
            </Form.Item>

            <Form.Item
                label="Zipcode"
                name="zipcode"
                rules={[
                {
                    required: true,
                    message: 'Please input your zipcode!',
                },
                {
                    pattern:/[0-9]{5}/,
                    message: 'Please input valid zipcode!',
                }
                ]}
            >
                <Input data-testid='zipInput'/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password data-testid='pwdInput'/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password data-testid='pwdConInput'/>
            </Form.Item>

            <Form.Item>
                <Button className='Button' type="primary" htmlType="submit" data-testid='regBtn'>
                Login
                </Button>
            </Form.Item>
        </Form>
    </div>
    )
}
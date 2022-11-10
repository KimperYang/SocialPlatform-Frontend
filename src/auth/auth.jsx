import React from 'react'
import '../assets/antdesign.css'
import { Button, Form, Input, message } from 'antd';
import './auth.css'
import { useNavigate } from 'react-router-dom';

function Auth() {
    localStorage.removeItem("curUser");
    localStorage.removeItem("pwd");
    localStorage.removeItem("zip");
    localStorage.removeItem("email");
    localStorage.removeItem("tel");
    localStorage.removeItem("status");
    const navigate=useNavigate();
    let auth = 0;
    const onFinish = (values) => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            json.forEach(x => {
                if(x.username===values.username && x.address.street===values.password){
                    localStorage.setItem("curUser",x.username)
                    localStorage.setItem("pwd",x.address.street)
                    localStorage.setItem("zip",x.address.zipcode)
                    localStorage.setItem("email",x.email)
                    localStorage.setItem("tel",x.phone)
                    auth=1;
                    console.log(auth);
                    navigate('/main');
                }
                })
                if(auth === 0){message.error("Wrong username/password");}
        })
        // for(var i=0; i<localStorage.length;i++){
        //     if(localStorage.key(i)===JSON.stringify(values.username) &&
        //     localStorage.getItem(localStorage.key(i))===JSON.stringify(values.password))
        //     {
        //         navigate('/main');
        //     }
        // }
      };
    
      

    return(
        <div className='auth'>
            {/* <div>

            </div> */}
        <div className='login'>
        
         <Form
            layout='vertical'
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 20,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off" 
            >
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
                <Input data-testid="Username"/>
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
            <Input.Password data-testid="Password"/>
        </Form.Item>
        <Form.Item>
            <Button className='Button' type="primary" htmlType="submit" data-testid="LoginBtn">
            Signin
            </Button>
        </Form.Item>
        </Form>
    </div>
    </div>
    )
}

export default Auth;
import React, {useState}from 'react'
import './main.css'

import { Layout, Divider, Avatar, Button, Input, Upload, message, List, Card, } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import  Header from 'antd/lib/layout/layout'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea'
import Search from 'antd/lib/input/Search'
import Meta from 'antd/lib/card/Meta'
import { Content } from 'antd/lib/layout/layout'
import { useEffect } from 'react'

export default function Main() {
    const today=new Date();
    const getStatus=localStorage.getItem("status");
    const curUser=localStorage.getItem("curUser");
    const [status, setStatus] = useState(getStatus);
    const [statusInput, setStatusInput] = useState("");
    const [followerInput, setFollowerInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [statusStack, setStatusStack] = useState([])
    const [postInput, setPostInput] = useState("");
    const [postStack, setPostStack] = useState([]);
    
    
    const initialPosts =(curUser) => {
      { 
        fetch('https://jsonplaceholder.typicode.com/users').
        then(response => response.json())
        .then(json => json.forEach(x=>{
          if(curUser===x.username){
            // curID=x.id;
            // console.log("find userid");
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => json.forEach(y=>{
              if(y.userId===x.id){
                addPost(curUser,y.body,"block");
              }
            }))
          }
        }))
      }}
    const initialFollower =(curUser) => {
      { 
        if(curUser=="Bret"){addFollower("Antonette");addFollower("Samantha");addFollower("Karianne")}
        else if(curUser=="Antonette"){addFollower("Samantha");addFollower("Karianne");addFollower("Kamren")}
        else if(curUser=="Samantha"){addFollower("Karianne");addFollower("Kamren");addFollower("Leopoldo_Corkery")}
        else if(curUser=="Karianne"){addFollower("Kamren");addFollower("Leopoldo_Corkery");addFollower("Elwyn.Skiles")}
        else if(curUser=="Kamren"){addFollower("Leopoldo_Corkery");addFollower("Elwyn.Skiles");addFollower("Maxime_Nienow")}
        else if(curUser=="Leopoldo_Corkery"){addFollower("Elwyn.Skiles");addFollower("Maxime_Nienow");addFollower("Delphine")}
        else if(curUser=="Elwyn.Skiles"){addFollower("Maxime_Nienow");addFollower("Delphine");addFollower("Moriah.Stanton")}
        else if(curUser=="Maxime_Nienow"){addFollower("Bret");addFollower("Delphine");addFollower("Moriah.Stanton")}
        else if(curUser=="Delphine"){addFollower("Bret");addFollower("Antonette");addFollower("Moriah.Stanton")}
        else if(curUser=="Moriah.Stanton"){addFollower("Bret");addFollower("Antonette");addFollower("Samantha")}
      }}
      useEffect(()=>{initialPosts(localStorage.getItem("curUser"));
                    initialFollower(localStorage.getItem("curUser"))},[]);
    
    const arrayRemove=(arr, value) => {
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }
    

    const addFollower= (newFollower) => {
      if(newFollower=="Bret"||newFollower=="Antonette"||newFollower=="Samantha"||newFollower=="Karianne"||newFollower=="Kamren"||
          newFollower=="Leopoldo_Corkery"||newFollower=="Elwyn.Skiles"||newFollower=="Maxime_Nienow"||newFollower=="Delphine"||newFollower=="Moriah.Stanton"){
          setStatusStack((prevStack)=>[
              ...prevStack,
              {follower:newFollower,status:'I am happy'}
          ]);
          fetch('https://jsonplaceholder.typicode.com/users').
          then(response => response.json())
              .then(json => json.forEach(x=>{
                  if(newFollower===x.username){
                      fetch('https://jsonplaceholder.typicode.com/posts')
                          .then(response => response.json())
                          .then(json => json.forEach(y=>{
                              if(y.userId===x.id){
                                  addPost(newFollower,y.body,"block");
                                  // console.log("add success");
                              }
                          }))
                  }
              }))
      }
      else(alert("This user does not exist!"))
    }
    const addPost= (postUser,newPost,pic) => {
      setPostStack((prevStack)=>[
        {author:postUser,content:newPost,display:pic},
          ...prevStack
      ])
    }

    const removePost=(username) =>{
        let newStack=[]
        for(let i=0;i<postStack.length;i++){
            if(postStack[i].author!=username){
                // console.log("find");
                newStack.push(postStack[i]);
            }
        }
        setPostStack(newStack);
    }
    const onSearch = (value) => {
        if(value==""){
        setPostStack([])
        initialPosts(localStorage.getItem("curUser"));}
      else{
            let newStack=[]
            for(let i=0;i<postStack.length;i++){
        if(JSON.stringify(postStack[i].content).includes(value)
          || JSON.stringify(postStack[i].author).includes(value)){
          // console.log("find");
          newStack.push(postStack[i]);
        }
      }
      setPostStack(newStack);}
    }


    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const beforeUpload = (file) => {
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        //
        // if (!isJpgOrPng) {
        //   message.error('You can only upload JPG/PNG file!');
        // }
        //
        // const isLt2M = file.size / 1024 / 1024 < 2;
        //
        // if (!isLt2M) {
        //   message.error('Image must smaller than 2MB!');
        // }
        //
        // return isJpgOrPng && isLt2M;
      };

    const handleChange = (info) => {
        // if (info.file.status === 'uploading') {
        //   setLoading(true);
        //   return;
        // }
        //
        // if (info.file.status === 'done') {
        //   // Get this url from response in real world.
        //   getBase64(info.file.originFileObj, (url) => {
        //     setLoading(false);
        //     setImageUrl(url);
        //   });
        // }
      };
    
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
      );
    return(
        <div>
        <Layout>
        <Header>
          <div>
            {/*<Search*/}
            {/*    placeholder="input search text of post"*/}
            {/*    allowClear*/}
            {/*    enterButton="Search"*/}
            {/*    size="large"*/}
            {/*    onSearch={onSearch}*/}
            {/*    data-testid="searchBtn"*/}
            {/*    />*/}
              <Input data-testid="searchInput" style={{width:'50%'}} onChange={(e) => {setSearchInput(e.target.value)}}/>
              <Button onClick={()=>{onSearch(searchInput)}} data-testid="searchBtn">
                  Search</Button>
          </div>
        </Header>
        
            <Sider className="sider">
                <div className='navi'>
                <a href='/profile'>Profile</a>
                <Divider type="vertical" />
                <a href='/auth' color='yellow'>Signout</a>
                </div>
                <div>
                    <Avatar className='selfie' shape='square' src="https://joeschmoe.io/api/v1/random"/>
                </div>
                <div>
                    <p className='name' id='name'> {localStorage.getItem("curUser")} </p>
                    <p className='status'> {status} </p>
                    <input data-testid='statusInput' className='newstatus' placeholder='New Status' value={statusInput}
                            onChange={(e) => {
                                    setStatusInput(e.target.value)                               
                            }}/>
                    <Button data-testid='updateStatusBtn' className='update'
                    onClick={()=>{setStatus(statusInput);
                        localStorage.setItem("status",statusInput);
                        setStatusInput("")}} ghost>
                      Update</Button>
                </div>
            </Sider>

            <Sider className='sider2'>
                <div>
                    <input data-testid='followerInput' className='newstatus' placeholder='User' value={followerInput}
                        onChange={(e) => {
                        setFollowerInput(e.target.value)                               
                    }}/>
                    <Button data-testid='addFollowerBtn' className='update'
                    onClick={()=>{addFollower(followerInput); setFollowerInput("")}} 
                    ghost>Add</Button>
                </div>
                <List>
                {
                    statusStack.map((s)=>
                    <List.Item key={s.follower} role='follower'>
                      <Card
                        hoverable
                        style={{ backgroundColor:'lightblue',
                        marginLeft:'3%', marginRight:'3%',width:'94%'}}
                      >
                      <img style={{marginLeft:'3%', marginRight:'3%',width:'94%', backgroundColor:'pink'}} alt="example" src="https://joeschmoe.io/api/v1/random" />
                      <Meta style={{marginTop:'3%',marginBottom:'3%',}} title={s.follower} description={s.status} />
                      <Button role='removeFollowerBtn' style={{backgroundColor:'yellowgreen'}} className='update'
                      onClick={()=>{
                        setStatusStack(arrayRemove(statusStack,s));
                        removePost(s.follower);
                      }}
                      ghost>Remove</Button>
                      </Card>
                    </List.Item>)
                }
                </List>
            </Sider>
            <div className='newpost'>
            <div style={{display:'flex'}}>
                <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                >
                {imageUrl ? (
                    <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                    />
                ) : (
                    uploadButton
                )}
                </Upload>
                <TextArea data-testid='textarea' className='postinput' placeholder='Post some words...' value={postInput}
                onChange={(e) => {
                  setPostInput(e.target.value)}}    />
            </div>
            <div style={{display:'flex'}}>
            <Button className='postbutton' ghost
            onClick={()=>{setPostInput("")}}>Clear</Button>
            <Button data-testid='addPostBtn' className='postbutton' ghost
            onClick={()=>{addPost(curUser,postInput,"none")}}>Post</Button>
            </div>
            </div>
            <div className='myposts'>
            <List>
                {
                postStack.map((s)=>
                <List.Item role='post' key={s.content}>
                  <Card
                    hoverable
                    style={{ backgroundColor:'lightblue',
                    marginLeft:'3%', marginRight:'3%',width:'94%'}}
                  >
                  <p>{today.getDate()}-{today.getMonth()+1}-{today.getFullYear()}</p>
                <div style={{display:'flex'}}>
                    <img className='postpic' shape='square' src="https://joeschmoe.io/api/v1/random" style={{display:s.display}}/>
                    <Meta className='postword' title={s.author} description={s.content}> </Meta>
                </div>
                <div style={{display:'flex'}}>
                    <Button className='postbutton' ghost>Edit</Button>
                    <Button className='postbutton' ghost>Comment</Button>
                </div>
                      <Divider type="horizontal" />
                      <div >
                          <h3>Comments:</h3>
                          <p>Kim: I love this post</p>
                          <p>Mike: This post is useful</p>
                          <p>Luke: You're totally right</p>
                      </div>
                </Card>
                </List.Item>)}
                </List>
                </div>
            </Layout>
        </div>
    )
}
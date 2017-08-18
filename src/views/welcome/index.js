/**
 * Created by icepoint1999 on 09/02/2017.
 */

import  React from 'react'
import {observable} from "mobx";
import {observer, inject} from "mobx-react";
import autobind from 'autobind-decorator';
import {Form, Icon, Input, Button, Checkbox,Alert} from 'antd';
import  "../../styles/login.css"
import { Link } from 'react-router'
import {particle_config} from '../../../lib/particle/config'
import  './welcome.css'
const FormItem = Form.Item;

const style = {
    height: "100%"
}

@inject('login')
@autobind
@observer
export default class WelcomePage extends React.Component {
    handle() {
        this.props.login.username = this.getInputValue(this.username)
        this.props.login.password = this.getInputValue(this.password)
        this.props.login.message = ""
        this.props.login.sign_in().then((data) => {
            this.props.login.message = data.message

            if(data.status == "20000"){
                this.props.history.push('/dashboard')
            }
        })

    }

    alert(){
        if(this.props.login.message!=""){
           return  <Alert message={this.props.login.message} banner closable/>
        }
    }

    componentDidMount(){
    window.particlesJS('particle',particle_config)

    }

    render() {
        return (
       <div className="login-wrapper">
           <div id="particle">

           </div>
            <div className="login-frame">
                <div className="login-header">
                    <label>登录云深</label>
                    {this.alert()}
                </div>
                <Form className="ant-form login-form">
                    <FormItem>
                        <Input ref={(name) => {
                            this.username = name
                        }} type="text" addonBefore={<Icon type="user"/>} placeholder="用户名"/>
                    </FormItem>
                    <FormItem>
                        <Input type="password" placeholder="密码" ref={(password) => {
                            this.password = password
                        }}
                               addonBefore={<Icon type="lock"/>}/>
                    </FormItem>

                    <FormItem>
                        <Checkbox>记住我</Checkbox>
                        <a className="login-form-forgot">忘记密码</a>
                        <Button type="primary" htmlType="submit" onClick={this.handle} className="login-form-button">
                           登录
                        </Button>
                        或 <Link to="/users/new">注册</Link>
                    </FormItem>
                </Form>
            </div>
       </div>
        );
    }


}


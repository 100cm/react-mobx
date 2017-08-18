/**
 * Created by atyun on 17/2/21.
 */
import  React from 'react'
import {observer, inject} from "mobx-react";
import autobind from 'autobind-decorator';
import {Form, Icon, Input, Button, Checkbox,Alert} from 'antd';
import  "../../styles/login.css"
import { Link } from 'react-router'
import user from '../../model/user'

const FormItem = Form.Item;
const style = {
    height: "100%"
}
@inject('user')
@autobind
@observer
export default class SignUpPage extends React.Component{
    handle() {
        this.props.user.username = this.getInputValue(this.username)
        this.props.user.phone = this.getInputValue(this.phone)
        this.props.user.password = this.getInputValue(this.password)
        this.props.user.message = ""
        this.props.user.sign_up().then((data) => {
            this.props.user.message = data.message

            if(data.status == "20000"){
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (<div className="login-frame">
            <div className="login-header">
                <label>注册云深</label>
            </div>
            <Form className="ant-form login-form">
                <FormItem>
                    <Input ref={(username) => {
                        this.username = username
                    }} type="text" addonBefore={<Icon type="user"/>} placeholder="用户名"/>
                </FormItem>
                <FormItem>
                    <Input ref={(phone) => {
                        this.phone = phone
                    }} type="text" addonBefore={<Icon type="user"/>} placeholder="手机号"/>
                </FormItem>
                <FormItem>
                    <Input type="password" placeholder="密码" ref={(password) => {
                        this.password = password
                    }}
                           addonBefore={<Icon type="lock"/>}/>
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" onClick={this.handle} className="login-form-button">
                        注册
                    </Button>
                    或 <Link to="/">登录</Link>
                </FormItem>
            </Form>
        </div>);
    }

}
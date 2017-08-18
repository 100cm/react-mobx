import  React from 'react';
import { Menu, Breadcrumb, Icon ,Spin} from 'antd';
import  autobind from 'autobind-decorator'
import {observer, inject} from "mobx-react";
import BreadCrumbList from '../../components/bread-crumb-list'
import {log} from "icelog";
import NestTable from '../../components/nest-table'
var _ = require('lodash')
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


@inject('global')
@autobind
@observer
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        }
    }

    onCollapseChange = () => {
        this.setState({
            collapse: !this.state.collapse,
        })
    }

    @log("用户点击退出",()=>{console.log("我是前置")},()=>{console.log("我是后置")})
    handleUser(e){
        console.log("用户退出了！")
    }

    render() {
        const collapse = this.state.collapse;
        return (
            <div
                className={
                    collapse ?
                        'ant-layout-aside ant-layout-aside-collapse'
                        : 'ant-layout-aside'
                }>
                <aside className="ant-layout-sider">
                    <Menu
                        onClick ={::this.MenuNavigate}
                        mode={collapse ? 'vertical' : 'inline'}
                        theme="dark"
                        defaultSelectedKeys={['user', '1']}>
                        <SubMenu key="user"
                                 title={
                                <span>
                                    <Icon type="mail" />
                                    <span className="nav-text"
                                        title="我是很长的标题"
                                        >消息
                                    </span>
                                </span>
                            }>
                            <MenuItemGroup title="分组1">
                                <Menu.Item key="1">选项1</Menu.Item>
                                <Menu.Item key="2">选项2</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="分组2">
                                <Menu.Item key="3">选项3</Menu.Item>
                                <Menu.Item key="4">选项4</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                        <SubMenu key="sub2"
                                 title={
                                <span>
                                    <Icon type="appstore" />
                                    <span className="nav-text"
                                        title="很长很长很长的就不要放到下面了"
                                        >应用中心
                                    </span>
                                </span>
                            }>
                            <Menu.Item  key="5" data-url="/dashboard/new_app">创建应用</Menu.Item>
                            <Menu.Item key="6" data-url="/dashboard/app_instances">我的应用</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4"
                                 title={
                                <span>
                                    <Icon type="setting" />
                                    <span className="nav-text"
                                        title="云主页"
                                        >云主页
                                    </span>
                                </span>
                            }>
                            <Menu.Item key="7" data-url="/dashboard/atyun_site/content">内容管理</Menu.Item>
                            <Menu.Item key="8" data-url="/dashboard/atyun_site/content_category">菜单管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5"
                                 title={
                                <span>
                                   <Icon type="camera" />
                                    <span className="nav-text"
                                        title="管理菜单要简短"
                                        >云商圈
                                    </span>
                                </span>
                            }>
                            <Menu.Item key="11">选项11</Menu.Item>
                            <Menu.Item key="12">选项12</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6"
                                 title={
                                <span>
                                    <Icon type="notification" />
                                    <span className="nav-text"
                                        title="管理菜单要简短"
                                        >云生活
                                    </span>
                                </span>
                            }>
                            <Menu.Item key="9">选项9</Menu.Item>
                            <Menu.Item key="10">选项10</Menu.Item>
                            <Menu.Item key="11">选项11</Menu.Item>
                            <Menu.Item key="12">选项12</Menu.Item>
                        </SubMenu>
                    </Menu>


                    <div className="ant-aside-action"
                         onClick={this.onCollapseChange}>
                        {collapse ?
                            <Icon type="right" /> :
                            <Icon type="left" />
                        }
                    </div>
                </aside>
                <div className="ant-layout-main">
                    <div className="ant-layout-header">
                        <Menu
                            onClick={this.handleUser}
                            mode="horizontal"
                              defaultSelectedKeys={['2']} style={{
                                lineHeight: '62px',
                                float: 'right',
                                borderBottom: 'none'
                            }}>
                            <SubMenu title={<span><Icon type="setting" />个人中心</span>}>
                                    <Menu.Item  key="1" >退出</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className="ant-layout-breadcrumb">
                        <BreadCrumbList list={this.props.global.breadCrumb} />
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <NestTable/>

                            <Spin spinning={this.props.global.loading}>
                            {
                                this.props.children
                            }
                            </Spin>
                        </div>
                    </div>
                    <div className="ant-layout-footer">
                        版权所有 © 2017云深网络
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;

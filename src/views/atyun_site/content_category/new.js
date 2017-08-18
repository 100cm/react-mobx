/**
 * Created by icepoint1999 on 10/03/2017.
 */
import React from 'react'
import autobind from 'autobind-decorator'
import {Select, Form, Col, Input, Button, notification, Checkbox} from 'antd'
import {observer, inject}from 'mobx-react'
@inject('global', 'user', 'content_category')
@autobind
@observer
export  default class ContentCategoryNew extends React.Component {

    constructor() {
        super()
        this.state = {
            site_id: "",
            category_type: "",
            menu: []
        }
    }


    option_change(e) {
        this.setState({
            menu: e
        })
    }

    handleType(e) {
        this.setState({
            category_type: e
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let form = {create:{}}
        this.state.menu.forEach((m) => {
            form.create[`is_${m}`] = true
        })
        form.create.name = this.getInputValue(this.name)
        form.create.site_id = this.state.site_id
        form.create.category_type = this.state.category_type
        this.props.content_category.create(form).then((data)=>{
            if(data.status =="20000"){
                notification.success({
                    message: "操作成功",
                    description: data.message,
                });
                this.props.history.push('/dashboard/atyun_site/content_category')
            }
        })
    }


    handleSite(e) {
        this.setState({
            site_id: e
        })
    }

    componentDidMount() {

        // 初始化面包屑
        this.props.global.breadCrumb = [{title: "首页", url: "/dashboard"},
            {title: "菜单管理", url: "/dashboard/atyun_site/content_category"}, {title: "新建菜单", url: "/dashboard/atyun_site/content_category/new"}]

        if (this.props.user.cached == false) {
            this.props.user.sites()
        } else {
            console.info("加载缓存..")
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const check_option = ['nav', 'footer', 'section']

        return (<div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item {...formItemLayout} required={true} label="选择你的站点">
                    <Select
                        showSearch
                        style={{width: "100%"}}
                        placeholder="选择一个站点"
                        optionFilterProp="children"
                        onChange={this.handleSite}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >

                        {this.props.user.self_sites.map((site, key) => {
                            return <Select.Option key={key}
                                                  value={site.id.toString()}>{site.name}</Select.Option>
                        })}

                    </Select>
                </Form.Item>

                <Form.Item {...formItemLayout} required={true} label="菜单类型">
                    <Select
                        showSearch
                        style={{width: "100%"}}
                        placeholder="选择菜单类型"
                        optionFilterProp="children"
                        onChange={this.handleType}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    ><Select.Option key={1}
                                    value={"section"}>段落</Select.Option>
                        <Select.Option key={2}
                                       value={"list"}>列表</Select.Option>
                        <Select.Option key={3}
                                       value={"spa"}>单页</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item {...formItemLayout} label="菜单名称">
                    <Input ref={(name) => {
                        this.name = name
                    }} placeholder="菜单名称"/>
                </Form.Item>
                <Form.Item {...formItemLayout} label="可选项">
                    <Checkbox.Group options={check_option} onChange={this.option_change}/>
                </Form.Item>
                <Col span={6}/>
                <Col span={12}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Col>
                <Col span={6}/>
            </Form>
        </div>)
    }

}
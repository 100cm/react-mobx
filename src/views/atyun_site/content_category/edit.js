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
export  default class ContentCategoryEdit extends React.Component {


    componentDidMount() {
        // 初始化面包屑
        this.props.global.breadCrumb = [{title: "首页", url: "/dashboard"},
            {title: "菜单管理", url: "/dashboard/atyun_site/content_category"}, {
                title: "编辑菜单",
                url: "/dashboard/atyun_site/content_category/edit"
            }]

        if (this.props.user.cached == false) {
            this.props.user.sites()
        } else {
            console.info("加载缓存..")
        }
        this.props.content_category.index({"search[id]": this.props.params.id}).then((data) => {
            this.props.content_category.editing = data[0] || {}

            let default_option = new Array()
            if (data[0].is_nav == true) {
                default_option.push('nav')
            }
            if (data[0].is_section == true) {
                default_option.push('section')
            }
            if (data[0].is_footer == true) {
                default_option.push('footer')
            }

            this.props.content_category.default_option = default_option

        })
    }

    handleType(e) {
        this.props.content_category.editing.category_type = e
    }

    handleName(e) {
        this.props.content_category.editing.name = e.target.value
    }

    handleSubmit(e) {
        e.preventDefault()
        let editing = this.props.content_category.editing
        let selected_option = this.props.content_category.default_option
        let default_option = ['nav', 'footer', 'section']
        let extra_obj = {}
        default_option.forEach(function (el) {
            if (selected_option.indexOf(el) < 0) {
                extra_obj[`is_${el}`] = false
            } else {
                extra_obj[`is_${el}`] = true
            }
        });
        let params = {
            atyun_site_content_category_id: editing.id,
            update: {
                name: editing.name,
                category_type: editing.category_type,
                ...extra_obj
            }

        }
        this.props.content_category.update(params).then((data)=>{
            if(data.status =="20000"){
                notification.success({
                    message: "操作成功",
                    description: data.message,
                });
                this.props.history.push('/dashboard/atyun_site/content_category')
            }
        })
    }

    option_change(e) {
        this.props.content_category.default_option = e
    }


    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const check_option = ['nav', 'footer', 'section']

        return (<div>
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} required={true} label="菜单类型">
                        <Select
                            showSearch
                            value={this.props.content_category.editing.category_type}
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
                        <Input onChange={this.handleName} value={this.props.content_category.editing.name}

                               placeholder="菜单名称"/>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="可选项">
                        <Checkbox.Group value={[...this.props.content_category.default_option]} options={check_option}
                                        onChange={this.option_change}/>
                    </Form.Item>
                    <Col span={6}/>
                    <Col span={12}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Col>
                    <Col span={6}/>
                </Form>
            </div>
        </div>)
    }

}

/**
 * Created by icepoint1999 on 09/03/2017.
 */
/**
 * Created by icepoint1999 on 08/03/2017.
 */
import React from 'react'
import {Select, Form, Col, Input, Button,notification} from 'antd'
import {observer, inject} from 'mobx-react'
import HttpHepler from '../../../helpers/http'
import autobind from 'autobind-decorator'
const FormItem = Form.Item

const wangeditor = require('wangeditor')
@inject('global', 'user', 'content_category','content')
@autobind
@observer
export default  class AtyunSiteContentNew extends React.Component {

    constructor() {
        super()
        this.state = {
            editor: {},
            content: "",
            site_id: "",
            content_category_id: "",
        }
    }

    componentDidMount() {
        // 初始化面包屑
        this.props.global.breadCrumb = [{title: "首页", url: "/dashboard"},
            {title: "内容管理", url: "/dashboard/atyun_site/content"}, {title: "新建内容", url: "/dashboard/atyun_site/content/new"}]



        if (this.props.user.cached == false) {
            this.props.user.sites()
        } else {
            console.info("加载缓存..")
        }
        HttpHepler.current_token().then((token) => {
            var that = this
            let editor = new wangeditor('editor');
            editor.config.uploadImgUrl = '/api/documents';
            editor.config.uploadImgFileName = "create[file]"
            editor.config.uploadParams = {
                access_token: token.access_token,
                user_session_key: this.props.user.session_key,
            };
            editor.config.uploadImgFns.onload = (res, xhr) => {
                editor.command(null, 'InsertImage', JSON.parse(res).data.document.file.url);
            }
            var that = this
            editor.onchange = function () {
                // 编辑区域内容变化时，实时打印出当前内容
                that.setState({
                    content: this.$txt.html()
                })
            };

            editor.create();
            this.setState({
                editor: editor
            })
        })


    }

    handleSubmit(e) {
        e.preventDefault()
        let form = {
            create: {
                content_category_id: this.state.content_category_id,
                site_id: this.state.site_id,
                content: this.state.content,
                title: this.getInputValue(this.title)
            }
        }
        this.props.content.create(form).then((data)=>{
            if(data.status =="20000"){
                notification.success({
                    message: "操作成功",
                    description: data.message,
                });
                this.props.history.push('/dashboard/atyun_site/content')
            }
        })
    }

    handleSelect(e) {
        this.props.content_category.index({"search[site_id]": e}).then((data) => {
            this.setState({
                content_category_id: data[0].id,
                site_id: e
            })

        })
    }

    selectCategory(e) {
        this.setState({
            content_category_id: e
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return (<div>
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} required={true} label="选择你的站点">
                    <Select
                        showSearch
                        style={{width: "100%"}}
                        placeholder="选择一个站点"
                        optionFilterProp="children"
                        onChange={this.handleSelect}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >

                        {this.props.user.self_sites.map((site, key) => {
                            return <Select.Option key={key}
                                                  value={site.id.toString()}>{site.name}</Select.Option>
                        })}

                    </Select>
                </FormItem>

                <FormItem {...formItemLayout} required={true}
                          label="文章类型">
                    <Select
                        ref={(ref) => {
                            this.category_s = ref
                        }}
                        showSearch
                        style={{width: "100%"}}
                        placeholder="文章分类"
                        allowClear={true}
                        optionFilterProp="children"
                        onChange={this.selectCategory}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.props.content_category.current_content_categories.map((cc, key) => {
                            return <Select.Option key={key}
                                                  value={cc.id.toString()}>{cc.name}</Select.Option>
                        })}

                    </Select>
                </FormItem>

                <FormItem {...formItemLayout}
                          label="标题">
                    <Input ref={(ref_url) => {
                        this.title = ref_url
                    }}/>
                </FormItem>
                <FormItem
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    label="内容">
                    <div style={{height: '300px'}} id="editor"></div>
                </FormItem>
                <Col span={6}/>
                <Col span={12}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Col>
                <Col span={6}/>
            </Form>
        </div>)
    }

}
/**
 * Created by icepoint1999 on 10/03/2017.
 */
import React from 'react'
import autobind from 'autobind-decorator'
import  HttpHepler  from '../../../helpers/http'
import {Form, Input, Select, Button, Row, Col, notification} from 'antd'
import {observer, inject}from 'mobx-react'
var wangeditor = require('wangeditor')
@inject('global', 'content', 'user')
@autobind
@observer
export  default class ContentEdit extends React.Component {


    constructor() {
        super()
        this.state = {
            content: '',
            content_category_id: '',
            title: '',
            editor: {}
        }
    }

    componentDidMount() {

        this.props.global.loading = true
        let id = this.props.params.id
        this.props.content.index({"search[id]": id}).then((data) => {
            if (data.status == "20000") {
                this.props.content.edit_content = data.atyun_site_contents[0]
                let shuzu = data.atyun_site_contents[0].site_content_category
                var default_value = (shuzu.filter((f) => {
                    return f.id.toString() == data.atyun_site_contents[0].content_category_id.toString()
                })[0] || {}).name
                this.props.content.category_name = default_value
            }

        })
        /**
         * 加载编辑器
         */
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
            editor.$txt.html();
            this.setState({
                editor: editor
            })
        })
        //加载数据
        this.props.global.loading = false

    }

    selectCategory(e) {
        this.props.content.category_name = e
    }

    handleSubmit(e) {
        e.preventDefault()

        let category_id = this.props.content.category_name
        if (isNaN(parseInt(this.props.content.category_name)) == true){
            category_id = this.props.content.edit_content.content_category_id
        }
        let params = {
            "atyun_site_content_id": this.props.params.id,
            "update": {
                "content": this.state.editor.$txt.html(), title: this.props.content.edit_content.title,
                content_category_id: category_id
            }

        }
        this.props.content.update(params).then((data) => {
            if (data.status == "20000") {
                notification.success({
                    message: "操作成功",
                    description: data.message,
                });
                this.props.history.push('/dashboard/atyun_site/content')
            }
        })
    }


    titleInput(e) {
        this.props.content.edit_content.title = e.target.value
    }


    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const title = this.props.content.edit_content.title

        return (<div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item {...formItemLayout} required={true}
                           label="文章类型">
                    <Select
                        value={this.props.content.category_name}
                        ref={(category_name) => {
                            this.category_name = category_name
                        }}
                        showSearch
                        style={{width: "100%"}}
                        placeholder="文章分类"
                        allowClear={true}
                        optionFilterProp="children"
                        onChange={this.selectCategory}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            this.props.content.edit_content.site_content_category.map((ca, index) => {
                                return <Select.Option key={index} value={ca.id.toString()}>
                                    {ca.name}
                                </Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item {...formItemLayout}
                           label="标题">
                    <Input value={this.props.content.edit_content.title} onChange={this.titleInput}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    label="内容">
                    <div style={{height: '500px'}} id="editor"
                         dangerouslySetInnerHTML={{__html: this.props.content.edit_content.content}}>
                    </div>
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

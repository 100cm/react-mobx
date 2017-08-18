/**
 * Created by icepoint1999 on 22/02/2017.
 */
import React from 'react'
import  {Form, Input, Row, Col, Select, Button, notification, Tabs} from 'antd'
import {inject, observer} from 'mobx-react'
import  {observable} from 'mobx'
import  autobind from 'autobind-decorator'
import SubmitButton from '../../../components/submit-button'
const FormItem = Form.Item
const Option = Select.Option
const TabPane = Tabs.TabPane;
var ReactGridLayout = require('react-grid-layout');
var WidthProvider = require('react-grid-layout').WidthProvider;
ReactGridLayout = WidthProvider(ReactGridLayout);
@inject('global', 'atyun_app', 'app_instance')
@autobind
@observer
export default  class AppInstanceConfig extends React.Component {

    constructor() {
        super();
        this.state = {
            themes: [],
            theme_id: "",
            layout_instances: []
        }
    }

    handleSelect(e) {
        this.setState({
            theme_id: e
        })
    }

    componentDidMount() {
        /**
         * 如果认为改变history的app_id
         * 则返回之前页面
         */
        if (this.props.location.query.app_id == undefined) {
            this.props.history.push("/dashboard/app_instances")
        }

        /**
         *    配置面包屑
         */
        this.props.global.breadCrumb = [{title: "首页", url: "/dashboard"},
            {title: "我的应用", url: "/dashboard/app_instances"}, {title: "配置", url: ""}]

        this.props.atyun_app.themes({app_id: this.props.location.query.app_id}).then((data) => {
            this.setState({
                themes: data.themes || []
            })
        })

        /**
         * 初始化当前应用site
         */

        this.props.app_instance.site({app_id:this.props.params.id})


        this.props.app_instance.layout_instances({app_id: this.props.params.id}).then((data) => {
            this.setState({
                layout_instances: data.layout_instances
            })
            /**
             * 绑定到store
             * @type {*}
             */
            this.props.app_instance.layouts = data.layout_instances
        })

    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.app_instance.update_theme({app_id: this.props.params.id, theme_id: this.state.theme_id})
            .then((data) => {
                if (data.status == "20000") {
                    notification.success({
                        message: "操作成功",
                        description: data.message,
                    });

                }
            })


    }

    handleLayoutSubmit(e) {
        e.preventDefault()
        this.props.app_instance.update_layout().then((data) => {
            if (data.status == "20000") {
                notification.success({
                    message: "操作成功",
                    description: data.message,
                });

            }
        })
    }

    layoutChange(layout) {
        this.props.app_instance.layouts = layout
    }

    freshPreview(){
        let src = this.props.global.preview_host +"?app_token="+ this.props.location.query.app_token
        this.refs.previewIframe.src =  src
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const layout = (this.state.layout_instances || []).map((li) => {
            return {x: li.x, y: li.y, w: li.width, h: li.height, i: li.id.toString()}
        })
        const reactGridProp = {
            className: "layout",
            cols: 12
        }
        return (<div>
            <Row gutter={16}>
                <Col span={3}/>
                <Col span={18}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="主题配置" key="1">
                            <Row gutter={16}>
                                <Col span={3}/>
                                <Col span={18}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormItem {...formItemLayout} required={true}
                                                  label="主题">
                                            <Select
                                                showSearch
                                                style={{width: "100%"}}
                                                placeholder="选择一个app模板"
                                                optionFilterProp="children"
                                                onChange={this.handleSelect}
                                                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {this.state.themes.map((app, key) => {
                                                    return <Option key={key}
                                                                   value={app.id.toString()}>{app.name}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                        <Col span={6}/>
                                        <Col span={12}>
                                            <Button type="primary" htmlType="submit">提交</Button>
                                        </Col>
                                        <Col span={6}/>
                                        <div className="clearfix"></div>

                                    </Form>
                                </Col>
                                <Col span={3}/>
                            </Row></TabPane>
                        <TabPane tab="布局配置" key="2">
                            <Row gutter={16}>
                                <Col span={1}/>
                                <Col span={20}>
                                    <Form onSubmit={this.handleLayoutSubmit}>
                                        <FormItem {...formItemLayout} label="布局说明">
                                            {(this.props.app_instance.layouts || []).map((li,index)=>{
                                                return <div key={index.toString()}>{li.i} ,{li.x},{li.h},{li.w}</div>
                                            })}
                                        </FormItem>
                                        <FormItem {...formItemLayout}
                                                  label="布局样式">
                                            <ReactGridLayout {...reactGridProp} layout={layout}
                                                             onLayoutChange={this.layoutChange}>
                                                {(this.state.layout_instances || [] ).map((li) => {
                                                    return <div key={li.id.toString()}>{li.app_layout.layout_type}</div>
                                                })}
                                            </ReactGridLayout>
                                        </FormItem>
                                        <SubmitButton></SubmitButton>
                                    </Form>
                                </Col>
                            </Row>
                        </TabPane>
                        {(this.props.app_instance.current_site || {}).id != undefined&&

                            <TabPane tab="站点信息配置" key="3">
                                <Row gutter={16}>
                                    <Col span={3}/>
                                    <Col span={18}>
                                        <Form onSubmit={this.handleSubmit}>
                                            <FormItem {...formItemLayout} required={true}
                                                      label="站点logo">
                                            <Input />
                                            </FormItem>

                                            <FormItem {...formItemLayout} required={true}
                                                      label="轮播图片">
                                                <Input />
                                            </FormItem>

                                            <Col span={6}/>
                                            <Col span={12}>
                                                <Button type="primary" htmlType="submit">提交</Button>
                                            </Col>
                                            <Col span={6}/>
                                            <div className="clearfix"></div>

                                        </Form>
                                    </Col>
                                    <Col span={3}/>
                                </Row>
                            </TabPane>

                        }
                        <TabPane tab="配置预览" key="4">
                            <Row gutter={16}>
                                <Col span={3}/>
                                <Col span={18}>
                                    <ReactGridLayout {...reactGridProp} layout={[{i:"1",x:0,y:0,w:12,h:8}]} >
                                        <div key="1" >
                                            <Button onClick={this.freshPreview}>刷新</Button>
                                            <iframe allowFullScreen ref="previewIframe" className="preview-iframe" src={this.props.global.preview_host +"?app_token="+ this.props.location.query.app_token}>

                                            </iframe >
                                        </div>

                                    </ReactGridLayout>
                                </Col>
                                <Col span={3}/>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={3}/>
            </Row>
        </div>)

    }


}
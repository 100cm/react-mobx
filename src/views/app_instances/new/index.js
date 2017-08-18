/**
 * Created by icepoint1999 on 20/02/2017.
 */
import React from 'react'
import {inject, observer} from  'mobx-react'
import {Row, Col, Form, Input, Button, Steps, Select} from 'antd'
import autobind from 'autobind-decorator'
import  './atyun_app.css'
const FormItem = Form.Item
const Step = Steps.Step
const Option = Select.Option;

@inject('global', 'atyun_app','app_instance')
@autobind
@observer
export default  class AtyunAppNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            apps: [],
            create_app: {}
        };
    }

    componentDidMount() {
        this.props.atyun_app.all().then(data => {
            this.setState({
                apps: data.atyun_apps
            })

        })
        this.props.global.breadCrumb = [{title: "首页", url: "/dashboard"}, {title: "我的应用", url: ""}, {
            title: "创建应用",
            url: ""
        }]
    }


    handleSubmit(e) {
        e.preventDefault()
        let name = this.getInputValue(this.name)
        let ref_url = this.getInputValue(this.ref_url)
        this.props.app_instance.create({ create:{name: name,user_id:this.current_user(),ref_url: ref_url,...this.state.create_app}}).then((data) => {
           if (data.status == "20000"){
               this.setState({
                   current:1
               })
           }
        })
    }

    next() {
        this.setState({
            current: this.state.current + 1
        })
    }

    handleSelect(e) {
        this.setState({
            create_app: {
            atyun_app_id: e
            }
        })
    }

    selectTheme(){

    }

    done() {
        this.props.history.push("/dashboard/app_instances")
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return (<div>
            <Row gutter={16}>
                <Col span={3}/>
                <Col span={18}>

                    <Steps size="small" current={this.state.current}>
                        <Step title="快速创建app">

                        </Step>

                        <Step title="选择主题"/>
                        <Step title="完成"/>
                    </Steps>
                        { this.state.current == 0 &&
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...formItemLayout} required={true}
                                      label="应用名称">
                                <Input ref={(name) => {
                                    this.name = name
                                }}/>
                            </FormItem>

                            <FormItem {...formItemLayout} required={true}
                                      label="app选择">
                                <Select
                                    showSearch
                                    style={{width: "100%"}}
                                    placeholder="选择一个app模板"
                                    optionFilterProp="children"
                                    onChange={this.handleSelect}
                                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {this.state.apps.map((app, key) => {
                                        return <Option key={key} value={app.id.toString()}>{app.name}</Option>
                                    })}

                                </Select>
                            </FormItem>

                            <FormItem {...formItemLayout} required={true}
                                      label="app客户端地址">
                                <Input ref={(ref_url) => {
                                    this.ref_url = ref_url
                                }}/>
                            </FormItem>

                            <Col span={6}/>
                            <Col span={12}>
                                <Button type="primary" htmlType="submit">提交</Button>
                            </Col>
                            <Col span={6}/>
                        </Form>
                        }
                        { this.state.current == 1 &&

                        <div className="steps-content">
                        <Select onChange={this.selectTheme}>

                        </Select>
                        </div>
                        }

                    <div className="steps-action">
                        {
                            this.state.current == 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>跳过</Button>
                        }
                        {
                            this.state.current === 2
                            &&
                            <Button type="primary" onClick={() => this.done()}>完成</Button>
                        }

                    </div>
                </Col>
                <Col span={3}/>
            </Row>
        </div>)
    }


}
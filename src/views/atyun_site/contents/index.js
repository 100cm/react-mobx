import * as React from "react";
/**
 * Created by icepoint1999 on 09/03/2017.
 */
import {Table, Icon, Select, Form, Row, Col, Input, Button,notification,Popconfirm } from 'antd';
import {inject, observer} from 'mobx-react';
import  {Link} from 'react-router'
import  autobind from 'autobind-decorator'
const Option = Select.Option
const FormItem = Form.Item
var _ = require('lodash')
@inject('user', 'global', 'content')
@autobind
@observer
export default  class Contents extends React.Component {
    componentDidMount() {

        //加载数据
        this.props.global.loading = true

        // 初始化面包屑
        this.props.global.breadCrumb = [{title: "首页", url: "/dashboard"},
            {title: "站点管理", url: ""}, {title: "内容管理", url: "/dashboard/atyun_site/content"}]


        if (this.props.user.cached == false) {
            this.props.user.sites()
        } else {
            console.info("读取缓存数据")
        }
        //获取所有内容
        this.props.content.my_content().then(()=>{
            //加载结束
            this.props.global.loading = false
        })

    }

    selectSite(e) {
        this.props.content.current_contents = this.props.content.cached_contents.filter((n) => {
            return n.site.id == e
        })
        if (e == 0) {
            this.props.content.current_contents = this.props.content.cached_contents
        }
    }

    delete(id) {
       this.props.content.delete({"atyun_site_content_id":id}).then((data)=>{
          if(data.status=="20000"){

              notification.success({
                  message:"操作成功"
              })
              // 操作缓存
              this.props.content.cached_contents= this.props.content.cached_contents.filter((n)=>{
                return n.id != id
            })
              this.props.content.current_contents= this.props.content.current_contents.filter((n)=>{
                  return n.id != id
              })
          }
       })
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '所属分类',
            dataIndex: 'content_category',
            key: 'content_category',
        },
            {
                title: '所属站点',
                dataIndex: 'site',
                key: 'site',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
      <a href={ `/dashboard/atyun_site/content/${record.id}/edit`}>编辑</a>
      <span className="ant-divider"/>
      <Popconfirm title="确认删除?" onConfirm={(e) => this.delete(record.id)}
                  okText="是" cancelText="否">
    <a href="#">删除</a>
      </Popconfirm>
      <span className="ant-divider"/>
    </span>
                ),
            }];

        const data = this.props.content.current_contents.map((content, key) => {
            return {
                key: key,
                name: content.title,
                title: content.title,
                id: content.id,
                content_category: (content.content_category || {}).name || '未知',
                site: (content.site || {} ).name || '未知'
            }
        })

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                >
                    <Row gutter={40}>
                        <Col span={8} key={1}>
                            <FormItem {...formItemLayout} label={"站点"}>
                                <Select onChange={this.selectSite}
                                        defaultValue={"0"}
                                >
                                    {this.props.user.self_sites.map((site, key) => {
                                        return <Select.Option key={key}
                                                              value={site.id.toString()}>{site.name}</Select.Option>
                                    })}
                                    <Select.Option key="-1"
                                                   value="0">全部</Select.Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Link to="/dashboard/atyun_site/content/new">新内容</Link>
                    </Row>
                </Form>


                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }


}

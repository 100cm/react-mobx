import * as React from "react";
import {inject, observer} from 'mobx-react'
import {Table, Icon, Select, Form, Row, Col, Input, Button,Popconfirm,notification} from 'antd';
import {Link} from 'react-router'
import autobind from 'autobind-decorator'
const Option = Select.Option
const FormItem = Form.Item
/**
 * Created by icepoint1999 on 08/03/2017.
 */
@inject('global', 'content_category', 'user')
@autobind
@observer
export default  class AtyunSiteContentCategory extends React.Component {

    componentDidMount() {

        //加载数据
        this.props.global.loading = true

        // 初始化面包屑
        this.props.global.breadCrumb = [{title: "首页", url: "/dashboard"},
            {title: "站点管理", url: ""}, {title: "菜单管理", url: "/dashboard/atyun_site/content_category"}]


        if (this.props.user.cached == false) {
            this.props.user.sites()
        } else {
            console.info("读取缓存数据")
        }
        //获取所有内容
        this.props.content_category.my_content_categories().then((data)=>{
            //加载结束
            this.props.global.loading = false
        })



    }

    selectSite(e) {

        this.props.content_category.current_content_categories = this.props.content_category.cached_content_categories.filter((n) => {
            return n.site.id == e
        })
        /**
         * 恢复缓存
         */
        if (e == 0) {
            this.props.content_category.current_content_categories = this.props.content_category.cached_content_categories
        }
    }

    delete(e) {
        this.props.content_category.delete({
            atyun_site_content_category_id:e
        }).then((data)=>{
            if(data.status=='20000'){

                notification.success({
                    message:"操作成功"
                })


                // 在缓存中剔除删除的
                this.props.content_category.current_content_categories =  this.props.content_category.current_content_categories.filter((ccc)=>{
                    return ccc.id != e
                })
                this.props.content_category.cached_content_categories = this.props.content_category.cached_content_categories.filter((ccc)=>{
                    return ccc.id != e
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
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '菜单类型',
            dataIndex: 'content_category_type',
            key: 'content_category_type',
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
      <Link to={`/dashboard/atyun_site/content_category/${record.id}/edit`}>编辑</Link>
      <span className="ant-divider"/>
     <Popconfirm title="确认删除?" onConfirm={(e) => this.delete(record.id)}
                 okText="是" cancelText="否">
    <a href="#">删除</a>
  </Popconfirm>
    </span>
                ),
            }];

        const data = this.props.content_category.current_content_categories.map((content_category, key) => {
            return {
                key: key,
                name: content_category.name,
                content_category_type: content_category.category_type,
                id: content_category.id,
                site: (content_category.site || {} ).name || '未知'
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
                        <Col> <Link to={"/dashboard/atyun_site/content_category/new"}>新的菜单</Link> </Col>
                    </Row>
                </Form>


                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }


}
/**
 * Created by icepoint1999 on 21/02/2017.
 */
import  React from 'react'
import {Link} from 'react-router'
import {inject, observer} from 'mobx-react'
import {Card ,Row,Col,Modal} from 'antd'
import autobind from 'autobind-decorator'

@inject('global','app_instance')
@autobind
@observer
export  default  class MyAppInstances extends React.Component {

    constructor(){
        super();
        this.state={
            app_instances:[],
            current_instance:{},
            modal_visible:false
        }
    }

    componentDidMount() {
        this.props.global.breadCrumb = [{title: "首页", url: "/"}, {title: "我的应用", url: "/dashboard/app_instances"}]
        this.props.app_instance.mine().then((data)=>{
           this.setState({
               app_instances:(data || {} ).app_instances || []
           })
        })

    }

    detail(e){
        let data_id =this.ElementValue(e,'data-id')
        let current_instance = this.state.app_instances.filter((ai)=>{
            return ai.id == data_id
        })
        this.setState({
            current_instance: current_instance[0] || {},
            modal_visible: true
        })

    }

    handleOk(){
        this.setState({
            modal_visible:false
        })
    }

    render() {
        return (<div>
            <Row>
                { this.state.app_instances.map((as,key)=>{
                    return(
                    <Col key={key} span="8">
                        <Card title={as.atyun_app.name || "未知名称"}>
                            <div>{as.name}
                            </div>
                            <div className="custom-card">
                                <Link  to={{ pathname: `/dashboard/app_instances/${as.id}/config`, query: { app_id: as.atyun_app.id ,app_token:as.app_token } }}>
                                    配置
                                </Link>

                                <a onClick={(e)=>this.detail(e)} data-id={as.id} style={{marginLeft: "10px"}}>详情</a>
                            </div>
                        </Card>
                    </Col>)
                })
                }
            </Row>

            <Modal title="应用进程"
                   visible={this.state.modal_visible}
                   onOk={this.handleOk}
                   onCancel={this.handleOk}
            >
                <p></p>
                <p>名称：{this.state.current_instance.name}</p>
                <p>主题：{(this.state.current_instance.theme || {} ).name || '未知'}</p>
                <p>云产品类型：{(this.state.current_instance.atyun_app || {} ).name || '未知'}</p>
                <p>应用token：{(this.state.current_instance || {} ).app_token || '未知'}</p>
            </Modal>
        </div>)
    }

}
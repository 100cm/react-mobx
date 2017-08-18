/**
 * Created by icepoint1999 on 20/02/2017.
 */
import  React from 'react'
import {Breadcrumb} from 'antd'
import autobind from 'autobind-decorator'

@autobind
export default class BreadCrumbList extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <Breadcrumb>
                {  this.props.list.map((bread,key) => {
                    return   <Breadcrumb.Item key={key} href={bread.url} >{bread.title}</Breadcrumb.Item>
                })
                }
            </Breadcrumb>)
    }

}
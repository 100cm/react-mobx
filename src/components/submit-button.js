/**
 * Created by icepoint1999 on 27/02/2017.
 */
import {Button,Col} from 'antd'
import React from 'react'
export default  class SubmitButton extends React.Component{
    render(){
        return(
            <div>
                <Col span={6}/>
                <Col span={12}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Col>
                <Col span={6}/>
            </div>
        )
    }
}
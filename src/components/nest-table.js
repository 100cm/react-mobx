/**
 * Created by icepoint1999 on 12/06/2017.
 */
import {Table} from 'antd'
import React from 'react'
export  default  class NestTable extends React.Component {

    render() {
        const columns = [
            {title: 'Date', dataIndex: 'date', key: 'date'},
            {title: 'Name', dataIndex: 'name', key: 'name'},
            {title: 'Status', key: 'state', render: () => <span>Finished</span>},
            {title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum'}

        ]

        const dataSource = [
            {
                key:"1",
                date: "12",
                name: "12",
                nest_data: [{key:"12",data: "12", name: "12" ,nest_data:[{key:"13",data: "12", name: "12"}]}]
            },
            {
                key:"2",
                date: "13",
                name: "13",
                nest_data: [{key:"144",data: "12", name: "12"}]
            }

        ]

        const renderNext = (e) => {

            const aa = [
                {title: 'Date', dataIndex: 'date', key: 'date'},
                {title: 'Name', dataIndex: 'name', key: 'name'},
                {title: 'Status', key: 'state', render: () => <span>Finished</span>},
                {title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum'}

            ]
            let bb = e.nest_data
            return (
                <Table
                    columns={aa}
                    dataSource={bb}
                    pagination ={false}
                    expandedRowRender={(h)=>renderNext(h)
                    }

                >

                </Table>
            )
        }

        return (
            <Table
                columns={columns}
                dataSource={dataSource}
                expandedRowRender={e =>
                   renderNext(e)
                }
            >
            </Table>
        )

    }

}
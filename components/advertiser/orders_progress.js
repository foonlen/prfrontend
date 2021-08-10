import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

class orders_progress extends React.Component
{   
    constructor(props)
    {
        super(props)
        const { order_status, order_row_id, orders_counts } = this.props
        console.log(order_status)
        console.log('Progress Bar: ', this.props)

        var styleWidth = "40"
        
        if(parseInt(order_status) === 0)
        {
            var styleWidth = "0"
        }
        if(parseInt(order_status) === 1)
        {
            var styleWidth = "60"
        }
        else if(parseInt(order_status) === 2)
        {   
            var styleWidth = "40"
        }
        else if(parseInt(order_status) === 3)
        {
            var styleWidth = "80"
        }
        else if(parseInt(order_status) === 4)
        {
            var styleWidth = "100"
        }

        this.state = {
            alert_message:null,
            order_status:order_status,
            styleWidth:styleWidth,
            orders_counts:orders_counts,
            order_row_id:order_row_id,
        }
        
    }
    
    render()
    {   
        var { order_row_id, orders_counts, styleWidth }  = this.state

        return(
            <div className="layout">
                <div className="panel progress_bar_panel">
                    <div className="panel__body panel__body_bg">
                        <div className="orders_progress advertiser_orders_progress">
                            <div className="overview__progress progress custom_progress">
                                <div className="progress__value bg-green-raw" style={{width: styleWidth+"%"}} />
                            </div>
                            <ul className="order_progress_status">
                                
                                    {
                                        parseInt(styleWidth) > 20 ?
                                        <li className="completed">
                                        <p><img src="https://img.icons8.com/fluent/30/000000/ok.png"/>
                                        <Link href={"/advertiser/orders/discussion/"+order_row_id}><a>Order Accepted</a></Link></p>
                                        </li>
                                        :
                                        <li className="pending">
                                        <p><span className="pending_block"></span><Link href={"/advertiser/orders/discussion/"+order_row_id}><a >Order Accepted</a></Link></p>
                                        </li>
                                    }
                                
                                    {
                                        parseInt(styleWidth) > 40 ? 
                                        <li className="completed">
                                            <p><img src="https://img.icons8.com/fluent/30/000000/ok.png"/>
                                            <Link href={"/advertiser/orders/discussion/"+order_row_id}><a>Discussion & Approval</a></Link></p>
                                        </li>
                                        :
                                        <li className="pending">
                                            <p><span className="pending_block"></span><Link href={"/advertiser/orders/discussion/"+order_row_id}><a >Discussion & Approval</a></Link></p>
                                        </li>
                                    }
                                    
                               
                               
                                    {
                                        parseInt(styleWidth) >= 60 ?
                                        <li className="completed">
                                        <p><img src="https://img.icons8.com/fluent/30/000000/ok.png"/>
                                        <Link href={"/advertiser/orders/hire-people/"+order_row_id}><a>Hire People</a></Link></p>
                                        </li>
                                        :
                                        <li className="pending">
                                        <p><span className="pending_block"></span><Link href={"/advertiser/orders/hire-people/"+order_row_id}><a>Hire People</a></Link></p> 
                                        </li>
                                    } 
                                
                                    {
                                        parseInt(styleWidth) >= 80 ?
                                        <li className="completed">
                                        <p><img src="https://img.icons8.com/fluent/30/000000/ok.png"/>
                                        <Link href={"/advertiser/orders/work-process/"+order_row_id}><a>Work Process</a></Link></p>
                                        </li>
                                        :
                                        <li className="pending">
                                        <p><span className="pending_block"></span><Link href={"/advertiser/orders/work-process/"+order_row_id}><a>Work Process</a></Link></p>
                                        </li>
                                    }
                               
                                    {
                                        parseInt(styleWidth) === 100 ? 
                                        <li className="completed">
                                        <p><img src="https://img.icons8.com/fluent/30/000000/ok.png"/>
                                        <Link href={"/advertiser/orders/completed/"+order_row_id}><a>Completed</a></Link></p>
                                        </li>
                                        :
                                        <li className="pending">
                                        <p><span className="pending_block"></span><Link href={"/advertiser/orders/completed/"+order_row_id}><a>Completed</a></Link></p>
                                        </li>
                                    }
                               
                            </ul>  
                        </div>
                        
                        {
                            styleWidth >= 60 ?
                            <>
                                <div className="panel-table progress_table">
                                    <div className="table-responsive">
                                        <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Employee Selected</th>
                                                <th>Accepted By You</th>
                                                <th>Employee Pitched</th>
                                                <th>Publisher Accepted</th>
                                                <th>Publisher Submitted</th>
                                                <th>Modify Platforms</th>
                                                <th>Platforms Completed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{orders_counts.emp_selected ? orders_counts.emp_selected:0}</td>
                                                <td>{orders_counts.adv_accepted ? orders_counts.adv_accepted:0}</td>
                                                <td>{orders_counts.emp_pitch ? orders_counts.emp_pitch:0}</td>
                                                <td>{orders_counts.pub_accepted ? orders_counts.pub_accepted:0}</td>
                                                <td>{orders_counts.pub_submitted ? orders_counts.pub_submitted:0}</td>
                                                <td>{orders_counts.modify ? orders_counts.modify:0}</td>
                                                <td>{orders_counts.total_completed ? orders_counts.total_completed:0}</td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </> 
                            :
                            null
                        }
                        
                    </div>
                </div>
                
                {/* <div className="layout__panel panel order_progress_layout_panel">
                    <div className="panel__body panel__body_bg">
                        <p className='orders_estimated_budget'>Estimated Budget</p>
                        <p className='estimated_amount'>$ <span className='estimated_amount_span'>600</span></p>
                        <Link href='/advertiser/addFunds'><a style={{color:'#8181a5'}}>Add Funds</a></Link>
                    </div>
                </div> */}
                    
            </div>
        )
    }
}
export default orders_progress



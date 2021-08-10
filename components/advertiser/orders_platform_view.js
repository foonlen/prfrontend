import React, { useState, useEffect } from 'react'
import moment from 'moment'
function platformView(props)
{   
    console.log('Platform props', props)
    const [data] = useState(props.platformData)
    // assigned.id as assigned_row_id, assigned.order_accept_status, pub_service.platform_row_id,
    //  plat.platform_type, pub.username, pub.full_name, pub.profile_image, pub.mobile_number, pub.email_id, 
    //  overview.about_publisher, plat.id, plat.publisher_row_id, plat.approval_status,plat.platform_name, 
    //  plat.platform_id, plat.platform_type, plat.website_link, plat.country_row_id,  plat.followers_per_month,  
    //  plat.date_n_time as platorm_create_date_n_time
    
    return(
        <div className="content">
        <div className="content__container">
        {
            data ? 
                <div className="content__body">
                    <div className="content__row">
                        <div className="content__col">
                            <div className="content__head">
                            <div className="content__preview">
                                    <img className='user_dropdown_img' src='/assets/img/default_men.png' />
                            </div>
                                <div className="content__wrap">
                               
                                <div className="content__title title title_sm">{data.full_name}</div>
                                <div className="content__text">Created on {moment(data.platorm_create_date_n_time).format("DD MMM YYYY")}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="content__col text-right">
                            <div className="content__box">
                                <div className="content__wrap">
                                <div className="data__label">Order Status</div>
                                {
                                        parseInt(data.order_accept_status) === 1 ?
                                        <div className="tag blue">Pending Approval</div>
                                        :
                                        parseInt(data.order_accept_status) === 3 ?
                                        <div className="tag blue">Publisher Selected</div>
                                        :
                                        parseInt(data.order_accept_status) === 4 ?
                                        <div className="tag blue">Publisher Rejected</div>
                                        :
                                        parseInt(data.order_accept_status) === 5 ?
                                        <div className="tag blue">Pitch Request Accepted</div>
                                        :
                                        parseInt(data.order_accept_status) === 6 ?
                                        <div className="tag blue">Pitch Request Rejected</div>
                                        
                                        :
                                        parseInt(data.order_accept_status) === 7 ?
                                        <div className="tag blue">Publisher Request Accepted</div>
                                        :
                                        parseInt(data.order_accept_status) === 8 ?
                                        <div className="tag blue">Publisher Request Rejected</div>
                                        :
                                        parseInt(data.order_accept_status) === 9 ?
                                        <div className="tag blue">Order Submitted & Approval Pendng</div>
                                        
                                        :
                                        parseInt(data.order_accept_status) === 10 ?
                                        <div className="tag blue">Order Received & Completed</div>
                                        
                                        :
                                        parseInt(data.order_accept_status) === 11 ?
                                        <div className="tag blue">Sent For Modify Order</div>
                                        :
                                        null
                                    }
                                    
                               
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        data.about_publisher ?
                        <>
                            <div className="content__title title">About Publisher</div>
                            <div className="content__body">
                                <div className="content__content">{data.about_publisher}</div>
                            </div>
                        </>
                        :
                        null
                    }

                    {
                        data.completed_description ?
                        <>
                            <div className="content__title title">Publisher Completed Details: </div>
                            <div className="content__body">
                                <div ><strong>Completed On:</strong> {moment(data.completed_date_n_time).format("DD MMM YYYY HH:MM:SS")}</div>
                                <div ><strong>Link: </strong> <a href="{data.completed_link}" target="_blank">{data.completed_link}</a></div>
                                <div ><strong>Description: </strong> {data.completed_description}</div>
                            </div>
                        </>
                        :
                        null
                    }

                    
                    {
                        (data.rejected_logs.length > 0) && (parseInt(data.order_accept_status) !== 10) ?
                        <>
                        <div className="content__title title">Rejected Reason</div>
                        {
                            data.rejected_logs.map((item, j) =>
                            <>
                            <div className="content__body"><div ><strong>{1+j}.</strong> {item.rejected_reason}</div></div>
                            </>
                            )
                        }
                        </>
                        :
                        null
                    }


                </div>
            :
            null
        }
        </div>
        

        {
             parseInt(data.order_accept_status) < 7 ?
             <div className="invoice">
             <div className='dummy'>
                 <div className="invoice__inner hire_people_invoice_inner">
                 <div className="data data_list hire_people_data_list">
                     <div className="data__container">
                         <div className="data__body">
                         <div className="data__item">
                             <div className="data__row">
                             <div className="data__cell data__cell_lg hire_people_data_cell">
                                 <div className="data__main">
                                     <div className="data__wrap">
                                         <div className="hire_people_data_label">Platform Name</div>
                                         <div className="hire_people_data_content">{data.platform_name}</div>
                                     </div>
                                 </div>
                             </div>
                             <div className="data__cell hire_people_data_cell  mobile-text-right ">
                                 <div className="hire_people_data_label">Platform Type</div>
                                 <div className="hire_people_data_content">
                                     {
                                         parseInt(data.platform_type) === 3
                                         ?
                                         "Social media"
                                         :
                                         parseInt(data.platform_type) === 2
                                         ?
                                         "Youtube"
                                         :
                                         "News Portal or Blog"
                                     }
                                 </div>
                             </div>
                             <div className="data__cell   mobile-hide hire_people_mobile_hide">
                                 <div className="hire_people_data_label">Website</div>
                                 <div className="hire_people_data_content">
                                     <a href={data.website_link} target="_blank">Visit website</a>
                                 </div>
                             </div>
                             <div className="data__cell   mobile-hide hire_people_mobile_hide">
                                 <div className="hire_people_data_label">Platform ID</div>
                                 <div className="hire_people_data_content">{data.platform_id}</div>
                             </div>
                             <div className="data__cell   mobile-hide hire_people_mobile_hide">
                                 <div className="hire_people_data_label">
                                     {
                                         parseInt(data.platform_type) === 1
                                         ?
                                         "Views Per Month"
                                         :
                                         "Followers"
                                     }</div>
                                 <div className="hire_people_data_content" style={{color: '#39daad'}}>
                                     <i className="la la-arrow-up" style={{color: '#fff'}} /> 
                                     {data.followers_per_month}
                                 </div>
                             </div>
                             </div>
                         </div>
                         </div>
                     </div>
                     </div> 
                     
                 <div className="tableoverflow">
                     <div className="grid">
                     <div className="grid__table">
                         <div className="grid__head orders_grid_head">
                         <div className="grid__cell"># No</div>
                         <div className="grid__cell">Services</div>
                         <div className="grid__cell">Publish Website Link</div>
                         <div className="grid__cell ">Price</div>
                         </div>
                         <div className="grid__body">
                         {
                         data.service_data.map((item, i) =>
                             <div className="grid__row">
                                 <div className="grid__cell">
                                 <div className="grid__text">{1+i}</div>
                                 </div>
                                 <div className="grid__cell">
                                 <div className="grid__text-right"><strong>{item.service_name}</strong></div>
                                 </div>
                                 <div className="grid__cell">
                                 <div className="grid__text">{item.reference_link}</div>
                                 </div>
                                 <div className="grid__cell">
                                 {/* tag*/}
                                 <div className="grid__text"><strong>{parseFloat(item.price)} USD</strong></div>
                                 </div>
                             </div> 
                          )
                         }
                         </div>
                       
                     </div>
                     </div>
                 </div> 
                 </div>{/* chat*/}
             </div>
             </div>
             :
             null
        }
        


    </div>
    )
}
export default platformView
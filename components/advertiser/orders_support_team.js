import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

class orders_support_team extends React.Component
{   
    constructor(props)
    {
        super(props)
        const { order_status, date_n_time } = this.props
        console.log('Support Team: ', this.props)
        this.state = {
            alert_message:null,
            order_status:order_status,
            date_n_time:date_n_time
        }
        
    }

    render()
    {
        return(
<div className="layout__panel panel supportTeam">
<div className="panel__body panel__body_bg">
<div className="sidebar__container js-sidebar-container orders_profile_info" style={{paddingBottom:'0px'}}>
<p style={{color:'#8181a5',marginBottom: '10px'}}>Support Team</p>
<div className="sidebar__head" style={{borderBottom:'none'}}>
<div className="sidebar__preview">
<Image className="sidebar__pic" width="38" height="38" src="/assets/img/user-1.jpg" alt="User" />
</div>
<div className="sidebar__wrap">
<div className="sidebar__title">Evan Yates</div>
<div className="sidebar__text">CEO, ZAP Technology</div>
</div>
</div>
<div className="sidebar__inner">
<div className="sidebar__section" >
<div className="info orders_profile_info" >
    <div className="info__section orders_profile_info_section">
        <div className="info__title">About</div>
        <div className="info__body">
            <div className="info__text">Color is so powerful that it can persuade, motivate, inspire and touch people’s soft spot the heart. This is the reason why understanding colors is pretty crucial in relating.</div>
        </div>
    </div>
    
    
    {
        parseInt(this.state.order_status)  === 0 ? 
            <button className='btn btn-primary orders_waiting' >Waiting for Approval</button>
        : parseInt(this.state.order_status) === 1 ? 
            <button className='btn btn-primary orders_waiting'>Hiring People</button>
        : 
        parseInt(this.state.order_status) === 2 ? 
            <button className='btn btn-danger btn-block' >Rejected</button>
        :
        parseInt(this.state.order_status) === 3 ? 
            <button className='btn btn-primary orders_waiting' >Work Process</button>
        :
            parseInt(this.state.order_status) === 4 ? 
            <button className='completed' >Completed</button>
        :
            null
    }
    
    

    <div className="info__section orders_profile_info_section">
    <div className="info__title">Order Created On </div>
        <div className="info__body">
            <div style={{display:'flex'}}>
                <i className='la la-barcode' style={{marginRight:'10px', display: 'flex',justifyContent: 'center',alignItems: 'center'}}></i><p style={{color:'#8181a5'}}>{this.state.date_n_time}  </p>
            </div>
        </div>
    </div>
</div>
<div className="info__section" style={{display:'none'}}>
    <div className="info__title" style={{color:'#8181a5', fontWeight: '100'}}>Other Orders</div>
    <div className="info__body">
        <div className="members">
            <div className="members__item"><Image className="members__pic" src="/assets/img/user-1.jpg" width='38' height='38' alt="User" /></div>
            <div className="members__item"><Image className="members__pic" src="/assets/img/user-2.jpg" width='38' height='38' alt="User" /></div>
            <div className="members__item"><Image className="members__pic" src="/assets/img/user-3.jpg" width='38' height='38' alt="User" /></div>
            <div className="members__item"><button className="action action_stroke"><i className="la la-plus "></i></button></div>
        </div>
        
    </div>
</div>
</div>
</div>
</div>
<div className="widget convsersation_widget" style={{display:'none'}}>
<div className="widget__head widget__head_line">
<div className="widget__title title">Conversation</div>
</div>
<div className="widget__body">
<div className="items">
<Link href="#"><a className="items__item conversation_list" >
    <div className="items__preview"><Image className="items_pic" width='38' height='38' src="/assets/img/user-2.jpg" alt="User" />
        <div className="items__online online bg-red-raw"></div>
    </div>

    <div className="items__wrap">
        <div className="items__details">
            <div className="items__name">Nicholas Gordon</div>
            <div className="items__time">10m</div>
        </div>
        <div className="items__content">Moreover the striking, brilliant and vivid colors</div>
    </div>
</a></Link>

<Link href="#"><a className="items__item conversation_list" >
    <div className="items__preview"><Image className="items_pic" width='38' height='38' src="/assets/img/user-3.jpg" alt="User" />
        <div className="items__online online"></div>
    </div>
    <div className="items__wrap">
        <div className="items__details">
        <div className="items__name">Nina Perkins</div>
        <div className="items__time">1hr</div>
        </div>
        <div className="items__content">In the history of modern astronomy, there is small</div>
    </div>
</a></Link>
<div className="custom_send_button">
    <div className='custom_send_button_left'>
        <i className='la la-paperclip' style={{marginRight:'10px'}}></i>
        <input type="text" name="text" placeholder="Your Message" style={{width:'100%'}} />
    </div>
    <div className='custom_send_button_left'>
        <button className="btn" style={{height:'27px' ,padding: '0px 13px'}}><i className="la la-send"></i></button>
    </div>
</div>

</div>
</div>
</div>
</div>
</div>
        )

    }
}
export default orders_support_team

import React from 'react'
import cookie from "cookie"
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import Datetime from "react-datetime"
import moment from 'moment' 
import Axios from 'axios'
import * as constants from '../../../components/constants'
import MenuBar from '../../../components/advertiser/dash_menu_bar'
import TopMenuBar from '../../../components/advertiser/dash_top_menu_bar'
import PopUpModal from '../../../components/popUpModal'

//onChange={(e)=>{this.setState({end_date_n_time:e.target.value})}}  useref="end_date_n_time"
var yesterday = moment().subtract( 1, 'day' );
var valid = function( current ){
    return current.isAfter( yesterday );
};

let inputProps = {
    placeholder: 'Order Deadline Time',
    name: 'end_date_n_time',
    className: 'field__input',
    useref: 'end_date_n_time', 
    readOnly:true
}
class new_order extends React.Component
{   
    constructor(props)
    {
        super(props)
        const { userAgent, headers } = this.props 
        this.state = {
            API_BASE_URL:constants.API_BASE_URL,
            headers:headers,
            priceRangeList: constants.priceRangeList,
            priorityTypesList:constants.priorityTypesList,
            modalMessage: {title:"", image_name:"", description:""},
            allOrderService:[],
            orderServices:[],
            orderPlatforms:constants.orderPlatforms,
            people_range_list:constants.people_range_list,
            token:userAgent.advertiser_token,
            advertiser_full_name:userAgent.advertiser_full_name,
            requirement:"",
            service_row_id:"",
            no_of_people:"",
            platform_row_id:"",
            serviceList:[],
            setserviceList:[],
            alert_message:null,
            order_title:"",
            price_range_id:"",
            end_date_n_time:"",
            website_link:"",
            project_name:"",
            description:"",
            error_order_title:"",
            error_requirement:"",
            error_price_range_id:"",
            error_end_date_n_time:"",
            error_website_link:"",
            error_project_name:"",
            error_description:"",
            error_service_row_id:"",
            error_platform_row_id:"",
            error_no_of_people:"",
            error_serviceList:""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) 
    {
        this.setState({ end_date_n_time: date })
    }
     
    setFlatformRowID(platform_row_id)
    {   
        this.setState({platform_row_id:platform_row_id})
        var platform_row_idArray = platform_row_id.split(",")

        this.state.allOrderService.map((outerItem) =>
        {   
            if(parseInt(outerItem.id) === parseInt(platform_row_idArray[0]))
            {
                this.setState({orderServices: outerItem.services}) 
            }
        })
    }

    getOrderServices()
    {   
        const config = {
            headers : {
              "X-API-KEY": "123123",
              token: this.state.token
            }
        }

        Axios.get(this.state.API_BASE_URL+"publisher/platforms/types", config)
        .then(res=>{ 
            console.log('type',res.data.message); 
            this.setState({allOrderService: res.data.message})
        })
    }
   
    
    addNewRequest()
    {   
        let formIsValid = true;
        if(this.state.platform_row_id === '') 
        {
            this.setState({
                error_platform_row_id:"*Required."
            });
            formIsValid = false;
        }
        else
        {
            this.setState({
                error_platform_row_id:""
            });
        }

        if(this.state.service_row_id === '') 
        {
            this.setState({
                error_service_row_id:"*Required."
            })
            formIsValid = false
        }
        else
        {
            this.setState({
                error_service_row_id:""
            });
        }

        if(this.state.no_of_people === '') 
        {
            this.setState({
                error_no_of_people:"*Required."
            });
            formIsValid = false;
        }
        else
        {
            this.setState({
                error_no_of_people:""
            });
        }
        
        if(this.state.requirement === '') 
        {
            this.setState({
                error_requirement:"*Required."
            });
            formIsValid = false;
        }
        else if(this.state.requirement.length > 255) 
        {
            this.setState({
                error_requirement:"Requirement field must be less than or equal to 255 characters in length."
            });
            formIsValid = false;
        }
        else
        {
            this.setState({
                error_requirement:""
            });
        }

        
        
        if(!formIsValid)
        {
            return true;
        }

        var platform_row_idArray = this.state.platform_row_id.split(",")
        var service_row_idArray = this.state.service_row_id.split(",")
        

        var addObj = {
            'platform_row_id':platform_row_idArray[0],
            'orderPlatformName':platform_row_idArray[1],
            'service_row_id':service_row_idArray[0],
            'orderServiceName':service_row_idArray[1],
            'no_of_people':this.state.no_of_people,
            'requirement':this.state.requirement
        }
        
        this.setState((prevState) => ({
            serviceList: [...prevState.serviceList, addObj],
            platform_row_id:'',
            orderPlatformName:'',
            service_row_id:'',
            orderServiceName:'',
            no_of_people:'',
            requirement:''
        }))
        
       document.getElementById("myForm").reset() 
    }

    handleRemoveClick(index)
    {
        this.setState({
            serviceList: this.state.serviceList.filter((s, sindex) => index !== sindex),
        })
    }

    saveOrderDetails()
    {   

        let formIsValid = true;
        if(this.state.order_title === '') 
        {
            this.setState({
                error_order_title:"*Required."
            });
            formIsValid = false;
        }
        else
        {
            this.setState({
                error_order_title:""
            });
        }

        if(this.state.price_range_id === '') 
        {
            this.setState({
                error_price_range_id:"*Required."
            });
            formIsValid = false;
        }
        else
        {
            this.setState({
                error_price_range_id:""
            });
        }

        if(this.state.end_date_n_time === '') 
        {
            this.setState({
                error_end_date_n_time:"*Required."
            });
            formIsValid = false;
        }
        else
        {
            this.setState({
                error_end_date_n_time:""
            });
        }


        if(this.state.website_link === '') 
        {
            this.setState({
                error_website_link:"*Required."
            });
            formIsValid = false;
        }
        else
        {
            this.setState({
                error_website_link:""
            });
        }

        

        if(this.state.description === '') 
        {
            this.setState({
                error_description:"*Required."
            });
            formIsValid = false;
        }
        else
        {
            this.setState({
                error_description:""
            })
        }
      
        if(!formIsValid)
        {
            return true;
        }
        var headers = this.state.headers
       
        var reqObj = {
            order_title: this.state.order_title,
            price_range_id: this.state.price_range_id,
            end_date_n_time:moment(this.state.end_date_n_time).format("YYYY-MM-DD"),
            website_link: this.state.website_link,
            project_name: this.state.project_name,
            description: this.state.description,
            services:this.state.serviceList
        } 

        
           
        fetch(this.state.API_BASE_URL+"user/orders/create_new", {
            method:'POST',
            headers: headers,
            body:JSON.stringify(reqObj)
        }).then(res => res.json())
        .then(
          (result) => { 
              console.log(result)
                if(result.status === true) 
                { 
                    if(result.tokenStatus === true)
                    {       
                        this.setState({ 
                            modalMessage:{title:"Order Created", image_name:"select.svg", description:result.message.alert_message}
                        })
    
                        if(result.message.order_row_id)
                        {
                            Router.push('/user/orders/discussion/'+result.message.order_row_id)
                        }
                    }
                    else
                    {
                       Router.push('/user/logout')
                    }
                }
                else
                {
                    this.setState({
                        error_order_title:result.message.order_title
                    });
                }
               
            })

             
    }

    
    componentDidMount()
    {
        this.getOrderServices()
        // this.priceRangeList()
        // this.priorityTypesList()
    }
    
    clickOnDelete(record) {
        this.setState({
            servicesList: this.state.servicesList.filter(r => r !== record)
        });
    }

    

    render()
    {
        return(
            <div>
            <Head>
                <meta charset="utf-8" />
                <title>Order Create</title>
                <link rel="stylesheet" type="text/css" href="/assets/css/react-datetime.css" />
            </Head>
            <div className="page">
                 <MenuBar/>
                <div className="container-dash">
                    <TopMenuBar full_name={this.state.advertiser_full_name}/>
                    <div className="container__body">
                        <div className="panel_title_block">
                            <h2>Start New Order</h2>
                            <p>Load funds, Verify Campaign, Choose Publisher  form list, Get the job done.</p>
                        </div>


{/* new design starts here */}
<div className="create_campaign_form">
            <div className="create_order_fields campaign_details">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="field auth__field select_platform">
                            <div className="field__label platform_field_label">Order name <img src="/assets/images/info.png" /></div>
                            <div className="field__wrap platform_field_wrap">
                                <input autoComplete="off" useref="order_title" className="field__input" type="text" placeholder="Order name"  onChange={(e)=>{this.setState({order_title:e.target.value})}}  name="order_title" />
                            </div>
                            <div className="error_class">
                            {this.state.error_order_title}
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-lg-3">
                        <div className="field auth__field select_platform">
                            <div className="field__label platform_field_label">Order budget <img src="/assets/images/info.png" /></div>
                            <div className="field__wrap platform_field_wrap">
                                <select className="field__select my_field__input" onChange={(e)=>{this.setState({price_range_id:e.target.value})}}  useref="price_range_id">
                                   <option disabled="" selected="">Select price range</option>
                                    {
                                        this.state.priceRangeList ?
                                        this.state.priceRangeList.map((item, i) =>
                                        <option value={item.id}  key={item.id} > {parseFloat(item.min_price)} - {parseFloat(item.max_price)} USD</option>
                                        )
                                        :null
                                    }
                                </select>
                                </div>
                            <div className="error_class">
                            {this.state.error_price_range_id}
                            </div>
                        </div>
                    </div>
                    

                    <div className="col-lg-3">
                        <div className="field auth__field select_platform">
                            <div className="field__label platform_field_label">Order/Website link <img src="/assets/images/info.png" /></div>
                            <div className="field__wrap platform_field_wrap">
                                <input className="field__input" type="text" placeholder="https://" name="website_link" onChange={(e)=>{this.setState({website_link:e.target.value})}}  useref="website_link"  />
                            </div>
                            <div className="error_class">
                                {this.state.error_website_link}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="field select_platform">
                            <div className="field__label platform_field_label">Order Dead Line <img src="/assets/images/info.png" /></div>
                            <div className="field__wrap platform_field_wrap">
                                <Datetime inputProps={ inputProps } dateFormat="YYYY-MM-DD" timeFormat={false} isValidDate={ valid }  name="end_date_n_time" value={this.state.end_date_n_time} onChange={this.handleChange}/>
                            </div>
                        </div>  
                        <div className="error_class">{this.state.error_end_date_n_time}</div>
                    </div>

                </div>
            </div>

            <div className="create_order_fields">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="field select_platform order_description">
                            <div className="field__label platform_field_label">Order description <img src="/assets/images/info.png" /></div>
                            <div className="field__wrap platform_field_wrap">
                                <textarea type="text"  className="field__textarea" placeholder="Order Description"  name="description" placeholder="Project Description" onChange={(e)=>{this.setState({description:e.target.value})}}  useref="description" />
                            </div>
                        </div>  
                        <div className="error_class">{this.state.error_description}</div>
                    </div>
                </div>
            </div>

            <div className="leave_agent_block">
                <h5 className>Confirm your requirements or leave it to your agents</h5>
            </div>
            
            <div className="create_order_fields">
            <form id="myForm" className="services_form">
                <div className="row">
                    <div className="col-lg-10">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className="field auth__field select_platform">
                                    <div className="field__label platform_field_label">Platform type<img src="/assets/images/info.png" /></div>
                                    <div className="field__wrap platform_field_wrap">
                                        <div className="field__icon custom_dropdown_icon"><i className="la la-angle-down"></i></div>
                                        <select className="field__select my_field__input" name="platform_row_id" onChange={(e)=>{this.setFlatformRowID(e.target.value)}}  useref="platform_row_id" >
                                            <option value="">Select Platform</option>
                                            {
                                                this.state.orderPlatforms ?
                                                this.state.orderPlatforms.map((item) =>
                                                <option value={item.id+','+item.platform_name}  key={item.id} > {item.platform_name}</option>
                                                )
                                                :null
                                            }    
                                        </select>
                                    </div>
                                    <div className="error_class">{this.state.error_platform_row_id}</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className="field auth__field select_platform">
                                    <div className="field__label platform_field_label">Select services <img src="/assets/images/info.png" /></div>
                                    <div className="field__wrap platform_field_wrap">
                                        <div className="field__icon custom_dropdown_icon"><i className="la la-angle-down"></i></div>
                                            <select className="field__select my_field__input" name="service_row_id" onChange={(e)=>{this.setState({service_row_id:e.target.value})}}  useref="service_row_id" >
                                                <option value="">Select Service</option>
                                                {
                                                this.state.orderServices ?
                                                    this.state.orderServices.map((item) =>
                                                    <option value={item.id+','+item.service_name}  key={item.id} > {item.service_name}</option>
                                                    )
                                                    :null
                                                }    
                                            </select>
                                        </div>
                                    <div className="error_class">
                                        {this.state.error_service_row_id}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className="field auth__field select_platform">
                                    <div className="field__label platform_field_label">No of people <img src="/assets/images/info.png" /></div>
                                    <div className="field__wrap platform_field_wrap">
                                        <div className="field__icon custom_dropdown_icon"><i className="la la-angle-down"></i></div>
                                            <select className="field__select my_field__input" name="no_of_people" onChange={(e)=>{this.setState({no_of_people:e.target.value})}}  useref="no_of_people">
                                                <option value="">No of People</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                            </select>
                                        </div>
                                    <div className="error_class">
                                        {this.state.error_no_of_people}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className="field auth__field select_platform">
                                    <div className="field__label platform_field_label">Requirements <img src="/assets/images/info.png" /></div>
                                    <div className="field__wrap platform_field_wrap">
                                        <input autoComplete="off" className="field__input" type="text" placeholder="Requirements" name="requirement" onChange={(e)=>{this.setState({requirement:e.target.value})}} useref="requirement" />
                                    </div>
                                    <div className="error_class">
                                        {this.state.error_requirement}
                                    </div>
                                </div>              
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 add_new_campaing_block">
                        <div className="add_new_campaign"><button type="button" onClick={()=>{this.addNewRequest()}}><i className="la la-plus"></i> Add New </button></div>
                    </div>
                </div>
            </form>    
            </div>

            {   
               this.state.serviceList.length > 0 ?
            <div className="campaign_services_block">
                <h5>Services added</h5>
                <div className="panel campaign_services">
                    <div className="panel-table">
                        {
                        <div className="table-responsive">
                            <table className="table">
                            <thead>
                                <tr>
                                <th>Platform</th>
                                <th>Services</th>
                                <th>Publishers</th>
                                <th>Requirements</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.serviceList.map((item, index) =>
                                <tr>
                                    <td>{item.orderPlatformName}</td>
                                    <td>{item.orderServiceName}</td>
                                    <td>{item.no_of_people}</td>
                                    <td>{item.requirement}</td>
                                    <td><img src="/assets/images/delete.png" onClick={()=>{this.handleRemoveClick(index)}} /></td>
                                </tr> 
                                )
                            }  
                            </tbody>
                            </table>
                        </div>
                        
                        }
                    </div>
                   
                </div>
            </div>
            :
            null
            }       
                
             <button type="button" className="btn cp-primary-btn mt-3 cp-btn" onClick={() => {this.saveOrderDetails()}} >
                Submit Order &nbsp;<i className="la la-arrow-right"></i>
            </button>
        </div>
            
{/* new design ends here */}
            </div>
        </div>

            {
            this.state.modalMessage.title
            ? 
            <PopUpModal message={this.state.modalMessage} /> 
            :
            null
          } 
        </div>
        </div>
        )
    }

}


export async function getServerSideProps({req})
{ 
  const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  
  if(!userAgent.advertiser_token)
  {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  else
  { 
    var headers = constants.headers
    headers['token'] = userAgent.advertiser_token
    return {props: {userAgent:userAgent, headers:headers}} 
  }
  
}

export default new_order;
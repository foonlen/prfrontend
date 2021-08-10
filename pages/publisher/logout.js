import React from 'react'
import Router from 'next/router'
import jsCookie from "js-cookie"
class Logout extends React.Component {
    
    constructor()
    {
        super()
        jsCookie.remove('publisher_token')
        jsCookie.remove('publisher_full_name')
        jsCookie.remove('publisher_register_type')
        jsCookie.remove('publisher_username')
    }

    componentDidMount()
    {
        Router.push('/login')
    }

    render()
    {   
        
        return(
            <div>
                <h6 style={{textAlign:"center"}} >Your Account is getting Logout <br/> Please wait...</h6>
            </div>
        )
    }
}
export default Logout
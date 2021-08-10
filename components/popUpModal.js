import React, {useState} from 'react'; 
import { useRouter } from 'next/router'

export default function Popupmodal(props)
{        
    const router = useRouter()
    const [showModal, setShowModal] = useState(props.message.title ? true : false)  

    const onClose=()=>{
        setShowModal(false)

        if(props.message.redirect)
        {
            router.push(props.message.redirect)
        }
    }
     
    return(    
        <div className={"modal "+(showModal ? " show" : "")} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-sm"  role="document">
                <div className="modal-content">
                    <div className="modal-body text-center"> 
                            <img src={"../../../assets/img/"+props.message.image_name} alt="Select" className="alert-image-center" /> 
                             <h5 className="modal-description mb-2">{props.message.title}</h5>
                            <p className="modal-description mb-2"  dangerouslySetInnerHTML={{ __html: props.message.description }}></p>
                        <button type="button" className="btn btn-secondary btn-m-10"  onClick={() => onClose()}>Close</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}
 
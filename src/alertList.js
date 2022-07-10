import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export const insertAlert = () =>{
    Swal.fire({
        show : true ,
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool'
      }).then((result =>{
        if(result.isConfirmed){
            window.location.href('/manager')
        }
      }))
      
}

export default insertAlert;
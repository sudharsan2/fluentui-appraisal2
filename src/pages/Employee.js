import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from '@mui/material';

const Employee=()=>{
    const navigate = useNavigate(); 

    const handleButtonClick = async () => {
        
        try {
          const response = await axios.post('http://127.0.0.1:8000/user/form-links', {
            expiration_time: '2024-06-01T00:22:17Z',
            empId: 'M1432',
          });
          const token =response.data.token
          navigate(`/form/${token}`);
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while processing your request.');
        }
        
      };
    

    

    return(<div>
    <h1 style={{color: 'black',paddingLeft:'500px', paddingTop:'500px'}}>Employee</h1>
    <Button onClick={handleButtonClick}>Employee</Button>
    </div>)
}

export default Employee;
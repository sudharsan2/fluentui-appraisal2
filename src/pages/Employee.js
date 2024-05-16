// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { Button } from '@mui/material';

// const Employee=()=>{
//     const navigate = useNavigate(); 

//     const handleButtonClick = async () => {
        
//         try {
//           const response = await axios.post('http://127.0.0.1:8000/user/form-links', {
//             expiration_time: '2024-06-01T00:22:17Z',
//             empId: 'M1432',
//           });
//           const token =response.data.token
//           navigate(`/form/${token}`);
//         } catch (error) {
//           console.error('Error:', error);
//           alert('An error occurred while processing your request.');
//         }
        
//       };
    

    

//     return(<Button onClick={handleButtonClick}>Employee</Button>)
// }

// export default Employee;


const Dashboard = () => {
    const styles = {
        fontFamily: '"sans-serif"',
        WebkitFontSmoothing: 'antialiased',
        fontSize: '28px',
        fontWeight: 700,
        marginTop: '6px',
        marginBottom: '45px',
        position: 'sticky',
        left: '0px',
        color: 'rgb(0, 0, 0)',
        maxWidth: '615px'
    };

    return (
        <h1 style={styles}>Active users</h1>
    );
}

export default Dashboard;
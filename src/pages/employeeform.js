import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    designation: '',
    data_of_joining: '',
    appraisal_due_date: '',
    department: '',
    reporting_manager: '',
    reviewer: '',
    previous_experience: '',
    exact_experience: '',
    total_experience: '',
    performance_review_period: '',
    question_1: '',
    question_2: '',
    question_3: '',
    question_4: '',
    attendance_and_punctuality: '',
    technical_skills: '',
    quality_of_work: '',
    new_knowledge: '',
    utilization_and_productivity: '',
    organize_plans: '',
    interpersonal_skills: '',
    communication: '',
    initiative_innovative_creativity: '',
    teamwork: '',
    client_focused: '',
    planning_and_organizing: '',
    organization_feedback: '',
    traning_need_analysis: '',
    self_rating: '',
    kpi_agreed: '',
    empolyee_name: '',
    employee_date: '',
    manager_name: '',
    manager_date: '',
    formStatus: '',
    appraisalDone: false,
    part4ManagerComments: '',
    part5ManagerComments: '',
    part4ReviewerComments: '',
    part5ReviewerComments: '',
    canSeeManagerComments: false,
    canSeeReviewerComments: false,
  });

  const { token } = useParams();
  const [response1, setResponse1] = useState({});
  const [change, setChange] = useState(false)
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://aceapi.focusrtech.com:82/user/form-links/${token}`);
        setResponse1(response.data); // Assuming response.data contains the necessary data
        
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      }
    };
  
    fetchData();
  }, [change]); // Include token in the dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, selectedOption: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    try {
        console.log('Error fetching data:',response1)
        const filteredData = {};
  
        Object.keys(formData).forEach((key) => {
          if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
            filteredData[key] = formData[key];
          }
        });

      const response = await axios.put(`https://aceapi.focusrtech.com:82/user/handlesubmitted/${response1.tokens}`, formData);
      const response2 = await axios.post(`https://aceapi.focusrtech.com:82/user/team-member/remarks/${response1.employee_id}`, filteredData);
      
      setChange(true)
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };
  
  
  

  return !response1.submitted ? (
    <div style={{backgroundColor: "#f5e1d3", display:"flex", flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
        
        <div style={{ backgroundColor:"#b09280",marginTop:"3vh",marginBottom:"3vh", width: 'fit-content', marginBottom:"3vh", borderRadius:"10px", paddingTop:"1.5%", paddingBottom:"1.5%", paddingLeft:'5%', paddingRight:'5%'}} >
      <Typography variant="h3" align="center" >FOCUSR APPRAISAL - FORM</Typography>
      </div>
    <Container sx={{width : "40vw", display:"flex", flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
        
      <form onSubmit={handleSubmit}>
        
                {/* Add more input fields for other questions similarly */}
                <div>
          <Typography variant="subtitle1">Employee Code:</Typography>
          <TextField
            fullWidth
            name="employeeCode"
            placeholder='Enter your Employee Code'
            value={response1.employee_id}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <Typography variant="subtitle1">Designation:</Typography>
          <TextField
            fullWidth
            name="designation"
            placeholder='Enter your Designation'
            value={response1.designation}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <Typography variant="subtitle1">Date of Joining:</Typography>
          <TextField
            fullWidth
            name="dateOfJoining"
            placeholder='Enter your Date of Joining'
            value={response1.designation}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
        </div>
        {/* Continue adding input fields for other questions in a similar manner */}
        <div>
            <Typography variant="subtitle1">Appraisal Due date:</Typography>
            <TextField
                fullWidth
                name="appraisalDueDate"
                value={response1.appraisalDueDate}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Department:</Typography>
            <TextField
                fullWidth
                name="department"
                value={response1.department.dept_name}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                // defaultValue={response1.department.dept_name}
            />
            </div>
            <div>
            <Typography variant="subtitle1">Reporting Manager:</Typography>
            <TextField
                fullWidth
                name="reportingManager"
                value={formData.reportingManager}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Reviewer:</Typography>
            <TextField
                fullWidth
                name="reviewer"
                value={formData.reviewer}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            {/* Add remaining input fields for other questions */}
            <div>
            <Typography variant="subtitle1">Exact Previous Relevant Experience in domain (Before Joining FocusR - in years):</Typography>
            <TextField
                fullWidth
                name="exactPrevExp"
                value={formData.exactPrevExp}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Exact experience in FocusR (in years):</Typography>
            <TextField
                fullWidth
                name="focusRExp"
                value={formData.focusRExp}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Appropriate Total experience (in years):</Typography>
            <TextField
                fullWidth
                name="totalExp"
                value={formData.totalExp}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Performance Review Period:</Typography>
            <TextField
                fullWidth
                name="performanceReviewPeriod"
                value={formData.performanceReviewPeriod}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Team Member to state your understanding of your roles and responsibilities / objectives as agreed in last year’s appraisal / during joining. Managers to review and comment on the same:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="understandingRoles"
                value={formData.understandingRoles}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            {/* Add remaining input fields for other questions */}
            <div>
            <Typography variant="subtitle1">Last Year’s Accomplishments:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="lastYearAccomplishments"
                value={formData.lastYearAccomplishments}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Strengths:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="strengths"
                value={formData.strengths}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Development Needs:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="developmentNeeds"
                value={formData.developmentNeeds}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Team Member / Manager: Rating Performance Description</Typography>
            {/* Question 1: Attendance & Punctuality */}
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Attendance & Punctuality</InputLabel>
                <Select
                name="attendanceRating"
                value={formData.attendanceRating}
                onChange={handleSelectChange}
                label="Attendance & Punctuality"
                >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
                </Select>
            </FormControl>
            {/* Question 2: Technical Skills */}
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Technical Skills</InputLabel>
                <Select
                name="technicalSkillsRating"
                value={formData.technicalSkillsRating}
                onChange={handleSelectChange}
                label="Technical Skills"
                >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Utilization and Productivity</InputLabel>
            <Select
            name="utilizationProductivityRating"
            value={formData.utilizationProductivityRating}
            onChange={handleSelectChange}
            label="Utilization and Productivity"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
        </FormControl>
        {/* Question 6: Time Management & Organizational Skills */}
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Time Management & Organizational Skills</InputLabel>
            <Select
            name="timeManagementOrganizationalSkillsRating"
            value={formData.timeManagementOrganizationalSkillsRating}
            onChange={handleSelectChange}
            label="Time Management & Organizational Skills"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Interpersonal Skills</InputLabel>
            <Select
            name="interpersonalSkillsRating"
            value={formData.interpersonalSkillsRating}
            onChange={handleSelectChange}
            label="Interpersonal Skills"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
        </FormControl>
        {/* Question 8: Communication - Verbal & Written */}
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Communication - Verbal & Written</InputLabel>
            <Select
            name="communicationRating"
            value={formData.communicationRating}
            onChange={handleSelectChange}
            label="Communication - Verbal & Written"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Initiative, Innovation & Creativity</InputLabel>
            <Select
            name="innovationCreativityRating"
            value={formData.innovationCreativityRating}
            onChange={handleSelectChange}
            label="Initiative, Innovation & Creativity"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
        </FormControl>
        {/* Question 10: Teamwork */}
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Teamwork</InputLabel>
            <Select
            name="teamworkRating"
            value={formData.teamworkRating}
            onChange={handleSelectChange}
            label="Teamwork"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Client Focused</InputLabel>
            <Select
            name="clientFocusedRating"
            value={formData.clientFocusedRating}
            onChange={handleSelectChange}
            label="Client Focused"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
        </FormControl>
        {/* Question 12: Planning and Organizational Skills */}
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Planning and Organizational Skills</InputLabel>
            <Select
            name="planningOrganizationalSkillsRating"
            value={formData.planningOrganizationalSkillsRating}
            onChange={handleSelectChange}
            label="Planning and Organizational Skills"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Value Addition</InputLabel>
            <Select
            name="valueAdditionRating"
            value={formData.valueAdditionRating}
            onChange={handleSelectChange}
            label="Value Addition"
            >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="O">Outstanding</MenuItem>
            <MenuItem value="E">Exceeds expectations</MenuItem>
            <MenuItem value="M">Meets expectations</MenuItem>
            <MenuItem value="NI">Needs improvement</MenuItem>
            <MenuItem value="U">Unacceptable</MenuItem>
            </Select>
            </FormControl>

            {/* Continue adding dropdowns for other questions similarly */}
            </div>
            
            {/* Add remaining input fields for other questions */}
            <div>
            <Typography variant="subtitle1">Top 3 likes in the organization:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="top3Likes"
                value={formData.top3Likes}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Top 3 dislikes in the organization:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="top3Dislikes"
                value={formData.top3Dislikes}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Any Suggestion to Improve the organisation:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="suggestionsForImprovement"
                value={formData.suggestionsForImprovement}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">List the kind of work or job would you like to be doing in one/two/five years time:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="futureWork"
                value={formData.futureWork}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">List the actions you have taken to make yourself indispensable:</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="actionsForIndispensability"
                value={formData.actionsForIndispensability}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Do you want to explore your skills areas other than your present work?</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="exploreSkills"
                value={formData.exploreSkills}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">What sort of training/experiences would benefit you in the next year?</Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                name="trainingNeeds"
                value={formData.trainingNeeds}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            <div>
            <Typography variant="subtitle1">Self Rating (out of 10):</Typography>
            <TextField
                fullWidth
                name="selfRating"
                value={formData.selfRating}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            </div>
            {/* Add remaining input fields for other questions */}



            <div style={{marginBottom: "2vh", marginTop:"2vh"}}>
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
            </div>
      </form>
    </Container>
    </div>
    
  ):
  (<div style={{display: "flex", justifyContent: "center", alignItems: "center", height:'100vh'}}>
    <Typography variant="subtitle1">{`you have already Submitted the Form :-)`}</Typography>
    </div>);
};

export default FormPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, MenuItem, FormControl, InputLabel, Typography, Container, Select } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import {
//   Field,
//   makeStyles,
//   Textarea,
//   tokens,
//   useId,
//   RadioGroup, Radio,
//   DefaultButton, Stack,
// } from "@fluentui/react-components";

// const useStyles = makeStyles({
//   base: {
//     display: "flex",
//     flexDirection: "column",
//     maxWidth: "500px",
//   },
//   field: {
//     display: "grid",
//     gridRowGap: tokens.spacingVerticalXXS,
//     padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
//     marginBottom: tokens.spacingHorizontalNone,
//     rowGap: tokens.spacingVerticalMNudge,
//   },
// });



// const FormPage = () => {
//   const styles = useStyles();
//   const selectId = useId();
//   const classes = useStyles();

//   const [formData, setFormData] = useState({
//     name: '',
//     employee_id: '',
//     designation: '',
//     data_of_joining: '',
//     appraisal_due_date: '',
//     department: '',
//     reporting_manager: '',
//     reviewer: '',
//     previous_experience: '',
//     exact_experience: '',
//     total_experience: '',
//     performance_review_period: '',
//     question_1: '',
//     question_2: '',
//     question_3: '',
//     question_4: '',
//     attendance_and_punctuality: '',
//     technical_skills: '',
//     quality_of_work: '',
//     new_knowledge: '',
//     utilization_and_productivity: '',
//     organize_plans: '',
//     interpersonal_skills: '',
//     communication: '',
//     initiative_innovative_creativity: '',
//     teamwork: '',
//     client_focused: '',
//     planning_and_organizing: '',
//     organization_feedback: '',
//     traning_need_analysis: '',
//     self_rating: '',
//     kpi_agreed: '',
//     empolyee_name: '',
//     employee_date: '',
//     manager_name: '',
//     manager_date: '',
//     formStatus: '',
//     appraisalDone: false,
//     part4ManagerComments: '',
//     part5ManagerComments: '',
//     part4ReviewerComments: '',
//     part5ReviewerComments: '',
//     canSeeManagerComments: false,
//     canSeeReviewerComments: false,
// });

//   const { token } = useParams();
//   const [response1, setResponse1] = useState({});
//   const [change, setChange] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`https://aceapi.focusrtech.com:82/user/form-links/${token}`);
//         setResponse1(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [change]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRadioChange = (e, value) => {
//     setFormData({ ...formData, attendanceRating: value });
//   };


//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.put(`https://aceapi.focusrtech.com:82/user/handleSubmitted/${response1.tokens}`, formData);
//       setChange(true);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };





//   return !response1.submitted ? (

//     <div style={{
//       backgroundImage: "url('/Media.jfif')",
//       backgroundSize: "cover",
//       backgroundRepeat: "repeat",
//       backgroundAttachment: "fixed",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center"
//     }}>



//       <div style={{
//         backgroundColor: "#0270C5",
//         marginTop: "6vh", width: 'fit-content', marginBottom: "0vh", borderRadius: "10px 10px 0px 0px", paddingTop: "1.5%", paddingBottom: "1.5%", paddingLeft: '18%', paddingRight: '12%'
//       }}>
//         <Typography variant="h4" color="white" style={{
//           textAlign: 'left'
//         }}>FOCUSR APPRAISAL - FORM</Typography>

//       </div>




//       <Container sx={{
//         backgroundColor: "#E8F1F9",
//         width: "65vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "0px 0px 10px 10px", borderTop: "none", marginBottom: "5vh", paddingTop: "2em"
//       }}>

//         <form onSubmit={handleSubmit}>





//           <div className={classes.field}>
//             <Typography variant="subtitle1">
//               1. Team Member to state your understanding of your roles and responsibilities / objectives as agreed in last year’s appraisal / during joining. Managers to review and comment on the same
//               <span style={{ color: 'red' }}> *</span>
//             </Typography>
//             <Field size="large">
//             <Textarea
//         name="question_1"
//         value={formData.question_1}
//         onChange={handleInputChange}
//         required
        
//         style={{ width: '100%' }} // Ensures it takes full width
//       />
//             </Field>
//           </div>



//           {/* Add remaining input fields for other questions */}
//           <div className={classes.field}>
//             <Typography variant="subtitle1">2.Last Year’s Accomplishments <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//              <Textarea
//           name="question_2"
//           value={formData.question_2}
//           onChange={handleInputChange}
//           required
          
          
          
//         />

//             </Field>

//           </div>
//           <div className={classes.field}>
//             <Typography variant="subtitle1">3.Strength's <span style={{ color: 'red' }}> *</span>  </Typography>

//             <Field size="large"
//             >
//               <Textarea
//           name="question_3"
//           value={formData.question_3}
//           onChange={handleInputChange}
//           required
          
//           style={{ width: '100%' }} // Full width
//         />

//             </Field>

//           </div>

//           <div className={classes.field}>
//             <Typography variant="subtitle1">4.Development Needs <span style={{ color: 'red' }}> *</span> </Typography>

//             <Field size="large"
//             >
//                <Textarea
//           name="question_4"
//           value={formData.question_4}
//           onChange={handleInputChange}
//           required
          
//           style={{ width: '100%' }}
//         />

//             </Field>

//           </div>




//           <div className={classes.field} styles={{ text: { color: 'black' } }} >
//             <Typography variant="subtitle1">5.Team Member / Manager: Rating Performance Description <span style={{ color: 'red' }}> *</span>  </Typography>

//             <div>
//               <Typography variant="subtitle1">Attendance & Punctuality</Typography>
//               <RadioGroup
//                 name="attendanceRating"
//                 selectedValue={formData.attendance_and_punctuality}
//                 onSelectedValueChange={handleRadioChange}
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>


//             {/* Question 2: Technical Skills */}
//             <div>
//               <Typography variant="subtitle1">6.Technical Skills <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="technical_skills"
//                 value={formData.technical_skills}
//                 onChange={handleSelectChange}
//                 label="Technical Skills"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>



//             <div>
//               <Typography variant="subtitle1">7.Utilization and Productivity <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="utilization_and_productivity"
//                 value={formData.utilization_and_productivity}
//                 onChange={handleSelectChange}
//                 label="Utilization and Productivity"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>

//             {/* <div>
//               <Typography variant="subtitle1">8.Time Management & Organizational Skills <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="timeManagementOrganizationalSkillsRating"
//                 value={formData.timeManagementOrganizationalSkillsRating}
//                 onChange={handleSelectChange}
//                 label="Time Management & Organizational Skills"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div> */}

//             <div>
//               <Typography variant="subtitle1">9.Interpersonal Skills <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="interpersonal_skills"
//                 value={formData.interpersonal_skills}
//                 onChange={handleSelectChange}
//                 label="Interpersonal Skills"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>

//             <div>
//               <Typography variant="subtitle1">10.Communication - Verbal & Written <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="communication"
//                 value={formData.communication}
//                 onChange={handleSelectChange}
//                 label="Communication - Verbal & Written"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>

//             <div>
//               <Typography variant="subtitle1">11.Initiative, Innovation & Creativity <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="initiative_innovative_creativity"
//                 value={formData.initiative_innovative_creativity}
//                 onChange={handleSelectChange}
//                 label="Initiative, Innovation & Creativity"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>

//             <div>
//               <Typography variant="subtitle1">12.Teamwork <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="teamwork"
//                 value={formData.teamwork}
//                 onChange={handleSelectChange}
//                 label="Teamwork"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>


//             <div>
//               <Typography variant="subtitle1">13.Client Focused <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="client_focused"
//                 value={formData.client_focused}
//                 onChange={handleSelectChange}
//                 label="Client Focused"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
//             <div>
//               <Typography variant="subtitle1">14.Planning and Organizational Skills <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="planning_and_organizing"
//                 value={formData.planning_and_organizing}
//                 onChange={handleSelectChange}
//                 label="Planning and Organizational Skills"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>

//             {/* <div>
//               <Typography variant="subtitle1">15.Value Addition <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="valueAdditionRating"
//                 value={""}
//                 onChange={handleSelectChange}
//                 label="Value Addition"
//                 required
//               >
//                 <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div> */}




//             {/* Continue adding dropdowns for other questions similarly */}
//           </div>

//           {/* Add remaining input fields for other questions */}


//           {/* <div className={classes.field}>
//             <Typography variant="subtitle1">16.Top 3 likes in the organization <span style={{ color: 'red' }}> *</span>  </Typography>

//             <Field size="large">
//               <Textarea
//                 name="top3Likes"
//                 value={""}
//                 onChange={handleInputChange} required />
//             </Field>

//           </div> */}


//           {/* <div className={classes.field}>
//             <Typography variant="subtitle1">17.Top 3 dislikes in the organization <span style={{ color: 'red' }}> *</span>  </Typography>

//             <Field size="large">
//               <Textarea
//                 name="top3Dislikes"
//                 value={""}
//                 onChange={handleInputChange} required />
//             </Field>

//           </div> */}

//           {/* <div className={classes.field}>
//             <Typography variant="subtitle1">18.Any Suggestion to Improve the organisation <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="suggestionsForImprovement"
//                 value={""}
//                 onChange={handleInputChange} required />
//             </Field>

//           </div> */}

//           {/* <div className={classes.field}>
//             <Typography variant="subtitle1">19.List the kind of work or job would you like to be doing in one/two/five years time <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="futureWork"
//                 value={""}
//                 onChange={handleInputChange} required />
//             </Field>

//           </div> */}

//           {/* <div className={classes.field}>
//             <Typography variant="subtitle1">20.List the actions you have taken to make yourself indispensable <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="actionsForIndispensability"
//                 value={""}
//                 onChange={handleInputChange} required />
//             </Field>

//           </div> */}

//           {/* <div className={classes.field}>
//             <Typography variant="subtitle1">21.Do you want to explore your skills areas other than your present work? <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="exploreSkills"
//                 value={""}
//                 onChange={handleInputChange} required />
//             </Field>

//           </div> */}



//           <div className={classes.field}>
//             <Typography variant="subtitle1">22.What sort of training/experiences would benefit you in the next year? <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="traning_need_analysis"
//                 value={formData.traning_need_analysis}
//                 onChange={handleInputChange} required />
//             </Field>

//           </div>










//           <div className={classes.field}>
//             <Typography variant="subtitle1" >23.Self Rating (out of 10) <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="small">
//               <Textarea
//                 name="self_rating"
//                 value={formData.self_rating}
//                 onChange={handleInputChange} required />
//             </Field>
//           </div>




//           <div style={{ marginBottom: "4vh", marginTop: "2vh", width: "10%", marginLeft: "2vh" }}>
//             <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
//           </div>
//         </form>
//       </Container>
//     </div >
//     // </div>

//   ) :

//     (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh' }}>
//       <Typography variant="subtitle1">{`you have already Submitted the Form :-)`}</Typography>
//     </div>);
// };

// export default FormPage;

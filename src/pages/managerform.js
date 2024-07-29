// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, MenuItem, FormControl, InputLabel, Typography, Container, Select } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { DismissSquareRegular, CalendarInfoRegular, CalendarLtr28Regular, CalendarSparkle28Regular, Bookmark28Regular, CalendarCheckmark28Regular, Open20Regular  } from '@fluentui/react-icons';
// import {
//   Field,
//   makeStyles,
//   Textarea,
//   tokens,
//   useId,
//   RadioGroup, Radio,
//   DefaultButton, Stack,
// } from "@fluentui/react-components";
// import imgurl2 from '../media/formstart.jpg';
// import imgurl1 from '../media/logo1000.png';
// import { Modal } from 'antd';
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
//     marginTop:'20px',
//   },
//   field1: {
//     display: "grid",
//     gridRowGap: tokens.spacingVerticalXXS,
//     padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
//     marginBottom: tokens.spacingHorizontalNone,
//     rowGap: tokens.spacingVerticalMNudge,
//     backgroundColor:'blue'
//   },
//   details:{
//     display:'flex',
   
   
//   }
// });
 
 
 
// const FormPage = () => {
//   const styles = useStyles();
//   const selectId = useId();
//   const classes = useStyles();
//   const [start, setStart] = useState(false);
//   const [isOpen, setIsOpen] = useState(true);
//   const [formData, setFormData] = useState({
//     name: null,
//     employee_id: null,
//     designation: null,
//     date_of_joining: null,
//     appraisal_due_date: null,
//     department: {},
//     reporting_manager: null,
//     reviewer: null,
//     previous_experience: null,
//     exact_experience: null,
//     total_experience: null,
//     performance_review_period: null,
//     question_1: null,
//     question_2: null,
//     question_3: null,
//     question_4: null,
//     attendance_and_punctuality: null,
//     technical_skills: null,
//     quality_of_work: null,
//     new_knowledge: null,
//     utilization_and_productivity: null,
//     organize_plans: null,
//     interpersonal_skills: null,
//     communication: null,
//     initiative_innovative_creativity: null,
//     teamwork: null,
//     client_focused: null,
//     planning_and_organizing: null,
//     organization_feedback: null,
//     top3LikeOrganization:null,
//     top3disLikeOrganization:null,
//     suggestionToImprove:null,
//     future5years:null,
//     indispencible :null,
//     exploreSkills:null,
//     traning_need_analysis: null,
//     self_rating: null,
//     kpi_agreed: null,
//     organize_plans: null,
//     organization_feedback: null,
//     empolyee_name: null,
//     employee_date: null,
//     manager_name: null,
//     manager_date: null,
//     formStatus: null,
 
//     appraisalDone: false,
   
//     canSeeManagerComments: false,
//     canSeeReviewerComments: false,
// });
 
// const [formData1, setFormData1] = useState({
//   question_1: null,
//   question_2: null,
//   question_3: null,
//   question_4: null,
//   attendance_and_punctuality: null,
//   technical_skills: null,
//   utilization_and_productivity: null,
//   quality_of_work: null,
//   interpersonal_skills: null,
//   communication: null,
//   initiative_innovative_creativity: null,
//   teamwork: null,
//   client_focused: null,
//   planning_and_organizing: null,
//   new_knowledge: null,
//   top3LikeOrganization:null,
//   top3disLikeOrganization:null,
//   suggestionToImprove:null,
//   future5years:null,
//   indispencible :null,
//   exploreSkills:null,
//   traning_need_analysis: null,
//   self_rating: null
// })
 
//   const { token } = useParams();
//   const [response1, setResponse1] = useState({});
//   const [change, setChange] = useState(false);
//   // const imgurl2 = url('../media/formstart.jpg')
 
 
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8004/user/form-links/${token}`);
//         setResponse1(response.data);
//         formData.name = response1.employee_name;
//         formData.employee_id = response1.employee_id;
//         formData.designation = response1.designation;
//         formData.date_of_joining  = response1.date_of_joining;
//         formData.appraisal_due_date = response1.appraisal_date;
//         formData.department = response.data.department.dept_name;
//         formData.reporting_manager = response1.manager;
//         formData.previous_experience = response1.previous_experience;
//         formData.exact_experience = response1.exact_experience;
//         formData.total_experience = response1.total_experience;
//         formData.performance_review_period = response1.performance_review_period;
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
 
//     fetchData();
//   }, [change, token]);
 
 
//   // const year = response1.date_of_joining.getFullYear();

//   // const handleRowClick = async (employee) => {
//   //   try {
//   //     const response1 = await axios.get(`http://127.0.0.1:8004/user/team-member/remarks/${employee.employee_id}`);
//   //     setformdataemployee(response1.data);
      
      
//   //   } catch (err) {
//   //     setformdataemployee({ "question_1": "" , "canSeeManagerComments":"false"});
//   //   }
//   // }
 
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData1({ ...formData1, [name]: value });
//     setFormData ({ ...formData, [name]: value})
//   };
 
//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setFormData1({ ...formData1, [name]: value });
//     setFormData ({ ...formData, [name]: value})
//   };
 
//   // const handleRadioChange = (e, value) => {
//   //   setFormData1({ ...formData, attendance_and_punctuality: value });
//   // };
 
 
//   const handleSubmit = async (event) => {
//     event.preventDefault();
   
//     try {
//         console.log('Error fetching data:',response1)
//         const filteredData = {};
 
//         Object.keys(formData).forEach((key) => {
//           if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
//             filteredData[key] = formData[key];
//           }
//         });
 
//       const response = await axios.put(`http://127.0.0.1:8004/user/handlesubmitted/${response1.tokens}`,{"h1":"Hello"});
//       const response2 = await axios.post(`http://127.0.0.1:8004/user/team-member/remarks/${response1.employee_id}`, formData);
     
//       setChange(true)
//       setStart(false);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while processing your request.');
//     }
//   };
 
//   const allFieldsFilled = () => {
//     for (const key in formData1) {
//       if (formData1[key] === null || formData1[key] === "") {
//         console.log(`Field '${key}' is either null or empty.`);
//         return false;
//       }
//     }
//     console.log('All fields are filled.');
//     return true;
//   };
 
 
 
 
//   formData.name = response1.employee_name;
//   formData.employee_id = response1.employee_id;
//   formData.designation = response1.designation;
//   formData.date_of_joining = response1.date_of_joining;
//   formData.appraisal_due_date = response1.appraisal_date;
//   // formData.department = response1.department.dept_name;
//   // formData.manager = response1.manager;
//   formData.previous_experience = response1.previous_experience;
//   formData.exact_experience = response1.exact_experience;
//   formData.total_experience = response1.total_experience;
//   formData.performance_review_period = response1.performance_review_period;
 
//   return !response1.submitted ? start?(
 
//     <div className='formpage'>
 
 
//     <div className='inner-div'>
//     <Container sx={{
//     backgroundColor: "rgb(0, 81, 161)",
//     width: "65vw",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: "10px 10px 0 0",
//     borderTop: "none",  
//     paddingTop: "0.5em",
//     paddingBottom: "0.5em",
//     fontSize: "40px",
//     color: "white",
//     marginTop: '5vh',
//     '@media (max-width: 768px)': {
//         backgroundColor: "rgb(0, 81, 161)",
//         width: '95vw'
//     }
// }}>
//         <Typography >FOCUSR APPRAISAL - FORM</Typography>
 
//       </Container>
 
 
 
 
//       <Container sx={{
//         backgroundColor: "rgba(197, 229, 255, 0.95)",
//         width: "65vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "0px 0px 10px 10px", borderTop: "none", marginBottom: "5vh", paddingTop: "2em", '@media (max-width: 768px)': {
//           width: '95vw'}
//       }}>
 
//         <form onSubmit={handleSubmit}>
 
 
 
 
           
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1">
//               1. Team Member to states your understanding of your roles and responsibilities / objectives as agreed in last yearâ€™s appraisal / during joining. Managers to review and comment on the same
//               <span style={{ color: 'red' }}> *</span>
//             </Typography>
//             <Field size="large">
//             <Textarea
//         // name="question_1"
//         // value={formData1.question_1}
//         readOnly={true}
//         style={{ width: '100%' }} // Ensures it takes full width
//       />
//             <Textarea
//         name="question_1"
//         value={formData1.question_1}
//         onChange={handleInputChange}
//         required
       
//         style={{ width: '100%' }} // Ensures it takes full width
//       />
//             </Field>
//           </div>
 
 
 
//           {/* Add remaining input fields for other questions */}
//           <div className={classes.field}>
//             <Typography variant="subtitle1">2.Last Year's Accomplishments <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//              <Textarea
//           name="question_2"
//           value={formData1.question_2}
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
//           value={formData1.question_3}
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
//           value={formData1.question_4}
//           onChange={handleInputChange}
//           required
         
//           style={{ width: '100%' }}
//         />
 
//             </Field>
 
//           </div>
 
 
 
 
//           <div className={classes.field} styles={{ text: { color: 'black' } }} >
//             <Typography variant="subtitle1">5.Team Member / Manager: Rating Performance Description <span style={{ color: 'red' }}> *</span>  </Typography>
 
//             <div >
//               <Typography variant="subtitle1">Attendance & Punctuality</Typography>
//               <RadioGroup
//                 name="attendance_and_punctuality"
//                 value={formData1.attendance_and_punctuality}
//                 onChange={handleSelectChange}
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
 
//             {/* Question 2: Technical Skills */}
//             <div className={classes.field}>
//               <Typography variant="subtitle1">6.Technical Skills <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="technical_skills"
//                 value={formData1.technical_skills}
//                 onChange={handleSelectChange}
//                 label="Technical Skills"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
 
 
//             <div className={classes.field}>
//               <Typography variant="subtitle1">7.Utilization and Productivity <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="utilization_and_productivity"
//                 value={formData1.utilization_and_productivity}
//                 onChange={handleSelectChange}
//                 label="Utilization and Productivity"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
//             <div className={classes.field}>
//               <Typography variant="subtitle1">8.Time Management & Organizational Skills <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="quality_of_work"
//                 value={formData1.quality_of_work}
//                 onChange={handleSelectChange}
//                 label="Time Management & Organizational Skills"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
//             <div className={classes.field}>
//               <Typography variant="subtitle1">9.Interpersonal Skills <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="interpersonal_skills"
//                 value={formData1.interpersonal_skills}
//                 onChange={handleSelectChange}
//                 label="Interpersonal Skills"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
//             <div className={classes.field}>
//               <Typography variant="subtitle1">10.Communication - Verbal & Written <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="communication"
//                 value={formData1.communication}
//                 onChange={handleSelectChange}
//                 label="Communication - Verbal & Written"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
//             <div className={classes.field}>
//               <Typography variant="subtitle1">11.Initiative, Innovation & Creativity <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="initiative_innovative_creativity"
//                 value={formData1.initiative_innovative_creativity}
//                 onChange={handleSelectChange}
//                 label="Initiative, Innovation & Creativity"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
//             <div className={classes.field}>
//               <Typography variant="subtitle1">12.Teamwork <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="teamwork"
//                 value={formData1.teamwork}
//                 onChange={handleSelectChange}
//                 label="Teamwork"
//                 required
//               >
//                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
 
//             <div className={classes.field}>
//               <Typography variant="subtitle1">13.Client Focused <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="client_focused"
//                 value={formData1.client_focused}
//                 onChange={handleSelectChange}
//                 label="Client Focused"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
//             <div className={classes.field}>
//               <Typography variant="subtitle1">14.Planning and Organizational Skills <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="planning_and_organizing"
//                 value={formData1.planning_and_organizing}
//                 onChange={handleSelectChange}
//                 label="Planning and Organizational Skills"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
//             <div className={classes.field}>
//               <Typography variant="subtitle1">15.Value Addition <span style={{ color: 'red' }}> *</span>  </Typography>
//               <RadioGroup
//                 name="new_knowledge"
//                 value={formData1.new_knowledge}
//                 onChange={handleSelectChange}
//                 label="Value Addition"
//                 required
//               >
//                 <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
//                 <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
//                 <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
//                 <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
//                 <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
//               </RadioGroup>
//             </div>
 
 
 
 
//             {/* Continue adding dropdowns for other questions similarly */}
//           </div>
 
//           {/* Add remaining input fields for other questions */}
 
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1">16.Top 3 likes in the organization <span style={{ color: 'red' }}> *</span>  </Typography>
 
//             <Field size="large">
//               <Textarea
//                 name="top3LikeOrganization"
//                 value={formData1.top3LikeOrganization}
//                 onChange={handleInputChange} required />
//             </Field>
 
//           </div>
 
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1">17.Top 3 dislikes in the organization <span style={{ color: 'red' }}> *</span>  </Typography>
 
//             <Field size="large">
//               <Textarea
//                 name="top3disLikeOrganization"
//                 value={formData1.top3disLikeOrganization}
//                 onChange={handleInputChange} required />
//             </Field>
 
//           </div>
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1">18.Any Suggestion to Improve the organisation <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="suggestionToImprove"
//                 value={formData1.suggestionToImprove}
//                 onChange={handleInputChange} required />
//             </Field>
 
//           </div>
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1">19.List the kind of work or job would you like to be doing in one/two/five years time <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="future5years"
//                 value={formData1.future5years}
//                 onChange={handleInputChange} required />
//             </Field>
 
//           </div>
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1">20.List the actions you have taken to make yourself indispensable <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="indispencible"
//                 value={formData1.indispencible}
//                 onChange={handleInputChange} required />
//             </Field>
 
//           </div>
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1">21.Do you want to explore your skills areas other than your present work? <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="exploreSkills"
//                 value={formData1.exploreSkills}
//                 onChange={handleInputChange} required />
//             </Field>
 
//           </div>
 
 
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1">22.What sort of training/experiences would benefit you in the next year? <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="large"
//             >
//               <Textarea
//                 name="traning_need_analysis"
//                 value={formData1.traning_need_analysis}
//                 onChange={handleInputChange} required />
//             </Field>
 
//           </div>
 
 
 
 
 
 
 
 
 
 
//           <div className={classes.field}>
//             <Typography variant="subtitle1" >23.Self Rating (out of 10) <span style={{ color: 'red' }}> *</span>  </Typography>
//             <Field size="small">
//               <Textarea
//                 name="self_rating"
//                 value={formData1.self_rating}
//                 onChange={handleInputChange} required />
//             </Field>
//           </div>
 
 
 
 
//           <div style={{ marginBottom: "4vh", marginTop: "2vh", width: "10%", marginLeft: "2vh" }}>
//             <Button type="submit" variant="contained" disabled={!allFieldsFilled()} color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
//           </div>
//         </form>
//       </Container>
//     </div >
//      </div>
 
//   ) :
//   <div className='outer-container'>
//   <div style={{ position: 'absolute', top: '20px', right: '20px', height: '60px', width: 'auto' }}>
//     <img src={imgurl1} alt="Description" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//   </div>
 
//   <div className="split-container">
//     <div className="text-container">
//       <h1 style={{ color: 'rgb(52, 52, 52)', marginTop: '20px' }}>Appraisal Form</h1>
//       <div style={{ marginTop: '20px', marginBottom: '10px' }}>
//         <h2 style={{ marginLeft: '5px', marginRight: '5px' }}>{response1.employee_name} </h2>
//         <h4 style={{ marginLeft: '5px', marginRight: '5px', display:'flex',alignItems:'center' }}>{response1.employee_id} <Open20Regular  onClick={()=>setIsOpen(true)}/></h4>
 
       
 
//         <Modal
//       title="Details"
//       visible={isOpen}
//       onCancel={()=> setIsOpen(false)}
//       style={{width:'30vw'}}
//       footer={[
//         <Button key="close" onClick={() => setIsOpen(false)}>
//           Close
//         </Button>,
//       ]}
//     >
//       {response1 ? (
//         <div>
 
//            <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter'  }}>Designation : {response1.designation}</h2>
//            <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter' }}>Date of Birth : {response1.dob}</h2>
//         <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter' }}>Date of Joining : {response1.date_of_joining}</h2>
       
//         <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter' }}>Date of Appraisal : {response1.appraisal_date}</h2>
//         <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter' }}>Experience before FocusR : {response1.experience_in_domain_before_focusr}</h2>
//           {/* Display other details as needed */}
//         </div>
//       ) : (
//         <p>Loading details...</p>
//       )}
//     </Modal>
       
       
//       </div>
//       <Button style={{ marginBottom: '20px' }} type="submit" variant="contained" color="primary" onClick={() => { setStart(true) }}>Start</Button>
//     </div>
//     <div className="image-container">
//       <img src={imgurl2} alt="Description" />
//     </div>
//   </div>
// </div>
//     :
 
//     (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh', }}>
//       <Typography variant="subtitle1">{"Thanks for Submitting the Form 😊"}</Typography>
//     </div>)
// };
 
// export default FormPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, FormControl, InputLabel, Typography, Container, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DismissSquareRegular, CalendarInfoRegular, CalendarLtr28Regular, CalendarSparkle28Regular, Bookmark28Regular, CalendarCheckmark28Regular, Open20Regular  } from '@fluentui/react-icons';
import {
  Field,
  makeStyles,
  Textarea,
  tokens,
  useId,
  RadioGroup, Radio,
  DefaultButton, Stack,
} from "@fluentui/react-components";
import imgurl2 from '../media/formstart.jpg';
import imgurl1 from '../media/logo1000.png';
import { Modal } from 'antd';
const useStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
  },
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalXXS,
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
    marginBottom: tokens.spacingHorizontalNone,
    rowGap: tokens.spacingVerticalMNudge,
    marginTop:'20px',
  },
  field1: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalXXS,
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
    marginBottom: tokens.spacingHorizontalNone,
    rowGap: tokens.spacingVerticalMNudge,
    backgroundColor:'blue'
  },
  details:{
    display:'flex',
   
   
  }
});
 
 
 
const FormPage = () => {
  const styles = useStyles();
  const selectId = useId();
  const classes = useStyles();
  const [start, setStart] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: null,
    employee_id: null,
    designation: null,
    date_of_joining: null,
    appraisal_due_date: null,
    department: {},
    reporting_manager: null,
    reviewer: null,
    previous_experience: null,
    exact_experience: null,
    total_experience: null,
    performance_review_period: null,
    question_1: null,
    question_2: null,
    question_3: null,
    question_4: null,
    attendance_and_punctuality: null,
    technical_skills: null,
    quality_of_work: null,
    new_knowledge: null,
    utilization_and_productivity: null,
    organize_plans: null,
    interpersonal_skills: null,
    communication: null,
    initiative_innovative_creativity: null,
    teamwork: null,
    client_focused: null,
    planning_and_organizing: null,
    organization_feedback: null,
    top3LikeOrganization:null,
    top3disLikeOrganization:null,
    suggestionToImprove:null,
    future5years:null,
    indispencible :null,
    exploreSkills:null,
    traning_need_analysis: null,
    self_rating: null,
    kpi_agreed: null,
    organize_plans: null,
    organization_feedback: null,
    empolyee_name: null,
    employee_date: null,
    manager_name: null,
    manager_date: null,
    formStatus: null,
 
    appraisalDone: false,
   
    canSeeManagerComments: false,
    canSeeReviewerComments: false,
});
 
const [formData1, setFormData1] = useState({
  question_1: null,
  question_2: null,
  question_3: null,
  question_4: null,
  attendance_and_punctuality: null,
  technical_skills: null,
  utilization_and_productivity: null,
  quality_of_work: null,
  interpersonal_skills: null,
  communication: null,
  initiative_innovative_creativity: null,
  teamwork: null,
  client_focused: null,
  planning_and_organizing: null,
  new_knowledge: null,
  top3LikeOrganization:null,
  top3disLikeOrganization:null,
  suggestionToImprove:null,
  future5years:null,
  indispencible :null,
  exploreSkills:null,
  traning_need_analysis: null,
  self_rating: null
})
 
  const { token } = useParams();
  const [response1, setResponse1] = useState({});
  const [change, setChange] = useState(false);
  // const imgurl2 = url('../media/formstart.jpg')
 
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8004/user/form-links/${token}`);
        setResponse1(response.data);
        formData.name = response1.employee_name;
        formData.employee_id = response1.employee_id;
        formData.designation = response1.designation;
        formData.date_of_joining  = response1.date_of_joining;
        formData.appraisal_due_date = response1.appraisal_date;
        formData.department = response.data.department.dept_name;
        formData.reporting_manager = response1.manager;
        formData.previous_experience = response1.previous_experience;
        formData.exact_experience = response1.exact_experience;
        formData.total_experience = response1.total_experience;
        formData.performance_review_period = response1.performance_review_period;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, [change, token]);
 
 
  // const year = response1.date_of_joining.getFullYear();
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
    setFormData ({ ...formData, [name]: value})
  };
 
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
    setFormData ({ ...formData, [name]: value})
  };
 
  // const handleRadioChange = (e, value) => {
  //   setFormData1({ ...formData, attendance_and_punctuality: value });
  // };
 
 
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
 
      const response = await axios.put(`http://127.0.0.1:8004/user/handlesubmitted/${response1.tokens}`,{"h1":"Hello"});
      const response2 = await axios.post(`http://127.0.0.1:8004/user/team-member/remarks/${response1.employee_id}`, formData);
     
      setChange(true)
      setStart(false);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };
 
  const allFieldsFilled = () => {
    for (const key in formData1) {
      if (formData1[key] === null || formData1[key] === "") {
        console.log(`Field '${key}' is either null or empty.`);
        return false;
      }
    }
    console.log('All fields are filled.');
    return true;
  };
 
 
 
 
  formData.name = response1.employee_name;
  formData.employee_id = response1.employee_id;
  formData.designation = response1.designation;
  formData.date_of_joining = response1.date_of_joining;
  formData.appraisal_due_date = response1.appraisal_date;
  // formData.department = response1.department.dept_name;
  // formData.manager = response1.manager;
  formData.previous_experience = response1.previous_experience;
  formData.exact_experience = response1.exact_experience;
  formData.total_experience = response1.total_experience;
  formData.performance_review_period = response1.performance_review_period;
 
  return !response1.submitted ? start?(
 
    <div className='formpage'>
 
 
    <div className='inner-div'>
    <Container sx={{
    backgroundColor: "rgb(0, 81, 161)",
    width: "65vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px 10px 0 0",
    borderTop: "none",  
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    fontSize: "40px",
    color: "white",
    marginTop: '5vh',
    '@media (max-width: 768px)': {
        backgroundColor: "rgb(0, 81, 161)",
        width: '95vw'
    }
}}>
        <Typography >FOCUSR APPRAISAL - FORM</Typography>
 
      </Container>
 
 
 
 
      <Container sx={{
        backgroundColor: "rgba(197, 229, 255, 0.95)",
        width: "65vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "0px 0px 10px 10px", borderTop: "none", marginBottom: "5vh", paddingTop: "2em", '@media (max-width: 768px)': {
          width: '95vw'}
      }}>
 
        <form onSubmit={handleSubmit}>
 
 
 
 
           
 
          <div className={classes.field}>
            <Typography variant="subtitle1">
              1. Team Member to state your understanding of your roles and responsibilities / objectives as agreed in last yearâ€™s appraisal / during joining. Managers to review and comment on the same
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Field size="large">
            <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
            <Textarea
        name="question_1"
        value={formData1.question_1}
        onChange={handleInputChange}
        required
       
        style={{ width: '100%' }} // Ensures it takes full width
      />
            </Field>
          </div>
 
 
 
          {/* Add remaining input fields for other questions */}
          <div className={classes.field}>
            <Typography variant="subtitle1">2.Last Year's Accomplishments <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
             <Textarea
          name="question_2"
          value={formData1.question_2}
          onChange={handleInputChange}
          required
         
         
         
        />
 
            </Field>
 
 
          </div>
 
         
          <div className={classes.field}>
            <Typography variant="subtitle1">3.Strength's <span style={{ color: 'red' }}> *</span>  </Typography>
 
            <Field size="large"
            >
              <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
              <Textarea
          name="question_3"
          value={formData1.question_3}
          onChange={handleInputChange}
          required
         
          style={{ width: '100%' }} // Full width
        />
 
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">4.Development Needs <span style={{ color: 'red' }}> *</span> </Typography>
 
            <Field size="large"
            >
              <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
               <Textarea
          name="question_4"
          value={formData1.question_4}
          onChange={handleInputChange}
          required
         
          style={{ width: '100%' }}
        />
 
            </Field>
 
          </div>
 
 
 
 
          <div className={classes.field} styles={{ text: { color: 'black' } }} >
            <Typography variant="subtitle1">5.Team Member / Manager: Rating Performance Description <span style={{ color: 'red' }}> *</span>  </Typography>
 
            <div className={classes.field}>
              <Typography variant="subtitle1">Attendance & Punctuality <span style={{ color: 'red' }}> *</span></Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="attendance_and_punctuality"
                value={formData1.attendance_and_punctuality}
                onChange={handleSelectChange}
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
 
            {/* Question 2: Technical Skills */}
            <div className={classes.field}>
              <Typography variant="subtitle1">6.Technical Skills <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="technical_skills"
                value={formData1.technical_skills}
                onChange={handleSelectChange}
                label="Technical Skills"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
 
 
            <div className={classes.field}>
              <Typography variant="subtitle1">7.Utilization and Productivity <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="utilization_and_productivity"
                value={formData1.utilization_and_productivity}
                onChange={handleSelectChange}
                label="Utilization and Productivity"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div className={classes.field}>
              <Typography variant="subtitle1">8.Time Management & Organizational Skills <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="quality_of_work"
                value={formData1.quality_of_work}
                onChange={handleSelectChange}
                label="Time Management & Organizational Skills"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div className={classes.field}>
              <Typography variant="subtitle1">9.Interpersonal Skills <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="interpersonal_skills"
                value={formData1.interpersonal_skills}
                onChange={handleSelectChange}
                label="Interpersonal Skills"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div className={classes.field}>
              <Typography variant="subtitle1">10.Communication - Verbal & Written <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="communication"
                value={formData1.communication}
                onChange={handleSelectChange}
                label="Communication - Verbal & Written"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div className={classes.field}>
              <Typography variant="subtitle1">11.Initiative, Innovation & Creativity <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="initiative_innovative_creativity"
                value={formData1.initiative_innovative_creativity}
                onChange={handleSelectChange}
                label="Initiative, Innovation & Creativity"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div className={classes.field}>
              <Typography variant="subtitle1">12.Teamwork <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="teamwork"
                value={formData1.teamwork}
                onChange={handleSelectChange}
                label="Teamwork"
                required
              >
               <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
 
            <div className={classes.field}>
              <Typography variant="subtitle1">13.Client Focused <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="client_focused"
                value={formData1.client_focused}
                onChange={handleSelectChange}
                label="Client Focused"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
            <div className={classes.field}>
              <Typography variant="subtitle1">14.Planning and Organizational Skills <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="planning_and_organizing"
                value={formData1.planning_and_organizing}
                onChange={handleSelectChange}
                label="Planning and Organizational Skills"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div className={classes.field}>
              <Typography variant="subtitle1">15.Value Addition <span style={{ color: 'red' }}> *</span>  </Typography>
              <div> <span style={{fontWeight: 'bold'}}>Selected Option: </span> Outstanding</div>
              <RadioGroup
                name="new_knowledge"
                value={formData1.new_knowledge}
                onChange={handleSelectChange}
                label="Value Addition"
                required
              >
                <Radio value="Outstanding" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="Exceeds expectations" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="Meets expectations" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="Needs improvement" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="Unacceptable" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
 
 
 
            {/* Continue adding dropdowns for other questions similarly */}
          </div>
 
          {/* Add remaining input fields for other questions */}
 
 
          <div className={classes.field}>
            <Typography variant="subtitle1">16.Top 3 likes in the organization <span style={{ color: 'red' }}> *</span>  </Typography>
            <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
 
            <Field size="large">
              <Textarea
                name="top3LikeOrganization"
                value={formData1.top3LikeOrganization}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
 
          <div className={classes.field}>
            <Typography variant="subtitle1">17.Top 3 dislikes in the organization <span style={{ color: 'red' }}> *</span>  </Typography>
            <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
 
            <Field size="large">
              <Textarea
                name="top3disLikeOrganization"
                value={formData1.top3disLikeOrganization}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">18.Any Suggestion to Improve the organisation <span style={{ color: 'red' }}> *</span>  </Typography>
            <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
            <Field size="large"
            >
              <Textarea
                name="suggestionToImprove"
                value={formData1.suggestionToImprove}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">19.List the kind of work or job would you like to be doing in one/two/five years time <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
              <Textarea
                name="future5years"
                value={formData1.future5years}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">20.List the actions you have taken to make yourself indispensable <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
              <Textarea
                name="indispencible"
                value={formData1.indispencible}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">21.Do you want to explore your skills areas other than your present work? <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
              <Textarea
                name="exploreSkills"
                value={formData1.exploreSkills}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
 
 
          <div className={classes.field}>
            <Typography variant="subtitle1">22.What sort of training/experiences would benefit you in the next year? <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
              <Textarea
                name="traning_need_analysis"
                value={formData1.traning_need_analysis}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
 
 
 
 
 
 
 
 
 
          <div className={classes.field}>
            <Typography variant="subtitle1" >23.Self Rating (out of 10) <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="small">
            <Textarea
        // name="question_1"
        // value={formData1.question_1}
        readOnly={true}
        style={{ width: '100%', marginBottom: '5px' }} // Ensures it takes full width
      />
              <Textarea
                name="self_rating"
                value={formData1.self_rating}
                onChange={handleInputChange} required />
            </Field>
          </div>
 
 
 
 
          <div style={{ marginBottom: "4vh", marginTop: "2vh", width: "10%", marginLeft: "2vh" }}>
            <Button type="submit" variant="contained" disabled={!allFieldsFilled()} color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </Container>
    </div >
     </div>
 
  ) :
  <div className='outer-container'>
  <div style={{ position: 'absolute', top: '20px', right: '20px', height: '60px', width: 'auto' }}>
    <img src={imgurl1} alt="Description" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
 
  <div className="split-container">
    <div className="text-container">
      <h1 style={{ color: 'rgb(52, 52, 52)', marginTop: '20px' }}>Appraisal Form</h1>
      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        <h2 style={{ marginLeft: '5px', marginRight: '5px' }}>{response1.employee_name} </h2>
        <h4 style={{ marginLeft: '5px', marginRight: '5px', display:'flex',alignItems:'center' }}>{response1.employee_id} <Open20Regular  onClick={()=>setIsOpen(true)}/></h4>
 
       
 
        <Modal
      title="Details"
      visible={isOpen}
      onCancel={()=> setIsOpen(false)}
      style={{width:'30vw'}}
      footer={[
        <Button key="close" onClick={() => setIsOpen(false)}>
          Close
        </Button>,
      ]}
    >
      {response1 ? (
        <div>
 
           <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter'  }}>Designation : {response1.designation}</h2>
           <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter' }}>Date of Birth : {response1.dob}</h2>
        <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter' }}>Date of Joining : {response1.date_of_joining}</h2>
       
        <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter' }}>Date of Appraisal : {response1.appraisal_date}</h2>
        <h2 style={{ display: 'flex', alignItems: 'center', fontWeight:'lighter' }}>Experience before FocusR : {response1.experience_in_domain_before_focusr}</h2>
          {/* Display other details as needed */}
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </Modal>
       
       
      </div>
      <Button style={{ marginBottom: '20px' }} type="submit" variant="contained" color="primary" onClick={() => { setStart(true) }}>Start</Button>
    </div>
    <div className="image-container">
      <img src={imgurl2} alt="Description" />
    </div>
  </div>
</div>
    :
 
    (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh', }}>
      <Typography variant="subtitle1">{"Thanks for Submitting the Form 😊"}</Typography>
    </div>)
};
 
export default FormPage;
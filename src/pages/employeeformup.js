import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, FormControl, InputLabel, Typography, Container, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  Field,
  makeStyles,
  Textarea,
  tokens,
  useId,
  RadioGroup, Radio,
  DefaultButton, Stack,
} from "@fluentui/react-components";
 
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
  },
});
 
 
 
const FormPage = () => {
  const styles = useStyles();
  const selectId = useId();
  const classes = useStyles();
 
  const [formData, setFormData] = useState({
    name: null,
    employee_id: null,
    designation: null,
    data_of_joining: null,
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
    empolyee_name: null,
    employee_date: null,
    manager_name: null,
    manager_date: null,
    formStatus: null,
 
    appraisalDone: false,
   
    canSeeManagerComments: false,
    canSeeReviewerComments: false,
});
 
  const { token } = useParams();
  const [response1, setResponse1] = useState({});
  const [change, setChange] = useState(false);
 
 
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://172.235.21.99:5051/user/form-links/${token}`);
        setResponse1(response.data);
        formData.name = response1.employee_name;
        formData.employee_id = response1.employee_id;
        formData.designation = response1.designation;
        formData.date_of_joining = response1.date_of_joining;
        formData.appraisal_due_date = response1.appraisal_date;
        formData.department = response.data.department.dept_name;
        // formData.manager = response1.manager;
        formData.previous_experience = response1.previous_experience;
        formData.exact_experience = response1.exact_experience;
        formData.total_experience = response1.total_experience;
        formData.performance_review_period = response1.performance_review_period;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, [change]);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleRadioChange = (e, value) => {
    setFormData({ ...formData, attendanceRating: value });
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
 
      const response = await axios.put(`http://172.235.21.99:5051/user/handlesubmitted/${response1.tokens}`,{"h1":"Hello"});
      const response2 = await axios.post(`http://172.235.21.99:5051/user/team-member/remarks/${response1.employee_id}`, formData);
     
      setChange(true)
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
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
 
  return !response1.submitted ? (
 
    <div style={{
      backgroundImage: "url('../media/ace.jpg')",
      backgroundSize: "cover",
     
      backgroundAttachment: "fixed",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
}}>
 
 
 
      <div style={{
        backgroundColor: "#0270C5",
        marginTop: "6vh", width: 'fit-content', marginBottom: "0vh", borderRadius: "10px 10px 0px 0px", paddingTop: "1.5%", paddingBottom: "1.5%", paddingLeft: '18%', paddingRight: '12%'
      }}>
        <Typography variant="h4" color="white" style={{
          textAlign: 'left'
        }}>FOCUSR APPRAISAL - FORM</Typography>
 
      </div>
 
 
 
 
      <Container sx={{
        backgroundColor: "#E8F1F9",
        width: "65vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "0px 0px 10px 10px", borderTop: "none", marginBottom: "5vh", paddingTop: "2em"
      }}>
 
        <form onSubmit={handleSubmit}>
 
 
 
        <div  className={classes.field}>
        <Typography variant="subtitle1">Employee Name: {response1.employee_name}</Typography>
 
<Typography variant="subtitle1">Employee Code: {response1.employee_id}</Typography>
       
        </div>          
        <div  className={classes.field}>
          <Typography variant="subtitle1">Designation: {response1.designation} </Typography>
         
        </div>
        <div  className={classes.field}>
          <Typography variant="subtitle1">Date of Joining: {response1.date_of_joining}</Typography>
          {/* <Textarea
            fullWidth
            name="dateOfJoining"
            placeholder='Enter your Date of Joining'
            value={response1.date_of_joining}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          /> */}
        </div>
        {/* Continue adding input fields for other questions in a similar manner */}
        <div  className={classes.field}>
            <Typography variant="subtitle1">Appraisal Due date: {response1.appraisal_due_date}</Typography>
            {/* <Textarea
                fullWidth
                name="appraisal_due_date"
                value={response1.appraisal_due_date}
               
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            /> */}
            </div>
            <div  className={classes.field}>
            <Typography variant="subtitle1">Department: {formData.department.dept_name}</Typography>
            {/* <Textarea
                fullWidth
                name="department"
                value={response1.department}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            /> */}
            </div>
            <div  className={classes.field}>
            <Typography variant="subtitle1">Reporting Manager: {response1.reporting_manager}</Typography>
            {/* <Textarea
                fullWidth
                name="reporting_manager"
                value={response1.reporting_manager}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            /> */}
            </div>
            <div  className={classes.field}>
            <Typography variant="subtitle1">Reviewer: {response1.reviewer}</Typography>
            {/* <Textarea
                fullWidth
                name="reviewer"
                value={formData.reviewer}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            /> */}
            </div>
            {/* Add remaining input fields for other questions */}
            <div  className={classes.field}>
            <Typography variant="subtitle1">Exact Previous Relevant Experience in domain (Before Joining FocusR - in years): {response1.previous_experience}</Typography>
            {/* <Textarea
                fullWidth
                name="exact_experience"
                value={formData.exact_experience}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            /> */}
            </div>
            <div  className={classes.field}>
            <Typography variant="subtitle1">Exact experience in FocusR (in years): {response1.exact_experience}</Typography>
            {/* <Textarea
                fullWidth
                name="focusRExp"
                value={formData.focusRExp}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
          />*/}
            </div>
            <div  className={classes.field}>
            <Typography variant="subtitle1">Appropriate Total experience (in years): {response1.total_experience}</Typography>
            {/* <Textarea
                fullWidth
                name="total_experience"
                value={formData.total_experience}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            /> */}
            </div>
            <div  className={classes.field}>
            <Typography variant="subtitle1">Performance Review Period: {response1.performance_review_period}</Typography>
            {/* <Textarea
                fullWidth
                name="performance_review_period"
                value={formData. performance_review_period}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            /> */}
            </div>
           
 
          <div className={classes.field}>
            <Typography variant="subtitle1">
              1. Team Member to state your understanding of your roles and responsibilities / objectives as agreed in last year’s appraisal / during joining. Managers to review and comment on the same
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Field size="large">
            <Textarea
        name="question_1"
        value={formData.question_1}
        onChange={handleInputChange}
        required
       
        style={{ width: '100%' }} // Ensures it takes full width
      />
            </Field>
          </div>
 
 
 
          {/* Add remaining input fields for other questions */}
          <div className={classes.field}>
            <Typography variant="subtitle1">2.Last Year’s Accomplishments <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
             <Textarea
          name="question_2"
          value={formData.question_2}
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
          name="question_3"
          value={formData.question_3}
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
          name="question_4"
          value={formData.question_4}
          onChange={handleInputChange}
          required
         
          style={{ width: '100%' }}
        />
 
            </Field>
 
          </div>
 
 
 
 
          <div className={classes.field} styles={{ text: { color: 'black' } }} >
            <Typography variant="subtitle1">5.Team Member / Manager: Rating Performance Description <span style={{ color: 'red' }}> *</span>  </Typography>
 
            <div>
              <Typography variant="subtitle1">Attendance & Punctuality</Typography>
              <RadioGroup
                name="attendanceRating"
                selectedValue={formData.attendance_and_punctuality}
                onSelectedValueChange={handleRadioChange}
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
 
            {/* Question 2: Technical Skills */}
            <div>
              <Typography variant="subtitle1">6.Technical Skills <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="technical_skills"
                value={formData.technical_skills}
                onChange={handleSelectChange}
                label="Technical Skills"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
 
 
            <div>
              <Typography variant="subtitle1">7.Utilization and Productivity <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="utilization_and_productivity"
                value={formData.utilization_and_productivity}
                onChange={handleSelectChange}
                label="Utilization and Productivity"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div>
              <Typography variant="subtitle1">8.Time Management & Organizational Skills <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="quality_of_work"
                value={formData.quality_of_work}
                onChange={handleSelectChange}
                label="Time Management & Organizational Skills"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div>
              <Typography variant="subtitle1">9.Interpersonal Skills <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="interpersonal_skills"
                value={formData.interpersonal_skills}
                onChange={handleSelectChange}
                label="Interpersonal Skills"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div>
              <Typography variant="subtitle1">10.Communication - Verbal & Written <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="communication"
                value={formData.communication}
                onChange={handleSelectChange}
                label="Communication - Verbal & Written"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div>
              <Typography variant="subtitle1">11.Initiative, Innovation & Creativity <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="initiative_innovative_creativity"
                value={formData.initiative_innovative_creativity}
                onChange={handleSelectChange}
                label="Initiative, Innovation & Creativity"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div>
              <Typography variant="subtitle1">12.Teamwork <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="teamwork"
                value={formData.teamwork}
                onChange={handleSelectChange}
                label="Teamwork"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
 
            <div>
              <Typography variant="subtitle1">13.Client Focused <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="client_focused"
                value={formData.client_focused}
                onChange={handleSelectChange}
                label="Client Focused"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
            <div>
              <Typography variant="subtitle1">14.Planning and Organizational Skills <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="planning_and_organizing"
                value={formData.planning_and_organizing}
                onChange={handleSelectChange}
                label="Planning and Organizational Skills"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
            <div>
              <Typography variant="subtitle1">15.Value Addition <span style={{ color: 'red' }}> *</span>  </Typography>
              <RadioGroup
                name="new_knowledge"
                value={formData.new_knowledge}
                onChange={handleSelectChange}
                label="Value Addition"
                required
              >
                <Radio value="O" label={<span style={{ color: 'black' }}>Outstanding</span>} />
                <Radio value="E" label={<span style={{ color: 'black' }}>Exceeds expectations</span>} />
                <Radio value="M" label={<span style={{ color: 'black' }}>Meets expectations</span>} />
                <Radio value="NI" label={<span style={{ color: 'black' }}>Needs improvement</span>} />
                <Radio value="U" label={<span style={{ color: 'black' }}>Unacceptable</span>} />
              </RadioGroup>
            </div>
 
 
 
 
            {/* Continue adding dropdowns for other questions similarly */}
          </div>
 
          {/* Add remaining input fields for other questions */}
 
 
          <div className={classes.field}>
            <Typography variant="subtitle1">16.Top 3 likes in the organization <span style={{ color: 'red' }}> *</span>  </Typography>
 
            <Field size="large">
              <Textarea
                name="top3LikeOrganization"
                value={formData.top3LikeOrganization}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
 
          <div className={classes.field}>
            <Typography variant="subtitle1">17.Top 3 dislikes in the organization <span style={{ color: 'red' }}> *</span>  </Typography>
 
            <Field size="large">
              <Textarea
                name="top3disLikeOrganization"
                value={formData.top3disLikeOrganization}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">18.Any Suggestion to Improve the organisation <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
                name="suggestionToImprove"
                value={formData.suggestionToImprove}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">19.List the kind of work or job would you like to be doing in one/two/five years time <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
                name="future5years"
                value={formData.future5years}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">20.List the actions you have taken to make yourself indispensable <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
                name="indispencible"
                value={formData.indispencible}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
          <div className={classes.field}>
            <Typography variant="subtitle1">21.Do you want to explore your skills areas other than your present work? <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
                name="exploreSkills"
                value={formData.exploreSkills}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
 
 
          <div className={classes.field}>
            <Typography variant="subtitle1">22.What sort of training/experiences would benefit you in the next year? <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="large"
            >
              <Textarea
                name="traning_need_analysis"
                value={formData.traning_need_analysis}
                onChange={handleInputChange} required />
            </Field>
 
          </div>
 
 
 
 
 
 
 
 
 
 
          <div className={classes.field}>
            <Typography variant="subtitle1" >23.Self Rating (out of 10) <span style={{ color: 'red' }}> *</span>  </Typography>
            <Field size="small">
              <Textarea
                name="self_rating"
                value={formData.self_rating}
                onChange={handleInputChange} required />
            </Field>
          </div>
 
 
 
 
          <div style={{ marginBottom: "4vh", marginTop: "2vh", width: "10%", marginLeft: "2vh" }}>
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </Container>
    </div >
    // </div>
 
  ) :
 
    (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh' }}>
      <Typography variant="subtitle1">`you have already Submitted the Form `</Typography>
    </div>);
};
 
export default FormPage;
 
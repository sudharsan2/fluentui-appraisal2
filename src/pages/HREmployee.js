import React, {  useEffect, useState } from 'react';
import {Stack, Nav } from '@fluentui/react';
import {useSelector, useDispatch} from 'react-redux';
import
{ format, parseISO }
from
'date-fns'
;
import { CopyToClipboard } from 'react-copy-to-clipboard';

import axios from 'axios';
import {
  makeStyles,
  Field,
  Textarea,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  Button,
  SearchBox,
  // Field,
  // Textarea,
  // Rating,
  Checkbox,
  DrawerProps,
  Avatar,
  Text,
  Link,
  createTableColumn,
  useTableFeatures,
  useTableSort,
  Option,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbProps,
  useId,
  Breadcrumb,
  Tab,
  TabList,
  Dropdown,
  
} from "@fluentui/react-components";
import { OverlayDrawer, DrawerHeader, DrawerHeaderTitle, DrawerBody } from '@fluentui/react-drawer';
// import {
//   Button,
//   Checkbox,
//   SearchBox,
//   Text,
// } from "@fluentui/react-components";
import {AddRegular, PersonDeleteRegular , EditRegular, SearchRegular, FilterRegular, FilterDismissRegular, FilterAddRegular, ChartMultipleFilled,ChartMultipleRegular,Dismiss24Regular ,Timer20Regular,Calendar20Regular, ArrowDownRegular, ArrowClockwiseRegular,ShareMultiple24Filled ,Add24Filled,ShareIos24Filled,CheckmarkCircleFilled  } from "@fluentui/react-icons"; // Import the icons
import './page.css';
import zIndex from "@mui/material/styles/zIndex";


import {Modal, Form, Input, DatePicker, Select,  Row, Col, message,Rate } from 'antd';
 
const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
  controls: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  searchInputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  searchInput: {
    flexGrow: 1,
  },
  iconLarge: {
    fontSize: '24px',
    paddingRight: '10px',
    color: 'rgb(1, 105, 185)',
  },
  container: {
    display: 'grid',
    gap: '15px',
    marginTop: '3vh',
    fontFamily: 'Arial, sans-serif',
    marginLeft: '3vw',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  gridrow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  row: {
    display: 'flex',
    width: '100%',
  },
  editDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4',
  },
  formDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4',
  },
  formLink: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      color: '#0169b9'
  },
  editIcon: {
    marginRight: '5px',
  },
  reviewerLink: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color:'#0169b9'
  },
  reviewerDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4',
  },
  shareLink: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color:'rgb(1,105,185)'
  },
  shareDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4',
  },
  uploadIcon: {
    marginRight: '5px',
  },
  filterPanel: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridTemplate1: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
      "nameAndId managerInfo"
      "name empid"
      "email doj"
      "status dos"
      "role appraisal"
      "dept totalExperience"
      "editDetails focusRExperience"
    `,
  },
  // gridTemplate2: {
  //   gridTemplateColumns: '1fr 1fr',
  //   gridTemplateAreas: `
  //     "nameAndId formLink"
  //     "email doj"
  //     "status dos"
  //     "role appraisal"
  //     "dept reviewer"
  //     "editDetails share"
  //   `,
  // },
  content: {
    fontSize: '13px',
    marginLeft: '10px'
  },
  uploadIcon: {
    marginRight: '5px'
  },

  filterPanel:{
    display:'flex',
    flexDirection:'column',
  }
});


const labels = {
  'Attendance & Punctuality':'attendance_and_punctuality',
  'Technical Skills (Effectiveness with which you apply job knowledge and skill to tasks)':'technical_skills',
  'Quality of work (Comprehensive, accurate, thorough, professional, timely etc)':"quality_of_work",
  "New Knowledge (Seek new knowledge, apply it to your job and share it with others)":"new_knowledge",
  "Utilization and Productivity (Make full use of time.  Seek additional work if underutilized)":"utilization_and_productivity",
  "Time Management & Organizational Skills (Organize, plan, and forecast work skillfully and accurately.  Effective prioritization.  Meet deadlines or communicate early if will not be met.)":"organize_plans",
  "Interpersonal Skills (Positive attitude, work and communicate well with others)":"interpersonal_skills",
  "Communication - Verbal & Written (Communicate knowledge clearly, accurately and thoroughly.  Document work effectively and create procedures)":"communication",
  "Initiative, Innovation & Creativity (Actively seek improvements & challenge status quo in appropriate ways.  Contribute new ideas.  Analyze problems and present solutions)":"initiative_innovative_creativity",
  "Teamwork (Co-ordinate own work with others, seek opinions from team members, share information willingly)":"teamwork",
  "Client Focused (Actively seek to understand clients business issues, provide quality service to achieve client satisfaction)":"client_focused",
  "Planning and Organizational Skills (Organizing, planning and monitoring of work skillfully and accurately; able to effectively prioritize tasks; meets deadlines or communicates need to revise schedule ahead of time)":"planning_and_organizing",
  // Add more labels as needed
};

const HREmployee = (props) => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState("tab1");
  // const [selectedTab1, setSelectedTab1] = React.useState("tab1")
  const [selectedItems, setSelectedItems] = React.useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
  const newSelectedFilters = [];
  const [open, setOpen] = React.useState(false);
  const [selectedTab1, setSelectedTab1] = React.useState('tab1');
  const [selectedTab2, setSelectedTab2] = React.useState('tab1');
  const [DeleteUsers,SetDeleteUsers] = useState([]);
  const [disableEdit, setDisableEdit] = useState(false);

  const [dob, setDob] = useState('');
  const [appraisalDate, setAppraisalDate] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [reportingDate, setReportingDate] = useState('');

  // const [value, setValue] = useState(4);
  
  // const [selectedOptions, setSelectedOptions] = useState(Array(labels.length).fill(0));

  // const [selectedNavKey, setSelectedNavKey] = useState('option1');

  const [addedDetails, setaddedDetails] = React.useState([]);
 
  const [filteredData, setFilteredData] = useState([]);
  
  const [copied, setCopied] = React.useState(false);

  // const handleRatingChange = (event, newValue) => {
  //   setValue(newValue); 
  // };


  const [areFieldsFilled1, setAreFieldsFilled1] = useState(false);
  const [areFieldsFilled3, setAreFieldsFilled3] = useState(false);
  const [areFieldsFilled4, setAreFieldsFilled4] = useState(false);
  const [filledStatus, setFilledStatus] = useState(Array(labels.length).fill(false));
  const [submitted1, setSubmitted1] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);
  const [submitted3, setSubmitted3] = useState(false);
  const [submitted4, setSubmitted4] = useState(false);

  const [sortState, setSortState] = useState({
    sortDirection: 'ascending',
    sortColumn: 'empid',
  });
 const [data, setData] = useState([])
 
 const [currentMonthEmployees, setCurrentMonthEmployees] = useState([]);
  const [nextMonthEmployees, setNextMonthEmployees] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [edit,setEdit] = useState(false);
 
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible,setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);

  const [options2, setOptions2] = useState([]);

  const [activeOptionId, setActiveOptionId] = useState("");
  const [activeOptionId1, setActiveOptionId1] = useState("");
  const [activeOptionId2, setActiveOptionId2] = useState("");
  const [activeOptionId3, setActiveOptionId3] = useState("");
  const [selectedNavKey, setSelectedNavKey] = useState('option1');
  const [value, setValue] = useState(4);

  const [formdataemployee,setformdataemployee] = useState({});


  const [initialValues, setInitialValues] = useState({});
  const [formEdit] = Form.useForm();
  const [reload, setReload] = useState(false);

  // const navLinkGroups = [
  //   {
  //     links: [
  //       { name: 'Review of KPI', key: 'option1' },
  //       { name: 'Review of other skills', key: 'option2' },
  //       { name: 'Organization Feedback', key: 'option3' },
  //       { name: 'Training Need Analysis', key: 'option4' },
  //     ],
  //   },
  // ];

  // const getNavLinkStyle = (key) => {
  //   let backgroundColor = themestate ? "rgb(51, 51, 51)" : "";
  //   if (key === selectedNavKey) {
  //     backgroundColor = "red";
  //   }
  //   return { backgroundColor };
  // };

  // const handleNavClick = (ev, item) => {
  //   setSelectedNavKey(item.key);
  // };

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedOptions, setSelectedOptions] = useState(Array(labels.length).fill(0));

// Handler function to update selected option for a label

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth(); // 0-based index, January is 0
  //   const nextMonth = (currentMonth + 1) % 12;
 
  //   axios.get('https://aceapi.focusrtech.com:82/user/employee/list')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the data!', error);
  //     });
 
  //   const currentMonthList = data.filter(employee => {
  //     const joiningDate = parseISO(employee.date_of_joining);
  //     return joiningDate.getMonth() === currentMonth;
  //   });
   
   
   
  //   const nextMonthList = data.filter(employee => {
  //     const joiningDate = parseISO(employee.date_of_joining);
  //     return joiningDate.getMonth() === nextMonth;
  //   });
 
  //   setCurrentMonthEmployees(currentMonthList);
  //   setNextMonthEmployees(nextMonthList);
 
 
  // }, []);
  const dropdownId = useId("dropdown");


  const navLinkGroups = [
    {
      links: [
        { name: 'Review of KPI', key: 'option1' },
        { name: 'Review of other skills', key: 'option2' },
        { name: 'Organization Feedback', key: 'option3' },
        { name: 'Training Need Analysis', key: 'option4' },
  
      ],
    },
  ];

  const getNavLinkStyle = (key) => {
    let backgroundColor = themestate ? "rgb(51, 51, 51)" : "";
    if (key === selectedNavKey) {
      if (key === 'option1') {
        backgroundColor = submitted1 && !areFieldsFilled1 ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option2') {
        backgroundColor = submitted2 && !filledStatus ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option3') {
        backgroundColor = submitted3 && !areFieldsFilled3 ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option4') {
        backgroundColor = submitted4 && !areFieldsFilled4 ? "rgb(51, 51, 51)" : "red";
      }
    }
    return { backgroundColor };
  };

  const handleNavClick = (ev, item) => {
    setSelectedNavKey(item.key);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://aceapi.focusrtech.com:82/user/managerlist");
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, data) => {
    props.form.setFieldsValue({ manager: data.optionValue });
  };

  

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://aceapi.focusrtech.com:82/user/reviewerlist");
        setOptions1(response.data);
        console.log({"response":response.data});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://aceapi.focusrtech.com:82/user/departmentlist");
        setOptions2(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange1 = (event, data) => {
    props.form.setFieldsValue({ reviewer: data.optionValue });
  };

 
  useEffect(() => {
    fetchEmployeeData();
  }, [reload]);
  
  useEffect(() => {
    fetchEmployeeData1();
  }, [addedDetails]);

  const fetchEmployeeData = () => {
    axios.get('https://aceapi.focusrtech.com:82/user/employee/list')
      .then(response => {
        setData(response.data);
        console.log({"data1": response.data})
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const fetchEmployeeData1 = () => {
    setTimeout(() => {
      axios.get('https://aceapi.focusrtech.com:82/user/employee/list')
        .then(response => {
          setData(response.data);
          console.log({"data1": response.data})
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }, 2000); // 2000 milliseconds = 2 seconds
  };
  
 
  useEffect(() => {
    if (data.length > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-based index, January is 0
      const nextMonth = (currentMonth + 1) % 12;
 
      const currentMonthList = data.filter(employee => {
        const joiningDate = parseISO(employee.date_of_joining);
        return joiningDate.getMonth() === currentMonth;
      });
 
      const nextMonthList = data.filter(employee => {
        const joiningDate = parseISO(employee.date_of_joining);
        return joiningDate.getMonth() === nextMonth;
      });
 
      setCurrentMonthEmployees(currentMonthList);
      setNextMonthEmployees(nextMonthList);
    }
  }, [data]);
 
  // useEffect(() => {
  //   axios.get('https://aceapi.focusrtech.com:82/user/employee/list')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There wevent, data1as an error fetching the data!', error);
  //     });
  // }, []);
 
 
  const handleTabSelect = (event,data) => {
    setSelectedTab1(data.value);
  };
 
 
 
 
  const handleModalClose = () => {
    setModalVisible(false);
  };
 
  const handleEditModalClose = () => {
    setEditModalVisible(false);
  };
 
  const handleTabSelect2 = (event,data) => {
    console.log({"currentmonth":currentMonthEmployees})
    setSelectedTab2(data.value);
  };
  const handleTabSelect1 = (value) => {
    setSelectedTab1(value);
  };
 
  const handleTabChange = (event, data) => {
    setSelectedTab(data.value);
    setSelectedItems({});
   
   
  };
 
 
  const handleItemsChange = (id) => {
    // event.stopPropagation();
    let newSelectedItems;
    let newTrueSelectedIds;
    setSelectedItems((prev) => {
     newSelectedItems = {
        ...prev,
        [id]: !prev[id],
      };
 
      // Update the array of true selected IDs based on the new selectedItems state
      newTrueSelectedIds = Object.keys(newSelectedItems).filter(
        (key) => newSelectedItems[key] === true
      );
 
      // Update the itemSelected state with the new array of true selected IDs
      setItemSelected(newTrueSelectedIds);
 
      return newSelectedItems;
    });
    if(newTrueSelectedIds.length > 1){
      setDisableEdit(false)
    }
    else if(newTrueSelectedIds.length > 0 && newTrueSelectedIds.length < 1.1){
      setDisableEdit(true)
      const selectedEmpId = newTrueSelectedIds[0];
      const selectedEmployee = data.find(emp => emp.employee_id === selectedEmpId);
      console.log("change", selectedEmployee)
      if (selectedEmployee) {
        function toISODateString(dateString) {
          const date = new Date(dateString);
          date.setUTCHours(18, 30, 0, 0);
          return date;
        }
        
        setDob(selectedEmployee.dob)
        setAppraisalDate(selectedEmployee.appraisal_date)
        setJoiningDate(selectedEmployee.date_of_joining)
        setReportingDate(selectedEmployee.date_of_reporting)
        const newInitialValues = {
          "employee_id": selectedEmployee.employee_id,
          "employee_name": selectedEmployee.employee_name,
          "employee_mail": selectedEmployee.employee_mail,
          // "dob": toISODateString(selectedEmployee.dob),
          // "appraisal_date": selectedEmployee.appraisal_date,
          "designation": selectedEmployee.designation,
          "dept_name": selectedEmployee.department.dept_name,
          "reporting_manager": selectedEmployee.manager,
          // "date_of_joining": selectedEmployee.date_of_joining,
          // "date_of_reporting": selectedEmployee.date_of_reporting,
          "experience_in_domain_before_focusr": selectedEmployee.experience_in_domain_before_focusr,
          "reviewer_name": selectedEmployee.reviewer_name
      }

        // setoriginalempId(selectedEmployee.empId)
        setInitialValues(newInitialValues);
        formEdit.setFieldsValue(newInitialValues);
        console.log("Selected Employee:", selectedEmployee); // Debugging step
        console.log("Initial Values Set:", newInitialValues); // Debugging step
      }
    }
    else{
      setDisableEdit(false)
    }
    

  };

  // const handleItemsChange = (id) => {
   
  //   setSelectedItems((prev) => {
  //     const newSelectedItems = {
  //       ...prev,
  //       [id]: !prev[id],
  //     };
 
  //     // Update the array of true selected IDs based on the new selectedItems state
  //     const newTrueSelectedIds = Object.keys(newSelectedItems).filter(
  //       (key) => newSelectedItems[key] === true
  //     );
 
  //     // Update the itemSelected state with the new array of true selected IDs
  //     setItemSelected(newTrueSelectedIds);

      // if (newTrueSelectedIds.length > 0) {
      //   const selectedEmpId = newTrueSelectedIds[0];
      //   const selectedEmployee = data.find(emp => emp.employee_id === selectedEmpId);
      //   console.log("change", selectedEmployee)
      //   if (selectedEmployee) {
      //     const newInitialValues = {
      //       "employee_id": selectedEmployee.employee_id,
      //       "employee_name": selectedEmployee.employee_name,
      //       "employee_mail": selectedEmployee.employee_mail,
      //       "dob": selectedEmployee.dob,
      //       "appraisal_date": selectedEmployee.appraisal_date,
      //       "designation": selectedEmployee.designation,
      //       "dept_name": "Department",
      //       "reporting_manager": "selectedEmployee.manager",
      //       "date_of_joining": selectedEmployee.date_of_joining,
      //       "date_of_reporting": selectedEmployee.date_of_reporting,
      //       "experience_in_domain_before_focusr": selectedEmployee.experience_in_domain_before_focusr,
      //       "reviewer": "Reviewer"
      //   }

      //     // setoriginalempId(selectedEmployee.empId)
      //     setInitialValues(newInitialValues);
      //     formEdit.setFieldsValue(newInitialValues);
      //     console.log("Selected Employee:", selectedEmployee); // Debugging step
      //     console.log("Initial Values Set:", newInitialValues); // Debugging step
      //   }
      // }

  //     console.log({"selectedItems":newTrueSelectedIds})
 
  //     return newSelectedItems;
  //   });
  // };

  const handleCheckboxChange = (event, empId) => {
    event.stopPropagation();
    handleItemsChange(empId);
    SetDeleteUsers(prevDeleteUsers => [...prevDeleteUsers, empId]); 
    // if (counter ===0){
    //     setoriginalempId(empId)
    // };
    console.log("clicked")
    setOpen(false);
    
  };
 
 
 
 
  const handleItemSelect = (id) => {
    {setItemSelected((prev) => ([...prev], [id]));}
  }
 
  const handleRowClick = async (employee) => {
    try {
      const response1 = await axios.get(`https://aceapi.focusrtech.com:82/user/team-member/remarks/${employee.employee_id}`);
      setformdataemployee(response1.data);
      
      if (response1.status===500){
        setformdataemployee({ });
      }
      
    } catch (err) {
      setformdataemployee({ });

    }
    
    setSelectedEmployee(employee);
    setOpen(true);
    
    
   
  };
 
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value || '');
  };
 
 
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };
 
  const handleRemoveFilters = () => {
    setSearchQuery("");
    // Handle resetting other filter options as needed
  };
 
 
  const handleApplyFilters = () => {
    setSelectedFilters(newSelectedFilters); // Update selected filters state
  };

  const onActiveOptionChange = React.useCallback(
    (_, data) => {
      setActiveOptionId(data?.nextOption?.value); 
      // Assuming optionValue is the id
      console.log({"active":data?.nextOption?.value})
      formEdit.setFieldsValue({reporting_manager:data?.nextOption?.text})
    },
    [setActiveOptionId]
  );

  const onActiveOptionChange1 = React.useCallback(
    (_, data) => {
      setActiveOptionId1(data?.nextOption?.value); 
      // Assuming optionValue is the id
      console.log({"active":data?.nextOption?.value})
      formEdit.setFieldsValue({reviewer_name:data?.nextOption?.text})
    },
    [setActiveOptionId1]
  );

  const onActiveOptionChange2 = React.useCallback(
    (_, data) => {
      setActiveOptionId2(data?.nextOption?.value); 
      // Assuming optionValue is the id
      formEdit.setFieldsValue({dept_name:data?.nextOption?.text})
      console.log({"active":data?.nextOption?.value})
    },
    [setActiveOptionId2]
  );

  
  
  const onActiveOptionChange3 = React.useCallback(
    async (_, data) => {
      const optionValue = data?.nextOption?.value;
      setActiveOptionId3(optionValue); 
      console.log({ "active": optionValue });
  
      try {
        const result = await axios.post(`https://aceapi.focusrtech.com:82/user/employee/addReviewer/${optionValue}`, {
          "empId" : selectedEmployee.employee_id,
          "status": "sharedtomanager"
        });
        // Handle result if needed
        console.log('API response:', result);
      } catch (error) {
        console.error('Error sending data to the API', error);
      }
    },
    [activeOptionId3] // Make sure to include `parameter` in the dependency array if it's from props or state
  );
  

  const handlesharetoManager = async (parameter) => {
    try {
      const result = await axios.post(`https://aceapi.focusrtech.com:82/user/employee/changeFormStatus/${parameter}`, {
        "status":"sharedtomanager"
      });
      if (result.status === 200 || result.status === 201) {
        message.success('Shared to Manager successfully');
        setReload(!reload)
      }
       // Extract and set the token from the response
    } catch (error) {
      console.error('Error sending data to the API', error);
    }
  };

  const handleShareLinkClick = async (parameter) => {
    try {
      const result = await axios.post('https://aceapi.focusrtech.com:82/user/form-links', {
        "empId": parameter, // Include the parameter in the request data
      });
      const token = result.data.token; // Extract the token from the response

      // Copy the token to the clipboard
      navigator.clipboard.writeText(`http://localhost:3000/form/${token}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000); // Reset copied state after 2 seconds
      }).catch((error) => {
        console.error('Error copying text to clipboard', error);
      });
    } catch (error) {
      console.error('Error sending data to the API', error);
    }
  };

  const columns = [
    createTableColumn({
      columnId: 'employee_id',
      compare: (a, b) => a.employee_id - b.employee_id,
    }),
    createTableColumn({
      columnId: 'employee_name',
      compare: (a, b) => a.employee_name.localeCompare(b.employee_name),
    }),
    createTableColumn({
      columnId: 'department',
      compare: (a, b) => a.department.localeCompare(b.department),
    }),
    createTableColumn({
      columnId: 'date_of_joining',
      compare: (a, b) => new Date(a.date_of_joining).getTime() - new Date(b.date_of_joining).getTime(),
    }),
    // createTableColumn({
    //   columnId: 'appraisal',
    //   compare: (a, b) => a.appraisal.localeCompare(b.appraisal),
    // }),
    createTableColumn({
      columnId: 'reporting_manager',
      compare: (a, b) => a.reporting_manager.localeCompare(b.reporting_manager),
    })
  ];
 
  const {
    sort: { getSortDirection, toggleColumnSort },
  } = useTableFeatures(
    {
      columns,
      items: data,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ]
  );
 
  const headerSortProps = (columnId) => ({
    onClick: (e) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });
 
 
  
 
  // const handleDeleteEmployee = () => {
  //   alert("Delete Employee functionality to be implemented");
  // };
 
  const handleDeleteEmployee = async () => {
    console.log(JSON.stringify({ ids: itemSelected }));
    try {
      const response = await fetch('https://aceapi.focusrtech.com:82/user/employee/multi-delete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: itemSelected }),
      });
 
      if (response.ok) {
       
        // Clear the selectedItems state
        message.success("Successfully Deleted Selected Employees");
        setSelectedItems({});
        // Optionally clear the itemSelected state
        setItemSelected([]);
        fetchEmployeeData();
      } else {
        // alert('Failed to delete employees');
      }
    } catch (error) {
      message.error("Error deleting employees");
      
      // alert('An error occurred while deleting employees');
    }
  };

  const handleEditEmployee1 = async () => {
    console.log(JSON.stringify({ ids: itemSelected }));
    try {
      const response = await fetch(`https://aceapi.focusrtech.com:82/user/employee/${itemSelected}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: itemSelected }),
      });
 
      if (response.ok) {
       
        // Clear the selectedItems state
        setSelectedItems({});
        // Optionally clear the itemSelected state
        setItemSelected([]);
        fetchEmployeeData();
      } else {
        // alert('Failed to delete employees');
      }
    } catch (error) {
      console.error('Error deleting employees:', error);
      // alert('An error occurred while deleting employees');
    }
  };
 
 
 
  const handleAddEmployee = async (values) => {
    console.log('Form values:', values);
  
    // Helper function to extract the date part from an ISO string
    const getDateOnly = (isoString) => {
      console.log({"dateandtime":isoString})
      if (typeof isoString === 'string') {
        return isoString.split('T')[0];
      } else if (isoString instanceof Date) {
        return isoString.toISOString().split('T')[0];
      }
      console.log(isoString)
      return isoString; // Return as is if it's neither a string nor a Date
    };
  
    // Update the date fields with the date-only part
    values.appraisal_date = getDateOnly(values.appraisal_date);
    values.date_of_joining = getDateOnly(values.date_of_joining);
    values.date_of_reporting = getDateOnly(values.date_of_reporting);
    values.dob = getDateOnly(values.dob);

    const empdetails = {...values,"manager":activeOptionId, "reviewer":activeOptionId1,"department":activeOptionId2}
    setaddedDetails(empdetails)
    try {
      const response = await axios.post('https://aceapi.focusrtech.com:82/user/employee/list', empdetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        message.success('Employee added successfully');
        setModalVisible(false); // Close modal after submission
        form.resetFields(); // Reset form fields
      } else {
        message.error('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      message.error('An error occurred');
    }
  };

  const handleEditEmployee = async (values) => {
    console.log('Form values:', values);
  
    // Helper function to extract the date part from an ISO string
    const getDateOnly = (isoString) => {
      if (typeof isoString === 'string') {
        return isoString.split('T')[0];
      } else if (isoString instanceof Date) {
        return isoString.toISOString().split('T')[0];
      }
      console.log(isoString)
      return isoString; // Return as is if it's neither a string nor a Date
    };
  
    // Update the date fields with the date-only part
    values.appraisal_date = getDateOnly(values.appraisal_date);
    values.date_of_joining = getDateOnly(values.date_of_joining);
    values.date_of_reporting = getDateOnly(values.date_of_reporting);
    values.dob = getDateOnly(values.dob);

    const empdetails = {...values,"reviewer":activeOptionId, "manager":activeOptionId1,"department":activeOptionId2}
    setaddedDetails(empdetails)
    try {
      const response = await axios.put(`https://aceapi.focusrtech.com:82/user/employee/${itemSelected[0]}`, empdetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        message.success('Employee edited successfully');
        setModalVisible(false); 
        form.resetFields(); 
      } else {
        message.error('Failed to edited employee');
      }
    } catch (error) {
      console.error('Error Editing employee:', error);
      message.error('An error occurred');
    }
  };
  
  
  
    

   
 
 
 
 
 
  const handleFilterToggle = () => {
    setShowFilters((prev) => !prev);
  };
 
 
  // const filteredData = searchQuery
  // ? (data || []).filter((item) =>
  //     (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
  //     (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
  //     // Uncomment if 'appraisal' is part of the dataset and needs to be searched
  //     // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
  //   )
  // : (data || []);


  useEffect(() => {
    const filterData = () => {
      if (searchQuery) {
        const filtered = (data || []).filter((item) =>
          (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
          (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
          (item.appraisal_date && item.appraisal_date.includes(searchQuery)) ||
          (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data || []);
        console.log({"data":data})
      }
      
    };

    filterData();
  }, [data]);
 
const sortedData = [...filteredData].sort((a, b) => {
  const aValue = a[sortState.sortColumn];
  const bValue = b[sortState.sortColumn];
 
  // Check if the values are strings and perform locale comparison
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return sortState.sortDirection === 'ascending'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }
 
  // If the values are not strings, compare them directly
  return sortState.sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
});
 
const filteredcmData = searchQuery
  ? (currentMonthEmployees || []).filter((item) =>
      (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
      (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
      // Uncomment if 'appraisal' is part of the dataset and needs to be searched
      // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.appraisal_date && item.appraisal_date.includes(searchQuery)) ||
      (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : (currentMonthEmployees || []);
 
const sortedcmData = [...filteredcmData].sort((a, b) => {
  const aValue = a[sortState.sortColumn];
  const bValue = b[sortState.sortColumn];
 
  // Check if the values are strings and perform locale comparison
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return sortState.sortDirection === 'ascending'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }
 
  // If the values are not strings, compare them directly
  return sortState.sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
});
 
const filterednmData = searchQuery
  ? (nextMonthEmployees || []).filter((item) =>
      (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
      (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
      // Uncomment if 'appraisal' is part of the dataset and needs to be searched
      // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.appraisal_date && item.appraisal_date.includes(searchQuery)) ||
      (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : (nextMonthEmployees || []);
 
const sortednmData = [...filterednmData].sort((a, b) => {
  const aValue = a[sortState.sortColumn];
  const bValue = b[sortState.sortColumn];
 
  // Check if the values are strings and perform locale comparison
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return sortState.sortDirection === 'ascending'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }
 
  // If the values are not strings, compare them directly
  return sortState.sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
});
 
 
 
 
 
   
return (
    <div className={styles.root}>
 
        {/* <div style={{position:'fixed', backgroundColor:'white', zIndex:1000, width:'vw'}}> */}
        {/* <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: 1000, width: '100%' }}> */}
       
        <OverlayDrawer
        size="large"
        position="end"
        open={open}
        onOpenChange={(_, state) => {
          setOpen(state.open);
          handleTabSelect1('tab1');
        }}
        style={{height:'calc(100vh - 48px)',marginTop:"48px", backgroundColor:themestate?"rgb(51, 51, 51)":""}}
      >
        <DrawerHeader
        >
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular style={{color: themestate?"white":""}}/>}
                onClick={() => setOpen(false)}
              />
            }
          >
             
          </DrawerHeaderTitle>
        </DrawerHeader>
        {open && selectedEmployee && (
        <DrawerBody>
        <div>
          <div style={{marginLeft:"3vw", marginTop:"2vh",display:"flex",width:"100%"}}>
            <Avatar color="brand" name={selectedEmployee.employee_name} size={96}/>
            <div style={{display:"flex",marginLeft:"2vw", flexDirection:"column",justifyContent:"center",width:"60%"}}>
            <Text  size={700} style={{marginBottom:"2vh", fontWeight:"bold",color:themestate?"white":""}}> {selectedEmployee.employee_name}</Text>
            <div style={{display:"flex" ,width:"100%",justifyContent: "space-between"}}>
            <Text  size={250} style={{fontWeight:"bold",color:themestate?"white":""}}> {selectedEmployee.employee_id} </Text>
            <div style={{display:"flex"}}>
            <Timer20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={250} style={{marginLeft:"3px",fontWeight:"bold",color:themestate?"white":""}}>{selectedEmployee.form_status}</Text>
            </div>
            <div style={{display:"flex"}}>
            <Calendar20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={250} style={{marginLeft:"3px", fontWeight:"bold",color:themestate?"white":""}}> {selectedEmployee.appraisal_date}</Text>
            </div>
            </div>
            </div>
            </div>
            <TabList
                defaultSelectedValue={selectedTab1}
                appearance="subtle"
                onTabSelect={handleTabSelect}
                style={{marginLeft:"3vw", marginTop:"3vh"}}
            >
                <Tab value="tab1" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Employee Info</Tab>
                {
                selectedEmployee && selectedEmployee.form_status === "Yet to Fill the Form" ? null :
                selectedEmployee && selectedEmployee.form_status === "Yet to Share the Form" ? null :
                (
                  <Tab value="tab2" className={themestate ? "tab dark drawer" : "tab"} style={{ border: '1px solid transparent' }}>
                    Employee Form
                  </Tab>
                )
              }
               
               
            </TabList>
            {selectedTab1 === 'tab1' && (
                
              <div className={`${styles.container} ${styles.gridTemplate1}`}>
        {/* <div className={styles.gridrow} style={{ gridArea: 'nameAndId' }}> */}
          <div className={`${styles.section} ${styles.nameAndId}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Name and Emp ID :</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_name}</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_id}</div>
          {/* </div> */}
        </div>

        {/* <div className={styles.gridrow} style={{ gridArea: 'managerInfo' }}> */}
          <div className={`${styles.section} ${styles.managerInfo}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Manager Info:</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.manager}</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.managerempId}</div>
          </div>
        {/* </div> */}

        {/* <div className={styles.gridrow} style={{ gridArea: 'email' }}> */}
          <div className={`${styles.section} ${styles.email}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Email:</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_mail}</div>
          </div>
        {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'doj' }}> */}
      <div className={`${styles.section} ${styles.doj}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Joining:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.date_of_joining}</div>
          {/* <div style={{marginLeft:"10px",color:themestate?"white":""}}>{selectedEmployee.doj}</div> */}
      </div>
      {/* </div> */}
      
      {/* <div className={styles.gridrow} style={{ gridArea: 'status' }}> */}
      <div className={`${styles.section} ${styles.status}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Current Status:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.form_status}</div>
      </div>
      {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'dos' }}> */}
      <div className={`${styles.section} ${styles.dos}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Starting:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.date_of_reporting}</div>
      </div>
      {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'role' }}> */}
      <div className={`${styles.section} ${styles.role}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Role:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.designation}</div>
      </div>
      {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'appraisal' }}> */}
      <div className={`${styles.section} ${styles.appraisal}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Appraisal Date:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.appraisal_date}</div>
      </div>
      {/* </div> */}

      <div className={styles.gridrow} style={{ gridArea: 'dept' }}>
      <div className={`${styles.section} ${styles.dept}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Department:</div>
        <div className={styles.content}  style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.department.dept_name}</div>
      </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'totalExperience' }}>
      <div className={`${styles.section} ${styles.totalExperience}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Total Experience:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.experience_in_domain_before_focusr}</div>
      </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'editDetails' }}>
      <div className={`${styles.section} ${styles.share}`}>
                  <div className={styles.content} style={{display: "flex"}}>
                    <ShareMultiple24Filled style={{color:'rgb(1,105,185)'}}/>
                    <Link style={{ marginLeft: '10px' }} onClick={() => handleShareLinkClick(selectedEmployee.employee_id)}>
                      Share Form Link
                    </Link>
              {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Copied to clipboard!</span>}
                  </div>
                </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'focusRExperience' }}>
      <div className={`${styles.section} ${styles.focusRExperience}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Experience in FocusR:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.experience_in_domain_before_focusr}</div>
      </div>
      </div>
    </div>
        )}
        {selectedTab1 === 'tab2' && (
        
        <div style={{ display: 'flex', marginTop: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Nav
            groups={navLinkGroups}
            selectedKey={selectedNavKey}
            onLinkClick={handleNavClick}
            styles={{
              root: {
              width: '205px',
              // backgroundColor: themestate ? "rgb(51, 51, 51)" : "",
              color: themestate ? "white" : "",
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 auto',
            },
            link: (props, theme) => ({
            ...getNavLinkStyle(props.key),
            }),
          }}
          />
            <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid #ccc' }}>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Rate disabled defaultValue={formdataemployee.self_rating/2}/>
          {/* <Rating value={value} onChange={handleRatingChange} /> */}
          <p style={{marginLeft:"5px"}}>{formdataemployee.self_rating}</p>
          </div>
        </div>
          </div>
          <div>
          <div style={{display:"flex" , width:"100%", justifyContent:"center"}}>
            <div style={{display:"flex" , width:"60%", justifyContent:"space-between", alignItems:"center"}}>
            
              <div className={`${styles.section} ${styles.share}`}>
                <div className={styles.content} style={{display: "flex"}}>
                  <ShareIos24Filled style={{color:'rgb(1,105,185)'}}/>
                  <Link style={{ marginLeft: '10px' }} className={styles.shareLink} onClick={() => handlesharetoManager(formdataemployee.id)}>Share to {selectedEmployee.manager} </Link>
                
              
              </div>
              </div>

              <div className={`${styles.section} ${styles.reviewer}`} style={{marginBottom: "1px"}}>
                <div className={styles.content} style={{display: "flex"}}>
                  {/* <Add24Filled style={{color:'rgb(1,105,185)'}}/> */}

                  {/* <Link className={styles.reviewerLink} style={{marginLeft:"10px"}}>Add Reviewer</Link> */}
                  <Dropdown
          aria-labelledby={`${dropdownId}-default`}
          placeholder="Select a reviewer"
          appearance="underline"
          style={{minWidth:"10px"}}
          onActiveOptionChange={onActiveOptionChange3}
         
          {...props}
        >
          {options1.map((option) => (
            <Option key={option.id} text={option.username} value={option.id}>
              {option.username}
            </Option>
          ))}
        </Dropdown>
                </div>
              </div>

              </div>
              </div>
            
          <div style={{ marginLeft: '20px', flex: '1 1 auto' }}>
          {selectedNavKey === 'option1' && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginTop: '1rem' }}>
            <Field label="To state your understanding of your roles and responsibilities / objectives as agreed in last year’s appraisal / during joining. ">
              <Textarea
                style={{
                  marginTop: '0.5rem',
                  width: '500px',
                  minHeight: '50px',
                }}
                value={formdataemployee.question_1}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Last Year’s Accomplishments: List your most significant accomplishments or contributions made during the review period. Make special note of any new tasks or duties you successfully performed that were outside the scope of your regular responsibilities. Please do not mention your regular day to day activities">
              <Textarea
                style={{
                  marginTop: '0.5rem',
                  width: '500px',
                  minHeight: '50px',
                }}
                value={formdataemployee.question_2}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Strengths List the personal and technical abilities that help you perform your job well. List any additional skills that you have, but that you don’t currently use in your role that could be brought to your job or could be used to assist others. Example: I am a SCM Consultant and have knowledge in WMS, would like to explore that area. I am good at proposal writing, would like to conduct training for other colleagues etc …">
              <Textarea
                style={{
                  marginTop: '0.5rem',
                  width: '500px',
                  minHeight: '50px',
                }}
                value={formdataemployee.question_3}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Development Needs List the personal and technical abilities you need to develop or enhance in order to improve your job performance. List the steps you plan to take and/or the resources you need to accomplish this development.">
              <Textarea
                style={{
                  marginTop: '0.5rem',
                  width: '500px',
                  minHeight: '50px',
                }}
                value={formdataemployee.question_4}
                readOnly={true}
              />
            </Field>
            </div>
          </div>
        )}

    {selectedNavKey === 'option2' && (
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Field label="For all the skills rated below, team member to give self ratings and managers to cross-rate Rating Performance Description" />
        {Object.entries(labels).map(([label, value], index) => (
          <div key={index} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
            <Text variant="medium" style={{ marginRight: '1rem' }}>{label}:</Text>
            {/* Render the selected option directly */}
            <Text variant="medium">{formdataemployee[value]}</Text>
            {/* Optionally, you can provide a button to change the selected option */}
          </div>
        ))}
      </div>
    )}

        {selectedNavKey === 'option3' && (
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Top 3 likes in the organization">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdataemployee.top3LikeOrganization}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Top 3 dislikes in the organization">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdataemployee.top3disLikeOrganization}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Any Suggestion to Improve the organisation">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdataemployee.suggestionToImprove}
                readOnly={true}
              />
            </Field>
            </div>
          </div>
        )}

{selectedNavKey === 'option4' && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginTop: '1rem' }}>
            <Field label="List the kind of work or job would you like to be doing in one/two/five years time">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdataemployee.future5years}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="List the actions you have taken to make yourself indispensable">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdataemployee.indispencible}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Do you want to explore your skills areas other than your present work?">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdataemployee.exploreSkills}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="If you want to explore skill areas other than your present work, List the skill areas you want to explore.">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdataemployee.exploreSkills}
                readOnly={true}
              />
            </Field>
            </div>
          </div>
        )}
          </div>
        </div>
        </div>
        
      )}

        </div>
        
        </DrawerBody>
         )}
      </OverlayDrawer>
 
 
        <Breadcrumb aria-label="breadcrumb">
    <BreadcrumbItem>
      <Link href="" className="custom-link">HR</Link>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <Link href="/hremployee" className="custom-link">Employee</Link>
    </BreadcrumbItem>
   
   
  </Breadcrumb>
        <h2 style={themestate?{color:'white'}:{}}>Employee</h2>
      <TabList
        defaultSelectedValue='tab1'
        appearance="subtle"
        onTabSelect={handleTabSelect2}
        style={themestate?{color:'white'}:{}}
      >
        <Tab    className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab1">This month</Tab>
        <Tab  className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab2">Next month</Tab>
        <Tab className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab3">Employee</Tab>
        {/* <Tab value="tab3">Employee</Tab> */}
       
      </TabList>
      <div className={styles.controls}>
      <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={() => setModalVisible(true)}><AddRegular className={styles.iconLarge}/>Add Employee</Button>
         <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleDeleteEmployee}><PersonDeleteRegular className={styles.iconLarge}/>Delete Employee</Button>
       {disableEdit&&<Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={() => setEditModalVisible(true)}><EditRegular className={styles.iconLarge}/>Edit Employee</Button>
        }
      
     
<div>
      <Modal
        open={modalVisible}
        className="modalcon"
        onCancel={handleModalClose}
        footer={null}
        style={{ borderRadius: '0px', paddingTop:20,  }}
        bodyStyle={{ borderRadius: 0 }}
      >
        <Form form={form} onFinish={handleAddEmployee} style={{ borderRadius: 0, paddingTop: 20 }}>
  <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Employee ID" name="employee_id">
        <Input
          style={{
            fontWeight: 'bold',
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }} >
      <Form.Item label="Employee Name" name="employee_name">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Employee Mail" name="employee_mail">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Date of Birth" name="dob">
        <DatePicker
          placeholder='hello'
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    </Row>
    <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Appraisal date" name="appraisal_date">
        <DatePicker
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Designation" name="designation">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
         
        />
      </Form.Item>
    </Col>
    </Row>
    <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Department" name="dept_name">
      <Dropdown
          aria-labelledby={`${dropdownId}-underline`}
          placeholder="Select department"
          appearance="underline"
          style={{minWidth:"10px",borderBottomStyle:"ridge", whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',}}
          onActiveOptionChange={onActiveOptionChange2}
          {...props}
        >
          {options2.map((option) => (
            <Option key={option.id} text={option.dept_name} value={option.id}>
              {option.dept_name}
            </Option>
          ))}
        </Dropdown>
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item name="reporting_manager" label="Manager">
        <Dropdown
          aria-labelledby={`${dropdownId}-underline`}
          placeholder="Select  manager"
          appearance="underline"
          style={{minWidth:"10px", borderBottomStyle:"ridge", whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',}}
          onActiveOptionChange={onActiveOptionChange}
          {...props}
        >
          {options.map((option) => (
            <Option key={option.id} text={option.username} value={option.id}>
              {option.username}
            </Option>
          ))}
        </Dropdown>
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Date of Joining" name="date_of_joining">
        <DatePicker
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Date of Reporting" name="date_of_reporting">
        <DatePicker
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Experience Before Focusr" name="experience_in_domain_before_focusr">
        <Input
          type="number"
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Reviewer" name="reviewer">
        {/* <label id={`${dropdownId}-underline`}>Reviewer</label> */}
        <Dropdown
          aria-labelledby={`${dropdownId}-underline`}
          placeholder="Select  reviewer"
          appearance="underline"
          style={{minWidth:"10px" ,borderBottomStyle:"ridge", whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',}}
          onActiveOptionChange={onActiveOptionChange1}
          {...props}
        >
          {options1.map((option) => (
            <Option key={option.id} text={option.username} value={option.id}>
              {option.username}
            </Option>
          ))}
        </Dropdown>
      </Form.Item>
    </Col>
  </Row>
  <Row>
    <Col span={24}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Col>
  </Row>
</Form>
 
      </Modal>
    </div>
    <div>
      <Modal
        open={editModalVisible}
        className="modalcon"
        onCancel={handleEditModalClose}
        footer={null}
        style={{ borderRadius: '0px', paddingTop:20,  }}
        bodyStyle={{ borderRadius: 0 }}
      >
        <Form form={formEdit} onFinish={handleEditEmployee} style={{ borderRadius: 0, paddingTop: 20 }}>
  <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Employee ID" name="employee_id">
        <Input
          style={{
            fontWeight: 'bold',
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Employee Name" name="employee_name">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Employee Mail" name="employee_mail">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Date of Birth" name="dob">
        <DatePicker
        className='datepickersudharsan'
        placeholder={dob}
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    </Row>
    <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Appraisal date" name="appraisal_date">
        <DatePicker
        placeholder={appraisalDate}
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Designation" name="designation">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
         
        />
      </Form.Item>
    </Col>
    </Row>
    <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Department" name="dept_name">
      <Dropdown
          aria-labelledby={`${dropdownId}-underline`}
          placeholder="Select dep"
          appearance="underline"
          style={{minWidth:"10px",borderBottomStyle:"ridge", whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'}}
          onActiveOptionChange={onActiveOptionChange2}
          {...props}
        >
          {options2.map((option) => (
            <Option key={option.id} text={option.dept_name} value={option.id}>
              {option.dept_name}
            </Option>
          ))}
        </Dropdown>
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item name="reporting_manager" label="Manager">
        <Dropdown
          aria-labelledby={`${dropdownId}-underline`}
          placeholder="Select a manager"
          appearance="underline"
          style={{minWidth:"10px",borderBottomStyle:"ridge", whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'}}
          onActiveOptionChange={onActiveOptionChange}
          {...props}
        >
          {options.map((option) => (
            <Option key={option.id} text={option.username} value={option.id}>
              {option.username}
            </Option>
          ))}
        </Dropdown>
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Date of Joining" name="date_of_joining">
        <DatePicker
        placeholder={joiningDate}
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Date of Reporting" name="date_of_reporting">
        <DatePicker
        placeholder={reportingDate}
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12} style={{ paddingRight: '18px' }}>
      <Form.Item label="Experience Before Focusr" name="experience_in_domain_before_focusr">
        <Input
          type="number"
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12} style={{ paddingLeft: '25px' }}>
      <Form.Item label="Reviewer" name="reviewer_name">
        {/* <label id={`${dropdownId}-underline`}>Reviewer</label> */}
        <Dropdown
          aria-labelledby={`${dropdownId}-underline`}
          placeholder="Select a reviewer"
          appearance="underline"
          style={{minWidth:"10px",borderBottomStyle:"ridge", whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'}}
          onActiveOptionChange={onActiveOptionChange1}
          {...props}
        >
          {options1.map((option) => (
            <Option key={option.id} text={option.username} value={option.id}>
              {option.username}
            </Option>
          ))}
        </Dropdown>
      </Form.Item>
    </Col>
  </Row>
  <Row>
    <Col span={24}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Col>
  </Row>
</Form>
 
      </Modal>
    </div>
 
 
 
<SearchBox
              placeholder="Search..."
            style={ {backgroundColor: themestate ? "rgb(41,41,41)" : ""}}
            className={themestate && "searchboxicon searchboxinputtext searchboxinputplaceholder"}
            onChange={handleSearchChange}
              value={searchQuery}
              size='medium'
              appearance='filled-darker'
            />
        <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleToggleFilters}><FilterRegular className={styles.iconLarge}/>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
 
 
      </div>
      {showFilters && (
        // <Modal header="Filters" onClose={handleFilterToggle}>
        <div className={styles.filterPanel}>
        <div style={{display:'flex'}}>
        <Checkbox label="Employee Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Manager Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
            <Checkbox label="Reviewer Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Revised Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Appraisal Done" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Choose Dept" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Choose Manager" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Choose Reviewer" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Date Cap" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
           
        </div>
        <div style={{display:'flex'}}>
        <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}}onClick={handleApplyFilters}> Apply </Button>
       <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleRemoveFilters}> Remove all</Button>
   </div>
        </div>
 
      )}
     
     <div style={{ maxHeight: '72vh', overflowY: 'auto' }}>
     <Table>
      <TableHeader>
        <TableRow style={themestate ? { color: 'white', borderBottomColor: '#383838' } : {}}>
          <TableHeaderCell />
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('employee_id')}>Emp ID</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('employee_name')}>Name</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('department')}>Dept</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('date_of_joining')}>DOJ</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('designation')}>Appraisal</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('reporting_manager')}>Manager</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedTab2==='tab1'&&(sortedcmData.map((item) => (
          <TableRow key={item.employee_id} style={themestate ? { color: 'white' } : {}} className={themestate ? "hovereffect dark" : "hovereffect"} onClick={() => handleRowClick(item)}>
            <TableSelectionCell
              checked={!!selectedItems[item.employee_id]}
              style={{ zIndex: 1000 }}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => handleCheckboxChange(event, item.employee_id)}
            />
            <TableCell>{item.employee_id}</TableCell>
            <TableCell>{item.employee_name}</TableCell>
            <TableCell>{item.department.dept_name}</TableCell>
            <TableCell>{item.date_of_joining}</TableCell>
            <TableCell>{item.appraisal_date}</TableCell>
            <TableCell>{item.manager}</TableCell>
          </TableRow>
        )))}
     
        {selectedTab2==='tab2'&&(sortednmData.map((item) => (
          <TableRow key={item.employee_id} style={themestate ? { color: 'white' } : {}} className={themestate ? "hovereffect dark" : "hovereffect"} onClick={() => handleRowClick(item)}>
            <TableSelectionCell
              checked={!!selectedItems[item.employee_id]}
              style={{ zIndex: 1000 }}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => handleCheckboxChange(event, item.employee_id)}
            />
            <TableCell>{item.employee_id}</TableCell>
            <TableCell>{item.employee_name}</TableCell>
            <TableCell>{item.department.dept_name}</TableCell>
            <TableCell>{item.date_of_joining}</TableCell>
            <TableCell>{item.appraisal_date}</TableCell>
            <TableCell>{item.manager}</TableCell>
          </TableRow>
        )))}
 
{selectedTab2==='tab3'&&(sortedData.map((item) => (
          <TableRow key={item.employee_id} style={themestate ? { color: 'white' } : {}} className={themestate ? "hovereffect dark" : "hovereffect"} onClick={() => handleRowClick(item)}>
            <TableSelectionCell
              checked={!!selectedItems[item.employee_id]}
              style={{ zIndex: 1000 }}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => handleCheckboxChange(event, item.employee_id)}
            />
            <TableCell>{item.employee_id}</TableCell>
            <TableCell>{item.employee_name}</TableCell>
            <TableCell>{item.department.dept_name}</TableCell>
            <TableCell>{item.date_of_joining}</TableCell>
            <TableCell>{item.appraisal_date}</TableCell>
            <TableCell>{item.manager}</TableCell>
          </TableRow>
        )))}
      </TableBody>
    </Table>
</div>
 
    </div>
  );
};
 
export default HREmployee;
 
 
 
 

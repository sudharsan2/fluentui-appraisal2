import React,{useState, useEffect} from "react";
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {Stack, Nav, Dropdown } from '@fluentui/react';
import { Rate,message } from 'antd';
import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  Button,
  Input,
  SearchBox,
  Field,
  Textarea,
  Rating,
  Checkbox,
  Modal,
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerProps,
  Avatar,
  Text,
  Link,
  createTableColumn,
  useTableFeatures,
  useTableSort,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbProps,
  Breadcrumb
} from "@fluentui/react-components";
import {AddRegular, PersonDeleteRegular , EditRegular, SearchRegular, FilterRegular, FilterDismissRegular, FilterAddRegular, ChartMultipleFilled,ChartMultipleRegular,Dismiss24Regular ,Timer20Regular,Calendar20Regular, ArrowDownRegular, ArrowClockwiseRegular,ShareMultiple24Filled ,Add24Filled,ShareIos24Filled  } from "@fluentui/react-icons"; // Import the icons
import './page.css';


const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: ("50px", "20px"),
    rowGap: "20px",
  },
  controls: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    // justifyContent: 'space-between',
  },
  searchInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  searchInput: {
    flexGrow: 1,
  },
  iconLarge: {
    fontSize: "24px",
    paddingRight: '10px',
    color:'rgb(1, 105, 185)' // Increase the size of the icon
  },
  container: {
    display: 'grid',
    gap: '15px',
    // padding: '20px',
    marginTop:"3vh",
    fontFamily: 'Arial, sans-serif',
    marginLeft:"3vw"
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
  heading: {
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    // justifyContent: 'space-between',
    width: '100%',
  },
  editDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4', // Change this to your preferred color
  },
  editIcon: {
    marginRight: '5px',
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
  editDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4', // Change this to your preferred color
  },
  editIcon: {
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
  gridTemplate2: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
      "nameAndId formLink"
      "email doj"
      "status dos"
      "role appraisal"
      "dept reviewer"
      "editDetails share"
    `,
  },
  gridTemplate3: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
      "nameAndId empForm"
      "email doj"
      "status dos"
      "role appraisal"
      "dept dept"
    `
  },
  gridTemplate4: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
    "nameAndId empForm"
    "email doj"
    "status dos"
    "role appraisal"
    "dept share"
    
    `
  },

  content: {
    fontSize: '13px',
    marginLeft: '10px'
  }
});

const data = {
  tab1: [
    {
      empid: 1,
      name: "John Doe",
      dept: "Engineering",
      doj: "2020-01-15",
      appraisal: "Excellent",
      manager: "Jane Doe",
    },
    {
      empid: 2,
      name: "Jane Smith",
      dept: "Product",
      doj: "2019-03-25",
      appraisal: "Good",
      manager: "John Doe",
    },
    {
        empid: 11,
        name: "John Doe",
        dept: "Engineering",
        doj: "2020-01-15",
        appraisal: "Excellent",
        manager: "Jane Doe",
      },
      {
        empid: 12,
        name: "Jane Smith",
        dept: "Product",
        doj: "2019-03-25",
        appraisal: "Good",
        manager: "John Doe",
      },
      {
        empid: 21,
        name: "John Doe",
        dept: "Engineering",
        doj: "2020-01-15",
        appraisal: "Excellent",
        manager: "Jane Doe",
      },
      {
        empid: 22,
        name: "Jane Smith",
        dept: "Product",
        doj: "2019-03-25",
        appraisal: "Good",
        manager: "John Doe",
      },
      {
        empid: 31,
        name: "John Doe",
        dept: "Engineering",
        doj: "2020-01-15",
        appraisal: "Excellent",
        manager: "Jane Doe",
      },
      {
        empid: 32,
        name: "Jane Smith",
        dept: "Product",
        doj: "2019-03-25",
        appraisal: "Good",
        manager: "John Doe",
      },
      {
        empid: 41,
        name: "John Doe",
        dept: "Engineering",
        doj: "2020-01-15",
        appraisal: "Excellent",
        manager: "Jane Doe",
      },
      {
        empid: 42,
        name: "Jane Smith",
        dept: "Product",
        doj: "2019-03-25",
        appraisal: "Good",
        manager: "John Doe",
      },
      {
        empid: 51,
        name: "John Doe",
        dept: "Engineering",
        doj: "2020-01-15",
        appraisal: "Excellent",
        manager: "Jane Doe",
      },
      {
        empid: 52,
        name: "Jane Smith",
        dept: "Product",
        doj: "2019-03-25",
        appraisal: "Good",
        manager: "John Doe",
      },
    
  ],
  tab2: [
    {
      empid: 3,
      name: "Alice Johnson",
      dept: "Design",
      doj: "2021-07-19",
      appraisal: "Excellent",
      manager: "Emily Davis",
    },
    {
      empid: 4,
      name: "Bob Brown",
      dept: "QA",
      doj: "2018-11-05",
      appraisal: "Satisfactory",
      manager: "James White",
    },
  ],
  tab3: [
    {
      empid: 5,
      name: "Charlie Davis",
      dept: "DevOps",
      doj: "2022-02-20",
      appraisal: "Excellent",
      manager: "Michael Black",
    },
    {
      empid: 6,
      name: "Dana Wilson",
      dept: "Data Science",
      doj: "2017-05-12",
      appraisal: "Good",
      manager: "Sarah Green",
    },
  ],
  tab4: [
    {
      empid: 7,
      name: "Eve Martinez",
      dept: "HR",
      doj: "2016-09-28",
      appraisal: "Good",
      manager: "Laura Blue",
    },
    {
      empid: 8,
      name: "Franklin Lee",
      dept: "Marketing",
      doj: "2015-12-15",
      appraisal: "Excellent",
      manager: "David Yellow",
    },
  ],
};

const options = [
  'Outstanding',
  'Exceeds expectations',
  'Meets expectations',
  'Needs improvement',
  'Unacceptable',
];

// Define labels for dropdowns
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

const MGReviewer = () => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState("tab1");
  const [selectedItems, setSelectedItems] = React.useState({});
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
  const newSelectedFilters = [];
  const [open, setOpen] = React.useState(false);
  const [selectedTab1, setSelectedTab1] = React.useState('tab1');
  const [sortState, setSortState] = useState({
    sortDirection: 'ascending',
    sortColumn: 'empid',
  });

  const [selectedNavKey, setSelectedNavKey] = useState('option1');
  const [value, setValue] = useState(4);

  const [formdataemployee,setformdataemployee] = useState({});

  const [formdatamanager, setformdatamanager] = useState({});

  const[formdatareviewer, setformdatareviewer] = useState({});

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
  const [todoEmployees, settodoEmployees] = useState([]);
  const [ waitingEmployees, setwaitingEmployees] = useState([]);
  const [selectedTab2, setSelectedTab2] = useState('tab1');

  const [refresh, setRefresh] = useState(false);
 
 
 
  const fetchtodoEmployeeData = () => {
    const token2 = localStorage.getItem("accessToken");
    axios.get('http://127.0.0.1:8004/user/getEmployeeforMgreviewertodo',{
      headers: {
        Authorization: `Bearer ${token2}`
      }
    })
      .then(response => {
        settodoEmployees(response.data);
        console.log({"data1": response.data})
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };
 
  const fetchwaitingEmployeeData = () => {
    const token2 = localStorage.getItem("accessToken");
    axios.get('http://127.0.0.1:8004/user/getEmployeeforMgreviewerFilled',{
      headers: {
        Authorization: `Bearer ${token2}`
      }
    })
      .then(response => {
        setwaitingEmployees(response.data);
        console.log({"data2": response.data})
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };
 
  useEffect(() => {
    fetchtodoEmployeeData();
    fetchwaitingEmployeeData();
  }, [refresh]);

  
  const handleRowClick = async (employee) => {
    try {
      const response1 = await axios.get(`http://127.0.0.1:8004/user/team-member/remarks/${employee.employee_id}`);
      setformdataemployee(response1.data);
      const response2 = await axios.get(`http://127.0.0.1:8004/user/appraiser/remarks/${employee.employee_id}`);
      setformdatamanager(response2.data);
      const response3 = await axios.get(`http://127.0.0.1:8004/user/reviewer/remarks/${employee.employee_id}`);
      setformdatareviewer(response3.data);
    } catch (err) {
      const response1 = await axios.get(`http://127.0.0.1:8004/user/team-member/remarks/${employee.employee_id}`);
      setformdataemployee(response1.data);
      const response2 = await axios.get(`http://127.0.0.1:8004/user/appraiser/remarks/${employee.employee_id}`);
      setformdatamanager(response2.data);
      setformdataemployee(response1.data);

      setformdatamanager(response2.data);

      setformdatareviewer({});
      // console.log({ "question1": formdataemployee.question_1 });
    }
    setformdataemployee({  });
    setSelectedEmployee(employee);
    setOpen(true);
    
    
   
  };

  const getNavLinkStyle = (key) => {
    let backgroundColor = themestate ? "rgb(51, 51, 51)" : "";
    if (key === selectedNavKey) {
      backgroundColor = "red";
    }
    return { backgroundColor };
  };

  const handleNavClick = (ev, item) => {
    setSelectedNavKey(item.key);
  };

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedOptions, setSelectedOptions] = useState(Array(labels.length).fill(0));

// Handler function to update selected option for a label
 
  const handleTabSelect = (event,data) => {
    setSelectedTab1(data.value);
  };
 
  const handleTabSelect1 = (value) => {
    setSelectedTab1(value);
  };

  const handleTabSelect2 = (event,data) => {
    setSelectedTab2(data.value);
  };
 
  const handleTabChange = (event, data) => {
    setSelectedTab(data.value);
    setSelectedItems({}); // Reset selection when tab changes
  };
 
  const handleNavChange = (item) => {

    setSelectedTab(item.props.itemKey);

    handleTabSelect(item.props.itemKey);

  };
 
  // const handleRowClick = (employee) => {
  //   setSelectedEmployee(employee);
  //   setOpen(true);
  // };
 
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
 
  
  const handleRefresh = () => {
    setRefresh(!refresh);
    message.success("Data has been Refreshed");
  };
 
  // const handleRowClick = (employee) => {
  //   setSelectedEmployee(employee);
  //   setOpen(true);
  // };
 
  const handleDeleteEmployee = () => {
    alert("Delete Employee functionality to be implemented");
  };
 
  const handleEditEmployee = () => {
    alert("Edit Employee functionality to be implemented");
  };
  const handleFilterToggle = () => {
    setShowFilters((prev) => !prev);
  };



  const handleItemsChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
 
  const columns = [
    createTableColumn({
      columnId: 'empid',
      compare: (a, b) => a.empid - b.empid,
    }),
    createTableColumn({
      columnId: 'name',
      compare: (a, b) => a.name.localeCompare(b.name),
    }),
    createTableColumn({
      columnId: 'dept',
      compare: (a, b) => a.dept.localeCompare(b.dept),
    }),
    createTableColumn({
      columnId: 'doj',
      compare: (a, b) => new Date(a.doj).getTime() - new Date(b.doj).getTime(),
    }),
    createTableColumn({
      columnId: 'appraisal',
      compare: (a, b) => a.appraisal.localeCompare(b.appraisal),
    }),
    createTableColumn({
      columnId: 'manager',
      compare: (a, b) => a.manager.localeCompare(b.manager),
    })
  ];

  const {
    sort: { getSortDirection, toggleColumnSort },
  } = useTableFeatures(
    {
      columns, 
      items: data[selectedTab],
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


  const filteredtodoData = searchQuery
  ? todoEmployees.filter((item) =>
    (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
      (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
     
      // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.manager_name && item.manager_name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  :todoEmployees;
 
  const sortedtodoData = [...filteredtodoData].sort((a, b) => {
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
 
  const filteredwaitingData = searchQuery
  ? waitingEmployees.filter((item) =>
    (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
  (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
  (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
  (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
  // Uncomment if 'appraisal' is part of the dataset and needs to be searched
  // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
  (item.manager_name && item.manager_name.toLowerCase().includes(searchQuery.toLowerCase()))
)
   
  :waitingEmployees;
 
  const sortedwaitingData = [...filteredwaitingData].sort((a, b) => {
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
        <DrawerHeader>
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
            <Text  size={700} style={{marginBottom:"2vh", fontWeight:"bold",color:themestate?"white":""}}>{selectedEmployee.employee_name}</Text>
            <div style={{display:"flex" ,width:"100%",justifyContent: "space-between"}}>
            <Text  size={250} style={{fontWeight:"bold",color:themestate?"white":""}}>{selectedEmployee.employee_id}</Text>
            <div style={{display:"flex"}}>
            <Timer20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={250} style={{marginLeft:"3px",fontWeight:"bold",color:themestate?"white":""}}> Yet to fill the employee form</Text>
            </div>
            <div style={{display:"flex"}}>
            <Calendar20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={250} style={{marginLeft:"3px", fontWeight:"bold",color:themestate?"white":""}}>{selectedEmployee.appraisal_date}</Text>
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
                <Tab value="tab2" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Employee Comments</Tab>
                <Tab value="tab3" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Comments</Tab>
                <Tab value="tab4" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Reviewer Comments</Tab>
                
                
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
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Email</div>
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
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.formStatus}</div>
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
      <div className={`${styles.section} ${styles.editDetails}`}>
        <div className={styles.editDetails}>
          <EditRegular className={styles.editIcon} />
          <span>Edit Details</span>
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
          <Rating value={formdataemployee.self_rating} onChange={handleRatingChange} />
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
          <div style={{ marginTop: '1rem' }}>
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
      )}
        {selectedTab1 === 'tab3' && (
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
          <Rating value={formdatamanager.self_rating} onChange={handleRatingChange} />
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
                value={formdatamanager.question_1}
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
                value={formdatamanager.question_2}
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
                value={formdatamanager.question_3}
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
                value={formdatamanager.question_4}
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
            <Text variant="medium">{formdatamanager[value]}</Text>
            {/* Optionally, you can provide a button to change the selected option */}
          </div>
        ))}
      </div>
    )}

        {selectedNavKey === 'option3' && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Top 3 likes in the organization">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatamanager.part4ManagerComments}
                readOnly={formdatamanager.top3LikeOrganization}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Top 3 dislikes in the organization">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatamanager.top3disLikeOrganization}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Any Suggestion to Improve the organisation">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatamanager.suggestionToImprove}
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
                value={formdatamanager.part5ManagerComments}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="List the actions you have taken to make yourself indispensable">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatamanager.indispencible}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Do you want to explore your skills areas other than your present work?">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatamanager.exploreSkills}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="If you want to explore skill areas other than your present work, List the skill areas you want to explore.">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatamanager.exploreSkills}
                readOnly={true}
              />
            </Field>
            </div>
          </div>
        )}
          </div>
        </div>
      )}
        {selectedTab1 === 'tab4' && (
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
          <Rating value={formdatareviewer.self_rating} onChange={handleRatingChange} />
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
                value={formdatareviewer.question_1}
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
                value={formdatareviewer.question_2}
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
                value= {formdatareviewer.question_3}
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
                value= {formdatareviewer.question_4}
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
            <Text variant="medium">{formdatareviewer[value]}</Text>
            {/* Optionally, you can provide a button to change the selected option */}
          </div>
        ))}
      </div>
    )}

        {selectedNavKey === 'option3' && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Top 3 likes in the organization">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatareviewer.top3LikeOrganization}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Top 3 dislikes in the organization">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatareviewer.top3disLikeOrganization}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Any Suggestion to Improve the organisation">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatareviewer.suggestionToImprove}
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
                value={formdatareviewer.future5years}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="List the actions you have taken to make yourself indispensable">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatareviewer.indispencible}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="Do you want to explore your skills areas other than your present work?">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatareviewer.exploreSkills}
                readOnly={true}
              />
            </Field>
            </div>
            <div style={{ marginTop: '1rem' }}>
            <Field label="If you want to explore skill areas other than your present work, List the skill areas you want to explore.">
              <Textarea
                style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px' }}
                value={formdatareviewer.exploreSkills}
                readOnly={true}
              />
            </Field>
            </div>
          </div>
        )}
          </div>
        </div>
      )}
        </div>
     
        
        </DrawerBody>
         )}
      </OverlayDrawer>
        {/* <div style={{position:'fixed', backgroundColor:'white', zIndex:1000, width:'vw'}}> */}
        {/* <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: 1000, width: '100%' }}> */}
      
        <Breadcrumb aria-label="breadcrumb">
    <BreadcrumbItem>
      <Link href="" className="custom-link">Manager</Link>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <Link href="/hremployee" className="custom-link">Review</Link>
    </BreadcrumbItem>
    </Breadcrumb>

    <Breadcrumb/>
        <h2 style={themestate?{color:'white'}:{}}>Review</h2>
      <TabList
        defaultSelectedValue='tab1'
        appearance="subtle"
        onTabSelect={handleTabSelect2}
        style={themestate?{color:'white'}:{}}
      >
        <Tab    className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab1">To do</Tab>
        <Tab  className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab2">Review done</Tab>
        {/* <Tab value="tab3">Employee</Tab> */}
        {/* <Tab value="tab3">Employee</Tab> */}
        
      </TabList>
      <div className={styles.controls}>
      <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleRefresh}><ArrowClockwiseRegular className={styles.iconLarge}/>Refresh</Button>
        <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleDeleteEmployee}><ArrowDownRegular  className={styles.iconLarge}/>Export</Button>
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
//           <div className={styles.filterPanel} >
//             <Checkbox label="Employee Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
//             <Checkbox label="Manager Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
//             <Checkbox label="Reviewer Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
//             <Checkbox label="Revised Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
//             <Checkbox label="Appraisal" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
//             <Checkbox label="Choose Dept" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
//             <Checkbox label="Choose Manager" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
//             <Checkbox label="Choose Reviewer" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
//             <Checkbox label="Date Cap" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
            
             
//             <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}}onClick={handleApplyFilters}> Apply </Button>
// <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleRemoveFilters}> Remove all</Button>
//    </div>
        // </Modal>
      )}
      {/* {selectedFilters.length > 0 && (
            <div>
              <h3>Filters:</h3>
              <ul>
                {selectedFilters.map((filter, index) => (
                  <li key={index}>{filter}</li>
                ))}
              </ul>
            </div>
          )} */}
     {/* </div> */}
     <div style={{ maxHeight: '72vh', overflowY: 'auto' }}>
  <Table>
    <TableHeader>
      <TableRow style={themestate?{color:'white',borderBottomColor:'#383838'}:{}}>
      <TableHeaderCell />
        <TableHeaderCell style={{ fontWeight: 'bold', cursor:'pointer' }} {...headerSortProps('empid')}>Emp ID</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold' , cursor:'pointer'}} {...headerSortProps('name')}>Name</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold', cursor:'pointer' }} {...headerSortProps('dept')}>Dept</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold', cursor:'pointer' }} {...headerSortProps('doj')}>DOJ</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold', cursor:'pointer' }} {...headerSortProps('appraisal')}>Appraisal</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold', cursor:'pointer' }} {...headerSortProps('manager')}>Manager</TableHeaderCell>
      </TableRow>
    </TableHeader>
    {selectedTab2==='tab1'?<TableBody>
      {sortedtodoData.map((item) => (
       <TableRow key={item.employee_id} style={themestate ? { color: 'white' } : {}} className={themestate ? "hovereffect dark" : "hovereffect"} onClick={() => handleRowClick(item)}>
       <TableSelectionCell
         checked={!!selectedItems[item.employee_id]}
         style={{ zIndex: 1000 }}
         onChange={(event) => {
           event.stopPropagation();
           handleItemsChange(item.employee_id);
           setOpen(false);
         }}
       />
       <TableCell>{item.employee_id}</TableCell>
       <TableCell>{item.employee_name}</TableCell>
       <TableCell>{item.department.dept_name}</TableCell>
       <TableCell>{item.date_of_joining}</TableCell>
       <TableCell>{item.appraisal_date}</TableCell>
       <TableCell>{item.manager_name}</TableCell>
     </TableRow>
     
      ))}
    </TableBody>:null}
 
    {selectedTab2==='tab2'?<TableBody>
      {sortedwaitingData.map((item) => (
        <TableRow key={item.employee_id} style={themestate ? { color: 'white' } : {}} className={themestate ? "hovereffect dark" : "hovereffect"} onClick={() => handleRowClick(item)}>
        <TableSelectionCell
          checked={!!selectedItems[item.employee_id]}
          style={{ zIndex: 1000 }}
          onChange={(event) => {
            event.stopPropagation();
            handleItemsChange(item.employee_id);
            setOpen(false);
          }}
        />
        <TableCell>{item.employee_id}</TableCell>
        <TableCell>{item.employee_name}</TableCell>
        <TableCell>{item.department.dept_name}</TableCell>
        <TableCell>{item.date_of_joining}</TableCell>
        <TableCell>{item.appraisal_date}</TableCell>
        <TableCell>{item.manager_name}</TableCell>
      </TableRow>
     
      ))}
    </TableBody>:null}
  </Table>
</div>

    </div>
  );
};

export default MGReviewer;

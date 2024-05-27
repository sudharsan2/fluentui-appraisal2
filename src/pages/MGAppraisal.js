import React,{useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Stack, Nav, Dropdown } from '@fluentui/react';
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
  Field,
  Textarea,
  SearchBox,
  Checkbox,
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Rating,
  BreadcrumbProps
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
  sidebar: {
    width: '205px',
    display: 'flex',
    flexDirection: 'column' ,
    height: '100%',
    backgroundColor: 'var(--sidebar-bg-color, #f0f0f0)' /* Default sidebar background color */
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
  gridrow:{
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
  navItemlight: {
    marginTop: "10px",
    left:0,
   
    "&:hover": {
      backgroundColor: "#ccc", // Change background color on hover
     
    },
  },
  navItemdark: {
    marginTop: "10px",
    left:0,
    backgroundColor:"rgb(33,33,33)",
   
    "&:hover": {
      backgroundColor: "#616161", // Change background color on hover
     
    },
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
const labels = [
  'Attendance & Punctuality',
  `Technical Skills 
  (Effectiveness with which you apply job knowledge and skill to tasks)`,
  'Quality of work (Comprehensive, accurate, thorough, professional, timely etc)',
  `New Knowledge
  (Seek new knowledge, apply it to your job and share it with others)`,
  `Utilization and Productivity 
  (Make full use of time.  Seek additional work if underutilized)`,
  `Time Management & Organizational Skills 
  (Organize, plan, and forecast work skillfully and accurately.  Effective prioritization.  Meet deadlines or communicate early if will not be met.)`,
  `Interpersonal Skills
  (Positive attitude, work and communicate well with others)`,
  `Communication - Verbal & Written 
  (Communicate knowledge clearly, accurately and thoroughly.  Document work effectively and create procedures)`,
  `Initiative, Innovation & Creativity 
  (Actively seek improvements & challenge status quo in appropriate ways.  Contribute new ideas.  Analyze problems and present solutions)`,
  `Teamwork
  (Co-ordinate own work with others, seek opinions from team members, share information willingly)`,
  `Client Focused
  (Actively seek to understand clients business issues, provide quality service to achieve client satisfaction)`,
  `Planning and Organizational Skills (Organizing, planning and monitoring of work skillfully and accurately; able to effectively prioritize tasks; meets deadlines or communicates need to revise schedule ahead of time)`,
  'Value Addition ( Extras you are able to do )'
  // Add more labels as needed
];

const MGAppraisal = () => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState("tab1");
  const [selectedItems, setSelectedItems] = React.useState({});
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
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

  const [formData1, setFormData1] = useState({
    roleResponse: '',
    accomplishments: '',
    strengths: '',
    developmentNeeds: ''
  });

  const [formData3, setFormData3] = useState({
    likes: '',
    dislikes: '',
    suggestions: '',
  });

  const [formData4, setFormData4] = useState({
    works: '',
    actions: '',
    skills: '',
    training: ''
  });

  const [areFieldsFilled1, setAreFieldsFilled1] = useState(false);
  const [areFieldsFilled3, setAreFieldsFilled3] = useState(false);
  const [areFieldsFilled4, setAreFieldsFilled4] = useState(false);
  const [filledStatus, setFilledStatus] = useState(Array(labels.length).fill(false));
  const [submitted1, setSubmitted1] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);
  const [submitted3, setSubmitted3] = useState(false);
  const [submitted4, setSubmitted4] = useState(false);
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');



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
    let backgroundColor = "rgb(51, 51, 51)";
    if (key === selectedNavKey) {
      if (key === 'option1') {
        backgroundColor = submitted1 && !areFieldsFilled1 ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option2') {
        backgroundColor = submitted2 && !filledStatus.some(status => !status) ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option3') {
        backgroundColor = submitted3 && !areFieldsFilled3 ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option4') {
        backgroundColor = submitted4 && !areFieldsFilled4 ? "rgb(51, 51, 51)" : "red";
      }
    }
    return { backgroundColor };
  };

  const handleFieldChange1 = (fieldName, value) => {
    setFormData1({
      ...formData1,
      [fieldName]: value
    });
  };

  const handleFieldChange3 = (fieldName, value) => {
    setFormData3({
      ...formData3,
      [fieldName]: value
    });
  };

  const handleFieldChange4 = (fieldName, value) => {
    setFormData4({
      ...formData4,
      [fieldName]: value
    });
  };

  const handleSubmit1 = () => {
    const { roleResponse, accomplishments, strengths, developmentNeeds } = formData1;
    const areFieldsFilled1 = roleResponse.trim() !== '' && accomplishments.trim() !== '' && strengths.trim() !== '' && developmentNeeds.trim() !== '';
    setSubmitted1(true);
    setAreFieldsFilled1(areFieldsFilled1); // Update the state variable
    if (!areFieldsFilled1) {
      setErrorMessage1('Please fill all the required fields.');
    } else {
      setErrorMessage1('');
    }
  };

  const handleSubmit2 = () => {
    setSubmitted2(true);
    const unfilledDropdownIndex = filledStatus.findIndex(status => !status);
    if (unfilledDropdownIndex !== -1) {
      setErrorMessage2(`Please fill the remaining dropdowns`);
    } else {
      setErrorMessage2('');
    }
  };

  const handleSubmit3 = () => {
    const { likes, dislikes, suggestions } = formData3;
    const areFieldsFilled3 = likes && dislikes && suggestions;
    setSubmitted3(true);
    setAreFieldsFilled3(areFieldsFilled3)
    if (!areFieldsFilled3) {
      setErrorMessage3('Please fill all the required fields.');
    } else {
      setErrorMessage3('');
    }
  };

  const handleSubmit4 = () => {
    const { works, actions, skills, training } = formData4;
    const areFieldsFilled4 = works && actions && skills && training;
    setSubmitted4(true);
    setAreFieldsFilled4(areFieldsFilled4);
    if (!areFieldsFilled4) {
      setErrorMessage4('Please fill all the required fields.');
    } else {
      setErrorMessage4('');
    }
  };

  const handleDropdownChange = (index, option) => {
    const newFilledStatus = [...filledStatus];
    newFilledStatus[index] = !!option;
    setFilledStatus(newFilledStatus);
  };


  const handleNavClick = (ev, item) => {
    setSelectedNavKey(item.key);
  };


  const handleRatingChange = (event, newValue) => {
    setValue(newValue); 
  };
 
  const handleTabSelect = (event,data) => {
    setSelectedTab1(data.value);
  };
 
  // const handleTabSelect1 = (value) => {
  //   setSelectedTab1(value);
  // };
 
  const handleTabSelect1 = (event,data) => {
    setSelectedTab1(data.value);
  };
 
  const handleTabChange = (event, data) => {
    setSelectedTab(data.value);
    setSelectedItems({}); // Reset selection when tab changes
  };

  const handleNavChange = (item) => {
    setSelectedTab(item.props.itemKey);
    handleTabSelect(item.props.itemKey);
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
 
  
  const handleAddEmployee = () => {
    alert("Add Employee functionality to be implemented");
  };
 
  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };
 
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


  const filteredData = searchQuery
  ? data[selectedTab].filter((item) =>
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.empid && item.empid.toString().includes(searchQuery)) ||
      (item.dept && item.dept.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.doj && item.doj.includes(searchQuery)) || 
      (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.manager && item.manager.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  :data[selectedTab];

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

 
  return (
    <div className={styles.root}>
          <OverlayDrawer
        size="large"
        position="end"
        open={open}
        onOpenChange={(_, state) => {
          setOpen(state.open);
          handleTabSelect('tab1');
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
            <Avatar color="brand" initials="BR" name="brand color avatar" size={96}/>
            <div style={{display:"flex",marginLeft:"2vw", flexDirection:"column",justifyContent:"center",width:"60%"}}>
            <Text  size={700} style={{marginBottom:"2vh", fontWeight:"bold",color:themestate?"white":""}}> {selectedEmployee.name}</Text>
            <div style={{display:"flex" ,width:"100%",justifyContent: "space-between"}}>
            <Text  size={250} style={{fontWeight:"bold",color:themestate?"white":""}}> {selectedEmployee.empid} </Text>
            <div style={{display:"flex"}}>
            <Timer20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={250} style={{marginLeft:"3px",fontWeight:"bold",color:themestate?"white":""}}> Yet to fill the employee form</Text>
            </div>
            <div style={{display:"flex"}}>
            <Calendar20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={250} style={{marginLeft:"3px", fontWeight:"bold",color:themestate?"white":""}}> 1 May 2024</Text>
            </div>
            </div>
            </div>
            </div>
            <TabList
                defaultSelectedValue="tab1"
                appearance="subtle"
                onTabSelect={handleTabSelect1}
                style={{marginLeft:"3vw", marginTop:"3vh"}}
            >
                <Tab value="tab1" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Employee Info</Tab>
                <Tab value="tab2" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Employee Form</Tab>
                <Tab value="tab3" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Add Comments</Tab>
                
                
            </TabList>
            {selectedTab1 === 'tab1' && (
              <div className={`${styles.container} ${styles.gridTemplate1}`}>
        {/* <div className={styles.gridrow} style={{ gridArea: 'nameAndId' }}> */}
          <div className={`${styles.section} ${styles.nameAndId}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Name and Emp ID :</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.name}</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.empid}</div>
          {/* </div> */}
        </div>

        {/* <div className={styles.gridrow} style={{ gridArea: 'managerInfo' }}> */}
          <div className={`${styles.section} ${styles.managerInfo}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Manager Info:</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.manager}</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.managerId}</div>
          </div>
        {/* </div> */}

        {/* <div className={styles.gridrow} style={{ gridArea: 'email' }}> */}
          <div className={`${styles.section} ${styles.email}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Email</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.email}</div>
          </div>
        {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'doj' }}> */}
      <div className={`${styles.section} ${styles.doj}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Joining:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.doj}</div>
          {/* <div style={{marginLeft:"10px",color:themestate?"white":""}}>{selectedEmployee.doj}</div> */}
      </div>
      {/* </div> */}
      
      {/* <div className={styles.gridrow} style={{ gridArea: 'status' }}> */}
      <div className={`${styles.section} ${styles.status}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Current Status:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.status}</div>
      </div>
      {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'dos' }}> */}
      <div className={`${styles.section} ${styles.dos}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Starting:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.dos}</div>
      </div>
      {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'role' }}> */}
      <div className={`${styles.section} ${styles.role}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Role:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.role}</div>
      </div>
      {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'appraisal' }}> */}
      <div className={`${styles.section} ${styles.appraisal}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Appraisal Date:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.appraisal}</div>
      </div>
      {/* </div> */}

      <div className={styles.gridrow} style={{ gridArea: 'dept' }}>
      <div className={`${styles.section} ${styles.dept}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Department:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.dept}</div>
      </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'totalExperience' }}>
      <div className={`${styles.section} ${styles.totalExperience}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Total Experience:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.totalExperience}</div>
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
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.focusRExperience}</div>
      </div>
      </div>
    </div>
        )}

    {selectedTab1 === 'tab2' && (
        <div className={`${styles.container} ${styles.gridTemplate2}`}>
        <div className={styles.gridrow} style={{ gridArea: 'nameAndId' }}>
          <div className={`${styles.section} ${styles.nameAndId}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Name and Emp ID :</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.name}</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.empid}</div>
          </div>
        </div>


      <div className={styles.gridrow} style={{ gridArea: 'formLink' }}>
        <div className={`${styles.section} ${styles.formLink}`}>
          <div className={styles.formDetails}>
            <ShareMultiple24Filled style={{color:'rgb(1,105,185)'}}/>
            <Link style={{marginLeft:"10px"}}>Share Form Link</Link>
          </div> 
        </div>
      </div>

        <div className={styles.gridrow} style={{ gridArea: 'email' }}>
          <div className={`${styles.section} ${styles.email}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Email:</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.email}</div>
          </div>
        </div>

      <div className={styles.gridrow} style={{ gridArea: 'doj' }}>
      <div className={`${styles.section} ${styles.doj}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Joining:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.doj}</div>
          {/* <div style={{marginLeft:"10px",color:themestate?"white":""}}>{selectedEmployee.doj}</div> */}
      </div>
      </div>
      
      <div className={styles.gridrow} style={{ gridArea: 'status' }}>
      <div className={`${styles.section} ${styles.status}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Current Status:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.status}</div>
      </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'dos' }}>
      <div className={`${styles.section} ${styles.dos}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Starting:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.dos}</div>
      </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'role' }}>
      <div className={`${styles.section} ${styles.role}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Role:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.role}</div>
      </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'appraisal' }}>
      <div className={`${styles.section} ${styles.appraisal}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Appraisal Date:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.appraisal}</div>
      </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'dept' }}>
        <div className={`${styles.section} ${styles.dept}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Department:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.dept}</div>
        </div>
      </div>


      <div className={styles.gridrow} style={{ gridArea: 'reviewer' }}>
        <div className={`${styles.section} ${styles.reviewer}`}>
          <div className={styles.reviewerDetails}>
            <Add24Filled style={{color:'rgb(1,105,185)'}}/>
            <Link className={styles.reviewerLink}>Add Reviewer</Link>
          </div>
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

      <div className={styles.gridrow} style={{ gridArea: 'share' }}>
        <div className={`${styles.section} ${styles.share}`}>
          <div className={styles.shareDetails}>
            <ShareIos24Filled style={{color:'rgb(1,105,185)'}}/>
            <Link className={styles.shareLink}>Share to Thangamani</Link>
          </div>
        </div>
      </div>
      </div>
      )}

      {selectedTab1 === 'tab3' && (
        <div style={{ display: 'flex'}}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', }}>
          <Nav
            groups={navLinkGroups}
            selectedKey={selectedNavKey}
            onLinkClick={handleNavClick}
            styles={{
              root: {
              width: '205px',
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 auto',
            },
            link: getNavLinkStyle,
          }}
          />
            <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid #ccc' }}>
          <Rating styles={{color:themestate?"white":""}} value={value} onChange={handleRatingChange} />
          <Button  onClick={() => setValue(0)}>Clear Rating</Button>
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
                    borderColor: !formData1.roleResponse && submitted1 ? 'red' : '',
                  }}
                  value={formData1.roleResponse}
                  onChange={(e) => handleFieldChange1('roleResponse', e.target.value)}
                  placeholder="Enter your response..."
                />
          </Field>
          </div>
          <div style={{ marginTop: '1rem' }}>
          <Field label="Last Year’s Accomplishments:  List your most significant accomplishments or contributions made during the review period. Make special note of any new tasks or duties you successfully performed that were outside the scope of your regular responsibilities. Please do not mention your regular day to day activities">
            <Textarea
              style={{
                marginTop: '0.5rem',
                width: '500px',
                minHeight: '50px',
                borderColor: !formData1.accomplishments && submitted1 ? 'red' : '',
              }}
              value={formData1.accomplishments}
              onChange={(e) => handleFieldChange1('accomplishments', e.target.value)}
              placeholder="Enter your response..."
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
                borderColor: !formData1.strengths && submitted1 ? 'red' : '',
              }}
              value={formData1.strengths}
              onChange={(e) => handleFieldChange1('strengths', e.target.value)}
              placeholder="Enter your response..."
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
                borderColor: !formData1.developmentNeeds && submitted1 ? 'red' : '',
              }}
              value={formData1.developmentNeeds}
              onChange={(e) => handleFieldChange1('developmentNeeds', e.target.value)}
              placeholder="Enter your response..."
            />
          </Field>
          </div>
          {errorMessage1 && <div style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage1}</div>}
          <Button style={{marginTop: '5px', backgroundColor: 'blue', color: 'white'}} onClick={handleSubmit1}>Submit</Button>
        </div>
      )}

      {selectedNavKey === 'option2' && (
        <div style={{ marginTop: '1rem' }}>
          <Field label="For all the skills rated below, team member to give self ratings and managers to cross-rate Rating Performance Description" />
          {labels.map((label, index) => (
            <div key={index} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
              <Text variant="medium" style={{ marginRight: '1rem' }}>{label}:</Text>
              <div style={{ 
                borderColor: submitted2 && !filledStatus[index] ? 'red' : '', 
                borderWidth: 1, 
                borderStyle: 'solid', 
                borderRadius: 4,
              }}>
                <Dropdown
                  placeholder="Select an option"
                  options={options.map(option => ({ key: option, text: option }))}
                  styles={{ 
                    dropdown: { width: 200, borderColor: submitted2 && !filledStatus[index] ? 'red' : '' },
                  }}
                  onChange={(event, option) => handleDropdownChange(index, option)}
                />
              </div>
            </div>
          ))}
          {errorMessage2 && <div style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage2}</div>}
          <Button style={{marginTop: '5px', backgroundColor: 'blue', color: 'white'}} onClick={handleSubmit2}>Submit</Button>
        </div>
      )}

            {selectedNavKey === 'option3' && (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginTop: '1rem' }}>
                <Field label="Top 3 likes in the organization">
                  <Textarea style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px', borderColor: !formData3.likes && submitted3 ? 'red' : '' }} value={formData3.likes} onChange={(e) => handleFieldChange3('likes', e.target.value)} placeholder="Enter your response..." />
                </Field>
                </div>
                <div style={{ marginTop: '1rem' }}>
                <Field label="Top 3 dislikes in the organization">
                <Textarea style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px', borderColor: !formData3.dislikes && submitted3 ? 'red' : '' }} value={formData3.dislikes} onChange={(e) => handleFieldChange3('dislikes', e.target.value)} placeholder="Enter your response..." />
                </Field>
                </div>
                <div style={{ marginTop: '1rem' }}>
                <Field label="Any Suggestion to Improve the organisation">
                <Textarea style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px', borderColor: !formData3.suggestions && submitted3 ? 'red' : '' }} value={formData3.suggestions} onChange={(e) => handleFieldChange3('suggestions', e.target.value)} placeholder="Enter your response..." />
                </Field>
                </div>
                {errorMessage3 && <div style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage3}</div>}
                <Button style={{marginTop: '5px', backgroundColor: 'blue', color: 'white'}} onClick={handleSubmit3}>Submit</Button>
              </div>
            )}

            {selectedNavKey === 'option4' && (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginTop: '1rem' }}>
                <Field label="List the kind of work or job would you like to be doing in one/two/five years time">
                <Textarea style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px', borderColor: !formData4.works && submitted4 ? 'red' : '' }} value={formData4.works} onChange={(e) => handleFieldChange4('works', e.target.value)} placeholder="Enter your response..." />
                </Field>
                </div>
                <div style={{ marginTop: '1rem' }}>
                <Field label="List the actions you have taken to make yourself indispensible">
                <Textarea style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px', borderColor: !formData4.actions && submitted4 ? 'red' : '' }} value={formData4.actions} onChange={(e) => handleFieldChange4('actions', e.target.value)} placeholder="Enter your response..." />
                </Field>
                </div>
                <div style={{ marginTop: '1rem' }}>
                <Field label="Do you want to explore your skills areas other than your present work?">
                <Textarea style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px', borderColor: !formData4.skills && submitted4 ? 'red' : '' }} value={formData4.skills} onChange={(e) => handleFieldChange4('skills', e.target.value)} placeholder="Enter your response..." />
                </Field>
                </div>
                <div style={{ marginTop: '1rem' }}>
                <Field label="What sort of training/experiences would benefit you in the next year? Not just job-skills - also your natural strengths and personal passions you'd like to develop - you and your work can benefit from these">
                <Textarea style={{ marginTop: '0.5rem', width: '500px', minHeight: '50px', borderColor: !formData4.training && submitted4 ? 'red' : '' }} value={formData4.training} onChange={(e) => handleFieldChange4('training', e.target.value)} placeholder="Enter your response..." />
                </Field>
                </div>
                {errorMessage4 && <div style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage4}</div>}
                <Button style={{marginTop: '5px', backgroundColor: 'blue', color: 'white'}} onClick={handleSubmit4}>Submit</Button>
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
      <Link href="/hremployee" className="custom-link">Appraisal</Link>
    </BreadcrumbItem>
    </Breadcrumb>
        <h2 style={themestate?{color:'white'}:{}}>Appraisal</h2>
      <TabList
        defaultSelectedValue="tab1"
        appearance="subtle"
        onTabSelect={handleTabChange}
        style={themestate?{color:'white'}:{}}
      >
        <Tab    className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab1">To do</Tab>
        <Tab  className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab2">Waiting for HR</Tab>
        <Tab className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab3">Review pending</Tab>
        {/* <Tab value="tab3">Employee</Tab> */}
        
      </TabList>
      <div className={styles.controls}>
      <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleAddEmployee}><ArrowClockwiseRegular className={styles.iconLarge}/>Refresh</Button>
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
    <TableBody>
    {sortedData.map((item) => (
       <TableRow key={item.empid} style={themestate?{color:'white', }:{}}  className={themestate?"hovereffect dark":"hovereffect"} onClick={() => handleRowClick(item)} >
       <TableSelectionCell
         checked={!!selectedItems[item.empid]}
         style={{zIndex:1000}}
         onChange={(event) => {
          
          //  event.stopPropagation(); // Prevents the row click event from being triggered
           handleItemsChange(item.empid);
           setOpen(false)
         }}
         
       />
          <TableCell >{item.empid}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.dept}</TableCell>
          <TableCell>{item.doj}</TableCell>
          <TableCell>{item.appraisal}</TableCell>
          <TableCell>{item.manager}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

    </div>
  );
};

export default MGAppraisal;

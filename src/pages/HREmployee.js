import React, {  useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import
{ format, parseISO }
from
'date-fns'
;
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableSelectionCell,
  makeStyles,
  shorthands,
  createTableColumn,
  useTableFeatures,
  useTableSort,
  Avatar,
  TabList,
  Tab,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbProps,
 
  PopoverTrigger, PopoverSurface, Popover,
 
} from '@fluentui/react-components';
import { OverlayDrawer, DrawerHeader, DrawerHeaderTitle, DrawerBody } from '@fluentui/react-drawer';
import {
  Button,
  Checkbox,
  SearchBox,
  Text,
} from "@fluentui/react-components";
import {AddRegular, PersonDeleteRegular , EditRegular, SearchRegular, FilterRegular, FilterDismissRegular, FilterAddRegular, ChartMultipleFilled,ChartMultipleRegular,Dismiss24Regular ,Timer20Regular,Calendar20Regular, ArrowDownRegular, ArrowClockwiseRegular,ShareMultiple24Filled ,Add24Filled,ShareIos24Filled,CheckmarkCircleFilled  } from "@fluentui/react-icons"; // Import the icons
import './page.css';
import zIndex from "@mui/material/styles/zIndex";
import { Link } from "@fluentui/react";
import axios from 'axios';
import {Modal, Form, Input, DatePicker, Select,  Row, Col, message } from 'antd';
 
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

const HREmployee = () => {
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
 

  
  const [copied, setCopied] = React.useState(false);

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
  const [form] = Form.useForm();
 
  // useEffect(() => {
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth(); // 0-based index, January is 0
  //   const nextMonth = (currentMonth + 1) % 12;
 
  //   axios.get('http://172.235.21.99:5051/user/employee/list')
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
 
  useEffect(() => {
    fetchEmployeeData();
  }, []);
 
  const fetchEmployeeData = () => {
    axios.get('http://172.235.21.99:5051/user/employee/list')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
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
  //   axios.get('http://172.235.21.99:5051/user/employee/list')
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
 
 
  const handleTabSelect2 = (event,data) => {
    console.log({"currentmonth":currentMonthEmployees})
    setSelectedTab2(data.value);
  };
  const handleTabSelect1 = (value) => {
    setSelectedTab1(value);
  };
 
  const handleTabChange = () => {
    setSelectedTab(data.value);
    setSelectedItems({});
   
   
  };
 
 
  const handleItemsChange = (id) => {
    setSelectedItems((prev) => {
      const newSelectedItems = {
        ...prev,
        [id]: !prev[id],
      };
 
      // Update the array of true selected IDs based on the new selectedItems state
      const newTrueSelectedIds = Object.keys(newSelectedItems).filter(
        (key) => newSelectedItems[key] === true
      );
 
      // Update the itemSelected state with the new array of true selected IDs
      setItemSelected(newTrueSelectedIds);
 
      return newSelectedItems;
    });
  };
 
 
 
 
  const handleItemSelect = (id) => {
    {setItemSelected((prev) => ([...prev], [id]));}
  }
 
  const handleRowClick = (employee) => {
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

  const handlesharetoManager = async (parameter) => {
    try {
      const result = await axios.post('http://127.0.0.1:8000/user/employee/changeFormStatus', {
        "empId":parameter,"status":"sharedToManager"
      });
       // Extract and set the token from the response
    } catch (error) {
      console.error('Error sending data to the API', error);
    }
  };

  const handleShareLinkClick = async (parameter) => {
    try {
      const result = await axios.post('http://172.235.21.99:5051/user/form-links', {
        "empId": parameter, // Include the parameter in the request data
      });
      const token = result.data.token; // Extract the token from the response

      // Copy the token to the clipboard
      navigator.clipboard.writeText(token).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
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
 
 
  const handleEditEmployee = () => {
    alert("Add Employee functionality to be implemented");
  };
 
  // const handleDeleteEmployee = () => {
  //   alert("Delete Employee functionality to be implemented");
  // };
 
  const handleDeleteEmployee = async () => {
    console.log(JSON.stringify({ ids: itemSelected }));
    try {
      const response = await fetch('http://172.235.21.99:5051/user/employee/multi-delete/', {
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
    try {
      const response = await axios.post('http://172.235.21.99:5051/user/employee/list', values, {
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
   
 
 
 
 
 
  const handleFilterToggle = () => {
    setShowFilters((prev) => !prev);
  };
 
 
  const filteredData = searchQuery
  ? (data || []).filter((item) =>
      (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
      (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
      // Uncomment if 'appraisal' is part of the dataset and needs to be searched
      // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : (data || []);
 
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
            <Avatar color="brand" initials="BR" name="brand color avatar" size={96}/>
            <div style={{display:"flex",marginLeft:"2vw", flexDirection:"column",justifyContent:"center",width:"60%"}}>
            <Text  size={700} style={{marginBottom:"2vh", fontWeight:"bold",color:themestate?"white":""}}> {selectedEmployee.employee_name}</Text>
            <div style={{display:"flex" ,width:"100%",justifyContent: "space-between"}}>
            <Text  size={250} style={{fontWeight:"bold",color:themestate?"white":""}}> {selectedEmployee.employee_id} </Text>
            <div style={{display:"flex"}}>
            <Timer20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={250} style={{marginLeft:"3px",fontWeight:"bold",color:themestate?"white":""}}> Yet to fill the employee form</Text>
            </div>
            <div style={{display:"flex"}}>
            <Calendar20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={250} style={{marginLeft:"3px", fontWeight:"bold",color:themestate?"white":""}}> {selectedEmployee.appraisal_date}</Text>
            </div>
            </div>
            </div>
            </div>
            <TabList
                defaultSelectedValue='tab1'
                appearance="subtle"
                onTabSelect={handleTabSelect}
                style={{marginLeft:"3vw", marginTop:"3vh"}}
            >
                <Tab value="tab1" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Employee Info</Tab>
                <Tab value="tab2" className={themestate ? "tab dark drawer" : "tab"} style= {{border:'1px solid transparent'}}>Employee Form</Tab>
               
               
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
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.reporting_manager}</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.managerId}</div>
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
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.status}</div>
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
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.department.dept_name}</div>
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
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_name}</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_id}</div>
          </div>
        </div>
 
 
      <div className={styles.gridrow} style={{ gridArea: 'formLink' }}>
        <div className={`${styles.section} ${styles.formLink}`}>
          <div className={styles.content}>
            <ShareMultiple24Filled style={{color:'rgb(1,105,185)'}}/>
            <Link style={{marginLeft:"10px"}}>Share Form Link</Link>
          </div>
        </div>
      </div>
 
        <div className={styles.gridrow} style={{ gridArea: 'email' }}>
          <div className={`${styles.section} ${styles.email}`}>
            <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Email:</div>
            <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_mail}</div>
          </div>
        </div>
 
      <div className={styles.gridrow} style={{ gridArea: 'doj' }}>
      <div className={`${styles.section} ${styles.doj}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Joining:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.date_of_joining}</div>
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
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.date_of_reporting}</div>
      </div>
      </div>
 
      <div className={styles.gridrow} style={{ gridArea: 'role' }}>
      <div className={`${styles.section} ${styles.role}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Role:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.designation}</div>
      </div>
      </div>
 
      <div className={styles.gridrow} style={{ gridArea: 'appraisal' }}>
      <div className={`${styles.section} ${styles.appraisal}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Appraisal Date:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.appraisal_date}</div>
      </div>
      </div>
 
      <div className={styles.gridrow} style={{ gridArea: 'dept' }}>
        <div className={`${styles.section} ${styles.dept}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Department:</div>
          <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.department.dept_name}</div>
        </div>
      </div>
 
 
      <div className={styles.gridrow} style={{ gridArea: 'reviewer' }}>
        <div className={`${styles.section} ${styles.reviewer}`}>
          <div className={styles.content}>
            <Add24Filled style={{color:'rgb(1,105,185)'}}/>
            <Link className={styles.reviewerLink}>Add Reviewer</Link>
          </div>
        </div>
      </div>
 
      <div className={styles.gridrow} style={{ gridArea: 'editDetails' }}>
      <div className={`${styles.section} ${styles.editDetails}`}>
        <div className={styles.content}>
          <EditRegular className={styles.editIcon} />
          <span>Edit Details</span>
        </div>
      </div>
      </div>
 
      <div className={styles.gridrow} style={{ gridArea: 'share' }}>
        <div className={`${styles.section} ${styles.share}`}>
          <div className={styles.content}>
            <ShareIos24Filled style={{color:'rgb(1,105,185)'}}/>
            <Link className={styles.shareLink}>Share to {selectedEmployee.reporting_manager}</Link>
          </div>
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
       <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={() => setModalVisible(true)}><EditRegular className={styles.iconLarge}/>Edit Employee</Button>
      <div>
      <Modal
        visible={modalVisible}
        className="modalcon"
        onCancel={handleModalClose}
        footer={null}
        style={{ borderRadius: '0px', paddingTop:20,  }}
        bodyStyle={{ borderRadius: 0 }}
      >
        <Form form={form} onFinish={handleAddEmployee} style={{ borderRadius:0, paddingTop:20,  }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Employee ID"
                name="employee_id"
               
              >
                <Input
                  style={{
                    fontWeight:'bold',
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}
 
                 
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employee Name"
                name="employee_name"
               
              >
                <Input style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Employee Mail"
                name="employee_mail"
               
              >
                <Input style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date of Birth" name="dob" >
                <DatePicker style={{ width: '100%' }} style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
 
            <Col span={12}>
              <Form.Item label="Appraisal date" name="appraisal_date" >
                <DatePicker style={{ width: '100%' }} style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
 
 
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Designation" name="designation" >
                <Input style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
 
            <Col span={12}>
              <Form.Item label="Manager" name="manager" >
                <Input style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
 
 
            <Col span={12}>
              <Form.Item
                label="Reporting Manager"
                name="reporting_manager"
               
              >
                <Input style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date of Joining"
                name="date_of_joining"
               
              >
                <DatePicker style={{ width: '100%' }} style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date of Reporting"
                name="date_of_reporting"
               
              >
                <DatePicker style={{ width: '100%' }} style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Experience Before Focusr"
                name="experience_in_domain_before_focusr"
               
              >
                <Input type="number" style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Manager" name="manager" >
                <Input style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Reviewer" name="reviewer">
                <Input style={{
                    borderRadius: 0,
                    border: 0,
                    borderBottom: '1px solid rgb(180,180,180)',
                  }}/>
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
            <TableCell>{}</TableCell>
            <TableCell>{item.reporting_manager}</TableCell>
          </TableRow>
        )))}
     
        {selectedTab2==='tab2'&&(sortednmData.map((item) => (
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
            <TableCell>{}</TableCell>
            <TableCell>{item.reporting_manager}</TableCell>
          </TableRow>
        )))}
 
{selectedTab2==='tab3'&&(sortedData.map((item) => (
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
            <TableCell>{item.reporting_manager}</TableCell>
          </TableRow>
        )))}
      </TableBody>
    </Table>
</div>
 
    </div>
  );
};
 
export default HREmployee;
 
 
 
 
//  <div style={{display:"flex"}}>
//                     <Add24Filled style={{color:'rgb(1,105,185)'}}/>
//                     <Link style={{marginLeft:"10px"}}>Add Reviewer</Link>
//                     </div>
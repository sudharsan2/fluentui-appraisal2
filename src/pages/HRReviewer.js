
import React,{useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
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
} from "@fluentui/react-components";
import {AddRegular, PersonDeleteRegular , EditRegular, SearchRegular, FilterRegular, FilterDismissRegular, FilterAddRegular, ChartMultipleRegular,Dismiss24Regular ,Timer20Regular,Calendar20Regular ,ShareMultiple24Filled ,Add24Filled,ShareIos24Filled } from "@fluentui/react-icons"; // Import the icons
import './page.css';

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("50px", "20px"),
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
  gridrow:{
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
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

  filterPanel:{
    display:'flex',
    flexDirection:'column',
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
    `
  },
  gridTemplate3: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
    "nameAndId doj"
    "email dos"
    "role appraisal"
    "dept share"
    `
  },
  gridTemplate4: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
    "nameAndId doj"
    "email dos"
    "role appraisal"
    "dept dept"
    `,
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
 
const HRReviewer = () => {
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
 
  const handleTabSelect = (event,data) => {
    setSelectedTab1(data.value);
  };
 
  const handleTabSelect1 = (value) => {
    setSelectedTab1(value);
  };
 
  const handleTabChange = (event, data) => {
    setSelectedTab(data.value);
    setSelectedItems({}); // Reset selection when tab changes
  };
 
  const handleSelectionChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // const handleRowClick = (employee) => {
  //   setSelectedEmployee(employee);
  //   setOpen(true);
  // };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
        {/* <div style={{position:'fixed', backgroundColor:'white', zIndex:1000, width:'vw'}}> */}
        {/* <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: 1000, width: '100%' }}> */}
        <OverlayDrawer
        size="large"
        position="end"
        open={open}
        onOpenChange={(_, state) => {
          {
          setOpen(state.open);
          handleTabSelect1('tab1');
        };
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
                icon={<Dismiss24Regular />}
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
                defaultSelectedValue='tab1'
                appearance="subtle"
                onTabSelect={handleTabSelect}
                style={{marginLeft:"3vw", marginTop:"3vh"}}
            >
                <Tab className={themestate ? "tab dark drawer" : "tab light drawer"} style= {{border:'1px solid transparent'}} value="tab1">Employee Info</Tab>
                <Tab className={themestate ? "tab dark drawer" : "tab light drawer"} style= {{border:'1px solid transparent'}} value="tab2">Employee Form</Tab>
                <Tab className={themestate ? "tab dark drawer" : "tab light drawer"} style= {{border:'1px solid transparent'}} value="tab3">Manager Form</Tab>
                <Tab className={themestate ? "tab dark drawer" : "tab light drawer"} style= {{border:'1px solid transparent'}} value="tab4">Reviewer Form</Tab>
            </TabList>
            {selectedTab1 === 'tab1' && (

<div className={`${styles.container} ${styles.gridTemplate1}`}>
  <div className={styles.gridrow} style={{ gridArea: 'nameAndId' }}>
    <div className={`${styles.section} ${styles.nameAndId}`}>
      <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Name and Emp ID :</div>
      <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.name}</div>
      <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.empid}</div>
    </div>
  </div>

  <div className={styles.gridrow} style={{ gridArea: 'managerInfo' }}>
    <div className={`${styles.section} ${styles.managerInfo}`}>
      <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Manager Info:</div>
      <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.manager}</div>
      <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.managerId}</div>
    </div>
  </div>

  <div className={styles.gridrow} style={{ gridArea: 'email' }}>
    <div className={`${styles.section} ${styles.email}`}>
      <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Email</div>
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
  <div>
    <div className={`${styles.container} ${styles.gridTemplate3}`}>
      {/* <div className={styles.gridrow} style={{ gridArea: 'nameAndId' }}> */}
        <div className={`${styles.section} ${styles.nameAndId}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Name and Emp ID :</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.name}</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.empid}</div>
        </div>
      {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'doj' }}> */}
        <div className={`${styles.section} ${styles.doj}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Date of Joining:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.doj}</div>
        </div>
      {/* </div> */}

      <div className={styles.gridrow} style={{ gridArea: 'email' }}>
        <div className={`${styles.section} ${styles.email}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Email:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.email}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'dos' }}>
        <div className={`${styles.section} ${styles.dos}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Date of Starting:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.dos}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'role' }}>
        <div className={`${styles.section} ${styles.role}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Role:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.role}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'appraisal' }}>
        <div className={`${styles.section} ${styles.appraisal}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Appraisal Date:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.appraisal}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'dept' }}>
        <div className={`${styles.section} ${styles.dept}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Department:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.dept}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'share' }}>
        <div className={`${styles.section} ${styles.share}`}>
          <div className={styles.shareDetails}>
            <ShareIos24Filled style={{ color: 'rgb(1,105,185)' }} />
            <Link className={styles.shareLink}>Share to Murugiah</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    {selectedTab1 === 'tab4' && (
  <div>
    <div className={`${styles.container} ${styles.gridTemplate3}`}>
      {/* <div className={styles.gridrow} style={{ gridArea: 'nameAndId' }}> */}
        <div className={`${styles.section} ${styles.nameAndId}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Name and Emp ID :</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.name}</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.empid}</div>
        </div>
      {/* </div> */}

      {/* <div className={styles.gridrow} style={{ gridArea: 'doj' }}> */}
        <div className={`${styles.section} ${styles.doj}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Date of Joining:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.doj}</div>
        </div>
      {/* </div> */}

      <div className={styles.gridrow} style={{ gridArea: 'email' }}>
        <div className={`${styles.section} ${styles.email}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Email:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.email}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'dos' }}>
        <div className={`${styles.section} ${styles.dos}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Date of Starting:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.dos}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'role' }}>
        <div className={`${styles.section} ${styles.role}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Role:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.role}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'appraisal' }}>
        <div className={`${styles.section} ${styles.appraisal}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Appraisal Date:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.appraisal}</div>
        </div>
      </div>

      <div className={styles.gridrow} style={{ gridArea: 'dept' }}>
        <div className={`${styles.section} ${styles.dept}`}>
          <div className={styles.heading} style={{ fontWeight: 'bold', color: themestate ? "white" : "" }}>Department:</div>
          <div className={styles.content} style={{ color: themestate ? "rgb(245,245,245)" : "" }}>{selectedEmployee.dept}</div>
        </div>
      </div>
    </div>
  </div>
)}
     
        </div>
        </DrawerBody>
         )}
      </OverlayDrawer>
        {/* <div style={{position:'fixed', backgroundColor:'white', zIndex:1000, width:'vw'}}> */}
        {/* <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: 1000, width: '100%' }}> */}
 
        <h2 style={themestate?{color:'white'}:{}}>Review</h2>
      <TabList
        defaultSelectedValue="tab1"
        appearance="subtle"
        onTabSelect={handleTabChange}
        style={themestate?{color:'white'}:{}}
      >
        <Tab    className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab1">Yet to be filled</Tab>
        <Tab  className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab2">Filled</Tab>
        {/* <Tab className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab3">Review pending</Tab> */}
        {/* <Tab value="tab3">Employee</Tab> */}
        
      </TabList>
      <div className={styles.controls}>
      <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleAddEmployee}><ChartMultipleRegular className={styles.iconLarge}/>Statistics</Button>
         <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleDeleteEmployee}><PersonDeleteRegular className={styles.iconLarge}/>Delete Employee</Button>
        <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleEditEmployee}><EditRegular className={styles.iconLarge}/>Edit Employee</Button>
       
      {/* <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleAddEmployee}><ArrowClockwiseRegular className={styles.iconLarge}/>Refresh</Button>
        <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleDeleteEmployee}><ArrowDownRegular  className={styles.iconLarge}/>Export</Button> */}
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
 
export default HRReviewer;
 
 
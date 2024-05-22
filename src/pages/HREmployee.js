import React, { useState,  } from 'react';
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
} from '@fluentui/react-components';
import { OverlayDrawer, DrawerHeader, DrawerHeaderTitle, DrawerBody } from '@fluentui/react-drawer';
import {
  Button,
  Checkbox,
  SearchBox,
  Text,
  TabList,
  Tab,
  Avatar,
  Link,
} from '@fluentui/react-components';
import { AddRegular, EditRegular, PersonDeleteRegular, FilterRegular, Dismiss24Regular, Timer20Regular, Calendar20Regular, ArrowDown16Filled, ShareMultiple24Filled, Add24Filled, ShareIos24Filled } from '@fluentui/react-icons';
import { useSelector } from 'react-redux';

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
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
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
    marginTop:"3vw"
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
  const [selectedTab1, setSelectedTab1] = React.useState("tab1")
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
  const [sortState, setSortState] = useState({
    sortDirection: 'ascending',
    sortColumn: 'empid',
  });

  const handleTabSelect = (event, data) => {
    setSelectedTab1(data.value);
  }

  const handleTabChange = (event, data) => {
    setSelectedTab(data.value);
    setSelectedItems({});
  };

  const handleItemsChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  
  const handleAddEmployee = () => {
    alert("Add Employee functionality to be implemented");
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

    
 

  const renderTabContent = () => {
    if (selectedTab1 === 'tab1') {
      return (
        <div className={styles.container}>
          <div className={styles.section}>
            <div className={styles.heading}>Name and Emp ID :</div>
            <div>{selectedEmployee.name}</div>
            <div>{selectedEmployee.empid}</div>

            <div className={styles.gridrow}>
              <div className={styles.heading}>Email</div>
              <div>{selectedEmployee.email}</div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.heading}>Current Status</div>
              <div>{selectedEmployee.status}</div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.heading}>Role</div>
              <div>{selectedEmployee.role}</div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.heading}>Department</div>
              <div>{selectedEmployee.dept}</div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.editDetails}>
                <EditRegular className={styles.editIcon} />
                <span>Edit Details</span>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>Manager Info</div>
            <div>{selectedEmployee.manager}</div>
            <div>{selectedEmployee.managerId}</div>
            <div className={styles.gridrow}>
              <div className={styles.row}>
                <div className={styles.heading}>Date of Joining</div>
                <div>{selectedEmployee.doj}</div>
              </div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.row}>
                <div className={styles.heading}>Date of Starting</div>
                <div>{selectedEmployee.dos}</div>
              </div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.row}>
                <div className={styles.heading}>Appraisal Date</div>
                <div>{selectedEmployee.appraisal}</div>
              </div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.row}>
                <div className={styles.heading}>Total Experience</div>
                <div>{selectedEmployee.totalExperience}</div>
              </div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.row}>
                <div className={styles.heading}>Experience in FocusR</div>
                <div>{selectedEmployee.focusRExperience}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedTab1 === 'tab2') {
      return (
        <div className={styles.container}>
          <div className={styles.section}>
            <div className={styles.heading}>Name and Emp ID :</div>
            <div>{selectedEmployee.name}</div>
            <div>{selectedEmployee.empid}</div>

            <div className={styles.gridrow}>
              <div className={styles.heading}>Email</div>
              <div>{selectedEmployee.email}</div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.heading}>Current Status</div>
              <div>{selectedEmployee.status}</div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.heading}>Role</div>
              <div>{selectedEmployee.role}</div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.heading}>Department</div>
              <div>{selectedEmployee.dept}</div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.editDetails}>
                <EditRegular className={styles.editIcon} />
                <span>Edit Details</span>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.editDetails}>
              <ArrowDown16Filled style={{color:'rgb(1,105,185)'}}/>
              <Link style={{marginLeft:"10px"}}>Upload CSV template</Link>
            </div>
            <div className={styles.section}>
              <div className={styles.editDetails}>
                <ShareMultiple24Filled style={{color:'rgb(1,105,185)'}}/>
                <Link style={{marginLeft:"10px"}}>Share Form Link</Link>
              </div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.row}>
                <div className={styles.heading}>Date of Joining</div>
                <div>{selectedEmployee.doj}</div>
              </div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.row}>
                <div className={styles.heading}>Date of Starting</div>
                <div>{selectedEmployee.dos}</div>
              </div>
            </div>
            <div className={styles.gridrow}>
              <div className={styles.row}>
                <div className={styles.heading}>Appraisal Date</div>
                <div>{selectedEmployee.appraisal}</div>
              </div>
            </div>
            <div className={styles.gridrow}>
                    <div className={styles.row}>
                    <div className={styles.heading}>
                  <div style={{display:"flex"}}>
                    <Add24Filled style={{color:'rgb(1,105,185)'}}/>
                    <Link style={{marginLeft:"10px"}}>Add Reviewer</Link>
                    </div>
                  
                  </div>
                      <div style={{marginLeft:"10px"}}>{selectedEmployee.totalExperience}</div>
                    </div>
                  </div>
                  <div className={styles.gridrow}>
                    <div className={styles.row}>
                    <div className={styles.heading}>
                  <div style={{display:"flex"}}>
                    <ShareIos24Filled style={{color:'rgb(1,105,185)'}}/>
                    <Link style={{marginLeft:"10px"}}>Share to Thangamani</Link>
                    </div>
                  
                  </div>
                      <div style={{marginLeft:"10px"}}>{selectedEmployee.focusRExperience}</div>
                    </div>
                  </div>
                </div>
          </div>
      );
    }
  };

  return (
    <div className={styles.root}>
          <OverlayDrawer
        size="large"
        position="end"
        open={open}
        onOpenChange={(_, state) => setOpen(state.open)}
        style={{height:'calc(100vh - 48px)',marginTop:"48px"}}
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
            <Text  size={700} style={{marginBottom:"2vh"}}> {selectedEmployee.name}</Text>
            <div style={{display:"flex" ,width:"100%",justifyContent: "space-between"}}>
            <Text  size={400}> {selectedEmployee.empid} </Text>
            <div style={{display:"flex"}}>
            <Timer20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={400} style={{marginLeft:"3px"}}> Yet to fill the employee form</Text>
            </div>
            <div style={{display:"flex"}}>
            <Calendar20Regular style={{color:'rgb(1,105,185)'}}/>
            <Text  size={400} style={{marginLeft:"3px"}}> 1 May 2024</Text>
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
                <Tab value="tab1">Employee Info</Tab>
                <Tab value="tab2">Employee Form</Tab>
                
                
            </TabList>
            {renderTabContent()}
     
        </div>
        </DrawerBody>
         )}
      </OverlayDrawer>
        {/* <div style={{position:'fixed', backgroundColor:'white', zIndex:1000, width:'vw'}}> */}
        {/* <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: 1000, width: '100%' }}> */}
 
        <h2 style={themestate?{color:'white'}:{}}>Employee</h2>
      <TabList
        selectedValue={selectedTab}
        appearance="subtle"
        onTabSelect={handleTabChange}
        style={themestate?{color:'white'}:{}}
      >
        <Tab    className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab1">This month</Tab>
        <Tab  className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab2">Next month</Tab>
        <Tab className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab3">Employee</Tab>
        {/* <Tab value="tab3">Employee</Tab> */}
        
      </TabList>
      <div className={styles.controls}>
      <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleAddEmployee}><AddRegular className={styles.iconLarge}/>Add Employee</Button>
         <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleDeleteEmployee}><PersonDeleteRegular className={styles.iconLarge}/>Delete Employee</Button>
       <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleEditEmployee}><EditRegular className={styles.iconLarge}/>Edit Employee</Button>
      
      {/* <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleAddEmployee}><ArrowClockwiseRegular className={styles.iconLarge}/>Refresh</Button>
        <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleDeleteEmployee}><ArrowDownRegular  className={styles.iconLarge}/>Export</Button> */}
         <SearchBox
              placeholder="Search..."
              // style={getSearchBoxStyle()}
              // className={themestate && "searchboxicon searchboxinputtext searchboxinputplaceholder"}
              size='medium'
              appearance='filled-darker'
              onChange={handleSearchChange}
              value={searchQuery}
            />
        
        <Button style={{border:'1px solid transparent', borderRadius:'0px'}} onClick={handleToggleFilters}><FilterRegular className={styles.iconLarge}/>
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
      <TableRow>
        <TableHeaderCell />
        <TableHeaderCell {...headerSortProps('empid')}style={{ fontWeight: 'bold' }}>Emp ID</TableHeaderCell>
        <TableHeaderCell {...headerSortProps('name')}style={{ fontWeight: 'bold' }}>Name</TableHeaderCell>
        <TableHeaderCell {...headerSortProps('dept')}style={{ fontWeight: 'bold' }}>Dept</TableHeaderCell>
        <TableHeaderCell {...headerSortProps('doj')}style={{ fontWeight: 'bold' }}>DOJ</TableHeaderCell>
        <TableHeaderCell {...headerSortProps('appraisal')}style={{ fontWeight: 'bold' }}>Appraisal</TableHeaderCell>
        <TableHeaderCell {...headerSortProps('manager')}style={{ fontWeight: 'bold' }}>Manager</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sortedData.map((item) => (
       <TableRow key={item.empid} onClick={() => handleRowClick(item)} >
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

export default HREmployee;


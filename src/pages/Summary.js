import * as React from "react";
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
} from "@fluentui/react-components";
import {AddRegular, PersonDeleteRegular , EditRegular, SearchRegular, FilterRegular, FilterDismissRegular, FilterAddRegular    } from "@fluentui/react-icons"; // Import the icons

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

const Summary = () => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState("tab1");
  const [selectedItems, setSelectedItems] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);

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

  const handleApplyFilters = () => {
    alert("Apply Filters functionality to be implemented");
  };


  const filteredData = data[selectedTab].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.root}>
        {/* <div style={{position:'fixed', backgroundColor:'white', zIndex:1000, width:'vw'}}> */}
        {/* <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: 1000, width: '100%' }}> */}
 
        <h2 style={{paddingLeft:''}}>Employee</h2>
      {/* <TabList
        defaultSelectedValue="tab2"
        appearance="subtle"
        onTabSelect={handleTabChange}
      >
        <Tab value="tab1">This month</Tab>
        <Tab value="tab2">Next month</Tab>
        <Tab value="tab3">Employee</Tab>
        
      </TabList> */}
      <div className={styles.controls}>
        <Button style={{border:'1px solid transparent', borderRadius:0}} onClick={handleAddEmployee}><AddRegular className={styles.iconLarge}/>Add Employee</Button>
        <Button style={{border:'1px solid transparent', borderRadius:0}} onClick={handleDeleteEmployee}><PersonDeleteRegular className={styles.iconLarge}/>Delete Employee</Button>
        <Button style={{border:'1px solid transparent', borderRadius:0}} onClick={handleEditEmployee}><EditRegular className={styles.iconLarge}/>Edit Employee</Button>
        <SearchBox
              placeholder="Search..."
            //   style={getSearchBoxStyle()}
            //   className={themestate && "searchboxicon searchboxinputtext searchboxinputplaceholder"}
              size='medium'
              appearance='filled-darker'
            />
        <Button style={{border:'1px solid transparent', borderRadius:'0px'}} onClick={handleToggleFilters}><FilterRegular className={styles.iconLarge}/>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      {showFilters && (
        // <Modal header="Filters" onClose={handleFilterToggle}>
          <div className={styles.filterPanel}>
            <Checkbox label="Employee Fill" />
            <Checkbox label="Manager Fill" />
            <Checkbox label="Reviewer Fill" />
            <Checkbox label="Revised Fill" />
            <Checkbox label="Appraisal" />
            <Checkbox label="Choose Dept" />
            <Checkbox label="Choose Manager" />
            <Checkbox label="Choose Reviewer" />
            <Checkbox label="Date Cap
            "/> 
            <Button style={{border:'1px solid transparent', marginTop:'10px', borderRadius:0}} onClick={handleApplyFilters}> Apply </Button>
            <Button style={{border:'1px solid transparent', marginTop:'10px', borderRadius:0}} onClick={handleRemoveFilters}> Remove all</Button>
          </div>
        // </Modal>
      )}
     {/* </div> */}
     <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderCell></TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold' }}>Emp ID</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold' }}>Name</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold' }}>Dept</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold' }}>Date of Joining</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold' }}>Appraisal</TableHeaderCell>
        <TableHeaderCell style={{ fontWeight: 'bold' }}>Manager</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {filteredData.map((item) => (
        <TableRow key={item.empid}>
          <TableSelectionCell
            checked={!!selectedItems[item.empid]}
            onChange={() => handleSelectionChange(item.empid)}
          />
          <TableCell>{item.empid}</TableCell>
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

export default Summary;

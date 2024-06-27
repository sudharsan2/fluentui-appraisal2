import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../node_modules/@fullcalendar/daygrid/main.css'
import '../../node_modules/@fullcalendar/timegrid/main.css'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar
} from 'recharts';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { Dropdown, Label } from '@fluentui/react';
import { Table, TableHeader, TableRow, TableCell, TableBody, SearchBox, Link } from '@fluentui/react-components'
import './dashboard.css';
import { FaUser, FaUserTie, FaUserCheck } from 'react-icons/fa';
import {MailLink24Regular } from '@fluentui/react-icons'
import { List } from '@fluentui/react/lib/List';
import { Empty } from 'antd';
// import '../../node_modules/@ant-design/icons/dist/antd.css'
import { format } from 'date-fns';
 
const HRDashboard = () => {
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
 
  // const fontcolor = themestate ? darktheme.fontcolordark : 'rgb(0, 0, 0)';
 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedManager, setSelectedManager] = useState('Manager 1');
  const [selectedReviewer, setSelectedReviewer] = useState('Reviewer 1');
 
  const [calloutTarget, setCalloutTarget] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
 
  const events=[
    { id: 1, title: "Appraisal 1", date: '2024-06-28', employeeName: 'John Doe', managerName: 'Thangamani' },
    { id: 2, title: "Appraisal 2", date: '2024-06-30', employeeName: 'Jane Smith', managerName: 'Manoj' },
    { id: 3, title: "Appraisal 3", date: '2024-06-29', employeeName: 'Alice Johnson', managerName: 'Thangamani' },
    { id: 4, title: "Appraisal 4", date: '2024-06-28', employeeName: 'Bob Brown', managerName: 'Shrinivas' },
    { id: 5, title: "Appraisal 5", date: '2024-06-28', employeeName: 'Alice Johnson', managerName: 'Manoj' },
    { id: 6, title: "Appraisal 6", date: '2024-06-30', employeeName: 'Bob Brown', managerName: 'Thangamani' }
  ]
 
  const handleDateClick = (arg) => {
    const appraisals = events.filter((e) => e.date === arg.dateStr);
    if (appraisals.length > 0) {
      setSelectedDate({ date: arg.dateStr, appraisals });
      setCalloutTarget(arg.jsEvent.target); // Use arg.el as the target
    }
  };
 
  const handlePopoverClose = () => {
    setSelectedDate(null);
    setCalloutTarget(null);
  };
 
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
 
  // const eventClassNames = (arg) => {
  //   const hasAppraisal = events.some((event) => event.date === arg.event.startStr);
  //   return hasAppraisal ? 'has-appraisal' : '';
  // };
 
  const renderPopover = (item, index) => (
    <div>
      <div className='popover-item' key={index}>
        <div><strong>Emp ID:</strong> {item.id}</div>
        <div><strong>Emp Name:</strong> {item.employeeName}</div>
        <div><strong>Manager Name:</strong> {item.managerName}</div>
      </div>
    </div>
  );
 
  // const aggregateEvents = (events) => {
  //   const eventMap = {};
 
  //   events.forEach(event => {
  //     if (eventMap[event.date]) {
  //       eventMap[event.date].count += 1;
  //       eventMap[event.date].appraisals.push(event);
  //     } else {
  //       eventMap[event.date] = {
  //         date: event.date,
  //         title: `${event.title} (${1})`,
  //         count: 1,
  //         appraisals: [event]
  //       };
  //     }
  //   });
 
  //   return Object.values(eventMap).map(event => ({
  //     date: event.date,
  //     title: `Appraisals (${event.count})`,
  //     appraisals: event.appraisals
  //   }));
  // };
 
  // const aggregatedEvents = aggregateEvents(events);
 
  const eventClassNames = (arg) => {
    const hasAppraisal = events.some((event) => event.date === arg.event.startStr);
    return hasAppraisal ? 'has-appraisal' : '';
  };
 
  const doughnutData = [
    { name: 'Filled', value: 40 },
    { name: 'Yet to be filled', value: 20 },
    { name: 'Overdue', value: 30 }
  ];
 
  const counts = events.reduce((acc, event) => {
    if (event.title === "Employee Appraisal") {
      acc.Employee += 1;
    } else if (event.title === "Manager Appraisal") {
      acc.Manager += 1;
    } else if (event.title === "Reviewer Appraisal") {
      acc.Reviewer += 1;
    }
    return acc;
  }, { Employee: 5, Manager: 2, Reviewer: 7 });
 
  const managerData = [
    { name: 'Filled', value: 20 },
    { name: 'Yet to be Filled', value: 15 },
    { name: 'Overdue', value: 5 }
  ];
 
  const handleManagerChange = (event, item) => {
    if (item) {
      setSelectedManager(item.key);
    }
  };
 
  const reviewerData = [
    { name: 'Filled', value: 40 },
    { name: 'Yet to be Filled', value: 15 },
    { name: 'Overdue', value: 5 }
  ];
 
  const handleReviewerChange = (event, item) => {
    if (item) {
      setSelectedReviewer(item.key);
    }
  };
 
  // const [selectedManager1, setSelectedManager1] = useState('All Managers');
  // const [selectedReviewer1, setSelectedReviewer1] = useState('All Reviewers');
  // const [selectedStatus, setSelectedStatus] = useState('All Statuses');
 
  // const handleManagerChange1 = (item) => {
  //   setSelectedManager1(item.key);
  //   setSelectedReviewer1('All Reviewers');
  // };
 
  // const handleReviewerChange1 = (item) => {
  //   setSelectedReviewer1(item.key);
  //   setSelectedManager1('All Managers');
  // };
 
  // const handleStatusChange = (item) => {
  //   setSelectedStatus(item.key);
  // };
 
  // const dummyData = [
  //   { id: 1, name: 'John Doe',department: 'HR', manager: 'Manager 1', reviewer: 'Reviewer 1', status: 'Filled' },
  //   { id: 2, name: 'Jane Smith',department: 'OCR', manager: 'Manager 2', reviewer: 'Reviewer 2', status: 'Yet to be Filled' },
  //   { id: 3, name: 'Alice Johnson',department: 'Product Development', manager: 'Manager 1', reviewer: 'Reviewer 1', status: 'Overdue' },
  //   { id: 4, name: 'Bob Brown',department: 'Sales', manager: 'Manager 3', reviewer: 'Reviewer 3', status: 'Filled' },
  //   { id: 5, name: 'Charlie Brown',department: 'HR', manager: 'Manager 2', reviewer: 'Reviewer 2', status: 'Yet to be Filled' },
  //   { id: 6, name: 'Eve Green',department: 'Sales', manager: 'Manager 3', reviewer: 'Reviewer 3', status: 'Overdue' },
  // ];
 
  // Filtered data based on selected options
  // const filteredData = dummyData.filter((item) => {
  //   if (selectedManager1 !== 'All Managers' && selectedReviewer1 === 'All Reviewers') {
  //     // Filter by specific manager and all reviewers
  //     return item.manager === selectedManager1 &&
  //            (selectedStatus === 'All Statuses' || item.status === selectedStatus);
  //   }
  //   if (selectedReviewer1 !== 'All Reviewers' && selectedManager1 === 'All Managers') {
  //     // Filter by specific reviewer and all managers
  //     return item.reviewer === selectedReviewer1 &&
  //            (selectedStatus === 'All Statuses' || item.status === selectedStatus);
  //   }
  //   if (selectedManager1 === 'All Managers' && selectedReviewer1 === 'All Reviewers') {
  //     // Filter by all managers and all reviewers
  //     return selectedStatus === 'All Statuses' || item.status === selectedStatus;
  //   }
  //   // Filter by specific manager, specific reviewer, and specific status
  //   return item.manager === selectedManager1 &&
  //          item.reviewer === selectedReviewer1 &&
  //          (selectedStatus === 'All Statuses' || item.status === selectedStatus);
  // });
 
  // const filteredcmData = searchQuery
  // ? (filteredData || []).filter((item) =>
  //     (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.id && item.id.toString().includes(searchQuery)) ||
  //     (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.manager && item.manager.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.reviewer && item.reviewer.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.status && item.status.toLowerCase().includes(searchQuery.toLowerCase()))
  //   )
  // : (filteredData || []);
 
  const today = new Date();
  const sortedEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
 
  let upcomingEvents = [];
 
  if (sortedEvents.length > 0) {
    // Get the nearest date
    const nearestDate = new Date(sortedEvents[0].date);
    // Filter events that have the same nearest date
    upcomingEvents = sortedEvents.filter(event => new Date(event.date).getTime() === nearestDate.getTime());
  }
 
  const renderCell = (item, index) => {
    return (
      <div className="appraisal-item" key={index}>
        <div className="content-container">
          <div>
            <div><strong>Date:</strong> {item.date}</div>
            <div><strong>Employee ID:</strong> {item.id}</div>
            <div><strong>Employee Name:</strong> {item.employeeName}</div>
          </div>
          <div className="icon-link-container">
            <MailLink24Regular style={{ color: 'rgb(1,105,185)' }} />
            <Link style={{ marginLeft: '10px' }}>
              Copy Link
            </Link>
          </div>
        </div>
      </div>
    );
  };
 
  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value || '');
  // };
 
  const getColorDensity = (count) => {
    if (count === 1) return '#cfe2f3';
    if (count === 2) return '#9fc5e8';
    if (count === 3) return '#6fa8dc';
    return '#3c78d8'; // For more than 3 appraisals
  };
 
  const dayCellClassNames = (arg) => {
    const formattedDate = format(arg.date, 'yyyy-MM-dd');
    const dayEvents = events.filter((e) => e.date === formattedDate);
    if (dayEvents.length === 1) {
        return ['has-appraisal-1'];
    } else if (dayEvents.length === 2) {
        return ['has-appraisal-2'];
    } else if (dayEvents.length >= 3) {
        return ['has-appraisal-3'];
    }
    return [];
};
   
 
  return (
    <div className="content">
      <div className="widgets">
      <div className="widget">
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        // events={aggregatedEvents}
        height={450}
        dateClick={(arg) => handleDateClick(arg)}
        eventClassNames={eventClassNames}
        dayCellClassNames={dayCellClassNames}
      />
 
      {selectedDate && (
        <Callout
          target={calloutTarget}
          onDismiss={handlePopoverClose}
          setInitialFocus={true}
          directionalHint={DirectionalHint.bottomAutoEdge}
          styles={{
            root: {
              marginTop: 25,
              width: 150,
              padding: 5,
              fontSize: 15,
              backgroundColor: 'white',
            },
          }}
        >
          <List
        items={selectedDate.appraisals}
        onRenderCell={renderPopover}
      />
        </Callout>
      )}
        </div>
 
        <div className="widget widget-list">
          <h2 className='widget-title'>Upcoming Appraisals</h2>
          <List items={upcomingEvents} onRenderCell={renderCell} />
        </div>
 
 
        <div className="widget widget-forms">
  <h2 className="widget-title">Forms to be Shared:</h2>
  <div className="cards">
    <div className="card">
      <div className="card-icon">
        <FaUser className="icon" />
      </div>
      <div className="card-content">
        <div className="card-title">Employee</div>
        <div className="card-count">{counts.Employee}</div>
      </div>
    </div>
    <div className="card">
      <div className="card-icon">
        <FaUserTie className="icon" />
      </div>
      <div className="card-content">
        <div className="card-title">Manager</div>
        <div className="card-count">{counts.Manager}</div>
      </div>
    </div>
    <div className="card">
      <div className="card-icon">
        <FaUserCheck className="icon" />
      </div>
      <div className="card-content">
        <div className="card-title">Reviewer</div>
        <div className="card-count">{counts.Reviewer}</div>
      </div>
    </div>
  </div>
</div>
 
<div className="widget widget-pie">
          <h2 className="widget-title">Appraisal Completion Rate:</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={doughnutData}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={70}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {doughnutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip
            contentStyle={{ width: '130px' }} // Set the width of the tooltip
            />
            {/* Legend for PieChart */}
            <Legend
              align="center"
              verticalAlign="bottom"
              iconSize={10}
              iconType="circle"
              formatter={(value, entry, index) => (
                <span style={{ color: COLORS[index % COLORS.length] }}>{value}</span>
              )}
            />
          </PieChart>
        </div>
     
 
        <div className="widget bar">
      <h2 className="widget-title">Manager wise Appraisal:</h2>
      <Label>Select Manager:</Label>
      <Dropdown
        selectedKey={selectedManager}
        options={[
          { key: 'Manager 1', text: 'Manager 1' },
          { key: 'Manager 2', text: 'Manager 2' },
          { key: 'Manager 3', text: 'Manager 3' },
          // Add more options for other managers as needed
        ]}
        onChange={handleManagerChange}
        styles={{ dropdown: { width: 150, marginBottom: 20 } }}
      />
      <BarChart width={400} height={250} data={managerData}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <RechartsTooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div style={{ background: '#fff', border: '1px solid #ccc', padding: '5px' }}>
                  Value: {payload[0].value}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
 
    <div className="widget bar">
      <h2 className="widget-title">Reviewer wise Appraisal:</h2>
      <Label>Select Reviewer:</Label>
      <Dropdown
        selectedKey={selectedReviewer}
        options={[
          { key: 'Reviewer 1', text: 'Reviewer 1' },
          { key: 'Reviewer 2', text: 'Reviewer 2' },
          { key: 'Reviewer 3', text: 'Reviewer 3' },
          // Add more options for other managers as needed
        ]}
        onChange={handleReviewerChange}
        styles={{ dropdown: { width: 150, marginBottom: 20 } }}
      />
      <BarChart width={400} height={250} data={reviewerData}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      <YAxis/>
        <RechartsTooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div style={{ background: '#fff', border: '1px solid #ccc', padding: '5px' }}>
                  Value: {payload[0].value}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
 
        {/* <div className="filter-widget">
        <div className="filters">
  <div style={{ marginBottom: '10px' }}>
    <Label>Manager:</Label>
    <Dropdown
      selectedKey={selectedManager1}
      options={[
        { key: 'All Managers', text: 'All Managers' },
        { key: 'Manager 1', text: 'Manager 1' },
        { key: 'Manager 2', text: 'Manager 2' },
        { key: 'Manager 3', text: 'Manager 3' }
      ]}
      onChange={(event, item) => handleManagerChange1(item)}
      styles={{ dropdown: { width: 200 } }}
    />
  </div>
  <div style={{ marginBottom: '10px' }}>
    <Label>Reviewer:</Label>
    <Dropdown
      selectedKey={selectedReviewer1}
      options={[
        { key: 'All Reviewers', text: 'All Reviewers' },
        { key: 'Reviewer 1', text: 'Reviewer 1' },
        { key: 'Reviewer 2', text: 'Reviewer 2' },
        { key: 'Reviewer 3', text: 'Reviewer 3' }
      ]}
      onChange={(event, item) => handleReviewerChange1(item)}
      styles={{ dropdown: { width: 200 } }}
    />
  </div>
  <div style={{ marginBottom: '10px' }}>
    <Label>Status:</Label>
    <Dropdown
      selectedKey={selectedStatus}
      options={[
        { key: 'All Statuses', text: 'All Statuses' },
        { key: 'Yet to be Filled', text: 'Yet to be Filled' },
        { key: 'Filled', text: 'Filled' },
        { key: 'Overdue', text: 'Overdue' }
      ]}
      onChange={(event, item) => handleStatusChange(item)}
      styles={{ dropdown: { width: 200 } }}
    />
  </div>
 
  <SearchBox
            placeholder="Search..."
            style={ {backgroundColor: themestate ? "rgb(41,41,41)" : "", height: '5px', marginTop: '30px'}}
            className={themestate && "searchboxicon searchboxinputtext searchboxinputplaceholder"}
            onChange={handleSearchChange}
            value={searchQuery}
            size='medium'
            appearance='filled-darker'
  />
</div>
 
 
<Table>
  <TableHeader>
    <TableRow>
      <TableCell style={{ fontWeight: 'bold' }}>Emp ID</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Department</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Manager</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Reviewer</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredcmData.length === 0 ? (
      <TableCell colSpan="6">
        <div style={{ display: 'flex',padding: '20px', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <Empty description="No Data Available." />
        </div>
      </TableCell>
    ) : (
      filteredcmData.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.department}</TableCell>
          <TableCell>{item.manager}</TableCell>
          <TableCell>{item.reviewer}</TableCell>
          <TableCell>{item.status}</TableCell>
        </TableRow>
      ))
    )}
  </TableBody>
</Table>
      </div>*/}
      </div>
    </div>
  );
}
 
export default HRDashboard;
 
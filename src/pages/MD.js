import React, { useEffect, useState } from "react";
import { Stack, Nav } from "@fluentui/react";
import { useSelector, useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from "axios";
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
  SearchBox,
  Field,
  Textarea,
  Rating,
  Checkbox,
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
  useId,
  Breadcrumb,
} from "@fluentui/react-components";
import {
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
} from "@fluentui/react-drawer";
// import {
//   Button,
//   Checkbox,
//   SearchBox,
//   Text,
// } from "@fluentui/react-components";
import {
  AddRegular,
  PersonDeleteRegular,
  EditRegular,
  SearchRegular,
  FilterRegular,
  FilterDismissRegular,
  FilterAddRegular,
  ChartMultipleFilled,
  ChartMultipleRegular,
  Dismiss24Regular,
  Timer20Regular,
  Calendar20Regular,
  ArrowDownRegular,
  ArrowClockwiseRegular,
  ShareMultiple24Filled,
  Add24Filled,
  ShareIos24Filled,
  CheckmarkCircleFilled,
} from "@fluentui/react-icons"; // Import the icons
import "./page.css";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  Typography,
  Menu,
  Button,
  Select,
  Row,
  Col,
  message,
  Rate,
} from "antd";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DownOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

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
    paddingRight: "10px",
    color: "rgb(1, 105, 185)", // Increase the size of the icon
  },
  container: {
    display: "grid",
    gap: "15px",
    // padding: '20px',
    marginTop: "3vh",
    fontFamily: "Arial, sans-serif",
    marginLeft: "3vw",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  gridrow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  heading: {
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    // justifyContent: 'space-between',
    width: "100%",
  },
  editDetails: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#0078d4", // Change this to your preferred color
  },
  editIcon: {
    marginRight: "5px",
  },

  filterPanel: {
    display: "flex",
    flexDirection: "column",
  },
  formDetails: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#0078d4",
  },
  formLink: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#0169b9",
  },
  editIcon: {
    marginRight: "5px",
  },
  reviewerLink: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#0169b9",
  },
  reviewerDetails: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#0078d4",
  },
  shareLink: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "rgb(1,105,185)",
  },
  shareDetails: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#0078d4",
  },
  uploadIcon: {
    marginRight: "5px",
  },
  gridTemplate1: {
    gridTemplateColumns: "1fr 1fr",
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
  content: {
    fontSize: "13px",
    marginLeft: "10px",
  },
});

// Define labels for dropdowns
const labels = {
  "Attendance & Punctuality": "attendance_and_punctuality",
  "Technical Skills (Effectiveness with which you apply job knowledge and skill to tasks)":
    "technical_skills",
  "Quality of work (Comprehensive, accurate, thorough, professional, timely etc)":
    "quality_of_work",
  "New Knowledge (Seek new knowledge, apply it to your job and share it with others)":
    "new_knowledge",
  "Utilization and Productivity (Make full use of time.  Seek additional work if underutilized)":
    "utilization_and_productivity",
  "Time Management & Organizational Skills (Organize, plan, and forecast work skillfully and accurately.  Effective prioritization.  Meet deadlines or communicate early if will not be met.)":
    "organize_plans",
  "Interpersonal Skills (Positive attitude, work and communicate well with others)":
    "interpersonal_skills",
  "Communication - Verbal & Written (Communicate knowledge clearly, accurately and thoroughly.  Document work effectively and create procedures)":
    "communication",
  "Initiative, Innovation & Creativity (Actively seek improvements & challenge status quo in appropriate ways.  Contribute new ideas.  Analyze problems and present solutions)":
    "initiative_innovative_creativity",
  "Teamwork (Co-ordinate own work with others, seek opinions from team members, share information willingly)":
    "teamwork",
  "Client Focused (Actively seek to understand clients business issues, provide quality service to achieve client satisfaction)":
    "client_focused",
  "Planning and Organizational Skills (Organizing, planning and monitoring of work skillfully and accurately; able to effectively prioritize tasks; meets deadlines or communicates need to revise schedule ahead of time)":
    "planning_and_organizing",
  // Add more labels as needed
};

const HRMD = (props) => {
  const styles = useStyles();
  const [data, setData] = useState([]);
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
  const [selectedTab1, setSelectedTab1] = React.useState("tab1");
  const [yetToBeFilledEmployees, setyetToBeFilledEmployees] = useState([]);
  const [filledEmployees, setFilledEmployees] = useState([]);

  const [activeOptionId, setActiveOptionId] = useState(null);

  const [formdataemployee, setformdataemployee] = useState({});

  const [formdatamanager, setformdatamanager] = useState({});

  const [formdatareviewer, setformdatareviewer] = useState({});
  const [itemSelected, setItemSelected] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [selectedOptionContent, setSelectedOptionContent] =
    useState("Employee Comments");

  const handleAccept = () => {
    setIsDisabled(true);
  };

  const handleReject = () => {
    setShowRemarks(true);
  };

  const handleRemarkSubmit = () => {
    setIsDisabled(true);
  };

  const [sortState, setSortState] = useState({
    sortDirection: "ascending",
    sortColumn: "empid",
  });

  const { Item } = Menu;



  const [contentMap, setContentMap] = useState({
    option1: {
      questions: [
        "To state your understanding of your roles and responsibilities / objectives as agreed in last year’s appraisal / during joining.",
        "Last Year’s Accomplishments: List your most significant accomplishments or contributions made during the review period. Make special note of any new tasks or duties you successfully performed that were outside the scope of your regular responsibilities. Please do not mention your regular day to day activities",
        "Strengths List the personal and technical abilities that help you perform your job well. List any additional skills that you have, but that you don’t currently use in your role that could be brought to your job or could be used to assist others. Example: I am a SCM Consultant and have knowledge in WMS, would like to explore that area. I am good at proposal writing, would like to conduct training for other colleagues etc …",
        "Development Needs List the personal and technical abilities you need to develop or enhance in order to improve your job performance. List the steps you plan to take and/or the resources you need to accomplish this development."
      ],
      employeeComments: ["", "","",""],
      reviewerComments: ["", "", "", ""],
    },
    option2: {
      questions: ["Attendance & Punctuality:", "Technical Skills (Effectiveness with which you apply job knowledge and skill to tasks)",
        "Quality of work (Comprehensive, accurate, thorough, professional, timely etc):", "New Knowledge (Seek new knowledge, apply it to your job and share it with others):",
        "Utilization and Productivity (Make full use of time. Seek additional work if underutilized):", "Time Management & Organizational Skills (Organize, plan, and forecast work skillfully and accurately. Effective prioritization. Meet deadlines or communicate early if will not be met.):",
        "Interpersonal Skills (Positive attitude, work and communicate well with others):", "Communication - Verbal & Written (Communicate knowledge clearly, accurately and thoroughly. Document work effectively and create procedures):",
        "Initiative, Innovation & Creativity (Actively seek improvements & challenge status quo in appropriate ways. Contribute new ideas. Analyze problems and present solutions):",
        "Teamwork (Co-ordinate own work with others, seek opinions from team members, share information willingly):", "Client Focused (Actively seek to understand clients business issues, provide quality service to achieve client satisfaction):",
        "Planning and Organizational Skills (Organizing, planning and monitoring of work skillfully and accurately; able to effectively prioritize tasks; meets deadlines or communicates need to revise schedule ahead of time):"
      ],
      employeeComments: ["", "","","","", "","","","", "","",""],
      reviewerComments: ["", "","","","", "","","","", "","",""],
    },
    option3: {
      questions: ["Top 3 likes in the organization", "Top 3 dislikes in the organization", "Any Suggestion to Improve the organisation"],
      employeeComments: ["","",""],
      reviewerComments: ["","",""],
    },
    option4: {
      questions: ["List the kind of work or job would you like to be doing in one/two/five years time", "List the actions you have taken to make yourself indispensable",
        "Do you want to explore your skills areas other than your present work?", "If you want to explore skill areas other than your present work, List the skill areas you want to explore."
      ],
      employeeComments: ["","","",""],
      reviewerComments: ["","","",""],
    },
  });

  const navLinkGroups = [
    { key: "option1", label: "Review of KPI" },

    { key: "option2", label: "Review of other skills" },

    { key: "option3", label: "Organization Feedback" },

    { key: "option4", label: "Training Need Analysis" },
  ];

  const [selectedKey, setSelectedKey] = useState('option1');
  const [questions, setQuestions] = useState(contentMap.option1.questions);
  const [employeeComments, setEmployeeComments] = useState(contentMap.option1.employeeComments);
  const [reviewerComments, setReviewerComments] = useState(contentMap.option1.reviewerComments);
  const [userComments, setUserComments] = useState(
    Object.fromEntries(navLinkGroups.map(item => [item.key, new Array(contentMap[item.key].questions.length).fill('')]))
  );
  const [selectedOptionLabel, setSelectedOptionLabel] = useState('Select Option');


  const handleSelect = async (key, event) => {
    setSelectedKey(key);

    const content = contentMap[key];
    setQuestions(content.questions);
    setUserComments(new Array(content.questions.length).fill(''));
    setSelectedOptionLabel(event.target.textContent);

    let employeeComments = new Array(content.questions.length).fill('');
    let reviewerComments = new Array(content.questions.length).fill('');

    // Fetch employee comments
    try {
      const response = await axios.get(
        `http://127.0.0.1:8004/user/team-member/remarks/${selectedEmployee.employee_id}`
      );
      const data = response.data;

      if (key === 'option1') {
        employeeComments = [
          data.question_1 || '',
          data.question_2 || '',
          data.question_3 || '',
          data.question_4 || ''
        ];
      } else if (key === 'option2') {
        employeeComments = [
          data.attendance_and_punctuality || '',
          data.technical_skills || '',
          data.quality_of_work || '',
          data.new_knowledge || '',
          data.utilization_and_productivity || '',
          data.organize_plans || '',
          data.interpersonal_skills || '',
          data.communication || '',
          data.initiative_innovative_creativity || '',
          data.teamwork || '',
          data.client_focused || '',
          data.planning_and_organizing || ''
        ];
      } else if (key === 'option3') {
        employeeComments = [
          data.top3LikeOrganization || '',
          data.top3disLikeOrganization || ''
        ];
      } else if (key === 'option4') {
        employeeComments = [
          data.future5years || '',
          data.indispencible || '',
          data.exploreSkills || ''
        ];
      }
      setEmployeeComments(employeeComments);
    } catch (err) {
      console.error("Failed to fetch employee comments:", err);
      setEmployeeComments(new Array(content.questions.length).fill(''));
    }

    // Fetch reviewer comments
    try {
      const revresponse = await axios.get(
        `http://127.0.0.1:8004/user/reviewer/remarks/${selectedEmployee.employee_id}`
      );
      const revdata = revresponse.data;

      if (key === 'option1') {
        reviewerComments = [
          revdata.question_1 || '',
          revdata.question_2 || '',
          revdata.question_3 || '',
          revdata.question_4 || ''
        ];
      } else if (key === 'option2') {
        reviewerComments = [
          revdata.attendance_and_punctuality || '',
          revdata.technical_skills || '',
          revdata.quality_of_work || '',
          revdata.new_knowledge || '',
          revdata.utilization_and_productivity || '',
          revdata.organize_plans || '',
          revdata.interpersonal_skills || '',
          revdata.communication || '',
          revdata.initiative_innovative_creativity || '',
          revdata.teamwork || '',
          revdata.client_focused || '',
          revdata.planning_and_organizing || ''
        ];
      } else if (key === 'option3') {
        reviewerComments = [
          revdata.top3LikeOrganization || '',
          revdata.top3disLikeOrganization || ''
        ];
      } else if (key === 'option4') {
        reviewerComments = [
          revdata.future5years || '',
          revdata.indispencible || '',
          revdata.exploreSkills || ''
        ];
      }
      setReviewerComments(reviewerComments);
    } catch (err) {
      console.error("Failed to fetch reviewer comments:", err);
      setReviewerComments(new Array(content.questions.length).fill(''));
    }
  };


  // useEffect(() => {
  //   const currentYear = new Date().getFullYear();
  //   const yearOptions = [];
  //   for (let year = 2024; year <= currentYear; year++) {
  //     yearOptions.push({ id: year - 2023, username: year });
  //   }
  //   setOptions1(yearOptions);
  // }, []);

  const dropdownId = useId("dropdown");

  const handleCheckboxChange = (event, empId) => {
    event.stopPropagation();
    handleItemsChange(empId);

    console.log("clicked");
    setOpen(false);
  };

  const fetchEmployeeData = () => {
    axios
      .get("http://127.0.0.1:8004/user/hrsummarylist")
      .then((response) => {
        setData(response.data);
        console.log({ data1: response.data });
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const fetchfilledEmployeeData = () => {
    axios
      .get(
        "http://127.0.0.1:8004/user/getEmployeeforHRReviewerFilled"
      )
      .then((response) => {
        setFilledEmployees(response.data);
        console.log({ data1: response.data });
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    fetchEmployeeData();
    // fetchfilledEmployeeData();
  }, []);

  const handleTabSelect = (event, data) => {
    setSelectedTab1(data.value);
  };

  const handleTabSelect1 = (value) => {
    setSelectedTab1(value);
  };

  const handleTabChange = (event, data) => {
    setSelectedTab(data.value);
    setSelectedItems({}); // Reset selection when tab changes
  };

  const [value, setValue] = React.useState(4);

  const onActiveOptionChange3 = React.useCallback(
    async (event, data) => {
      setActiveOptionId(data?.nextOption?.text);
      console.log({ year: data?.nextOption?.text });

      try {
        const response1 = await axios.get(
          `http://127.0.0.1:8004/user/team-member/remarks/${selectedEmployee.employee_id}/${data?.nextOption?.text}`
        );
        setformdataemployee(response1.data);
      } catch (err) {
        console.error("Failed to fetch team member remarks:", err);
        setformdataemployee({ error: "Failed to fetch team member remarks" });
      }

      try {
        const response2 = await axios.get(
          `http://127.0.0.1:8004/user/appraiser/remarks/${selectedEmployee.employee_id}/${data?.nextOption?.text}`
        );
        setformdatamanager(response2.data);
      } catch (err) {
        console.error("Failed to fetch appraiser remarks:", err);
        setformdatamanager({ error: "Failed to fetch appraiser remarks" });
      }

      try {
        const response3 = await axios.get(
          `http://127.0.0.1:8004/user/reviewer/remarks/${selectedEmployee.employee_id}/${data?.nextOption?.text}`
        );
        setformdatareviewer(response3.data);
      } catch (err) {
        console.error("Failed to fetch reviewer remarks:", err);
        setformdatareviewer({ error: "Failed to fetch reviewer remarks" });
      }
      message.success("Fetch Selected Year's Data Successfully");
    },
    [activeOptionId]
  );

  const handleSelectionChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
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

  const [formdata, setformdata] = useState({});

  const handleFieldChange1 = (fieldName, value) => {
    setFormData1({
      ...formData1,
      [fieldName]: value
    });

    setformdata({
      ...formdata,
      [fieldName]: value
    });
  };

  const handleFieldChange3 = (fieldName, value) => {
    setFormData3({
      ...formData3,
      [fieldName]: value
    });

    setformdata({
      ...formdata,
      [fieldName]: value
    });
  };

  const handleFieldChange4 = (fieldName, value) => {
    setFormData4({
      ...formData4,
      [fieldName]: value
    });

    setformdata({
      ...formdata,
      [fieldName]: value
    });
  };


  const items = navLinkGroups.map(item => ({
    key: item.key,
    label: item.label,
  }));
  // const getNavLinkStyle = (key) => {
  //   let backgroundColor = themestate ? "rgb(51, 51, 51)" : "";
  //   if (key === selectedNavKey) {
  //     backgroundColor = "red";
  //   }
  //   return { backgroundColor };
  // };

  // const handleNavClick = (event, option) => {
  //   if (option) {
  //     setSelectedNavKey(option.key);
  //     const selectedOption = navLinkGroups.find(group => group.key === option.key);
  //     setSelectedOptionContent(selectedOption.content);
  //   }
  // };

  const handleUserCommentChange = (index, value) => {
    const updatedComments = [...userComments];
    updatedComments[index] = value;
    setUserComments(updatedComments);
  };


  const [selectedOptions, setSelectedOptions] = useState(
    Array(labels.length).fill(0)
  );

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

  const handleRowClick = async (employee) => {
    try {
      const response1 = await axios.get(
        `http://127.0.0.1:8004/user/team-member/remarks/${employee.employee_id}`
      );
      setformdataemployee(response1.data);
    } catch (err) {
      console.error("Failed to fetch team member remarks:", err);
      setformdataemployee({ error: "Failed to fetch team member remarks" });
    }

    try {
      const response2 = await axios.get(
        `http://127.0.0.1:8004/user/appraiser/remarks/${employee.employee_id}`
      );
      setformdatamanager(response2.data);
    } catch (err) {
      console.error("Failed to fetch appraiser remarks:", err);
      setformdatamanager({ error: "Failed to fetch appraiser remarks" });
    }

    try {
      const response3 = await axios.get(
        `http://127.0.0.1:8004/user/reviewer/remarks/${employee.employee_id}`
      );
      setformdatareviewer(response3.data);
    } catch (err) {
      console.error("Failed to fetch reviewer remarks:", err);
      setformdatareviewer({ error: "Failed to fetch reviewer remarks" });
    }


    // Ensure these are always called regardless of the outcomes of the requests
    setSelectedEmployee(employee);
    setOpen(true);
  };


  const handleDeleteEmployee = async () => {
    console.log(JSON.stringify({ ids: itemSelected }));
    try {
      const response = await fetch(
        "http://127.0.0.1:8004/user/employee/multi-delete/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: itemSelected }),
        }
      );

      if (response.ok) {
        message.success("Successfully Deleted Selected Employees");
        // Clear the selectedItems state
        setSelectedItems({});
        // Optionally clear the itemSelected state
        setItemSelected([]);
        fetchEmployeeData();
      } else {
        // alert('Failed to delete employees');
      }
    } catch (error) {
      message.error("Error Deleting employees");
      // alert('An error occurred while deleting employees');
    }
  };

  const handleEditEmployee = () => {
    alert("Edit Employee functionality to be implemented");
  };
  const handleFilterToggle = () => {
    setShowFilters((prev) => !prev);
  };

  const handleMenuClick = (e) => {
    console.log('Selected key:', e.key);
    // Handle the menu click event here
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
  };

  const handleSubmit = async () => {
    if (!selectedKey || !userComments.some(comment => comment !== '')) {
        message.error("Please select a valid option and ensure comments are loaded.");
        return;
    }

    const payload = {};

    if (selectedKey === 'option1') {
        payload['question_1'] = userComments[0];
        payload['question_2'] = userComments[1];
        payload['question_3'] = userComments[2];
        payload['question_4'] = userComments[3];
    } else if (selectedKey === 'option2') {
        payload['attendance_and_punctuality'] = userComments[0];
        payload['technical_skills'] = userComments[1];
        payload['quality_of_work'] = userComments[2];
        payload['new_knowledge'] = userComments[3];
        payload['utilization_and_productivity'] = userComments[4];
        payload['organize_plans'] = userComments[5];
        payload['interpersonal_skills'] = userComments[6];
        payload['communication'] = userComments[7];
        payload['initiative_innovative_creativity'] = userComments[8];
        payload['teamwork'] = userComments[9];
        payload['client_focused'] = userComments[10];
        payload['planning_and_organizing'] = userComments[11];
    } else if (selectedKey === 'option3') {
        payload['top3LikeOrganization'] = userComments[0];
        payload['top3disLikeOrganization'] = userComments[1];
    } else if (selectedKey === 'option4') {
        payload['future5years'] = userComments[0];
        payload['indispencible'] = userComments[1];
        payload['exploreSkills'] = userComments[2];
    }

    try {
        const result = await axios.post(
            `http://127.0.0.1:8004/user/md/remarks/${selectedEmployee.employee_id}`,
            payload
        );
        if (result.status === 201) {
            message.success('Form submission successful');
        }
    } catch (error) {
        console.error('Error sending data to the API', error);
    }
};



  const columns = [
    createTableColumn({
      columnId: "empid",
      compare: (a, b) => a.empid - b.empid,
    }),
    createTableColumn({
      columnId: "name",
      compare: (a, b) => a.name.localeCompare(b.name),
    }),
    createTableColumn({
      columnId: "dept",
      compare: (a, b) => a.dept.localeCompare(b.dept),
    }),
    createTableColumn({
      columnId: "doj",
      compare: (a, b) => new Date(a.doj).getTime() - new Date(b.doj).getTime(),
    }),
    createTableColumn({
      columnId: "appraisal",
      compare: (a, b) => a.appraisal.localeCompare(b.appraisal),
    }),
    createTableColumn({
      columnId: "manager",
      compare: (a, b) => a.manager.localeCompare(b.manager),
    }),
    // createTableColumn({
    //     columnId: 'approval',
    //     compare: (a, b) => a.approval.localeCompare(b.approval),
    // })
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

  const filteredyetData = searchQuery
    ? data.filter(
        (item) =>
          (item.employee_name &&
            item.employee_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (item.employee_id &&
            item.employee_id.toString().includes(searchQuery)) ||
          (item.department &&
            item.department
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (item.date_of_joining &&
            item.date_of_joining.includes(searchQuery)) ||
          // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.reporting_manager &&
            item.reporting_manager
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
    : data;

  const sortedyetData = [...data].sort((a, b) => {
    const aValue = a[sortState.sortColumn];
    const bValue = b[sortState.sortColumn];

    // Check if the values are strings and perform locale comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortState.sortDirection === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // If the values are not strings, compare them directly
    return sortState.sortDirection === "ascending"
      ? aValue - bValue
      : bValue - aValue;
  });

  const filteredfilledData = searchQuery
    ? data.filter(
        (item) =>
          (item.employee_name &&
            item.employee_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (item.employee_id &&
            item.employee_id.toString().includes(searchQuery)) ||
          (item.department &&
            item.department
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (item.date_of_joining &&
            item.date_of_joining.includes(searchQuery)) ||
          // Uncomment if 'appraisal' is part of the dataset and needs to be searched
          // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.reporting_manager &&
            item.reporting_manager
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
    : data;

  const sortedfilledData = [...filteredfilledData].sort((a, b) => {
    const aValue = a[sortState.sortColumn];
    const bValue = b[sortState.sortColumn];

    // Check if the values are strings and perform locale comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortState.sortDirection === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // If the values are not strings, compare them directly
    return sortState.sortDirection === "ascending"
      ? aValue - bValue
      : bValue - aValue;
  });
  

  return (
    <div className={styles.root}>
      <OverlayDrawer
        size="large"
        position="end"
        open={open}
        onOpenChange={(_, state) => {
          {
            setOpen(state.open);
            handleTabSelect1("tab1");
          }
          handleTabSelect1("tab1");
        }}
        style={{
          height: "calc(100vh - 48px)",
          marginTop: "48px",
          backgroundColor: themestate ? "rgb(51, 51, 51)" : "",
        }}
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
          ></DrawerHeaderTitle>
        </DrawerHeader>
        {open && selectedEmployee && (
          <DrawerBody>
            <div>
              <div
                style={{
                  marginLeft: "3vw",
                  marginTop: "2vh",
                  display: "flex",
                  width: "100%",
                }}
              >
                <Avatar
                  color="brand"
                  name={selectedEmployee.employee_name}
                  size={96}
                />
                <div
                  style={{
                    display: "flex",
                    marginLeft: "2vw",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "60%",
                  }}
                >
                  <Text
                    size={700}
                    style={{
                      marginBottom: "2vh",
                      fontWeight: "bold",
                      color: themestate ? "white" : "",
                    }}
                  >
                    {" "}
                    {selectedEmployee.employee_name}
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      size={250}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      {" "}
                      {selectedEmployee.employee_id}{" "}
                    </Text>
                    <div style={{ display: "flex" }}>
                      <Timer20Regular style={{ color: "rgb(1,105,185)" }} />
                      <Text
                        size={250}
                        style={{
                          marginLeft: "3px",
                          fontWeight: "bold",
                          color: themestate ? "white" : "",
                        }}
                      >
                        {selectedEmployee.form_status}
                      </Text>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Calendar20Regular style={{ color: "rgb(1,105,185)" }} />
                      <Text
                        size={250}
                        style={{
                          marginLeft: "3px",
                          fontWeight: "bold",
                          color: themestate ? "white" : "",
                        }}
                      >
                        {" "}
                        {selectedEmployee.appraisal_date}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <TabList
                  defaultSelectedValue={selectedTab1}
                  appearance="subtle"
                  onTabSelect={handleTabSelect}
                  style={{ marginLeft: "3vw", marginTop: "3vh" }}
                >

                  <Tab
                    className={
                      themestate ? "tab dark drawer" : "tab light drawer"
                    }
                    style={{ border: "1px solid transparent" }}
                    value="tab1"
                  >
                    Fill Form
                  </Tab>
                  <Tab
                    className={
                      themestate ? "tab dark drawer" : "tab light drawer"
                    }
                    style={{ border: "1px solid transparent" }}
                    value="tab2"
                  >
                    Approval
                  </Tab>
                </TabList>
              </div>
              {selectedTab1 === "tab1" && (
        <div style={{ marginTop: "2vw", gap: "10px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <div
              style={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                backgroundColor: "#f0f0f0",
                fontWeight: "bold",
              }}
            >
              <div style={{ padding: "10px" }}>
                <DropdownButton id="dropdown-basic-button" title={selectedOptionLabel} onSelect={handleSelect}>
                  {navLinkGroups.map(item => (
                    <Dropdown.Item key={item.key} eventKey={item.key}>
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <div style={{ padding: "10px" }}>Employee Comments</div>
              <div style={{ padding: "10px" }}>Reviewer Comments</div>
              <div style={{ padding: "10px" }}>Add Comments</div>
            </div>

            <div
              style={{
                gridColumn: "2 / -1",
                padding: "10px",
              }}
            ></div>

            {questions.map((question, index) => (
              <React.Fragment key={index}>
                <div
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div>{question}</div>
                </div>
                <div
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div>{employeeComments[index]}</div>
                </div>
                <div
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div>{reviewerComments[index]}</div>
                </div>
                <div
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Textarea
            multiline
            value={userComments[index]}
            onChange={(e) => handleUserCommentChange(index, e.target.value)}
            placeholder="Add your comment"
          />
                </div>
              </React.Fragment>
            ))}
          </div>
          <div style={{marginTop: '20px', float: 'right'}}>
          <Button style={{backgroundColor: 'blue', color: 'white', marginBottom: '20px'}} onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      )}
              {selectedTab1 === "tab2" && (
                <div>
                  <div
                    className={`${styles.container} ${styles.gridTemplate1}`}
                  >
                    <div className={`${styles.section} ${styles.nameAndId}`}>
                      <div
                        className={styles.heading}
                        style={{
                          fontWeight: "bold",
                          color: themestate ? "white" : "",
                        }}
                      >
                        Percentage of Appraisal:
                      </div>
                      <div
                        className={styles.content}
                        style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                      >
                        5%
                      </div>
                    </div>

                    <div className={`${styles.section} ${styles.managerInfo}`}>
                      <div
                        className={styles.heading}
                        style={{
                          fontWeight: "bold",
                          color: themestate ? "white" : "",
                        }}
                      >
                        New Salary:
                      </div>
                      <div
                        className={styles.content}
                        style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                      >
                        30000
                      </div>
                    </div>

                    <div className={`${styles.section} ${styles.email}`}>
                      <div
                        className={styles.heading}
                        style={{
                          fontWeight: "bold",
                          color: themestate ? "white" : "",
                        }}
                      >
                        Bonus plus Percentage of Appraisal:
                      </div>
                      <div
                        className={styles.content}
                        style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                      >
                        7%
                      </div>
                    </div>

                    <div className={`${styles.section} ${styles.doj}`}>
                      <div
                        className={styles.heading}
                        style={{
                          fontWeight: "bold",
                          color: themestate ? "white" : "",
                        }}
                      >
                        Bonus plus New Salary:
                      </div>
                      <div
                        className={styles.content}
                        style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                      >
                        35000
                      </div>
                    </div>
                  </div>
                  <div style={{ marginLeft: "3vw" }}>
                    <div>
                      <Button
                        style={{
                          backgroundColor: isDisabled ? "lightblue" : "blue",
                          color: isDisabled ? "lightgray" : "white",
                          cursor: isDisabled ? "not-allowed" : "pointer",
                        }}
                        onClick={handleAccept}
                        disabled={isDisabled}
                      >
                        Accept
                      </Button>
                      <Button
                        style={{
                          marginLeft: "4px",
                          backgroundColor: isDisabled ? "lightcoral" : "red",
                          color: isDisabled ? "lightgray" : "white",
                          cursor: isDisabled ? "not-allowed" : "pointer",
                        }}
                        onClick={handleReject}
                        disabled={isDisabled}
                      >
                        Reject
                      </Button>
                    </div>

                    {showRemarks && !isDisabled && (
                      <div style={{ marginLeft: "3vw", marginTop: "10px" }}>
                        <Textarea
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder="Enter Your Response here...."
                          style={{ width: "100%", height: "100px" }}
                        />
                        <Button
                          onClick={handleRemarkSubmit}
                          style={{ marginTop: "10px" }}
                        >
                          Submit Remarks
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* <div style={{marginTop: '5px', display: 'flex', marginLeft: '3vw'}}>
     <Button style={{ backgroundColor: isDisabled ? 'lightblue' : 'blue', color: 'white'}} onClick={handleAccept} disabled={isDisabled}>Accept</Button>
     <Button style={{marginLeft: '4px', backgroundColor: isDisabled ? 'lightcoral' : 'red', color: 'white'}} onClick={handleReject} disabled={isDisabled}>Reject</Button>
     </div>
     {showRemarks && !isDisabled && (
        <div style={{marginLeft: '3vw', marginTop: "10px", }}>
          <TextArea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder='Enter Your Response here....'/>
            <Button style={{marginTop: '8px'}} onClick={handleRemarkSubmit}>Submit Remarks</Button>
        </div>
     )} */}
            </div>
          </DrawerBody>
        )}
      </OverlayDrawer>
      {/* <div style={{position:'fixed', backgroundColor:'white', zIndex:1000, width:'vw'}}> */}
      {/* <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: 1000, width: '100%' }}> */}

      <Breadcrumb aria-label="breadcrumb2">
        <BreadcrumbItem>
          <Link href="" className="custom-link">
            HR
          </Link>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <Link href="/hrreviewer" className="custom-link">
            Reviewer
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <h2 style={themestate ? { color: "white" } : {}}>MD</h2>
      <TabList
        defaultSelectedValue="tab1"
        appearance="subtle"
        onTabSelect={handleTabChange}
        style={themestate ? { color: "white" } : {}}
      >
        {/* <Tab    className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab1">Yet to be filled</Tab>
        <Tab  className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab2">Filled</Tab> */}
      </TabList>
      <div className={styles.controls}>
        <Button
          className={themestate ? "button dark" : "button"}
          style={{ border: "1px solid transparent" }}
          onClick={handleAddEmployee}
        >
          <ChartMultipleRegular className={styles.iconLarge} />
          Statistics
        </Button>
        <Button
          className={themestate ? "button dark" : "button"}
          style={{ border: "1px solid transparent" }}
          onClick={handleDeleteEmployee}
        >
          <PersonDeleteRegular className={styles.iconLarge} />
          Delete Employee
        </Button>
        {/* <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleEditEmployee}><EditRegular className={styles.iconLarge}/>Edit Employee</Button> */}

        {/* <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleAddEmployee}><ArrowClockwiseRegular className={styles.iconLarge}/>Refresh</Button>*/}
        <Button
          className={themestate ? "button dark" : "button"}
          style={{ border: "1px solid transparent" }}
          onClick={handleDeleteEmployee}
        >
          <ArrowDownRegular className={styles.iconLarge} />
          Export
        </Button>
        <SearchBox
          placeholder="Search..."
          style={{ backgroundColor: themestate ? "rgb(41,41,41)" : "" }}
          className={
            themestate &&
            "searchboxicon searchboxinputtext searchboxinputplaceholder"
          }
          onChange={handleSearchChange}
          value={searchQuery}
          size="medium"
          appearance="filled-darker"
        />

        <Button
          className={themestate ? "button dark" : "button"}
          style={{ border: "1px solid transparent" }}
          onClick={handleToggleFilters}
        >
          <FilterRegular className={styles.iconLarge} />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      {showFilters && (
        // <Modal header="Filters" onClose={handleFilterToggle}>
        <div className={styles.filterPanel}>
          <div style={{ display: "flex" }}>
            <Checkbox
              label="Employee Fill"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
            <Checkbox
              label="Manager Fill"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
            <Checkbox
              label="Reviewer Fill"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
            <Checkbox
              label="Revised Fill"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
            <Checkbox
              label="Appraisal Done"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
            <Checkbox
              label="Choose Dept"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
            <Checkbox
              label="Choose Manager"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
            <Checkbox
              label="Choose Reviewer"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
            <Checkbox
              label="Date Cap"
              style={themestate ? { color: "white" } : {}}
              onChange={() => newSelectedFilters.push("Employee Fill")}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Button
              className={themestate ? "button dark" : "button"}
              style={{ border: "1px solid transparent" }}
              onClick={handleApplyFilters}
            >
              {" "}
              Apply{" "}
            </Button>
            <Button
              className={themestate ? "button dark" : "button"}
              style={{ border: "1px solid transparent" }}
              onClick={handleRemoveFilters}
            >
              {" "}
              Remove all
            </Button>
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
      <div style={{ maxHeight: "72vh", overflowY: "auto" }}>
        <Table>
          <TableHeader>
            <TableRow
              style={
                themestate
                  ? { color: "white", borderBottomColor: "#383838" }
                  : {}
              }
            >
              <TableHeaderCell />
              <TableHeaderCell
                style={{ fontWeight: "bold", cursor: "pointer" }}
                {...headerSortProps("empid")}
              >
                Emp ID
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontWeight: "bold", cursor: "pointer" }}
                {...headerSortProps("name")}
              >
                Name
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontWeight: "bold", cursor: "pointer" }}
                {...headerSortProps("dept")}
              >
                Dept
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontWeight: "bold", cursor: "pointer" }}
                {...headerSortProps("doj")}
              >
                DOJ
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontWeight: "bold", cursor: "pointer" }}
                {...headerSortProps("appraisal")}
              >
                Appraisal
              </TableHeaderCell>
              <TableHeaderCell
                style={{ fontWeight: "bold", cursor: "pointer" }}
                {...headerSortProps("manager")}
              >
                Manager
              </TableHeaderCell>
              {/* <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer'}} {...headerSortProps('approval')}>Approval</TableHeaderCell> */}
            </TableRow>
          </TableHeader>
          {selectedTab === "tab1" ? (
            <TableBody>
              {sortedyetData.map((item) => (
                <TableRow
                  key={item.employee_id}
                  style={themestate ? { color: "white" } : {}}
                  className={themestate ? "hovereffect dark" : "hovereffect"}
                  onClick={() => handleRowClick(item)}
                >
                  <TableSelectionCell
                    checked={!!selectedItems[item.employee_id]}
                    style={{ zIndex: 1000 }}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) =>
                      handleCheckboxChange(event, item.employee_id)
                    }
                  />
                  <TableCell>{item.employee_id}</TableCell>
                  <TableCell>{item.employee_name}</TableCell>
                  <TableCell>{item.department.dept_name}</TableCell>
                  <TableCell>{item.date_of_joining}</TableCell>
                  <TableCell>{item.appraisal_date}</TableCell>
                  <TableCell>{item.manager}</TableCell>
                  {/* <TableCell>{item.approval}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          ) : null}

          {selectedTab === "tab2" ? (
            <TableBody>
              {sortedfilledData.map((item) => (
                <TableRow
                  key={item.employee_id}
                  style={themestate ? { color: "white" } : {}}
                  className={themestate ? "hovereffect dark" : "hovereffect"}
                  onClick={() => handleRowClick(item)}
                >
                  <TableSelectionCell
                    checked={!!selectedItems[item.employee_id]}
                    style={{ zIndex: 1000 }}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) =>
                      handleCheckboxChange(event, item.employee_id)
                    }
                  />
                  <TableCell>{item.employee_id}</TableCell>
                  <TableCell>{item.employee_name}</TableCell>
                  <TableCell>{item.department.dept_name}</TableCell>
                  <TableCell>{item.date_of_joining}</TableCell>
                  <TableCell>{item.appraisal_date}</TableCell>
                  <TableCell>{item.manager_name}</TableCell>
                  {/* <TableCell>{item.approval}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          ) : null}
        </Table>
      </div>
    </div>
  );
};

export default HRMD;

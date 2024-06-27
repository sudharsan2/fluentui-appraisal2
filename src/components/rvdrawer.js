import React, { useState, useEffect } from "react";
import { useNavigate,useLocation, Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {
    NavCategory,
    NavCategoryItem,
    NavDrawer,
    NavDrawerBody,
    NavDrawerFooter,
    NavDrawerHeader,
    NavDrawerHeaderNav,
    NavDrawerProps,
    NavItem,
    NavSubItem,
    NavSubItemGroup,
   
  } from "@fluentui/react-nav-preview";
import {
  Board24Filled,
  Board24Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NavigationFilled,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  PersonFilled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  PersonRegular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  Settings20Filled,
  Settings20Regular,
  bundleIcon,
  LayerDiagonalPerson24Filled,
  LayerDiagonalPerson24Regular,
  PersonStar24Filled,
  PersonStar24Regular,
  PremiumPerson24Filled,
  PremiumPerson24Regular,
  DocumentTableSearch24Filled,
  DocumentTableSearch24Regular,
  Navigation24Filled,
  Navigation24Regular
} from "@fluentui/react-icons";
 
import {
    Button,
    Caption1Strong,
    Label,
    Radio,
    RadioGroup,
    makeStyles,
    shorthands,
    tokens,
    useId,
    Tooltip
  } from "@fluentui/react-components";
 
const useStyles = makeStyles({
  root: {
    // ...shorthands.border("2px", "solid", "#ccc"),
    ...shorthands.overflow("hidden"),
    // marginTop:"-2px",
    // marginLeft:"-2px",
   
    position:"fixed",
    left:0,
    width:"100%",
    height:"100%",
    display: "flex",
   
   
    backgroundColor: "#fff",
   
  },
  content: {
    ...shorthands.flex(1),
    ...shorthands.padding("16px"),
 
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
   
    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: "max-content",
  },
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalS,
   
  },
 
  headingContent: {
    marginInlineStart: `10px`,
  },
  hamburger: {
    // backgroundColor: navItemTokens.backgroundColor,
    // color: tokens.colorNeutralForeground2,
    textDecorationLine: "none",
    marginLeft:"5px",
    marginTop:"10px",
   
    ":hover": {
    //   backgroundColor: navItemTokens.backgroundColorHover,
    },
    ":active": {
    //   backgroundColor: navItemTokens.backgroundColorPressed,
    },
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
  navbody: {
   
    backgroundColor:"black"
   
  },
  navfooter:{
    "&:hover": {
        backgroundColor: "#f0f0f0", // Change background color on hover
       
      },
  },
  scrollableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
});
 
const Person = bundleIcon(PersonFilled, PersonRegular);
const Dashboard = bundleIcon(Board24Filled, Board24Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(
  PersonLightbulb20Filled,
  PersonLightbulb20Regular
);
 
const LayerDiagonalPersonRegular = bundleIcon(LayerDiagonalPerson24Filled,LayerDiagonalPerson24Regular)
const PersonStarRegular = bundleIcon(PersonStar24Filled,PersonStar24Regular)
const PremiumPersonRegular = bundleIcon(PremiumPerson24Filled,PremiumPerson24Regular)
const TableSearchRegular = bundleIcon(DocumentTableSearch24Filled,DocumentTableSearch24Regular)
const Navi = bundleIcon(Navigation24Filled,Navigation24Regular)
 
 
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(
  PreviewLink20Filled,
  PreviewLink20Regular
);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular
);
const Settings = bundleIcon(Settings20Filled, Settings20Regular);
 
 
 
const RVNavDrawerDefault = (props) => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
  const [collapse, setCollapse] = useState(false);
  const styles = useStyles();
  const labelId = useId("type-label");
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("inline");

  const location = useLocation();
  const determineSelectedValue = () => {
    switch (location.pathname) {
        case '/rvreviewer':
            return '1';
        case '/rvsummary':
            return '2';
        
        default:
            return '1';
    }
  };
 
  const [selectedValue, setSelectedValue] = useState(determineSelectedValue());
 
  useEffect(() => {
    setSelectedValue(determineSelectedValue());
  }, [location.pathname]);
 
  const someClickHandler = (nav) => {
    switch (nav) {
        
        case 'review':
            navigate("/rvreviewer");
            break;
        case 'summary':
            navigate("/rvsummary");
            break;   
       
       
        default:
            console.error("Unknown navigation target:", nav);
    }
};
 
  return (
   
    <div className={styles.root} style={{height: 'calc(100vh - 48px)'}}>
       {/* <div style={themestate?{backgroundColor:darktheme.sidebarcolordark, height: 'calc(100vh - 48px)'}:{backgroundColor:lighttheme.sidebarcolorlight}}> */}
        <NavDrawer
  // defaultSelectedValue="1"
  // defaultSelectedCategoryValue="1"
  selectedValue ={selectedValue}
  open={isOpen}
  type={type}
  onOpenChange={(_, { open }) => setIsOpen(open)}
  size="small"
  className={useStyles.navdrawer}
  style={collapse ? { width: `59px`, transition: "width 0.5s" , borderRightStyle: "none"} : { transition: "width 0.5s", borderRightStyle: "none" }}
>
    {/* <div style={themestate?{backgroundColor:darktheme.sidebarcolordark, height: 'calc(100vh - 48px)'}:{}}> */}
   
  <NavDrawerHeader
    style={themestate?{backgroundColor:darktheme.sidebarcolordark, cursor:"pointer",WebkitTapHighlightColor: 'transparent'}:{cursor:"pointer",WebkitTapHighlightColor: 'transparent'}}
  >
    <NavDrawerHeaderNav
        onClick={() => {
          setCollapse(!collapse);
        }}
       
       
    >
      <Button
        appearance="transparent"
        icon={<Navi style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}}/>}
        className={styles.hamburger}
        onClick={() => {
          setCollapse(!collapse);
        }}
       
      />
    </NavDrawerHeaderNav>
  </NavDrawerHeader>
  <div style={themestate?{backgroundColor:darktheme.sidebarcolordark,height:"20px"}:{height:"20px"}}></div>
 
 
  {collapse ? (
    <NavDrawerBody
        style={themestate?{backgroundColor:darktheme.sidebarcolordark, cursor:"pointer",WebkitTapHighlightColor: 'transparent'}:{cursor:"pointer",WebkitTapHighlightColor: 'transparent'}}
     >
    
 
      <Tooltip content={'Review'} positioning='after' withArrow={true} appearance={themestate?"inverted":"normal"}>
      <NavItem
        target="_blank"
        icon={<LayerDiagonalPersonRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
        onClick={() => someClickHandler('review')}
        value="1"
        className={themestate? styles.navItemdark : styles.navItemlight}
      >
       
      </NavItem>
      </Tooltip>
 
 
 
      <Tooltip content={'Summary'} positioning='after' withArrow={true} appearance={themestate?"inverted":"normal"}>
      <NavItem
        target="_blank"
        icon={<PersonStarRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
        onClick={() => someClickHandler('summary')}
        value="2"
        className={themestate? styles.navItemdark : styles.navItemlight}
      >
       
      </NavItem>
      </Tooltip>
 
 
     
    </NavDrawerBody>
  ) : (
    <NavDrawerBody
    style={themestate?{backgroundColor:darktheme.sidebarcolordark, cursor:"pointer",WebkitTapHighlightColor: 'transparent'}:{cursor:"pointer",WebkitTapHighlightColor: 'transparent'}}
    >
      
      <div style={{width:'100%'} }>
      <NavItem
        target="_blank"
        icon={<LayerDiagonalPersonRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
        onClick={() => someClickHandler('review')}
        value="1"
        className={themestate? styles.navItemdark : styles.navItemlight}
        style={{ marginTop: "10px", fontSize:"17px"}}  
        >
        <div style={themestate?{marginTop:"2px" , color:darktheme.fontcolordark}:{marginTop:"2px" , color:lighttheme.fontcolorlight}}>Review</div>
       
      </NavItem>
      </div>
      <div style={{width:'100%'}}>
      <NavItem
        target="_blank"
        icon={<PersonStarRegular style={themestate?{color:darktheme.fontcolordark}:{color:lighttheme.fontcolorlight}} />}
        onClick={() => someClickHandler('summary')}
        value="2"
        className={themestate? styles.navItemdark : styles.navItemlight}
        style={{ marginTop: "10px", fontSize:"17px"}}  
        >
        <div style={themestate?{marginTop:"2px" , color:darktheme.fontcolordark}:{marginTop:"2px" , color:lighttheme.fontcolorlight}}>Summary</div>
       
      </NavItem>
      </div>
      
    </NavDrawerBody>
  )}
 
 
  <NavDrawerFooter style={themestate?{backgroundColor:darktheme.sidebarcolordark}:{}} >
 
    {!collapse&&(
    // <NavItem
    //   value="21"
    //   target="_blank"
    // //   onClick={someClickHandler}
    //   className={styles.navfooter}
    // //   style={{color:"#E9E9E9"}}
    // //   icon={<Person />}
    // >
    <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
     
      <p style={themestate?{marginBottom:"30px", color:darktheme.fontcolordark}:{marginBottom:"30px",color:lighttheme.fontcolorlight}}>by FocusR AI</p>
      <p style={themestate?{marginTop:"-20px",color:darktheme.fontcolordark}:{marginTop:"-20px",color:lighttheme.fontcolorlight}}>V 0.0.1</p>
    </div>
    // </NavItem>
    )
    }
    {/* <NavItem
      icon={<Settings />}
      target="_blank"
      onClick={someClickHandler}
      value="24"
    >
      App Settings
    </NavItem> */}
   
  </NavDrawerFooter>
  {/* </div> */}
 
</NavDrawer>
{/* </div> */}
 
        <div className={styles.scrollableContainer} style={themestate?{background:darktheme.contentpagedark}:{}}>
      <div className={styles.content} style={themestate?{background:darktheme.contentpagedark}:{}} >
        
        
        {props.children}
        
      </div>
      </div>
    </div>
  );
};

export default RVNavDrawerDefault;
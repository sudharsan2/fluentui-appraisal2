
import React, { useState } from "react";
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
  } from "@fluentui/react-components";
 
const useStyles = makeStyles({
  root: {
    ...shorthands.border("2px", "solid", "#ccc"),
    ...shorthands.overflow("hidden"),
    marginTop:"-2px",
    marginLeft:"-2px",
    
    position:"fixed",
    left:0,
    width:"100vw",
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
  navItem: {
    marginTop: "10px",
    left:0,
   
    "&:hover": {
      backgroundColor: "#ccc", // Change background color on hover
     
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
  navdrawer:{
    color:"black"
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
 
 
 
const NavDrawerDefault = (props, {children}) => {
  
  const dispatch = useDispatch();
 
  const lighttheme = useSelector((state) => state.theme.light);
 
  const darktheme = useSelector((state) => state.theme.dark);
 
  const themestate = useSelector((state) => state.theme.theme)
 
  
 
  const [collapse, setCollapse] = useState(false);
 
  const styles = useStyles();
 
  const labelId = useId("type-label");
 
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("inline");
 
  const someClickHandler = () => {
    console.log("someClickHandler");
  };
 
  return (
   
    <div className={styles.root} style={{height: 'calc(100vh - 48px)'}}>
       
        <NavDrawer
  defaultSelectedValue="1"
  defaultSelectedCategoryValue="1"
  open={isOpen}
  type={type}
  onOpenChange={(_, { open }) => setIsOpen(open)}
  size="small"
  className={useStyles.navdrawer}
  style={collapse ? { width: `59px`, transition: "width 0.5s" } : { transition: "width 0.5s" , zIndex: 10000}}
>
    <div style={themestate?{backgroundColor:darktheme.sidebarcolordark, height: 'calc(100vh - 48px)'}:{}}>
  <NavDrawerHeader style={{cursor:"pointer", zIndex:10000}}>
    <NavDrawerHeaderNav
        onClick={() => {
          setCollapse(!collapse);
        }}
        style={{cursor:"pointer", zIndex:10000}}
        
    >
      <Button
        appearance="transparent"
        icon={<Navi style={{color:'rgb(75,75,75)'}}/>}
        className={styles.hamburger}
        onClick={() => {
          setCollapse(!collapse);
        }}
       
      />
    </NavDrawerHeaderNav>
  </NavDrawerHeader>
  
  
  {collapse ? (
    <NavDrawerBody style={{ marginTop: "20px", zIndex:10000}} >
      <NavItem
        target="_blank"
        icon={<Dashboard style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="1"
        className={styles.navItem}
      >
       
      </NavItem>
      <NavItem
        target="_blank"
        icon={<LayerDiagonalPersonRegular style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="2"
        className={styles.navItem}
      >
       
      </NavItem>
      <NavItem
        target="_blank"
        icon={<PersonStarRegular style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="3"
        className={styles.navItem}
      >
       
      </NavItem>
      <NavItem
        target="_blank"
        icon={<PremiumPersonRegular style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="4"
        className={styles.navItem}
      >
       
      </NavItem>
     
      <NavItem
        target="_blank"
        icon={<TableSearchRegular style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="5"
        className={styles.navItem}
      >
       
      </NavItem>
    </NavDrawerBody>
  ) : (
    <NavDrawerBody style={{ marginTop: "20px", zIndex:10000}} >
      <div style={{width:'100%'}}>
      <NavItem
        target="_blank"
        icon={<Dashboard style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="1"
        className={styles.navItem}
        style={{ marginTop: "10px", fontSize:"17px", borderRadius:'0' }}
      >
        <div style={{marginTop:"2px" , color:'rgb(75,75,75)'}}>Dashboard</div>
      </NavItem>
      </div>
      <div style={{width:'100%'} }>
      <NavItem
        target="_blank"
        icon={<LayerDiagonalPersonRegular style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="2"
        className={styles.navItem}
        style={{ marginTop: "10px", fontSize:"17px", borderRadius:'0' }}
      >
        <div style={{marginTop:"2px" , color:'rgb(75,75,75)'}}>Employee</div>
       
      </NavItem>
      </div>
      <div style={{width:'100%'}}>
      <NavItem
        target="_blank"
        icon={<PersonStarRegular style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="3"
        className={styles.navItem}
        style={{ marginTop: "10px", fontSize:"17px", borderRadius:'0' }}
      >
        <div style={{marginTop:"2px", color:'rgb(75,75,75)'}}>Manager</div>
       
      </NavItem>
      </div>
      <div style={{width:'100%'}}>
      <NavItem
        target="_blank"
        icon={<PremiumPersonRegular style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="4"
        className={styles.navItem}
        style={themestate?{ marginTop: "10px", fontSize:"17px", borderRadius:'0', backgroundColor:darktheme.sidebarcolordark }:{ marginTop: "10px", fontSize:"17px", borderRadius:'0'}}
      >
        <div style={{marginTop:"2px", color:'rgb(75,75,75)'}}>Reviewer</div>
       
      </NavItem>
      </div>
      <div style={{width:'100%'}}>
      <NavItem
        target="_blank"
        icon={<TableSearchRegular style={{color:'rgb(75,75,75)'}} />}
        onClick={someClickHandler}
        value="5"
        className={styles.navItem}
        style={{fontSize:'17px', }}
      >
        <div style={{marginTop:"2px", color:'rgb(75,75,75)'}}>Summary</div>
       
      </NavItem>
      </div>
    </NavDrawerBody>
  )}
  
  
  <NavDrawerFooter>
  
    {!collapse&&(
    // <NavItem
    //   value="21"
    //   target="_blank"
    // //   onClick={someClickHandler}
    //   className={styles.navfooter}
    // //   style={{color:"#E9E9E9"}}
    // //   icon={<Person />}
    // >
    <div style={{ position: 'relative', paddingTop:'30vh', left: 0, width: '100%', textAlign: 'center', fontWeight: 'bold', zIndex: 9 }}>
    <p style={{ marginBottom: '15px', color: 'rgb(75,75,75)' }}>by FocusR AI</p>
    <p style={{ marginTop: '-10px', color: 'rgb(75,75,75)' }}>V 0.0.1</p>
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
  </div>
  
</NavDrawer>
 
 
      <div className={styles.content} >
        {/* <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          {type === "inline" ? "Toggle" : "Open"}
        </Button>
 
        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup
            value={type}
            onChange={(_, data) => setType(data.value)}
            aria-labelledby={labelId}
          >
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div> */}
        {/* {Children} */}
        {children}
      </div>
    </div>
  );
};
 
export default NavDrawerDefault;
 
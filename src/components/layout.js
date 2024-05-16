
import {  Layout, Button } from 'antd';
import { SearchOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import './layout.css';
import { UserOutlined, BarChartOutlined, TeamOutlined } from '@ant-design/icons';
import frLogo from '../media/frlogo.png';
import React, { useState, useEffect } from 'react';
import Login from '../pages/Login';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer1 from './drawer';
import { SearchBox, Field, Avatar,PopoverTrigger, PopoverSurface, makeStyles, Popover,Text,shorthands,Link,InfoLabel  } from '@fluentui/react-components';
import { AlertBadgeRegular,QuestionRegular,WeatherSunnyRegular ,WeatherMoonRegular   } from '@fluentui/react-icons';
import { themeActions } from '../Store/Store';
import { calc } from 'antd/es/theme/internal';
 
 
const { Header, Content, Footer, Sider } = Layout;
const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
  },
  text: {
    ...shorthands.overflow("hidden"),
    width: "240px",
    display: "block",
    color:"#424242"
  },
});
 
const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div style={{marginBottom:"20px"}}>
    <div style={{ width: "320px", display: "flex", justifyContent: "space-between", marginBottom:"40px" }}>
      <Text truncate wrap={false} className={styles.text} style={{ width: "75%" }}>
        FocusR Consultancy and Technologies pvt ltd.
      </Text>
     
      <Link appearance="subtle" href="http://localhost:3001/appraisal/" style={{ width: "25%", textAlign: "right" }}>
        Sign out
      </Link>
   
    </div>
    <div style={{display:"flex",width: "320px", marginBottom:"10px" }}>
    <Avatar active='active' color='colorful'  name="Gokilavani K"  size={96} style={{marginLeft:"5%"}} />
    <div style={{width:"55%", marginLeft:"10%", display:"flex", flexDirection:"column",justifyContent:"center" }}>
    <Text  wrap={false} weight='bold' className={styles.text} style={{fontSize:"20px", width:"100%", marginBottom:"10px"  }}>
        Gokilavani K
      </Text>
    <Text truncate wrap={false}  style={{fontSize:"14px", width:"100%", marginBottom:"10px",color:"#424242"   }}>
        Gokilavani.k@focusrtech.com
      </Text>
    <Text truncate wrap={false} className={styles.text} style={{fontSize:"14px", width:"100%",   }}>
        M1432
      </Text>
    </div>
    </div>
    </div>
 
 
  );
};
const CustomLayout = ({ children }) => {
  const [logoutPopoverVisible, setLogoutPopoverVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const navigate = useNavigate();
 
  const dispatch = useDispatch();
 
  const lighttheme = useSelector((state) => state.theme.light);
 
  const darktheme = useSelector((state) => state.theme.dark);
 
  const themestate = useSelector((state) => state.theme.theme)
  // const [searchBoxSize, setSearchBoxSize] = useState('30vh');
  const [boxsize, setSize]=useState('30vw')
  const [appear, setAppear] = useState(true)
 
  const handleTheme = () =>{
        dispatch(themeActions.toggletheme());
  };

  const [searchBoxWidth, setSearchBoxWidth] = useState(window.innerWidth < 1000 ? '30vw' : '100vw');

  const handleInputFocus = () => {
    setSearchBoxWidth('100vw'); // Expand width when input is focused
  };

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      setSearchBoxWidth(window.innerWidth < 1000 ? '30vw' : '100vw'); // Reset width when input is empty
    }
  };



 
  

    // Listen for window resize events
    
  const handleSize=()=> {
    if (window.innerWidth<768){
      setSize('80vw');
      setAppear(false);
    };
    
  }
   
 
 
  return (
   
    <div style={{}}>
      <div>
      <div
        className='navbar'>
        <div className="left-part" >
          <div className='focusr-logo'>
            <img src={frLogo} alt='FRLogo' className='focusr-logo-img'></img>
          </div>
 
          <span className='focusR-text'>FocusR ACE</span>
        </div>
 
        {/* <div className='center' > */}
        <Field  style={window.innerWidth < 768 ?{display: "flex", alignItems: "center", justifyContent:"center", backgroundColor:"white", borderRadius: "5px", marginRight:20, }:{display: "flex", alignItems: "center", justifyContent:"center", backgroundColor:"#fff", borderRadius: "5px"}}>
      <SearchBox placeholder="Search..." style={window.innerWidth < 768 ?{width:boxsize, height: "3vh",maxWidth:'none', font:'white'}:{width:"468px", height: "3vh", maxWidth:'none', color:'red'}}  size= 'medium'  appearance='filled-darker' className='searchbar' onFocus={()=>handleSize()}/>
    </Field>
        {/* </div> */}
 {appear &&
        <div className='right-part'> 
        <div className='theme-container' onClick={handleTheme}>
          { themestate?(
          < WeatherSunnyRegular style={{color: "#fff", height:"100%", width:"100%"}}  />
          ):(
          < WeatherMoonRegular  style={{color: "#fff", height:"100%", width:"100%"}}  />
          )
          }
          </div>
 
          <div className='notification-container'>
          < AlertBadgeRegular style={{color: "#fff", height:"100%", width:"100%"}}  />
          </div>
 
          <a className='questionmark-container' href='https://focusrtech.com/'>
          < QuestionRegular    style={{color: "#fff", height:"100%", width:"100%"}}  />
          </a>
 
         
 
          <Popover appearance='' >
            <PopoverTrigger disableButtonEnhancement>
              <div style={{marginRight: "15px", height:"48px", display:"flex", flexDirection:"column", justifyContent:"center",cursor: "pointer"}}>
            <Avatar color="colorful"  name="Gokilavani K" size={36}  />
              </div>
            </PopoverTrigger>
             
 
            <PopoverSurface tabIndex={-5} >
              <ExampleContent />
            </PopoverSurface>
          </Popover>
 
         
        </div>
}
      </div>
      </div>
      <div style={{marginTop:"48px" }}>
        <Drawer1>
          {children}
          </Drawer1>
       
      </div>
    </div>
  )
}
 
export default CustomLayout;
 
 
 
 
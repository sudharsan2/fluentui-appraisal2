
import React, { useState, useEffect, useCallback } from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  Button,
  tokens,
  flatTreeClassNames,
} from "@fluentui/react-components";
import { ArrowCircleRightRegular , ArrowCircleLeftRegular, TextColumnWideRegular} from "@fluentui/react-icons";
import { Avatar } from "@fluentui/react-components";
import { makeStyles, shorthands } from '@griffel/react';
 
 
const useStyles = makeStyles({
  root: {
    ...shorthands.border("2px", "solid", "#ccc"),
    ...shorthands.overflow("hidden"),
    marginTop:'6vh',
    position:'fixed',
    display:"flex",
    left:'0',
    height: "100%",
    width: "100vw",
    backgroundColor: "#fff",
  },
 
  content: {
    ...shorthands.margin(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.flex(1),
 
    gridRowGap: tokens.spacingVerticalXXL,
  },
});
 
export const Responsive = () => {
  const styles = useStyles();
 
  const [isOpen, setIsOpen] = useState(true);
  const [change, setChange] = useState(false);
  const [resize, setresize] = useState(60);
  const [type, setType] = useState("inline");
  
 
 
  const onMediaQueryChange = useCallback(({ matches }) => setType(matches ? "overlay" : "inline"), []);
 
  useEffect(() => {
    const match = window.matchMedia("(max-width: 720px)");
 
    if (match.matches) {
      setType("overlay");
    }
 
    match.addEventListener("change", onMediaQueryChange);
 
    return () => match.removeEventListener("change", onMediaQueryChange);
  }, []);
 
  return (
    <div className={styles.root} style={{}}>
      <Drawer
        type={type}
        separator
        position="start"
        open={true}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        style={change ? { width: `${resize}px`, backgroundColor:"#E9E9E9" } : {backgroundColor:"#E9E9E9" }}
      >
        <div style={change?{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"10px"}:{display:"flex", alignItems:"center", marginLeft:"0.75vw", width:"100%", cursor:'pointer'}} onClick={() => {
                          setChange(!change);
                        }}>
            <Button
                        appearance="transparent"
                        icon={<TextColumnWideRegular />}
                        size="large"
                        onClick={() => {
                          setChange(!change);
                        }}
                        style={{backgroundColor:"#E9E9E9", marginTop:"3vh"}}
                      >
                        
                      </Button>
          </div>
        
        <DrawerHeader style={ {display:"flex"}}>
          <DrawerHeaderTitle
            // action={
            //   <Button
            //     appearance="subtle"
            //     aria-label="Close"
            //     icon={<Dismiss24Regular />}
            //     onClick={() => setIsOpen(false)}
            //   />
            // }
          >
            
             
          </DrawerHeaderTitle>
        </DrawerHeader>
 
        <DrawerBody style={{backgroundColor:"#E9E9E9"}}>
          {/* <p>Drawer content</p> */}
        </DrawerBody>
      </Drawer>
 
      <div className={styles.content} >
        {/* <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          Toggle
        </Button>
        <Button appearance="primary" >
            Resize
        </Button>
 
 
        <p>Resize the window to see the change</p> */}
      </div>
    </div>
  );
};
 
export default Responsive;
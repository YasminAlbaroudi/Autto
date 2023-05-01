
import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import LogoDark from "../../images/logo_dark.png"
import LogoLight from "../../images/logo_light.png"
import React from 'react'
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
export default function NavBar(props) {
    const navigate = useNavigate();
    const {currentUser,logOut}=useAuth();
    return(
        <>
            <AppBar key={1}  style={{position: props.position? props.position : "fixed", backgroundColor:props.bgColor,opacity:props.opacity,color:props.color , height:"6vh",zIndex:"200"}}>
                <div style={{width:"97%",display:"flex",alignItems:"center",margin:"auto",marginRight:"1%",gap:"1rem"}}>
                    <div style={{marginRight:"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.2rem"}}>
                        <Typography  fontSize="1rem" fontFamily= "'Major Mono Display', monospace" variant='h3' color={props.color} fontWeight="bold">Autto</Typography>
                        <img src={props.logoLight ? LogoLight :LogoDark} alt="logo" style={{width:"4vh"}}/>
                        
                    </div>
                    {currentUser? 
                    (
                        <>
                        <Tooltip title="Dashboard">
                        <IconButton style={{paddingTop:0,paddingBottom:0,maxHeight:"5vh"}} onClick={()=>{
                            //go home
                            
                            navigate("/Dashboard");
                        }}
                        
                        ><DashboardIcon color={props.color}/></IconButton>
                    </Tooltip>
                     <Tooltip title="Home" >
                        <IconButton style={{paddingTop:0,paddingBottom:0,maxHeight:"5vh"}} onClick={()=>{
                            //go home
                            navigate("/");
                        }}
                        ><HomeIcon color={props.color}/></IconButton>
                    </Tooltip>
                    <Tooltip  title="Documentation">
                        <IconButton style={{paddingTop:0,paddingBottom:0,maxHeight:"5vh"}} onClick={()=>{
                            navigate("/Docs");
                        }}>
                        <ContentPasteIcon color={props.color}/></IconButton>
                    </Tooltip>
                    <div style={{borderLeft:"2px solid white" }}>
                    <Tooltip title="Sign Out">
                        <IconButton style={{paddingTop:0,paddingBottom:0,maxHeight:"5vh"}}  onClick={()=>{
                            logOut();
                            navigate("/SignIn");
                        }} ><LogoutIcon color={props.color}/></IconButton>
                    </Tooltip>
                    </div>
                    </>
                    ):(
                        <>
                        <Tooltip title="Home">
                        <IconButton style={{paddingTop:0,paddingBottom:0,maxHeight:"5vh"}} onClick={()=>{
                            //go home
                            navigate("/");
                        }}
                        ><HomeIcon color={props.color}/></IconButton>
                    </Tooltip>
                        <Tooltip  title="Documentation">
                        <IconButton  style={{paddingTop:0,paddingBottom:0,maxHeight:"5vh"}} onClick={()=>{
                            navigate("/Docs");
                        }}>
                        <ContentPasteIcon color={props.color}/></IconButton>
                    </Tooltip>
                        <Tooltip title="Sign In">
                        <IconButton style={{paddingTop:0,paddingBottom:0,maxHeight:"5vh"}} onClick={()=>{
                            navigate("/SignIn");
                        }}  ><LoginIcon color={props.color}/></IconButton>
                    </Tooltip>
                    </>
                    )}
                    </div>
            </AppBar>
        </>
    );
}   
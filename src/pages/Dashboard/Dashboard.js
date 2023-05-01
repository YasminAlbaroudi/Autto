import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { Button, Card,CardContent, Fab, InputBase, Skeleton, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { getWorkflows } from '../../Firebase/Firestore';
import DS_icons from '../../DataSource/DS_icons';
import AddIcon from '@mui/icons-material/Add';
import {motion} from "framer-motion";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from '../NavBar/NavBar';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '50ch',
        },
      },
    },
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ffffffff",
    '&:hover': {
      backgroundColor: "#fffffff",
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
const MainDiv = styled.div`
    background-color: #ededed;
    width: 100%;
    position: fixed;
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
`;
const MainGrid=styled.div`
    transition: all 0.3s ease;
    display: grid;
    width: 80%;
    margin-left: 10%;
    padding-top: 5%;
    padding-bottom: 5%;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2rem;
    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;

    }`;
const ActionsDiv=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    `;
export default function Dashboard() {
    const [loading,SetLoading]=React.useState(true);
    const [workflows,setWorkflow]=React.useState([]);
    const [storedWorkflows,setStoredWorkflows]=React.useState([]);
    console.log(workflows);
    const {currentUser}=useAuth();
    console.log("uid",currentUser.uid);
    React.useEffect(()=>{
        getWorkflows(currentUser.uid).then((data)=>{
            setWorkflow(data);
            setStoredWorkflows(data);
            SetLoading(false);
        })
    },[]);
    return(
      <>
        <NavBar bgColor="#681897" color="primary" opacity="0.7" logoLight={true}/>
        <MainDiv>
            <Tooltip title="Create Workflow">
              <Fab color="secondary" size='medium' aria-label="add" style={{position:"fixed",bottom:"2rem",right:"2rem"}} onClick={()=>{
                  window.location.href="/Flow"}}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <Typography variant="h4" component="div"  align="center" fontFamily= "'Major Mono Display', monospace" fontWeight="bold"  paddingTop="5%">workflows</Typography>
            <ActionsDiv>
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onInput={(e)=>{
                setWorkflow(storedWorkflows.filter((workflow)=>{            
                    return workflow.name.toLowerCase().includes(e.target.value.toLowerCase());
                }));

              }}
            />
          </Search>
            </ActionsDiv>
            <MainGrid >

            {
                loading?
                [1,2,3,4,5,6,8,9,10].map(key=>{
                    return (
                        <Card key={key} style={{ backgroundColor: "#464646", color: "#ededed",height:"100%",paddingLeft:"1rem",marginBottom:"1rem",borderRadius:"1rem" }}>
                        <Skeleton key={`${key}_1`} animation="pulse" variant="circular" width={25} height={25}   style={{backgroundColor:"rgb(166 166 166)",marginTop:"1rem" }} />
                        <Skeleton key={`${key}_2`} animation="pulse" variant='text' sx={{fontSize:"1.5rem",marginTop:"0.8rem",fontWeight:"600"}} width="70%" style={{backgroundColor:"rgb(166 166 166)", }} />
                        <Skeleton key={`${key}_3`} animation="pulse" variant='text' sx={{fontSize:"1.5rem",fontWeight:"600"}} width="30%" style={{backgroundColor:"rgb(166 166 166)", }} />
                        <Skeleton key={`${key}_4`} animation="pulse" variant='text' sx={{fontSize:"0.875rem",marginTop:"1.5rem",fontWeight:"400"}} width="50%" style={{backgroundColor:"rgb(166 166 166)" }} />
                        </Card>
                    )
                })
                :
                workflows.map((workflow)=>{
                    return(
                        <motion.div initial={{scale:1,"boxShadow":"grey 0px 11px 20px 4px " , "borderRadius":"1rem",backgroundColor:"#464646",color:"#ededed",transition:"opacity 0.3s ease"}} whileHover={{scale:1.1, "boxShadow":"rgb(104, 24, 151) 0px 5px 10px 1px ","borderRadius":"1rem",color:"#464646",backgroundColor:"#ededed"}} 
                        key={workflow.id} transition={{
                            ease: "linear",
                            duration: 0.2,
                            x: { duration: 0.1 }
                          }}
                         onClick={()=>{
                            window.location.href=`/Flow/${workflow.id}`}}
                        style={{cursor:"pointer"}}
                        >
                        
                                <CardContent >
                                <Typography variant="p"  fontSize="large" >{DS_icons[workflow.icon]}</Typography>
                                <Typography variant="h5"  fontWeight="600" style={{paddingTop:"0.5rem",display: '-webkit-box',WebkitBoxOrient: 'vertical',WebkitLineClamp: 2,overflow: 'hidden',textOverflow: 'ellipsis' }} >{workflow.name}</Typography>
                                <Typography variant="body2"   style={{paddingTop:"1.5rem",display: '-webkit-box',WebkitBoxOrient: 'vertical',WebkitLineClamp: 2,overflow: 'hidden',textOverflow: 'ellipsis'}}>{workflow.description}</Typography>
                                </CardContent>
                        </motion.div>
    
                    );

                })
                
            }
            

            </MainGrid>
            {!loading && workflows.length===0 && 
            <div style={{display:"flex" ,width:"100%" ,justifyContent:"center"}}>
            <Typography variant="h5" component="div"  align="center"  fontWeight="bold"  paddingTop="5%">No workflows found :c</Typography>
            </div>
            }
        </MainDiv>
        </>
    )
}
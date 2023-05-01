import React from 'react'
import styled from "@emotion/styled";
import { Avatar, Button, Icon, Typography } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import AddIcon from '@mui/icons-material/Add';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { firestore } from '../../Firebase/Firebase';
import { getWorkflows } from '../../Firebase/Firestore';
import Skeleton from '@mui/material/Skeleton';
import LanguageIcon from '@mui/icons-material/Language';
import { useAuth } from '../../Context/AuthContext';
import DS_icons from '../../DataSource/DS_icons';
import {motion} from "framer-motion";

const MainContainer=styled.div`
height: max(100vh);
background-color: #484848;
display: flex;
flex-direction: column;
align-items: flex-start;
padding-left: 5rem;
gap: 5vh;

`;
const TopContainer=styled.div`
width: 100%;
height: 6%;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 1rem;

`;
const TitleContainer=styled.div`
width: 100%;
height: 7%;
display: flex;
flex-direction: row;    
justify-content: flex-start;
margin-bottom: 1rem;`;

const WorkflowsContainer=styled.div`
width: 90%;
height: 87%;
display: grid;
grid-template-columns: repeat(3, minmax(200px, 1fr));
grid-template-rows: repeat(auto-fill, 1fr);
grid-gap: 2rem;
overflow-y: scroll;
padding-bottom: 1rem;

`;

const WorkflowCard=styled.div`
height: 10rem;
display: flex;
flex-direction: column;
background-color: #ffffff;
border-radius: 1rem;
padding: 1rem;
cursor: pointer;
`;
const WorkflowCardIcon=styled.div`
width: 2vw;
height: 2vw;
border-radius: 50%;
background-color: #ededed;
margin-left: auto;
margin-right: auto;
padding: 1rem;
display: flex;
justify-content: center;
align-items: center;
`;
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
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
  

export default function Dashboard(props) {
    const [loading,SetLoading]=React.useState(true);
    const [workflows,setWorkflow]=React.useState([]);
    console.log(workflows);
    const {currentUser}=useAuth();
    console.log("uid",currentUser.uid);
    React.useEffect(()=>{
        getWorkflows(currentUser.uid).then((data)=>{
            setWorkflow(data);
            SetLoading(false);
        })
    },[]);
    return(
        <>
    {/* <NavBar position="relative"/> */}
    <MainContainer>
        <TitleContainer>
            <Typography variant="h3" style={{color:"white"}}>Workflows</Typography>
        </TitleContainer>
        <TopContainer>
            <Button variant="contained" color="primary" style={{marginTop:0}} endIcon={<AddIcon />} onClick={()=>{
                window.location.href="/Flow"
            }}>Create Workflow</Button>
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </TopContainer>
        <WorkflowsContainer>
            {loading ?
            (<>
            {[1,2,3,4,5,6,8,9,10].map(key=>{
                return (
                    <WorkflowCard key={key}>
                    <Skeleton key={`${key}_1`} animation="pulse" variant="circular" width={30} height={30}   style={{backgroundColor:"rgb(166 166 166)", }} />
                    <Skeleton key={`${key}_2`} animation="pulse" variant='text' sx={{fontSize:"3rem"}} width="70%" style={{backgroundColor:"rgb(166 166 166)", }} />
                    <Skeleton key={`${key}_3`} animation="pulse" variant='text' sx={{fontSize:"1rem"}} width="50%" style={{backgroundColor:"rgb(166 166 166)" }} />
                    {/* <Skeleton key={`${key}_4`} animation="pulse" variant='text' sx={{fontSize:"0.5rem"}} width="10%" style={{backgroundColor:"rgb(166 166 166)",marginTop:"1rem" }} /> */}
                    </WorkflowCard>
                )
            })}
            </>
            ):(
            workflows.map((workflow,index)=>{
                return (
                  <motion.div initial={{ "borderRadius":"1rem"}} whileHover={{ "boxShadow":"rgb(104, 24, 151) 0px 11px 20px 4px ","borderRadius":"1rem"}}>
                    <WorkflowCard key={workflow.id} onClick={()=>{
                        window.location.href=`/Flow/${workflow.id}`
                    }}>
                        <WorkflowCardIcon>
                          {DS_icons[workflow.icon]}
                        </WorkflowCardIcon>
                        <Typography variant="h3" sx={{fontSize:"1.2rem",fontWeight:"bold"}}>{workflow.name}</Typography>
                        <Typography variant="body1" sx={{fontSize:"1rem", color:"grey"}}>{workflow.description}</Typography>
                    </WorkflowCard>    
                    </motion.div>
                );
            })
            )}
        </WorkflowsContainer>



    </MainContainer>
    </>
    
)
}
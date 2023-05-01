import styled from "@emotion/styled";
import { Typography,Button,Paper,TextField,Card,Box,CardContent,IconButton,CardMedia } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const MainContainer = styled.div`
    width: 90%;
    margin-left: 5%;
    height: 95%;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    `;
const MainHeader = styled.div`
    width: 100%;
    height: 10%;
    border-bottom: 1px solid #000;`;
const MainDividerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1rem;
    gap: 1rem;
    `;
const MainLeftDiv = styled.div`
    width: 50%;
    height: 75vh;
    `;
const MainRightDiv = styled.div`
    width: 100%;
    height: 75vh;
    `;
const WorkFlowCarrousel = styled.div`
    width: 70%;
    margin-left: 15%;
    margin-top: 1rem;
    padding-bottom: 1rem;
    height: 75%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: 1rem;
    scrollbar-width: none;
    padding-right: 1rem;
    padding-left: 1rem;

    `;

const PlayButtonDiv = styled.div`
    width:50px;
    height:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2e7d32;
    border-radius: 50%;`;
const workflows=[
    {
        id:1,
        name:"My workflow 1",
        lastRun:"1 day ago",
    },
    {
        id:2,
        name:"My workflow 2",
        lastRun:"2 day ago",
    },
    {
        id:3,
        name:"My workflow 3",
        lastRun:"3 day ago",
    },
    {
        id:4,
        name:"My workflow 4",
        lastRun:"4 day ago",
    },
]
export default function OldDashboard() {
    
    return(
        <MainContainer>
            <MainHeader>
                <Typography variant="h3">Dashboard</Typography>
            </MainHeader>
            <MainDividerDiv>
                <MainLeftDiv>
                    <Paper sx={{width:"100%",height:"100%", backgroundColor:"#681897"}} elevation={10}>
                        <Button variant="contained" startIcon={<AddIcon/>} sx={{width:"80%", marginLeft:"10%",marginTop:"5rem"}}>New Workflow</Button>
                        <Button variant="contained" startIcon={<EmojiPeopleIcon/>} sx={{width:"80%", marginLeft:"10%",marginTop:"1rem"}}>Brows the Community</Button>
                    </Paper>
                </MainLeftDiv>
                <MainRightDiv >
                    <Paper sx={{width:"100%",height:"100%"}} elevation={10}>
                        <TextField id="search" color="primaryDark" label={<SearchIcon/> } variant="outlined" sx={{width:"80%", marginLeft:"10%",marginTop:1}}/>
                        <WorkFlowCarrousel>
                            {workflows.map((workflow)=>{
                                return(
                                    <Workflow key={workflow.id} {...workflow} style={{height:"100%"}}/>
                                )
                            })}
                        </WorkFlowCarrousel>
                    </Paper>
                </MainRightDiv>
            </MainDividerDiv>
        </MainContainer>
    );
}
function Workflow(props){
    return(
        <Paper elevation={4} sx={{ borderRadius:"1rem",display: 'flex' ,justifyContent:"space-between",paddingLeft:1,paddingRight:1,paddingTop:"50px",paddingBottom:"50px" ,backgroundColor:"#ededed",height:"fit-content"}} key={props.id}>
        <div style={{ display: 'flex', flexDirection: 'column',height:"fit-content" }}>

            <Typography component="div" variant="h5">
              {props.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {props.lastRun}
            </Typography>
        </div>
        <Box sx={{display:'flex',justifyContent:"flex-start",flexDirection:"column",height:"fit-content"}}>
            <IconButton aria-label="settings">
                <MoreHorizIcon/>
            </IconButton>
            <PlayButtonDiv>
            <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38,color:"white" }} />
            </IconButton>
            </PlayButtonDiv>
        </Box>

      </Paper>
    );
}
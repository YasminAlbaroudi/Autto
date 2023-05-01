import { Card, CardActionArea, CardContent, CardMedia,Typography,Grid } from "@mui/material";
import styled from "@emotion/styled";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import {motion} from "framer-motion";
const MainDiv = styled.div`
    background-color: #ededed;
    width: 100%;
    height: 100%;
    flex-direction: column;
    overflow-x:hidden;
`;
const MainDivHeader=styled.div`
    background-color: #ededed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    `;
const SubDiv=styled.div`
    background-color: #464646;
    width: 40vw;
    height: 20vw;
    justify-content: center;
    margin: auto;
    margin-top: 5rem;`;

const MainGrid=styled.div`
    display: grid;
    width: 80%;
    margin-left: 10%;
    margin-top: 5%;
    grid-auto-rows: minmax(100px, auto);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 3rem;
    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;

    }
    `;

    
    

const features=[
    {
        icon:<TravelExploreIcon fontSize="large"/>,
        title: "Web Scrapping",
        desc:"Autto allows you to extract data from websites and save it in a structured format.",
    },{
        icon:<CloudDoneIcon fontSize="large"/>,
        title:"Cloud Storage",
        desc:"Autto allows you to store your workflow and data in the cloud and access it from anywhere.",
    },
    {
        icon:<AccountTreeIcon fontSize="large"/>,
        title:"Workflow Building",
        desc:"Autto allows you to build your own workflow and automate your daily tasks.",
    }
    ,
    {
        icon:<CodeOffIcon fontSize="large"/>,
        title:"No Code",
        desc:"Autto allows you to automate your tasks without the need for any coding experience.",
    },
    
]
export default function MainSection() {
    return(
        
        <MainDiv>
            <Typography variant="h4" component="div"  align="center" fontFamily= "'Major Mono Display', monospace" fontWeight="bold"  marginTop="5%">features</Typography>
            <motion.div initial={{opacity:0 , scale:0.1}} whileInView={{opacity:1,scale:1}} transition={{duration:1,type:"spring",bounce: 0.35}} viewport={{ once: true }} >
            <MainGrid >
            {
                features.map((feature,index)=>{
                    return(
                        <motion.div initial={{scale:1,"boxShadow":"grey 0px 11px 20px 4px " , "borderRadius":"1rem"}} whileHover={{scale:1.1, "boxShadow":"rgb(104, 24, 151) 0px 11px 20px 4px ","borderRadius":"1rem"}} key={index}>
                        <Card style={{ backgroundColor: "#464646", color: "#ededed",height:"100%",padding:0 ,}}  >
                                <CardContent >
                                <Typography variant="p"  fontSize="large" >{feature.icon}</Typography>
                                <Typography variant="h5"  fontWeight="600" style={{paddingTop:"0.5rem"}} >{feature.title}</Typography>
                                <Typography variant="body2"   style={{paddingTop:"1.5rem"}}>{feature.desc}</Typography>
                                </CardContent>
                        </Card>
                        </motion.div>
    
                    );

                })
            }
            </MainGrid>
            </motion.div>
        </MainDiv>
    )
}
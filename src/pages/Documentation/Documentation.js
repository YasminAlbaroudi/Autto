import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { Button, Card,CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Fab, IconButton, InputBase, Skeleton, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import DS_icons from '../../DataSource/DS_icons';
import AddIcon from '@mui/icons-material/Add';
import {motion} from "framer-motion";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from '../NavBar/NavBar';
import CloseIcon from '@mui/icons-material/Close';
import DS_documentation from '../../DataSource/DS_documentation';

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

const CategorySection=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    width: 80%;
    margin-left: 10%;
    padding-top: 5%;
    padding-bottom: 5%;
    `;
const CategoryTitle=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    &:before{
        content: "";
        width: 100%;
        height: 5px;
        border-radius: 5px;
        background-color: #681897;
        margin-right: 1rem;
    }
    &:after{
        content: "";
        width: 100%;
        height: 5px;
        border-radius: 5px;
        background-color: #681897;
        margin-left: 1rem;
    }
    `;
const CategoryContent=styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 2rem;
    width: 100%;
    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;    
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }`;
    




        

export default function Documentation() {
    const [functions,setFunctions]=React.useState([]);
    const [displayedFunction,setDisplayFunction]=React.useState(null);
    console.log(functions);
    React.useEffect(()=>{
        setFunctions(DS_documentation);
    },[]);
    return(
      <>
        <NavBar bgColor="#681897" color="primary" opacity="0.7" logoLight={true}/>
        {displayedFunction && <DisplayedFunction displayedFunction={displayedFunction}  setDisplayFunction={setDisplayFunction}/>}
        <MainDiv>

            <Typography variant="h4" component="div"  align="center" fontFamily= "'Major Mono Display', monospace" fontWeight="bold"  paddingTop="5%">Documentation</Typography>
            <ActionsDiv>
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onInput={(e)=>{
                if(e.target.value.length>0){
                    setFunctions(()=>{
                        let newFunctions={};
                        Object.keys(DS_documentation).forEach((key)=>{
                                 DS_documentation[key].forEach((item)=>{
                                if(item.name.toLowerCase().includes(e.target.value.toLowerCase())){
                                    if(newFunctions[key]===undefined){
                                        newFunctions[key]=[];
                                    }
                                    newFunctions[key].push(item);   
                                }
                            })

                        });
                        return newFunctions;
                });

                }else{
                  setFunctions(DS_documentation);
                }

              }}
            />
          </Search>
            </ActionsDiv>
            < >

                {
                    Object.keys(functions).length>0?(
                    Object.keys(functions).map(
                        (category)=>{
                            return(<CategorySection>
                            <CategoryTitle><Typography color="secondary" fontFamily= "'Major Mono Display', monospace" fontWeight="bold" fontSize="2rem">{category}  </Typography></CategoryTitle>
                            <CategoryContent>
                            {
                             functions[category].map((funct)=>{
                                return(
                                    <motion.div initial={{scale:1,"boxShadow":"grey 0px 11px 20px 4px " , "borderRadius":"1rem",backgroundColor:"#464646",color:"#ededed",transition:"opacity 0.3s ease"}} whileHover={{scale:1.1, "boxShadow":"rgb(104, 24, 151) 0px 5px 10px 1px ","borderRadius":"1rem",color:"#464646",backgroundColor:"#ededed"}} 
                                    key={funct.id} transition={{
                                        ease: "linear",
                                        duration: 0.2,
                                        x: { duration: 0.1 }
                                      }}
                                      onClick={()=>{
                                        setDisplayFunction(funct);
                                      }}
                                    style={{cursor:"pointer"}}
                                    >
                                    
                                            <CardContent >
                                            {funct.icon}
                                            <Typography variant="p"  fontSize="large" >{DS_icons[funct.icon]}</Typography>
                                            <Typography variant="h5"  fontWeight="600" style={{paddingTop:"0.5rem",display: '-webkit-box',WebkitBoxOrient: 'vertical',WebkitLineClamp: 2,overflow: 'hidden',textOverflow: 'ellipsis' }} >{funct.name}</Typography>
                                            <Typography variant="body2"   style={{paddingTop:"1.5rem",display: '-webkit-box',WebkitBoxOrient: 'vertical',WebkitLineClamp: 2,overflow: 'hidden',textOverflow: 'ellipsis'}}>{funct.description}</Typography>
                                            </CardContent>
                                    </motion.div>
                                );
                            })
                        }
                            </CategoryContent>
                            </CategorySection>
                            )
                        }
                    )
                    ):(
                        <div style={{display:"flex" ,width:"100%" ,justifyContent:"center"}}>
                        <Typography variant="h5" component="div"  align="center"  fontWeight="bold"  paddingTop="5%">No functions found :c</Typography>
                        </div>
                    )
                }
                
            

            </>
            { functions.length===0 && 
            <div style={{display:"flex" ,width:"100%" ,justifyContent:"center"}}>
            <Typography variant="h5" component="div"  align="center"  fontWeight="bold"  paddingTop="5%">No functions found</Typography>
            </div>
            }
        </MainDiv>
        </>
    )
}

const DisplayedFunction=({displayedFunction,setDisplayFunction})=>{
    const Parameters=({params})=>{
        return(
            <>
            {
                params.length>0 ?(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr", gridAutoRows:"1fr",gap:"0.5rem"}}>
                {
                    params.map((param)=>{
                        return(
                            <div style={{display:"flex",flexDirection:"column",gap:"0.5rem" ,backgroundColor: "#464646",color: "#ededed",padding: "1rem",borderRadius: "1rem"}}>
                                <Typography variant="body1" component="div"  fontWeight="bold"  >{param.name}</Typography>
                                <Typography variant="body1" component="div"  >{param.description}</Typography>
                            </div>

                        )
                    })
                }
            </div>
                ):(
                    <Typography variant="body1" component="div"  fontWeight="bold"  >No parameters</Typography>
                )
            }
            </>
        )
    }
    const Connections=({connections})=>{
        return(
            <div style={{display:"flex",gap:"0.5rem"}}>
            {
                Object.keys(connections).map((key)=>{
                    if(connections[key].length>0){
                    return(
                        <div style={{display:"flex",flexDirection:"column",gap:"0.5rem" ,backgroundColor: "#464646",color: "#ededed",padding: "1rem",borderRadius: "1rem",width:"100%",}}>
                            <Typography variant="body1" component="div"  fontWeight="bold"  >{key}</Typography>
                            <Typography variant="body1" component="div"  ><strong>Type: </strong>{connections[key][0].type}</Typography>
                            {
                            connections[key][0].type!=="then" && (
                                <>
                            <Typography variant="body1" component="div"  > <strong>Name: </strong>{connections[key][0].name}</Typography>
                            <Typography variant="body1" component="div"  > <strong>Description: </strong>{connections[key][0].description}</Typography>
                            </>
                            )
                                }
                        </div>
                    );}
                    return (
                        <div style={{display:"flex",flexDirection:"column",gap:"0.5rem" ,backgroundColor: "#464646",color: "#ededed",padding: "1rem",borderRadius: "1rem",width:"100%",}}>
                        <Typography variant="body1" component="div"  fontWeight="bold"  >{key}</Typography>
                        <Typography variant="body1" component="div"  >No connections</Typography>
                        </div>
                    );
                })
            }
            </div>
        );
    }
    
    const handleClose = () => {
        setDisplayFunction(null);
    };
    return(
        <Dialog
        open={displayedFunction !== null}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        
      >
        <DialogTitle id="scroll-dialog-title" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}><Typography fontWeight="600" fontSize="2rem" marginRight="auto">{displayedFunction.name}</Typography> <Button variant='contained' color='secondary' onClick={handleClose}><CloseIcon/></Button></DialogTitle>
        <Divider color='black' style={{marginTop:"0.5rem"}}/>
        <DialogContent  >
            <DialogContentText
            id="scroll-dialog-description"
            style={{color:"black"}}
            >
            <Typography variant="h6" component="div"   fontWeight="bold"  >Description</Typography>
            <Typography variant="body1" component="div"   paddingTop="2%">{displayedFunction.description}</Typography>

            <Divider color='#ededed' style={{marginTop:"0.5rem"}}/>
            <Typography variant="h6" component="div" fontWeight="bold"  paddingTop="3%">Parameters</Typography>
            <Typography variant="body1" component="div"  paddingTop="2%">{<Parameters params={displayedFunction.params}/>}</Typography>
            <Divider color='#ededed' style={{marginTop:"0.5rem"}}/>
            <Typography variant="h6" component="div" fontWeight="bold"  paddingTop="3%">Connections</Typography>
            <Typography variant="body1" component="div" paddingTop="2%"><Connections connections={displayedFunction.connections} /></Typography>

            </DialogContentText>
        </DialogContent>
        
        
        </Dialog>
    );


   
}
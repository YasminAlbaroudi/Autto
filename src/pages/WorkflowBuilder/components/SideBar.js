import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import DS_functions from "../../../DataSource/DS_functions";
import styled from "@emotion/styled";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputBase, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DS_icons from "../../../DataSource/DS_icons";
import { deleteWorkflow, updateWorkflowMetadata } from "../../../Firebase/Firestore";
import { useAuth } from "../../../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
const StyledBox = styled(Box)`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-auto-rows: 1fr;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
export default function SideBar(props) {
  const onDragStart = (event, nodeType) => {
    console.log("dragstart NODE TYPE", nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box sx={{ display: "flex",zIndex:"50" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
          width: "20vw",
        }}
      >
        <Box sx={{ overflow: "auto", width: "30vw", padding: "2rem",paddingTop:"4rem" }}>
          {props.metaData && (<WorkflowIdentifiers metaData={props.metaData} workflowID={props.workflowID}/>)}
          {Object.keys(DS_functions).map((key) => {
            return (
              <div key={`div${key}`}>
                <Typography variant="h6" key={key} noWrap component="div">
                  {key}
                </Typography>
                <StyledBox style={{ display: "grid" }} key={`box${key}`}>
                  {DS_functions[key].map((func) => {
                    return (
                      <ListItem
                        key={func.id}
                        disablePadding
                        onDragStart={(event) =>
                          onDragStart(
                            event,
                            JSON.stringify({ category: key, id: func.id })
                          )
                        }
                        draggable
                        style={{ width: "80%" ,border:"1px solid #ededed",borderRadius:"5px",margin:"0.5rem"}}
                      >
                        <ListItemButton style={{height:"100%",display:"flex",alignItems:"flex-start",flexDirection:"column",justifyContent:"center"}}>
                          <ListItemIcon>{func.icon}</ListItemIcon>
                          <ListItemText primary={func.name} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </StyledBox>
              </div>
            );
          })}
          <Button
          variant="contained"
          color="secondary"
          disabled={props.loading}
          onClick={()=>{
            props.save();
          }}
          style={{width:"100%",marginTop:"1rem"}}>
            {props.loading?
            <> Saving.. <CircularProgress color="inherit" size={20} />  </>:
            "Save"}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

function WorkflowIdentifiers({metaData,workflowID}){
  const [showEditDialog,setShowEditDialog] = React.useState(false);
  return(

    <>
    <EditDialog showEditDialog={showEditDialog} setShowEditDialog={setShowEditDialog} metaData={metaData} workflowID={workflowID}/>
    <div style={{display:"flex",justifyContent:"space-between" ,borderBottom:"solid 5px #ededed",padding:"0.5rem",paddingLeft:0}}>
      <div>
          <Typography variant="h3" fontSize="2rem" color="secondary" fontWeight="600" style={{display: '-webkit-box',WebkitBoxOrient: 'vertical',WebkitLineClamp: 2,overflow: 'hidden',textOverflow: 'ellipsis'}} >{metaData.name}</Typography>
          <Typography variant="p" fontSize="1rem" color="primaryDark" fontWeight="500" style={{display: '-webkit-box',WebkitBoxOrient: 'vertical',WebkitLineClamp: 1,overflow: 'hidden',textOverflow: 'ellipsis'}}>{metaData.description}</Typography>
      </div>
      <IconButton style={{height:"fit-content"}} onClick={()=>{
        setShowEditDialog(true);
      }}>
        <EditIcon/>
      </IconButton>


    </div>
    </>
  )
}

const EditDialog=({showEditDialog,setShowEditDialog,metaData,workflowID})=>{
  const navigate=useNavigate();
  const {currentUser}=useAuth();
  const [updateForm,setUpdateForm]=React.useState({});
  const [loading,setLoading]=React.useState(false);
  const handleClose=()=>{
    setShowEditDialog(false);
    setUpdateForm({});
  }
  const handleUpdate=async ()=>{
    setLoading(true);
    let name=updateForm.name!==undefined ? updateForm.name : metaData.name;
    let description=updateForm.description!==undefined ? updateForm.description : metaData.description;
    let icon=updateForm.icon!==undefined ? updateForm.icon : metaData.icon;
    updateWorkflowMetadata({name:name,description:description,icon:icon,workflowID:workflowID,userID:currentUser.uid}).then((res)=>{
      //refresh the page
      window.location.reload();
    })
  }
  const handleDelete=async ()=>{
    if(window.confirm("Are you sure you want to delete this workflwo?")){
      deleteWorkflow({workflowID:workflowID,userID:currentUser.uid}).then((res)=>{
        navigate("/Flow");
      })
    }
  }
  return(
    <Dialog
    open={showEditDialog}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" fontWeight="bold">
      Update
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description" fontWeight="600" marginBottom="1rem">
        Update workflow details
      </DialogContentText>
      <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Icon</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"
value={updateForm.icon!==undefined ? updateForm.icon : metaData.icon}
label="Icon"
onChange={(e)=>{
  setUpdateForm((prevUpdateForm) => {
    return { ...prevUpdateForm, icon: e.target.value };
  });
}}
>
{Object.keys(DS_icons).map((icon)=>{
  return <MenuItem value={icon}>{DS_icons[icon]}</MenuItem>
})}
</Select>
</FormControl>

      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Workflow Name"
        type="text"
        fullWidth
        value={updateForm.name!==undefined ? updateForm.name : metaData.name}
        onChange={(e) => {
          setUpdateForm((prevUpdateForm) => {
            return { ...prevUpdateForm, name: e.target.value };
          });
        }}
      />
      <TextField
        autoFocus
        margin="dense"
        id="description"
        label="Workflow Description"
        type="text"
        fullWidth
        multiline={true}
        minRows={2}
        value={updateForm.description!==undefined ? updateForm.description : metaData.description}
        onChange={(e) => {
          setUpdateForm((prevUpdateForm) => {
            return { ...prevUpdateForm, description: e.target.value };
          });
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button variant="contained" color="error" style={{marginRight:"auto"}} onClick={handleDelete}> <><DeleteIcon /> Delete workflow</></Button>
      <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
      <Button onClick={handleUpdate} variant="contained" color="secondary" disabled={loading}>{loading? <> Save <CircularProgress color="inherit" size={20} style={{marginLeft:"0.5rem"}} /> </>:"Save"  }</Button>
    </DialogActions>

  </Dialog>
  );
}
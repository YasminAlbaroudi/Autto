import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {

    const navigate = useNavigate();
    return(
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"#681897",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Typography variant="h1" style={{color:"white",textAlign:"center"}}>404</Typography>
            <Typography variant="h3" style={{color:"white",textAlign:"center"}}>Page Not Found</Typography>
            <Button style={{marginTop:"5vh"}} variant="contained" color="primary" onClick={()=>{
                navigate("/");
            }}>Home</Button>
        </div>
    );
}
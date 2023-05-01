import { CircularProgress } from "@mui/material";

export default function Loading(props) {

    return (
        <>
      {props.open && (
        <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            
        }}>
            <CircularProgress color="primary" />
        </div>
      )} 
      </> 
    );

}
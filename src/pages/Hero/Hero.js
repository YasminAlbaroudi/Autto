import AnimatedBackground from "./components/AnimatedBackground";
import TypeWriterComponent from "./components/TypeWriterComponent";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
const HeroDiv=styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    background-color: none;
    `
const buttonSX={
    position:"absolute", 
    boxShadow: "0px 0px 10px 4px white", 
    bottom:"5%", left:"50%",
    fontWeight:"bold", 
    transform:"translate(-50%, -50%)",
    backgroundColor:"#2e7d32d1",
    color:"#ededed",
    backdropFilter: "invert(1);",
}
export default function Hero() {
    return(
        <HeroDiv>
            <TypeWriterComponent />
            <AnimatedBackground/>
            <Button variant="contained" size="large" sx={buttonSX}>Get for Chrome</Button>
        </HeroDiv>
);
}
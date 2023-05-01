import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import React from "react";
import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';
const CentralizingDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  z-index: 100;
  `;
const MainHeroDiv = styled.div`
  font-size: max(4vw,1.1rem);
  font-weight: 400;
  position: absolute;
  display: flex;
  width: 80%;
  padding-bottom: max(4vw,1.1rem);
  padding-top: max(4vw,1.1rem);
  background-color: #ededed;
  border-radius: 1rem;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  z-index: 100;
  box-shadow: #ededede6 0px 0px 19px 2px;
`;
const HeroTextDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  
`;
export default function TypeWriterComponent() {
  
  return (
    <CentralizingDiv>
    <MainHeroDiv>
        <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          width:"100%",
          padding:"0 1rem"
        }}>
        <HeroTextDiv>
          <Typography variant="p" sx={{ marginRight: 1.6 }}>
            
            How to 
          </Typography>
          <div style={{fontWeight:"700", color: "#681897"}}>
            <Typewriter
              words={["Scrape?", "Automate?", "Build Workflows?", "AUTTO!"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              
            
            />
          </div>
          
        </HeroTextDiv>
          <Typography variant="p" style={{display:"flex", alignItems:"center"}}><SearchIcon fontSize="max(5vw,1.3rem)"/></Typography>
        </div>
    </MainHeroDiv>
    </CentralizingDiv>
  );
}

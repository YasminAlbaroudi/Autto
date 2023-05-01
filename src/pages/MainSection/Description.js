import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import def from "../../images/def.png";
const DescriptionDiv = styled.div`
    background-color: #464646;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #ededed;

`;
const PicDiv= styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 3rem;
    padding: 5%;

    `;
const Textdiv= styled.div`
align: left;
font-family: 'Major Mono Display', monospace;
padding : 5%;
width: 90%;
`;
export default function Description() {
    
    return(
        <DescriptionDiv>    
            <Textdiv>
            <Typography variant="h4" fontFamily= "'Major Mono Display', monospace" fontWeight="bold" marginTop="5%"> do what you do best, let autto do the rest</Typography>
            <Typography variant="h6"  fontFamily= "'Major Mono Display', monospace" fontWeight="bold" marginTop="5%">
                autto focuses on triggers, actions and conditions to automate your tasks. <br/>
                open the extension and start building your workflow. <br/>
                relax back and dont stress about waking up in the morning to sign in to your work platforms, autto will do it for you.
            </Typography>
            </Textdiv>

            <PicDiv>
            <img src={def} alt="def" width="100%" height="80%" />
            </PicDiv>
        </DescriptionDiv>
    );
}
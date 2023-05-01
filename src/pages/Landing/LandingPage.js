import Hero from "../Hero/Hero";
import FeaturesSection from "../MainSection/FeaturesSection";
import NavBar from "../NavBar/NavBar";
import styled from '@emotion/styled';
import Description from "../MainSection/Description";
const AppContainer = styled.div`
  background-color: #ededed;
  height: 100vh;
  display: grid;
  grid-auto-rows: 100%;
  `;
export default function LandingPage() {

    return(
        <AppContainer>
            <div>
                <NavBar bgColor="#ededed" color="primaryDark" opacity="0.8" /> 
                <Hero/>
            </div>
            <FeaturesSection />
            <Description />
        </AppContainer>
    );
}
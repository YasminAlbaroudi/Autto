import logo from "./logo.svg";
import "./App.css";
import NavBar from "./pages/NavBar/NavBar";
import Hero from "./pages/Hero/Hero";
import { ThemeProvider, createTheme, requirePropFactory } from "@mui/material";
import FeaturesSection from "./pages/MainSection/FeaturesSection";
import Description from "./pages/MainSection/Description";
import WorkflowBuilder from "./pages/WorkflowBuilder/WorkflowBuilder";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import NewWorkFlow from "./pages/WorkflowBuilder/NewWorkFlow";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";
import NotFound from "./pages/NotFound/NotFound";
import ExistingWorkFlow from "./pages/WorkflowBuilder/ExistingWorkFlow";
import Documentation from "./pages/Documentation/Documentation";

function App() {
  
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: "#ededed",
          },
          primaryDark: { main: "#464646" },
          secondary: { main: "#681897" },
          error: { main: "#d32f2f" },
          success: { main: "#2e7d32" },
        },
        typography: {
          fontFamily: "Open Sans, sans-serif",
        },
      })}
    >

      <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Docs" element={<Documentation />} />
          <Route element={<UnauthenticatedRoutes />} >
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
          </Route>
          <Route element={<PrivateRoutes/>}>
            {/* <Route path="/Build" element={<WorkflowBuilder />} /> */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Flow" element={<NewWorkFlow />} />
            <Route path="/Flow/:workflowID" element={<ExistingWorkFlow />} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

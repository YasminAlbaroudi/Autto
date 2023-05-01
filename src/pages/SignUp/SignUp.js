import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import * as Yup from "yup";
import styled from "@emotion/styled";
import purpleGear from "../../images/purpleGear.png";
import { motion, useTime, useTransform } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";
import { useFormik } from 'formik';
import GoogleIcon from '@mui/icons-material/Google';
const MainDiv = styled.div`
    background-color: "#ededed";
    padding: 1rem;
    
`;
const GearDiv= styled.div`
    background-image: url(${purpleGear});
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    width: 50vh;
    height: 50vh;
    position: absolute;
    bottom: 0;
    `;
function Copyright(props) {
  return (
    <Typography variant="body2" color="primary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="www.linkedin.com/in/yasmin-albaroudi">
        Yasmin-Autto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function SignUp() {
const time = useTime();

  const initialValues={
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
  }
  const validationSchema=React.useMemo(()=>Yup.object().shape({
    
    firstName:Yup.string().matches(/^[A-Za-z ']*$/,"Invalid First Name").required('First Name is required'),
    lastName:Yup.string().matches(/^[A-Za-z ']*$/,"Invalid Last Name").required('Last Name is required'),
    email:Yup.string().email('Email is invalid').required('Email is required'),
    password:Yup.string().min(6,'Password must be at least 6 characters').required('Password is required'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],'Password must match').required('Confirm Password is required')
  }),[]);
  const {signUpEmail,signUpGmail}=useAuth(); 
  const onSubmit=React.useCallback( async (fields)=>{
    await signUpEmail(fields.email,fields.password,fields.firstName,fields.lastName);
  },[]);
  const signupForm=useFormik({
    validateOnChange: true,
    initialValues,
    validationSchema,
    onSubmit
  });
  //cog wheele animation
  const rotate = useTransform(time, [0, 5000], [0, 360], { clamp: false });
  const smallRotate = useTransform(time, [0, 2500], [360,0], { clamp: false });
  return (
    <MainDiv>
        <motion.div style={{backgroundImage:`url(${purpleGear})`, zIndex: "-1",backgroundPosition:"center",backgroundSize:"100%",height:"50vh",width:"50vh",position:"absolute",top:"1rem" , right:"10rem",backgroundRepeat:"no-repeat" , rotate}}>
        </motion.div>
        <motion.div style={{backgroundImage:`url(${purpleGear})`, zIndex: "-1",backgroundPosition:"center",backgroundSize:"100%",height:"25vh",width:"25vh",position:"absolute",top:"50vh" , left:"21vw",backgroundRepeat:"no-repeat" , rotate:smallRotate}}>
        </motion.div>

      <Paper elevation={9} component="main" style={{}} sx={{bgcolor:"#edededa1", backdropFilter: "blur(10px)" ,maxWidth:"40%", marginLeft:"30%" ,paddingLeft:"5%",paddingRight:"5%", paddingTop:"1%",paddingBottom:"2%",marginTop:"7%",marginBottom:"10%"}} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up 
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormikMUITextField
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  formik={signupForm}
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikMUITextField 
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  formik={signupForm}/>
              </Grid>
              <Grid item xs={12}>
                <FormikMUITextField
                  id="email"
                  color="secondary"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  formik={signupForm}
                />

              </Grid>
              <Grid item xs={12}>
                <FormikMUITextField
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  formik={signupForm}
                />
              </Grid>
              <Grid item xs={12}>
                <FormikMUITextField
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  formik={signupForm}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              onClick={signupForm.handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
              disabled={signupForm.isSubmitting || signupForm.isValidating || !signupForm.isValid || !signupForm.dirty}  
            > 
              Sign Up
            </Button>

            <Button
            type='button'
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
            onClick={async ()=>{
              await signUpGmail();
            }}
            >
              <div style={{position:"relative", width:"100%"}}>
              <GoogleIcon  style={{position:"absolute", left:"1rem"}}/>
              Continue With <strong>  Google </strong>
              </div>
              

            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2" color="primaryDark.main">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Copyright sx={{ mt: 5 }} />
      </MainDiv>
    
  );
}

const FormikMUITextField = (props) => { 


  return (
    <TextField
      required
      color="secondary"
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      type={props.type} 
      autoComplete={props.autoComplete}
      onFocus={props.formik.handleBlur}
      onChange={props.formik.handleChange}
      value={props.formik.values[props.id]}
      error={props.formik.errors[props.id] && props.formik.touched[props.id] ? true : false}
      helperText={ props.formik.errors[props.id] && props.formik.touched[props.id] ? props.formik.errors[props.id] : null}
      />
  );

 }
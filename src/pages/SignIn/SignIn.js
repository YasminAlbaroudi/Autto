import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../../Context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/yasmin-albaroudi">
        Yasmin - Autto
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const { signUpGmail, signInEmail } = useAuth();
  const [alert, setAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    }),
    validateOnMount: true,
    onSubmit: (values) => {
      setLoading(true);
      signInEmail(values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setAlert(true);
          setLoading(false);
        });
    },
  });
  return (
    <>
      <Dialog
        open={alert}
        onClose={() => setAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {" "}
            <WarningAmberIcon color="error" />{" "}
            <Typography variant="h6" fontWeight="600" color="error">
              Incorrect Email/Password
            </Typography>{" "}
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The email or password you entered is incorrect. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setAlert(false)}
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              color="primaryDark"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={form.values.email}
              onChange={form.handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              color="primaryDark"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={form.values.password}
              onChange={form.handleChange}
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={() => {
                if (Object.keys(form.errors).length === 0) {
                  form.handleSubmit();
                } else {
                  setAlert(true);
                }
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <>
                  {" "}
                  Sign In{" "}
                  <CircularProgress
                    color="inherit"
                    size={20}
                    style={{ marginLeft: "0.5rem" }}
                  />{" "}
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={signUpGmail}
            >
              <div style={{ position: "relative", width: "100%" }}>
                <GoogleIcon style={{ position: "absolute", left: "1rem" }} />
                Continue With <strong> Google </strong>
              </div>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}

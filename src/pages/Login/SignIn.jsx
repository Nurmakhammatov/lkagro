import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate, Link } from "react-router-dom";
import authApi from "./../../services/authService";
import LeftSide from "./LeftSide";
import {
  Avatar,
  Button,
  // Checkbox,
  TextField,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  login: yup.string("Login kiriting").required("Login kiriting"),
  password: yup.string("Parol kiriting").required("Parol kiriting"),
});

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await authApi.login(values.login, values.password);
      } catch (ex) {
        console.log(ex);
      }
    },
  });

  if (authApi.getCurrentUser()) return <Navigate to="/" />;
  return (
    <>
      <Grid container>
        <LeftSide size={6}>
          <Typography align="center">Akkauntingiz yo`qmi?</Typography>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Typography
              align="center"
              color={"#FFED50"}
              sx={{ cursor: "pointer", mt: 1 }}
            >
              Ro`yxatdan o`ting
            </Typography>
          </Link>
        </LeftSide>
        <Grid item xs={12} sm={12} md={6} component={Paper} elevation={0}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Kirish</Typography>

            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <TextField
                id="login"
                name="login"
                label="Login"
                margin="normal"
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Parol"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                margin="normal"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Kirish
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = yup.object({
  login: yup.string().required("Логин киритинг"),
  password: yup.string().required("Парол киритинг"),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
        toast.error(ex.response.statusText);
      }
    },
  });

  if (authApi.getCurrentUser()) return <Navigate to="/" />;
  return (
    <>
      <Grid container>
        <LeftSide size={4}>
          <Typography align="center">Аккаунтингиз йўқми?</Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary">
                Рўйхатдан ўтиш
              </Button>
            </Link>
          </div>
        </LeftSide>
        <Grid item xs={12} sm={12} md={8} component={Paper} elevation={0}>
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
            <Typography variant="h5">Кириш</Typography>

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
                label="Логин"
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
                label="Парол"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                Кириш
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

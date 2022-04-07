import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate, Link } from "react-router-dom";
import authApi from "./../../services/authService";
import LeftSide from "./LeftSide";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Backdrop,
  Box,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = yup.object({
  login: yup.string().required("Логин киритинг"),
  password: yup.string().required("Парол киритинг"),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await authApi.login(values.login, values.password);
        setLoading(false);
      } catch (ex) {
        setLoading(false);
        toast.error(ex.response.data.message);
      }
    },
  });

  if (authApi.getCurrentUser()) return <Navigate to="/" />;
  return (
    <>
      <Grid container>
        <LeftSide size={5}>
          <Typography align="center">Аккаунтингиз йўқми?</Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary">
                Рўйхатдан ўтиш
              </Button>
            </Link>
          </div>
        </LeftSide>

        <Grid item sm={12} md={7}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              minHeight: "100vh",
            }}
          >
            {/* <Stack
              direction="column"
              // justifyContent="center"
              // alignItems="center"
              spacing={2}
            > */}
            <form onSubmit={formik.handleSubmit} style={{}}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Кириш</Typography>
                <TextField
                  fullWidth
                  id="login"
                  name="login"
                  label="Логин"
                  value={formik.values.login}
                  onChange={formik.handleChange}
                  error={formik.touched.login && Boolean(formik.errors.login)}
                  helpertext={formik.touched.login && formik.errors.login}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Парол"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helpertext={formik.touched.password && formik.errors.password}
                />
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                  // sx={{ mt: 2 }}
                >
                  Кириш
                </Button>
              </Stack>
            </form>
            {/* </Stack> */}
          </Box>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

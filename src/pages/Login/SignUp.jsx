import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import authApi from "./../../services/authService";
import { Link, Navigate } from "react-router-dom";
import LeftSide from "./LeftSide";
import { toast } from "react-toastify";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const validationSchema = yup.object({
  firstName: yup.string("firstName kiriting").required("firstName kiriting"),
  lastName: yup.string("lastName kiriting").required("lastName kiriting"),
  secondName: yup.string("secondName kiriting").required("secondName kiriting"),
  agroName: yup.string("agroName kiriting").required("agroName kiriting"),
  phoneNumber: yup.string().required(""),
  frankId: yup.string("frankId kiriting").required("frankId kiriting"),
  regionId: yup.string("regionId kiriting").required("regionId kiriting"),
  districtId: yup.string("districtId kiriting"),
  clusterId: yup.string("clusterId kiriting"),
  address: yup.string("address kiriting"),
  login: yup.string("login kiriting").required("login kiriting"),
  password: yup.string("password kiriting").required("password kiriting"),
  passwordConfirm: yup
    .string("passwordConfirm kiriting")
    .required("passwordConfirm kiriting"),
});

export default function SignUp() {
  const [stats, setStats] = useState();

  const getStats = async () => {
    // try {
    const { data } = await authApi.getStats();
    setStats(data.data);
    // } catch (ex) {}
  };
  useEffect(() => {
    getStats();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      secondName: "",
      agroName: "",
      phoneNumber: "",
      frankId: "",
      regionId: "",
      districtId: "",
      clusterId: 1,
      address: "",
      login: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await authApi.register(
        values.firstName,
        values.secondName,
        values.lastName,
        values.agroName,
        values.phoneNumber,
        values.frankId,
        values.regionId,
        values.districtId,
        values.clusterId,
        values.address,
        values.login,
        values.password,
        values.passwordConfirm
      );
    },
  });

  if (authApi.getCurrentUser()) return <Navigate to="/" />;
  return (
    <>
      <Grid container>
        <LeftSide size={4}>
          <Typography align="center">Akkauntingiz bormi?</Typography>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography
              align="center"
              color={"#FFED50"}
              sx={{ cursor: "pointer", mt: 1 }}
            >
              Kirish
            </Typography>
          </Link>
        </LeftSide>

        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          component={Paper}
          elevation={0}
          sx={{ px: 2, height: "100vh", display: "flex", alignItems: "center" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography align="center" variant="h6">
                  Ro’yxatdan o’tish
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="firstName"
                  margin="dense"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="lastName"
                  margin="dense"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="secondName"
                  name="secondName"
                  label="secondName"
                  margin="dense"
                  value={formik.values.secondName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondName &&
                    Boolean(formik.errors.secondName)
                  }
                  helperText={
                    formik.touched.secondName && formik.errors.secondName
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Frank</InputLabel>
                  <Select
                    id="frankId"
                    name="frankId"
                    value={formik.values.frankId}
                    label="Frank"
                    onChange={formik.handleChange}
                  >
                    {stats?.franks?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.user_type_en}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Region</InputLabel>
                  <Select
                    id="regionId"
                    name="regionId"
                    value={formik.values.regionId}
                    label="Region"
                    onChange={formik.handleChange}
                  >
                    {stats?.regions?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.region_name_en}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>District</InputLabel>
                  <Select
                    id="districtId"
                    name="districtId"
                    value={formik.values.districtId}
                    label="District"
                    onChange={formik.handleChange}
                  >
                    {stats?.districts?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.district_name_en}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="agroName"
                  name="agroName"
                  label="agroName"
                  margin="dense"
                  value={formik.values.agroName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.agroName && Boolean(formik.errors.agroName)
                  }
                  helperText={formik.touched.agroName && formik.errors.agroName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="phoneNumber"
                  margin="dense"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="address"
                  margin="dense"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="login"
                  name="login"
                  label="login"
                  margin="dense"
                  value={formik.values.login}
                  onChange={formik.handleChange}
                  error={formik.touched.login && Boolean(formik.errors.login)}
                  helperText={formik.touched.login && formik.errors.login}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="password"
                  margin="dense"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label="passwordConfirm"
                  margin="dense"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.passwordConfirm &&
                    Boolean(formik.errors.passwordConfirm)
                  }
                  helperText={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, py: 1.5 }}
                >
                  Tasdiqlash
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

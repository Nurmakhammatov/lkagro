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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const phoneRegExp = /^\+998[0-9]{9}/;
const specialChars = /^[A-Za-z0-9]+$/;
const numbers = /^[+-+0-9]+$/;
const onlyLetters = /^[A-Za-zА-Яа-яҚ-Ққ-қҲ-Ҳҳ-ҳҒ-Ғғ-ғЎ-Ўў-ў]+$/;

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "3 та белгидан кам бўлмасин")
    .matches(onlyLetters, "Лотин ва кирил алифбоси харфларини киритинг")
    .required("Исмингизни киритинг"),
  lastName: yup
    .string()
    .min(3, "3 та белгидан кам бўлмасин")
    .matches(onlyLetters, "Лотин ва кирил алифбоси харфларини киритинг")
    .required("Фамилиянгизни киритинг"),
  secondName: yup
    .string()
    .matches(onlyLetters, "Лотин ва кирил алифбоси харфларини киритинг"),
  agroName: yup
    .string()
    .min(4, "4 та белгидан кам бўлмасин")
    .required("Хўжалик номини киритинг"),
  phoneNumber: yup
    .string()
    .max(13, "Киритилган бегилар сони 13 тадан кўп бўлмасин")
    .min(13, "Киритилган бегилар сони 13 тадан кам бўлмасин")
    .matches(phoneRegExp, `Рақам "+998123456789" форматда бўлсин`)
    .matches(numbers, `Фақат рақам киритинг`)
    .required("Телефон рақмингизни киритинг"),
  frankId: yup.string().required("Хўжалик турини танланг"),
  regionId: yup.string().required("Худудингизни танланг"),
  districtId: yup.string(),
  clusterId: yup.string(),
  address: yup.string(),
  login: yup
    .string()
    .min(5, "5 та белгидан кам бўлмасин")
    .matches(
      specialChars,
      "Лотин алифбоси харфларини ва рақам киритинг киритинг"
    )
    .required("Логин киритинг"),
  password: yup
    .string()
    .matches(
      specialChars,
      "Лотин алифбоси харфларини ва рақам киритинг киритинг"
    )
    .required("Парол киритинг"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароллар бир хил эмас")
    .required("Паролни тасдиқланг"),
});

export default function SignUp() {
  const [stats, setStats] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const getStats = async () => {
    try {
      const { data } = await authApi.getStats();
      setStats(data.data);
    } catch (ex) {
      toast.toast.error(ex.response.statusText);
    }
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
      phoneNumber: "+998",
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
      try {
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
      } catch (ex) {
        toast.error(ex.response.statusText);
      }
    },
  });

  if (authApi.getCurrentUser()) return <Navigate to="/" />;
  let tumanlar = [];
  tumanlar = stats?.districts?.filter(
    (item) => formik.values.regionId === item.region_id
  );
  console.log(tumanlar);

  return (
    <>
      <Grid container>
        <LeftSide size={4}>
          <Typography align="center">Akkauntingiz bormi?</Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary">
                Кириш
              </Button>
            </Link>
          </div>
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
                  Рўйхатдан ўтиш
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="*Исм"
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
                  label="*Фамилия"
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
                  label="*Отасининг исми"
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
                  <InputLabel>*Хужалик тури</InputLabel>
                  <Select
                    id="frankId"
                    name="frankId"
                    value={formik.values.frankId}
                    label="*Хужалик тури"
                    onChange={formik.handleChange}
                  >
                    {stats?.franks?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.user_type_cr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>*Вилоят, шаҳар</InputLabel>
                  <Select
                    id="regionId"
                    name="regionId"
                    value={formik.values.regionId}
                    label="*Вилоят, шаҳар"
                    onChange={formik.handleChange}
                  >
                    {stats?.regions?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.region_name_cr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Туман</InputLabel>
                  <Select
                    disabled={formik.values.regionId === "" ? true : false}
                    id="districtId"
                    name="districtId"
                    value={formik.values.districtId}
                    label="Туман"
                    onChange={formik.handleChange}
                  >
                    {tumanlar?.map(
                      (item) => (
                        // formik.values.regionId === item.region_id ? (
                        <MenuItem key={item.id} value={item.id}>
                          {item.district_name_cr}
                        </MenuItem>
                      )
                      // ) : null
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="agroName"
                  name="agroName"
                  label="*Хўжалик номи"
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
                  type="tel"
                  name="phoneNumber"
                  label="*Телефон рақам"
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
                  label="Манзил"
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
                  label="*Логин"
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
                  label="*Парол"
                  type={showPassword ? "text" : "password"}
                  margin="dense"
                  value={formik.values.password}
                  onChange={formik.handleChange}
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
              </Grid>
              <Grid item xs={4}>
                <TextField
                  disabled={formik.values.password === "" ? true : false}
                  fullWidth
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label="*Паролни тасдиқлаш"
                  type={showPasswordConfirm ? "text" : "password"}
                  margin="dense"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPasswordConfirm}
                        >
                          {showPasswordConfirm ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                <Typography variant="caption" pt={2} sx={{ fontWeight: 700 }}>
                  * - тўлдирилиши шарт
                </Typography>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, py: 1.5 }}
                >
                  Тасдиқлаш
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

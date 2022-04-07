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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Backdrop,
  CircularProgress,
  Collapse,
  Stack,
  Box,
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
    .matches(onlyLetters, "Фақат харф киритинг")
    .required("Исм киритинг"),
  lastName: yup
    .string()
    .min(3, "3 та белгидан кам бўлмасин")
    .matches(onlyLetters, "Фақат харф киритинг")
    .required("Фамилия киритинг"),
  secondName: yup.string().matches(onlyLetters, "Фақат харф киритинг"),
  agroName: yup
    .string()
    .min(4, "4 та белгидан кам бўлмасин")
    .required("Хўжалик номини киритинг"),
  phoneNumber: yup
    .string()
    .max(13, "Киритилган бегилар 13 тадан кўп бўлмасин")
    .min(13, "Киритилган бегилар 13 тадан кам бўлмасин")
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
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = React.useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

const getStats = async () => {
  setLoading(true);
  try {
    const { data } = await authApi.getStats();
    setStats(data.data);
    setLoading(false);
  } catch (ex) {
    setLoading(false);
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
    phoneNumber: "",
    frankId: "",
    regionId: "",
    districtId: "",
    clusterId: "",
    address: "",
    login: "",
    password: "",
    passwordConfirm: "",
  },
  validationSchema: validationSchema,
  onSubmit: async (values) => {
    setLoading(true);
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
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      toast.error(ex.response.data.message.en);
    }
  },
});

if (authApi.getCurrentUser()) return <Navigate to="/" />;
let tumanlar = [];
tumanlar = stats?.districts?.filter(
  (item) => formik.values.regionId === item.region_id
);

return (
  <>
    <Grid container spacing={0}>
      <LeftSide size={5}>
        <Typography align="center">Аккаунтингиз борми?</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary">
              Кириш
            </Button>
          </Link>
        </div>
      </LeftSide>

      <Grid item xs={12} md={7}>
        <Box
          p={2}
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography align="center" variant="h6" mb={2}>
              Рўйхатдан ўтиш
              <Stack>
                <Typography
                  align="end"
                  variant="caption"
                  pt={2}
                  sx={{ fontWeight: 600, color: "warning.main" }}
                >
                  * - тўлдириш шарт
                </Typography>
              </Stack>
            </Typography>
            <Stack direction="row" spacing={1} pb={2}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="*Исм"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helpertext={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="*Фамилия"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helpertext={formik.touched.lastName && formik.errors.lastName}
              />

              <TextField
                fullWidth
                id="secondName"
                name="secondName"
                label="*Отасининг исми"
                value={formik.values.secondName}
                onChange={formik.handleChange}
                error={
                  formik.touched.secondName && Boolean(formik.errors.secondName)
                }
                helpertext={
                  formik.touched.secondName && formik.errors.secondName
                }
              />
            </Stack>
            <Stack direction="row" spacing={1} pb={2}>
              <FormControl fullWidth>
                <InputLabel
                  error={
                    formik.touched.frankId && Boolean(formik.errors.frankId)
                  }
                  helpertext={formik.touched.frankId && formik.errors.frankId}
                >
                  *Хўжалик тури
                </InputLabel>
                <Select
                  id="frankId"
                  name="frankId"
                  value={formik.values.frankId}
                  label="*Хўжалик тури"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.frankId && Boolean(formik.errors.frankId)
                  }
                  helpertext={formik.touched.frankId && formik.errors.frankId}
                >
                  {stats?.franks?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.user_type_cr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Collapse in={formik.values.frankId === 4 ? true : false}>
                {formik.values.frankId === 4 ? (
                  <FormControl sx={{ width: 150 }}>
                    <InputLabel
                      error={
                        formik.touched.clusterId &&
                        Boolean(formik.errors.clusterId)
                      }
                      helpertext={
                        formik.touched.clusterId && formik.errors.clusterId
                      }
                    >
                      Кластер*
                    </InputLabel>
                    <Select
                      id="clusterId"
                      name="clusterId"
                      value={formik.values.clusterId}
                      label="Кластер"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.clusterId &&
                        Boolean(formik.errors.clusterId)
                      }
                      helpertext={
                        formik.touched.clusterId && formik.errors.clusterId
                      }
                    >
                      {stats?.franks?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.user_type_cr}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : null}
              </Collapse>

              <FormControl fullWidth>
                <InputLabel
                  error={
                    formik.touched.regionId && Boolean(formik.errors.regionId)
                  }
                  helpertext={formik.touched.regionId && formik.errors.regionId}
                >
                  *Вилоят, шаҳар
                </InputLabel>
                <Select
                  id="regionId"
                  name="regionId"
                  value={formik.values.regionId}
                  label="*Вилоят, шаҳар"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.regionId && Boolean(formik.errors.regionId)
                  }
                  helpertext={formik.touched.regionId && formik.errors.regionId}
                >
                  {stats?.regions?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.region_name_cr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Туман</InputLabel>
                <Select
                  disabled={tumanlar?.length === 0 ? true : false}
                  id="districtId"
                  name="districtId"
                  value={formik.values.districtId}
                  label="Туман"
                  onChange={formik.handleChange}
                >
                  {tumanlar?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.district_name_cr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={1} pb={2}>
              <TextField
                fullWidth
                id="agroName"
                name="agroName"
                label="*Хўжалик номи"
                value={formik.values.agroName}
                onChange={formik.handleChange}
                error={
                  formik.touched.agroName && Boolean(formik.errors.agroName)
                }
                helpertext={formik.touched.agroName && formik.errors.agroName}
              />

              <TextField
                fullWidth
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                label="*Телефон рақам"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helpertext={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Stack>
            <Stack direction="row" spacing={1} pb={2}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Манзил"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helpertext={formik.touched.address && formik.errors.address}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                id="login"
                name="login"
                label="*Логин"
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helpertext={formik.touched.login && formik.errors.login}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="*Парол"
                type={showPassword ? "text" : "password"}
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
                helpertext={formik.touched.password && formik.errors.password}
              />

              <TextField
                disabled={formik.values.password === "" ? true : false}
                fullWidth
                id="passwordConfirm"
                name="passwordConfirm"
                label="*Паролни тасдиқлаш"
                type={showPasswordConfirm ? "text" : "password"}
                value={
                  formik.values.password === ""
                    ? (formik.values.passwordConfirm = "")
                    : formik.values.passwordConfirm
                }
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
                helpertext={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
              />
            </Stack>

            <Stack direction="row" spacing={1} pb={2}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
                sx={{ mt: 2, py: 1.5 }}
              >
                Тасдиқлаш
              </Button>
            </Stack>
          </form>
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

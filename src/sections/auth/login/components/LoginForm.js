import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton, Alert } from '@mui/lab';
// components
import { useFormik } from 'formik';
import { errorHandler } from '../../../../configs/errorConfigs';
import Iconify from '../../../../components/iconify';
import { useLogin } from '../hooks/useLogin';
import { loginValidation } from '../utils/validations';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const { mutate, isLoading } = useLogin()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidation,
    onSubmit: values => {

      const datas = {
        email: values?.email,
        password: values?.password
      }

      mutate(datas, {
        onSuccess: () => {
          navigate('/dashboard/app')
        },
        onError: (error) => {
          if (error?.response?.data?.statusCode === 401 || error?.response?.data?.status === 401) {
            const message = 'Incorrect login or password !'

            errorHandler(error, message)
            setErrorMessage(message)

          } else {
            errorHandler(error)
          }
        }
      })
    }
  })


  return (
    <form onSubmit={ formik.handleSubmit }>
      {errorMessage && <Alert sx={{ mb: 4 }} severity="error">{errorMessage}</Alert>}
      <Stack spacing={3}>
        <TextField 
          name="email" 
          label="Email address" 
          required
          autoFocus
          value={formik.values.email}
          error={formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Enter your email'
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          value={formik.values.password}
          error={formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Enter your password'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton 
        fullWidth 
        sx={{ my: 4 }}
        size="large" 
        type="submit" 
        variant="contained" 
        onClick={() => formik.handleSubmit()}
        loading={ isLoading } 
      >
      { isLoading ? 'Checking...' : 'Login' }
      </LoadingButton>
    </form>
  );
}

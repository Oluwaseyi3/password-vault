
import React, {Dispatch, SetStateAction, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm} from "react-hook-form"
import { generateVaultKey, hashPassword } from '../crypto';
import { useMutation } from 'react-query';
import { registerUser } from '../api';
import { VaultItem } from '../pages';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

interface useForms{
  email: string;
  password: string;
  hashedPassword: string;
}


const RegisterForm = ({setStep, setVaultKey}:
  {
    setVaultKey: Dispatch<SetStateAction<string>>
    setStep: Dispatch<SetStateAction<"login" | "register" | "vault">>
  }) => {

    const { handleSubmit, register, getValues, setValue, formState: {errors, isSubmitting}} = useForm<useForms>()



   const mutation = useMutation(registerUser, {
    onSuccess: ({salt, vault}) => {
       
      const hashedPassword = getValues("hashedPassword")

      const email = getValues("email")
      const vaultKey = generateVaultKey({
        hashedPassword,
        email,
        salt
      })

      window.sessionStorage.setItem("vk", vaultKey)
 
      setVaultKey(vaultKey)
      window.sessionStorage.setItem("vk", "")
      setStep("vault")
    }
   })

   
   const handleSubmitForm = ()=> {

    const password = getValues("password")
    const email = getValues("email")

    const hashedPassword = hashPassword(password)
    setValue("hashedPassword", hashedPassword )
   
    mutation.mutate({
      email,
      hashedPassword
    })
  
  }

  return (
    <>
   <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate 
             onSubmit={handleSubmit(() => {
              const password = getValues("password");
              const email = getValues("email");
      
              const hashedPassword = hashPassword(password);
      
              setValue("hashedPassword", hashedPassword);
      
              mutation.mutate({
                email,
                hashedPassword,
              });
            })}
            
            sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {
                  ...register("email",  {
                    required: "Email is required",
                    minLength: {value: 4, message: "Email must be 4 characters long"}
                  }
                  )
                }
              />
              <span>
                {errors.email && errors.email.message}
              </span>
              <TextField
                margin="normal"
                required
                fullWidth
              
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {
                  ...register("password",  {
                    required: "Password is required",
                    minLength: {value: 4, message: "Password must be 6 characters long"}
                  }
                  )
                }
              />
               <span>
                {errors.email && errors.email.message}
              </span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  )
}

export default RegisterForm
import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Avatar,Box,Container,CssBaseline,Grid,Typography,Link,TextField, Button, CircularProgress, Backdrop} from '@mui/material';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useSnackbar} from 'notistack';
import {signup} from '../../services/auth/auth';

const defaultTheme=createTheme();

function Signup() {
  const {enqueueSnackbar}=useSnackbar();
  const navigate=useNavigate();

  const [formData,setFormData]=useState({
    email:'',
    firstName:'',
    lastName:'',
    password:''
  });
  const [loading,setLoading]=useState(false);

  const handleInputChange=(event)=>{
    const {name,value}=event.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true);
    
    try{
      const response=await signup(formData);
      if(response.status===201){
        navigate('/login');
        enqueueSnackbar('SignUp successfull!!',{variant:'success',autoHideDuration:5000});
      }
    }catch(error){
      if(error.response && error.response.status===406){
        enqueueSnackbar('Email already exists!!',{variant:'error',autoHideDuration:5000});
      }
      else{
        enqueueSnackbar('SignUp failed!!',{variant:'error',autoHideDuration:5000});
      }
    }
    finally{
      setLoading(false)
    }
  }

  const handleSignInClick=()=>{
    navigate('/login');
  }
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline/>
          <Box
            sx={{
              marginTop:6,
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
            }}
          >
            <Avatar sx={{m:1, bgcolor:'primary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign Up
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{mt:3}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='family-name'
                    name='lastName'
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='email'
                    name='email'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='new-password'
                    name='password'
                    required
                    fullWidth
                    id='password'
                    label='Password'
                    type='password'
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Button 
                type='submit'
                fullWidth
                variant='contained'
                sx={{mt:3, mb:2}}
                disabled={!formData.email || !formData.firstName || !formData.lastName || !formData.password}
              >
                {loading? <CircularProgress color='success' size={24}/>:'Sign Up'}
              </Button>

              <Grid container justifyContent={'flex-end'}>
                <Grid item>
                  <Link variant='body2' onClick={handleSignInClick}>
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <Backdrop
        sx={{color:'fff', zIndex:(theme)=>theme.zIndex.drawer+1}}
        open={loading}
      >
        <CircularProgress color='success'/>
      </Backdrop>
    </>
  )
}

export default Signup

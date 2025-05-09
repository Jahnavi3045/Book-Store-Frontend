import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { isAdminLoggedIn, isCustomerLoggedIn, removeToken } from '../../utils/common'

function Header() {

  const [isAdmin,setIsAdmin]=useState(false);
  const [isCustomer,setIsCustomer]=useState(false);
  const navigate=useNavigate();
  const location=useLocation();
  
  useEffect(()=>{
    const fetchUserRoles=async()=>{
      try{
        const isAdmin=await isAdminLoggedIn();
        const isCustomer=await isCustomerLoggedIn();
        setIsAdmin(isAdmin);
        setIsCustomer(isCustomer);
      }catch(error){
        console.error(`Error:error fetching roles:${error}`);
      }
    }
    fetchUserRoles();
  },[location])

  const handleLogout=()=>{
    removeToken();
    navigate('/login');
  }

  return (
    <>
      {!isCustomer && !isAdmin && (
        <Box sx={{flexGrow:1}}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{mr:2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant='h6' component="div" sx={{flexGrow:1}}>
              Book App
            </Typography>
            <Button component={Link} to='/login' color='inherit'>Login</Button>
            <Button component={Link} to='/register' color='inherit'>Register</Button>
          </Toolbar>
        </AppBar>
      </Box>
      )}

      {isAdmin && (
        <Box sx={{flexGrow:1}}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{mr:2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant='h6' component="div" sx={{flexGrow:1}}>
              Admin
            </Typography>
            <Button component={Link} to='/admin/dashboard' color='inherit'>Dashboard</Button>
            <Button component={Link} to='/admin/book/post' color='inherit'>Post Book</Button>
            <Button component={Link} to='/admin/orders' color='inherit'>orders</Button>
            <Button onClick={handleLogout} color='inherit'>Log out</Button>
          </Toolbar>
        </AppBar>
      </Box>
      )}

      {isCustomer && (
        <Box sx={{flexGrow:1}}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{mr:2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant='h6' component="div" sx={{flexGrow:1}}>
              Customer
            </Typography>
            <Button component={Link} to='/customer/dashboard' color='inherit'>Dashboard</Button>
            <Button component={Link} to='/customer/cart' color='inherit'>Cart</Button>
            <Button component={Link} to='/customer/orders' color='inherit'>My orders</Button>
            <Button onClick={handleLogout} color='inherit'>Log out</Button>
          </Toolbar>
        </AppBar>
      </Box>
      )}
    </>
  )
}

export default Header

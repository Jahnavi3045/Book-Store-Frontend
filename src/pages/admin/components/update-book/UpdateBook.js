import { Avatar, Backdrop, Box, Button, CircularProgress, Container, createTheme, CssBaseline, FormControl, InputLabel, MenuItem, TextField, ThemeProvider, Typography, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getBookById,updateBook } from '../../service/admin';
import { Edit } from '@mui/icons-material';
const defaultTheme = createTheme();

function UpdateBook() {
  const {id}=useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [conditions] = useState(["New", "Like New", "Used-Good", "Used-Acceptable"]);
  const [genres] = useState([
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Thriller",
    "Science Fiction",
    "Fantasy",
    "Historical Fiction",
    "Romance",
    "Horror",
    "Biography",
    "Memoir",
    "Self-Help",
    "Health & Wellness",
    "Travel",
    "Science",
    "Philosophy",
    "Psychology",
    "Poetry",
    "Religion & Spirituality",
    "Cooking",
    "Art & Photography",
    "Children's Literature",
    "Young Adult",
    "Graphic Novel",
    "Drama",
    "Business & Economics",
    "Education",
    "Politics",
    "Law",
    "Anthology",
    "Adventure",
    "Classics",
    "Short Stories",
    "Humor",
    "Sports",
    "Music",
    "True Crime"
  ]);
  const statuses = ['Available', 'Sold'];
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    price: 0,
    genre: '',
    condition: '',
    edition: '',
    imageUrl: '',
    status: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const response = await getBookById(id);
      if (response.status === 200) {
        setBook(response.data)
      }
    }
    catch (error) {
      console.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBook();
  },[id])


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const numericValue = (name === 'price') ? parseInt(value, 10) : value;

    setBook({
      ...book,
      [name]: numericValue
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Book to be posted:", book);
      const response = await updateBook(id,book);
      if (response.status === 200) {
        navigate('/admin/dashboard')
        enqueueSnackbar('Book updated Successfully', { variant: 'success', autoHideDuration: 5000 });
      }
    }
    catch (error) {
      console.log(error);
      enqueueSnackbar('Error while updating', { variant: 'error', autoHideDuration: 5000 });
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component={'main'} maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <Edit />
            </Avatar>
            <Typography component={'h1'} variant='h5'>
              Update Book
            </Typography>

            <Box component={'form'} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='imageUrl'
                label='Enter image url'
                name='imageUrl'
                type='text'
                autoComplete='imageUrl'
                autoFocus
                value={book.imageUrl}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='title'
                label='Enter title'
                name='title'
                type='text'
                autoComplete='title'
                autoFocus
                value={book.title}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='author'
                label='Enter author'
                name='author'
                type='text'
                autoComplete='author'
                autoFocus
                value={book.author}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='description'
                label='Enter description'
                name='description'
                type='text'
                autoComplete='description'
                autoFocus
                value={book.description}
                onChange={handleInputChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='price'
                label='Enter price'
                name='price'
                type='number'
                autoComplete='price'
                autoFocus
                value={book.price}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin='normal'>
                <InputLabel id="genre-label">Select genre</InputLabel>
                <Select
                  labelId='genre-label'
                  id='genre'
                  value={book.genre}
                  onChange={handleInputChange}
                  name='genre'
                  label='select genre'
                >
                  <MenuItem value="">Select genre</MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin='normal'>
                <InputLabel id="condition-label">Select condition</InputLabel>
                <Select
                  labelId='condition-label'
                  id='condition'
                  value={book.condition}
                  onChange={handleInputChange}
                  name='condition'
                  label='select condition'
                >
                  <MenuItem value="">Select condition</MenuItem>
                  {conditions.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin='normal'
                required
                fullWidth
                id='edition'
                label='Enter edition'
                name='edition'
                type='text'
                autoComplete='edition'
                autoFocus
                value={book.edition}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin='normal'>
                <InputLabel id="status-label">Select status</InputLabel>
                <Select
                  labelId='status-label'
                  id='status'
                  value={book.status}
                  onChange={handleInputChange}
                  name='status'
                  label='select status'
                >
                  <MenuItem value="">Select status</MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  !book.title ||
                  !book.author ||
                  !book.description ||
                  !book.price ||
                  !book.genre ||
                  !book.condition ||
                  !book.edition ||
                  !book.imageUrl ||
                  !book.status
                }
              >
                {loading ? <CircularProgress color='success' size={24} /> : 'Update Book'}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Backdrop
        open={loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color='success' />
      </Backdrop>
    </>
  )
}

export default UpdateBook

import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { addBookToCart, getBooks, searchBook } from '../../service/customer';
import { Backdrop, Box, CircularProgress, Grid, InputLabel, MenuItem, Typography,Paper,FormControl,Select, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '250px',
  objectFit: 'cover'
})

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}))

export default function CustomerDashboard() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');
    const { enqueueSnackbar } = useSnackbar();
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
  
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await getBooks();
        if (response.status === 200) {
          setBooks(response.data)
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
      fetchBooks();
    }, [])
  
    const handleGenreChange = async (e) => {
      setLoading(true);
      const selectedGenre=e.target.value;
      setSelectedGenre(selectedGenre);
      try {
        const response = await searchBook(selectedGenre);
        if (response.status === 200) {
          setBooks(response.data)
        }
      }
      catch (error) {
        console.error(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    const handleAddBookToCart=async(bookId)=>{
      setLoading(true);
      try{
          const response=await addBookToCart(bookId);
          if(response.status===201){
              enqueueSnackbar('Book added to cart Successfully',{variant:'success',autoHideDuration:5000});
          }
      }
      catch(error){
          if(error.response && error.response.status===409)
            enqueueSnackbar('Book already exist in cart',{variant:'error',autoHideDuration:5000});
          else
          enqueueSnackbar('Getting error while adding to cart',{variant:'error',autoHideDuration:5000});
      }
      finally{
          setLoading(false)
      }
  }
  return (
    <>
      <Grid
        justifyContent='center'
        container
        sx={{
          marginTop: 3,
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center'
        }}
      >
        <FormControl sx={{width:'300px'}} margin='normal'>
          <InputLabel id="genre-label">Select genre to search</InputLabel>
          <Select
            labelId='genre-label'
            id='genre'
            value={selectedGenre}
            onChange={handleGenreChange}
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
      </Grid>
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} md={6} key={book._id}>
              <Item>
                <Box sx={{ display: 'flex', p: 3, alignItems: 'center' }}>
                  <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Img alt='complex' src={book.imageUrl} sx={{ width: '100%', height: 'auto', maxWidth: '150px' }} />
                  </Box>
                  <Box sx={{ width: '60%', pl: 3 }}>
                    <Typography variant='h6' component='div'>
                      <strong>{book.title}</strong>
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 1, mt: 2 }}>
                      <Typography variant='body2' color='text.secondary'>
                        Author:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <strong>{book.author}</strong>
                      </Typography>

                      <Typography variant='body2' color='text.secondary'>
                        Description:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <strong>{book.description}</strong>
                      </Typography>

                      <Typography variant='body2' color='text.secondary'>
                        Price:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <strong>{book.price}</strong>
                      </Typography>

                      <Typography variant='body2' color='text.secondary'>
                        Genre:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <strong>{book.genre}</strong>
                      </Typography>

                      <Typography variant='body2' color='text.secondary'>
                        Condition:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <strong>{book.condition}</strong>
                      </Typography>

                      <Typography variant='body2' color='text.secondary'>
                        Edition:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <strong>{book.edition}</strong>
                      </Typography>

                      <Typography variant='body2' color='text.secondary'>
                        Status:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <strong>{book.status}</strong>
                      </Typography>
                    </Box>
                    {book.status==="Available" && (
                      <Button
                        variant='outlined'
                        color='primary'
                        sx={{mt:2}}
                        endIcon={<AddShoppingCartIcon/>}
                        onClick={()=>handleAddBookToCart(book._id)}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </Box>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Backdrop
        open={loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color='success' />
      </Backdrop>
    </>
  )
}


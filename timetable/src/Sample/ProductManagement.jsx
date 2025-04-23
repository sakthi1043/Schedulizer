import {
    Box,
    Button,
    Container,
    Avatar,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Modal,
    TextField,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    Snackbar,
    Alert,
    Stack
  } from '@mui/material';
  import {
    Star,
    Delete,
    Edit,
    Add,
    Close
  } from '@mui/icons-material';
  import { styled } from '@mui/material/styles';
  import React, { useState, useRef } from 'react';
  import axios from 'axios';
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const fileInputRef = useRef(null);
    const hoverFileInputRef = useRef(null);
    const [previewImages, setPreviewImages] = useState({
      main: null,
      hover: null
    });

    // useEffect(() => {
    //     // Get the product list from the backend
    //     axios.get('http://localhost:8000/api/Products')
    //         .then(response => {
    //             if (response.data.success) {
    //                 setProducts(response.data.products);  // Assuming the API returns a list of products
    //             } else {
    //                 console.error('Error fetching products:', response.data.message);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching products:', error);
    //         });
    // }, []);
  
    // Form state
    const [formData, setFormData] = useState({
      name: "",
      color: "",
      gender: "Men",
      images: ["", ""],
      final_price: 0,
      reviews: 0,
      rating: 0
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleImageUpload = (e, type) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const imageUrl = URL.createObjectURL(file);
      
      if (type === 'main') {
        setPreviewImages({ ...previewImages, main: imageUrl });
        const newImages = [...formData.images];
        newImages[0] = file; 
        setFormData({ ...formData, images: newImages });
      } else {
        setPreviewImages({ ...previewImages, hover: imageUrl });
        const newImages = [...formData.images];
        newImages[1] = file; 
        setFormData({ ...formData, images: newImages });
      }
    };
  
    const resetForm = () => {
      setFormData({
        name: "",
        color: "",
        gender: "Men",
        images: ["", ""],
        final_price: 0,
        reviews: 0,
        rating: 0
      });
      setPreviewImages({ main: null, hover: null });
      setSelectedProduct(null);
      setIsEditMode(false);
    };
  
    const handleSubmit = async(e) => {
        e.preventDefault();
      
        // Prepare the FormData to send to the server
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('color', formData.color);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('final_price', formData.final_price);
        formDataToSend.append('reviews', formData.reviews);
        formDataToSend.append('rating', formData.rating);
      
        // Append images to the form data
        if (previewImages.main) {
          formDataToSend.append('main', formData.images[0]);  // main image
        }
        if (previewImages.hover) {
          formDataToSend.append('hover', formData.images[1]);  // hover image
        }
      
        // If editing an existing product
        if (isEditMode) {
          formDataToSend.append('id', selectedProduct.id);  // Add the existing product id if editing
        }
      
        // Send the data to the backend API using axios
        axios.post('http://localhost:8000/api/Products/add', formDataToSend)
          .then(response => {
            if (response.data.success) {
              if (isEditMode) {
                const updatedProducts = products.map(product =>
                  product.id === selectedProduct.id ? { ...formData, id: selectedProduct.id } : product
                );
                setProducts(updatedProducts);
                showSnackbar("Product updated successfully.", "success");
              } else {
                const newProduct = {
                  ...formData,
                  images: [previewImages.main, previewImages.hover],
                  id: response.data.product.id,  // Assuming the API returns the product ID
                };
                setProducts([...products, newProduct]);
                showSnackbar("Product added successfully.", "success");
              }
              handleCloseModal();
              resetForm();
            } else {
              showSnackbar(response.data.message || "Error occurred while adding the product.", "error");
            }
          })
          .catch(error => {
            console.error('Error adding product:', error);
            showSnackbar("Error adding product.", "error");
          });
      };
      
      
  
    const handleEdit = (product) => {
      setSelectedProduct(product);
      setIsEditMode(true);
      setFormData({
        name: product.name,
        color: product.color,
        gender: product.gender,
        images: [...product.images],
        final_price: product.final_price,
        reviews: product.reviews,
        rating: product.rating
      });
      setPreviewImages({
        main: product.images[0],
        hover: product.images[1]
      });
      setOpenModal(true);
    };
  
    const handleDelete = (productId) => {
      setProducts(products.filter(product => product.id !== productId));
      showSnackbar("Product deleted.", "success");
    };
  
    const showSnackbar = (message, severity) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setOpenSnackbar(true);
    };
  
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
  
    const handleOpenModal = () => {
      resetForm();
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
      resetForm();
    };
  
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Product Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Add Product
          </Button>
        </Box>
  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Reviews</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <StyledTableRow key={product.id}>
                  <TableCell>
                    <Avatar
                      src={typeof product.images[0] === 'string' ? product.images[0] : URL.createObjectURL(product.images[0])}
                      alt={product.name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.gender}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>₹{product.final_price}.00</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center">
                      <Star color="warning" fontSize="small" />
                      <Typography variant="body1" ml={0.5}>
                        {product.rating}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{product.reviews}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(product)}
                        aria-label="Edit product"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(product.id)}
                        aria-label="Delete product"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Add/Edit Product Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: 800,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>
  
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Men">Men</MenuItem>
                    <MenuItem value="Women">Women</MenuItem>
                    <MenuItem value="Unisex">Unisex</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Price (₹)"
                  name="final_price"
                  type="number"
                  value={formData.final_price}
                  onChange={handleInputChange}
                  margin="normal"
                  inputProps={{ min: 0 }}
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Rating"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleInputChange}
                  margin="normal"
                  inputProps={{ min: 0, max: 5, step: 0.1 }}
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Number of Reviews"
                  name="reviews"
                  type="number"
                  value={formData.reviews}
                  onChange={handleInputChange}
                  margin="normal"
                  inputProps={{ min: 0 }}
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Upload Main Image
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => handleImageUpload(e, 'main')}
                      hidden
                    />
                  </Button>
                  {previewImages.main && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={previewImages.main}
                        alt="Main Preview"
                        style={{ maxWidth: '100%', maxHeight: 200 }}
                      />
                    </Box>
                  )}
                </FormControl>
              </Grid>
  
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Upload Hover Image
                    <input
                      type="file"
                      accept="image/*"
                      ref={hoverFileInputRef}
                      onChange={(e) => handleImageUpload(e, 'hover')}
                      hidden
                    />
                  </Button>
                  {previewImages.hover && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={previewImages.hover}
                        alt="Hover Preview"
                        style={{ maxWidth: '100%', maxHeight: 200 }}
                      />
                    </Box>
                  )}
                </FormControl>
              </Grid>
            </Grid>
  
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mr: 2 }}
              >
                {isEditMode ? "Update" : "Save"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
  
        {/* Snackbar for notifications */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    );
  };
  
  export default ProductManagement;
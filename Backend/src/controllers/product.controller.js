import Product from '../model/product.model.js';
import path from 'path';

// Controller to add a new product
export const addProduct = async (req, res) => {
  const { name, color, gender, final_price, reviews, rating } = req.body;

  // Handle file paths for the uploaded images
  const mainImagePath = req.files?.main ? req.files.main[0].path : null;
  const hoverImagePath = req.files?.hover ? req.files.hover[0].path : null;

  try {
    // Generate URLs for the images (e.g., http://localhost:8000/uploads/filename.jpg)
    const mainImageURL = mainImagePath ? `http://localhost:8000/uploads/${path.basename(mainImagePath)}` : null;
    const hoverImageURL = hoverImagePath ? `http://localhost:8000/uploads/${path.basename(hoverImagePath)}` : null;

    // Create a new product from the provided data
    const newProduct = new Product({
      name,
      color,
      gender,
      images: [mainImageURL, hoverImageURL], // Save the URLs in the database
      final_price,
      reviews,
      rating,
    });

    // Save the product to the database
    await newProduct.save();

    // Return the created product as a response
    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding product',
      error: error.message,
    });
  }
};

export const getProduct= async (req,res) => {
    try {
        const Products = await Product.find(); // This fetches all students from the database
        res.status(200).json({
          success: true,
          datas: Products
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error fetching students'
        });
      }
}

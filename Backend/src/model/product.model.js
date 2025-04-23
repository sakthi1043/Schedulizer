import mongoose from 'mongoose';

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Unisex'],
      default: 'Men',
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    final_price: {
      type: Number,
      required: true,
      min: 0,
    },
    reviews: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;

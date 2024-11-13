// routes/menu.js
import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import MenuItemModel from '../models/MenuModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';

const router = express.Router();

// Route to create a new menu item
router.post('/ResMenu', upload.single('image'), async (req, res) => {
  try {
    const { dishName, price, description, cuisineName } = req.body;
    const localFilePath = req.file.path;

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      throw new Error('File upload failed');
    }

    const menuItem = await MenuItemModel.create({
      dishName,
      price,
      description,
      cuisineName,
      image: cloudinaryResponse.url,
    });

    fs.unlinkSync(localFilePath); // Remove the local file after uploading to Cloudinary

    res.status(200).json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all menu items
router.get('/ResMenu', async (req, res) => {
  try {
    const menuItems = await MenuItemModel.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
});

// Route to update a menu item by ID
router.patch('/ResMenu/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { dishName, price, description, cuisineName, inStock } = req.body;
  const updateData = {
    dishName,
    price,
    description,
    cuisineName,
    inStock,
  };

  if (req.file) {
    const localFilePath = req.file.path;
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      throw new Error('File upload failed');
    }

    updateData.image = cloudinaryResponse.url;
    fs.unlinkSync(localFilePath); // Remove the local file after uploading to Cloudinary
  }

  try {
    const updatedItem = await MenuItemModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get a menu item by ID
router.get('/ResMenu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItemModel.findById(id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu item' });
  }
});

export default router;

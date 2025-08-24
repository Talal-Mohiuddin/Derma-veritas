import { NextResponse } from 'next/server';
import { db } from '../../../../config/db.js';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

// GET - Get Single Product
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        message: "Product not found"
      }, { status: 404 });
    }

    const product = {
      id: docSnap.id,
      ...docSnap.data()
    };

    return NextResponse.json({
      success: true,
      product
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

// PUT - Update Product
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Check if product exists
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        message: "Product not found"
      }, { status: 404 });
    }

    const existingProduct = docSnap.data();
    const formData = await request.formData();
    
    // Extract form fields
    const fields = {};
    const files = [];
    
    for (const [key, value] of formData.entries()) {
      if (key === 'images') {
        files.push(value);
      } else {
        fields[key] = value;
      }
    }

    // Clean and validate fields
    const updateData = {};
    Object.keys(fields).forEach((key) => {
      const cleanKey = key.trim();
      const value = fields[key];
      if (cleanKey && value !== undefined && value !== '') {
        updateData[cleanKey] = typeof value === "string" ? value.trim() : value;
      }
    });

    // Convert numeric fields
    if (updateData.price !== undefined) {
      updateData.price = parseFloat(updateData.price);
    }
    if (updateData.stockQuantity !== undefined) {
      updateData.stockQuantity = parseInt(updateData.stockQuantity);
    }

    // Handle new images
    if (files.length > 0) {
      const uploadDir = path.join(process.cwd(), 'public/uploads/products');
      
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (error) {
        // Directory might already exist
      }

      // Delete old images
      if (existingProduct.images && existingProduct.images.length > 0) {
        for (const image of existingProduct.images) {
          try {
            const filename = path.basename(image.url);
            const filepath = path.join(process.cwd(), 'public/uploads/products', filename);
            await unlink(filepath);
          } catch (error) {
            // File might not exist
          }
        }
      }

      // Upload new images
      const newImages = [];
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}_${file.name}`;
        const filepath = path.join(uploadDir, filename);
        
        await writeFile(filepath, buffer);
        
        newImages.push({
          url: `/uploads/products/${filename}`,
          altText: updateData.altText || ""
        });
      }
      updateData.images = newImages;
    }

    // Handle ingredients
    if (updateData.ingredients) {
      try {
        const parsedIngredients = typeof updateData.ingredients === 'string' 
          ? JSON.parse(updateData.ingredients) 
          : updateData.ingredients;
        
        if (Array.isArray(parsedIngredients)) {
          updateData.ingredients = parsedIngredients.filter(
            ingredient => ingredient && ingredient.name && ingredient.quantity
          );
        }
      } catch (err) {
        return NextResponse.json({
          success: false,
          message: "Invalid ingredients format"
        }, { status: 400 });
      }
    }

    updateData.updatedAt = new Date();

    await updateDoc(docRef, updateData);

    // Get updated product
    const updatedDocSnap = await getDoc(docRef);
    const updatedProduct = {
      id: updatedDocSnap.id,
      ...updatedDocSnap.data()
    };

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete Product
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        message: "Product not found"
      }, { status: 404 });
    }

    const product = docSnap.data();

    // Delete associated images
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        try {
          const filename = path.basename(image.url);
          const filepath = path.join(process.cwd(), 'public/uploads/products', filename);
          await unlink(filepath);
        } catch (error) {
          // File might not exist
        }
      }
    }

    await deleteDoc(docRef);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

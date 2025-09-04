import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../config/db.js';
import { collection, addDoc, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Validation helper function
const validateRequiredFields = (fields) => {
  const requiredFields = [
    "name", "description", "price", "category", "stockQuantity", "servingSize"
  ];
  const missingFields = [];
  const cleanFields = {};

  Object.keys(fields).forEach((key) => {
    const cleanKey = key.trim();
    const value = fields[key];
    if (cleanKey) {
      cleanFields[cleanKey] = typeof value === "string" ? value.trim() : value;
    }
  });

  for (const field of requiredFields) {
    const value = cleanFields[field];
    if (!value || value === "") {
      missingFields.push(field);
    }
  }

  // Additional validations
  if (cleanFields.price !== undefined) {
    const price = parseFloat(cleanFields.price);
    if (isNaN(price) || price < 0) {
      missingFields.push("price (must be a valid number >= 0)");
    }
  }

  if (cleanFields.stockQuantity !== undefined) {
    const stockQuantity = parseInt(cleanFields.stockQuantity);
    if (isNaN(stockQuantity) || stockQuantity < 0) {
      missingFields.push("stockQuantity (must be a valid number >= 0)");
    }
  }

  return { missingFields, cleanFields };
};

// GET - Get All Products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    
    const pageSize = parseInt(limitParam) || 10;
    const currentPage = parseInt(pageParam) || 1;

    let q = collection(db, 'products');
    
    if (category) {
      q = query(q, where('category', '==', category));
    }
    
    q = query(q, orderBy('createdAt', 'desc'), limit(pageSize));

    const products = [];
    
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
    } catch (firestoreError) {
      // Handle case when collection doesn't exist or other Firestore errors
      console.log(
        "Firestore query error (possibly empty collection):",
        firestoreError.message
      );
      // Return empty array instead of throwing error
    }

    return NextResponse.json({
      success: true,
      products,
      currentPage,
      total: products.length
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

// POST - Create Product
export async function POST(request) {
  try {
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

    // Validate required fields
    const { missingFields, cleanFields } = validateRequiredFields(fields);
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing or invalid required fields: ${missingFields.join(", ")}`
      }, { status: 400 });
    }

    const {
      name, description, price, category, stockQuantity,
      ingredients, servingSize, howToUse
    } = cleanFields;

    // Handle uploaded images - convert to base64
    let images = [];
    if (files.length > 0) {
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const mimeType = file.type || 'image/jpeg';
        
        images.push({
          url: `data:${mimeType};base64,${base64}`,
          altText: cleanFields.altText || "",
          filename: file.name
        });
      }
    }

    // Parse ingredients if it's a string
    let cleanIngredients = [];
    if (ingredients) {
      try {
        const parsedIngredients = typeof ingredients === 'string' 
          ? JSON.parse(ingredients) 
          : ingredients;
        
        if (Array.isArray(parsedIngredients)) {
          cleanIngredients = parsedIngredients.filter(
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

    // Create product document
    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      stockQuantity: parseInt(stockQuantity),
      images,
      ingredients: cleanIngredients,
      servingSize,
      howToUse: howToUse || "",
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'products'), productData);

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      product: {
        id: docRef.id,
        ...productData
      }
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

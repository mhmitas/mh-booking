// app/api/cloudinary/route.ts

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// --- Configuration ---
// Configure Cloudinary with your credentials.
// It's highly recommended to use environment variables for security.
// Create a .env.local file in your project root and add these variables.
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * @route POST /api/cloudinary
 * @desc Uploads an image to Cloudinary from a provided URL.
 * @access Public
 */
export async function POST(request: Request) {
    try {
        // Parse the request body to get the image URL
        const body = await request.json();
        const { imageUrl } = body;

        // Check if the imageUrl is provided in the request body
        if (!imageUrl) {
            return NextResponse.json(
                { success: false, message: 'Image URL is required.' },
                { status: 400 }
            );
        }

        console.log(`Attempting to upload image from URL: ${imageUrl}`);

        // Use the Cloudinary uploader to upload the image from the URL
        const result = await cloudinary.uploader.upload(imageUrl, {
            // Optional: Add upload options here if needed
            folder: 'blackberry_mountain',
        });

        console.log('Upload successful. Cloudinary response:', result);

        // Send a success response back to the client
        return NextResponse.json({
            success: true,
            message: 'Image uploaded successfully!',
            newUrl: result.secure_url,
            details: {
                public_id: result.public_id,
                width: result.width,
                height: result.height,
                format: result.format,
            },
        }, { status: 200 });

    } catch (error) {
        // Handle potential errors
        // Log the full error for debugging purposes on the server
        console.error('Error uploading image to Cloudinary:', error);

        // It's good practice to not expose detailed error messages to the client
        // but provide a clear error message.
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';

        return NextResponse.json(
            { success: false, message: 'Failed to upload image.', error: errorMessage },
            { status: 500 }
        );
    }
}

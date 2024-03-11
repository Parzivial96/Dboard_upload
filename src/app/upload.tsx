"use client"

import { useState, ChangeEvent, FormEvent } from 'react';

export default function ImageUpload() {
    const [image, setImage] = useState<string | null>(null);
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
  
        reader.readAsDataURL(file);
      }
    };
  
    const handleExpiryDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setExpiryDate(event.target.value);
    };
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (!image || !expiryDate) {
        alert('Please select an image and enter an expiry date.');
        return;
      }
  
      try {
        setLoading(true); // Set loading state to true
  
        const response = await fetch('https://dboard-api.onrender.com/api/uploadNotice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageData: image, expiryDate: expiryDate }),
        });
  
        if (response.ok) {
          alert('Image uploaded successfully!');
        } else {
          alert('Failed to upload image.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false); // Reset loading state regardless of success or failure
      }
    };
  
    return (
      <div>
        <h1>Image Upload</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="image">Select Image:</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="date" id="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} />
          </div>
          <button type="submit" disabled={loading}> {/* Disable the button while loading */}
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    );
  }

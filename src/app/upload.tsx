"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function MultiUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const [todoText, setTodoText] = useState<string>('');
  const [todoExpiryDate, setTodoExpiryDate] = useState<string>('');
  const [todoLoading, setTodoLoading] = useState<boolean>(false);

  const [marqueeText, setMarqueeText] = useState<string>('');
  const [marqueeExpiryDate, setMarqueeExpiryDate] = useState<string>('');
  const [marqueeLoading, setMarqueeLoading] = useState<boolean>(false);

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

  const handleTodoTextChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTodoText(event.target.value);
  };

  const handleTodoExpiryDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTodoExpiryDate(event.target.value);
  };

  const handleMarqueeTextChange = (event: ChangeEvent<HTMLInputElement>) => {
      setMarqueeText(event.target.value);
  };

  const handleMarqueeExpiryDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setMarqueeExpiryDate(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>, endpoint: string, data: object, setLoading: (loading: boolean) => void) => {
      event.preventDefault();

      try {
          setLoading(true);

          const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });

          if (response.ok) {
              alert('Data uploaded successfully!');
          } else {
              alert('Failed to upload data.');
          }
      } catch (error) {
          console.error('Error uploading data:', error);
      } finally {
          setLoading(false);
      }
  };

  return (
      <div className="container">
          <h2>Upload Image</h2>
          <form onSubmit={(event) => handleSubmit(event, 'https://dboard-api.onrender.com/api/uploadNotice', { imageData: image, expiryDate: expiryDate }, setImageLoading)}>
              <div className="form-group">
                  <label htmlFor="image">Select Image:</label>
                  <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
              </div>
              <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date:</label>
                  <input type="date" id="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} />
              </div>
              <button type="submit" disabled={imageLoading}>
                  {imageLoading ? 'Uploading...' : 'Upload Image'}
              </button>
          </form>
          <br/>
          <h2>Upload Todo</h2>
          <form onSubmit={(event) => handleSubmit(event, 'https://dboard-api.onrender.com/api/uploadTodo', { textData: todoText, expiryDate: todoExpiryDate }, setTodoLoading)}>
              <div className="form-group">
                  <label htmlFor="todoText">Todo Text:</label>
                  <input type="text" id="todoText" value={todoText} onChange={handleTodoTextChange} />
              </div>
              <div className="form-group">
                  <label htmlFor="todoExpiryDate">Expiry Date:</label>
                  <input type="date" id="todoExpiryDate" value={todoExpiryDate} onChange={handleTodoExpiryDateChange} />
              </div>
              <button type="submit" disabled={todoLoading}>
                  {todoLoading ? 'Uploading...' : 'Upload Todo'}
              </button>
          </form>
          <br/>
          <h2>Upload Marquee</h2>
          <form onSubmit={(event) => handleSubmit(event, 'https://dboard-api.onrender.com/api/uploadMarquee', { marqueeData: marqueeText, expiryDate: marqueeExpiryDate }, setMarqueeLoading)}>
              <div className="form-group">
                  <label htmlFor="marqueeText">Marquee Text:</label>
                  <input type="text" id="marqueeText" value={marqueeText} onChange={handleMarqueeTextChange} />
              </div>
              <div className="form-group">
                  <label htmlFor="marqueeExpiryDate">Expiry Date:</label>
                  <input type="date" id="marqueeExpiryDate" value={marqueeExpiryDate} onChange={handleMarqueeExpiryDateChange} />
              </div>
              <button type="submit" disabled={marqueeLoading}>
                  {marqueeLoading ? 'Uploading...' : 'Upload Marquee'}
              </button>
          </form>
      </div>
  );
}
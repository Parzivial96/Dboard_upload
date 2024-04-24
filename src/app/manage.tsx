"use client";

import React, { useState, useEffect } from 'react';
import './manage.css'; // Import CSS for styling

interface BannerItem {
  id: string;
  imageData: string;
  expiryDate: string;
}

interface MarqueeItem {
  id: string;
  marqueeData: string;
  expiryDate: string;
}

interface EventItem {
  id: string;
  textData: string;
  expiryDate: string;
}

interface TodoItem {
  id: string;
  textData: string;
  expiryDate: string;
}

type SectionItem = BannerItem | MarqueeItem | EventItem | TodoItem;

export default function Manage() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [marquees, setMarquees] = useState<MarqueeItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [announcements, setAnnouncements] = useState<TodoItem[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setter(data);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const endpoints = [
      'https://dboard-api.onrender.com/api/getAllNotice',
      'https://dboard-api.onrender.com/api/getAllMarquee',
      'https://dboard-api.onrender.com/api/getAllEvent',
      'https://dboard-api.onrender.com/api/getAllTodo'
    ];

    endpoints.forEach(endpoint => fetchData(endpoint, determineSetterForEndpoint(endpoint)));
  }, []);

  const determineSetterForEndpoint = (endpoint: string) => {
    if (endpoint.includes('getAllNotice')) {
      return setBanners;
    } else if (endpoint.includes('getAllMarquee')) {
      return setMarquees;
    } else if (endpoint.includes('getAllEvent')) {
      return setEvents;
    } else if (endpoint.includes('getAllTodo')) {
      return setAnnouncements;
    } else {
      return () => {};
    }
  };

  const handleDelete = async (endpoint: string, payload: { id: string }) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Reload data after successful deletion
        const getAllEndpoint = endpoint.replace('upload', 'getAll');
        fetchData(getAllEndpoint, determineSetterForEndpoint(getAllEndpoint));
        alert('Item deleted successfully');
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prevSections =>
      prevSections.includes(sectionName)
        ? prevSections.filter(section => section !== sectionName)
        : [...prevSections, sectionName]
    );
  };

  const renderSection = (items: SectionItem[], sectionName: string, deleteEndpoint: string) => (
    <div className="section-container">
      <h3 className="section-title" onClick={() => toggleSection(sectionName)}>
        {sectionName} <i className={`fas fa-chevron-${expandedSections.includes(sectionName) ? 'up' : 'down'}`}></i>
      </h3>
      {expandedSections.includes(sectionName) && (
        <div className="items-container">
          {items.map(item => (
            <div key={item.id} className="item">
              {sectionName === 'Banners' && 'imageData' in item && (
                <img src={item.imageData} alt="Banner" className="banner-image" />
              )}
              {sectionName === 'Marquees' && 'marqueeData' in item && <p>{item.marqueeData}</p>}
              {sectionName === 'Events' && 'textData' in item && <p>{item.textData}</p>}
              {sectionName === 'Announcements' && 'textData' in item && <p>{item.textData}</p>}
              <p>Expiry Date: {item.expiryDate}</p>
              <button className="delete-button" onClick={() => handleDelete(deleteEndpoint, { id: item.id })}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="container">
      <br /><br /><br />
      <h2>Manage Data</h2>
      {/* Banner Section */}
      {renderSection(banners, 'Banners', 'https://dboard-api.onrender.com/api/deleteNotice')}

      {/* Marquee Section */}
      {renderSection(marquees, 'Marquees', 'https://dboard-api.onrender.com/api/deleteMarquee')}

      {/* Event Section */}
      {renderSection(events, 'Events', 'https://dboard-api.onrender.com/api/deleteEvent')}

      {/* Announcement Section */}
      {renderSection(announcements, 'Announcements', 'https://dboard-api.onrender.com/api/deleteTodo')}
    </div>
  );
}

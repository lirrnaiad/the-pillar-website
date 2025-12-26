import React from 'react';
import { Card } from './';
import './CardDemo.css';

const sample = {
  image: '/src/assets/images/sample-hero.jpg',
  title: 'USC, PYDO spearheads Balik Kampus \u201925, spotlights fair and Kabataan Caravan',
  excerpt:
    "The campus community gathered to welcome returning students and to spotlight community programs focused on student welfare and activities.",
  category: 'News',
  date: 'September 22, 2025',
  author: 'Staff Writer',
};

export const CardDemo = () => {
  return (
    <div className="card-demo">
      <h2>Card Component Showcase</h2>
      <div className="card-grid">
        <Card {...sample} link="#" />
        <Card {...sample} className="card--small" link="#" />
        <Card {...sample} className="card--large" link="#" />
      </div>
    </div>
  );
};

export default CardDemo;

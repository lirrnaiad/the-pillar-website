import React from 'react';
import Spinner from './index.jsx';

export default {
  title: 'Common/Spinner',
  component: Spinner,
};

export const Default = () => <Spinner />;
export const WithMessage = () => <Spinner message="Loading articles..." />;
export const Large = () => <Spinner size="96px" message="Preparing visuals..." />;

import { AppRoutes } from '../../Services/Constants/Routing';
import { Navigate } from 'react-router-dom';
import React from 'react';

export const ServicesRedirect = () => <Navigate to={AppRoutes.Services} />;

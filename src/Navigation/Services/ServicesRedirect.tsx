import { AppRoutes } from '../../Services/Navigation/Routing';
import { Navigate } from 'react-router-dom';
import React from 'react';

export const ServicesRedirect = () => <Navigate to={AppRoutes.Services} />;

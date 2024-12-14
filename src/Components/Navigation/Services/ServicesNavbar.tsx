import { NavigationNavbar } from '../NavigationNavbar';
import { ServicesNavbarActions } from './ServicesNavbarActions';

export const ServicesNavbar = () => {
  return <NavigationNavbar actions={<ServicesNavbarActions />} />;
};

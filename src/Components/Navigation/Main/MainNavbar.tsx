import { NavigationNavbar } from '../NavigationNavbar';
import { MainNavbarActions } from './MainNavbarActions';

export const MainNavbar = () => {
  return <NavigationNavbar actions={<MainNavbarActions />} />;
};

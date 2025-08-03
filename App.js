import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ProductsProvider, CartProvider } from './contexts/AppContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <StatusBar style="light" backgroundColor="#FF6B35" />
        <AppNavigator />
      </CartProvider>
    </ProductsProvider>
  );
}
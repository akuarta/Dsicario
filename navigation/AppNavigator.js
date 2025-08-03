import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

// Screens
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator para productos
const ProductStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProductList" 
      component={ProductListScreen}
      options={{
        title: 'DSicario',
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen}
      options={{
        title: 'Detalles del Producto',
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

// Stack Navigator para carrito
const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Cart" 
      component={CartScreen}
      options={{
        title: 'Carrito',
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen}
      options={{
        title: 'Finalizar Compra',
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

// Tab Navigator principal
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#FF6B35',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
      },
    }}
  >
    <Tab.Screen
      name="Inicio"
      component={ProductStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Carrito"
      component={CartStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="shopping-cart" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="user-alt" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Navegador principal de la app
const AppNavigator = () => (
  <NavigationContainer>
    <MainTabs />
  </NavigationContainer>
);

export default AppNavigator;
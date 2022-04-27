import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/HomeScreen';
import GraphScreen from './app/screens/GraphScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from './app/config/colors';


const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({color}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'alarm-outline';
            } else if (route.name === 'Graph') {
              iconName = 'bar-chart-outline';
            }

            return <Ionicons name={iconName} size={35} color={color} />;
          },
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 16,
            bottom: 6
          },
          tabBarStyle: {            
            height: 75,
            backgroundColor: colors.primary},
          headerShown: 0

        })}
      >
        <Tab.Screen name="Home"  component={HomeScreen} />
        <Tab.Screen name="Graph" component={GraphScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

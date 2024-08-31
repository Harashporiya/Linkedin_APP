import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Singup from './components/Singup'
import UserName from './components/UserName'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>

      {/* <Stack.Screen
      name="Signup"
      component={Singup}/> */}
       
      <Stack.Screen
      name='Name'
      component={UserName}/>

    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App
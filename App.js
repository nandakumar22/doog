
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import Router from './src/routes'
import  { useEffect } from "react";
import { Text } from "react-native";
import RNBootSplash from "react-native-bootsplash";
 
const App = () => {
  return (
    <Router/>
  );
 }


export default App;

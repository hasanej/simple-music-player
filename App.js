import React from 'react';
import { Dimensions } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MusicListScreen from './src/screens/musicListScreen/MusicListScreen';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MusicList"
            options={{headerShown: false}}
            component={MusicListScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export default App;
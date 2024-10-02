import 'react-native-gesture-handler';

import React from 'react'
import DrawerNavigator from '../Drawer/DrawerNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Main = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <DrawerNavigator/>
    </GestureHandlerRootView>

  )
}

export default Main


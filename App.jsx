import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './Screens/AppNavigator'
import store from './Screens/Themes/Store'
import { Provider } from 'react-redux'


const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
    )
}

export default App

const styles = StyleSheet.create({})
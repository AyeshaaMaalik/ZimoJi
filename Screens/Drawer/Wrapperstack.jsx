import { StyleSheet,View } from 'react-native'
import React from 'react'

const Wrapperstack = ({children}) => {
  return (
    <View style={[styles.container]}>
      {children}
    </View>
  )
}

export default Wrapperstack

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})
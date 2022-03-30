import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Header2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>List Perjalanan</Text>
      <Text style={{color: '#fff'}}>List Catatan anda</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#125DB1',
    paddingLeft: 20,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  text: {fontFamily: 'Roboto-Bold', fontSize: 23, color: '#fff'},
});

export default Header2;

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Liner = ({home}) => {
  return home ? (
    <View style={{height: 1, backgroundColor: '#c4c4c4'}}/>
  ) : (
    <View style={styles.container}>
      <View style={styles.pages}>
        <View style={{backgroundColor: '#4a4a4a', height: 1, flex: 1}} />
        <Text style={{marginHorizontal: 10}}>Or</Text>
        <View style={{backgroundColor: '#4a4a4a', height: 1, flex: 1}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  liner: {},
  container: {
    justifyContent: 'center',
  },
  pages: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Liner;

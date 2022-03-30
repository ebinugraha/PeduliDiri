import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Filter} from '../../../assets'

const ButtonSort = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#125DB1',
        marginLeft: 10,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Filter />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonSort;

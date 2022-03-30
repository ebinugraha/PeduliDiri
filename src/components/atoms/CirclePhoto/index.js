import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

const CirclePhoto = ({onPress, imageUrl}) => {
  const placeHolderPhoto = 'Tambah\nFoto';

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 87,
          width: 87,
          borderRadius: 87,
          borderWidth: 2,
          borderColor: '#fff',
          borderStyle: 'dashed',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {imageUrl != null ? (
          <Image style={{height: 70, width: 70, borderRadius: 70}} source={{uri: imageUrl}}/>
        ) : (
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 70,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{textAlign: 'center'}}>{placeHolderPhoto}</Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});

export default CirclePhoto;

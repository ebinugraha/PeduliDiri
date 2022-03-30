import React from 'react';
import {View, StyleSheet, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {BackgroundShortcut} from '../../../assets';
import Icons from 'react-native-vector-icons/FontAwesome';

const Shortcut = ({title, subTitle, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        source={BackgroundShortcut}
        style={styles.ImageBackground}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <View style={{justifyContent: 'center'}}>
            <Icons name="chevron-right" color="#fff" />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    marginHorizontal: 10,
  },
  subTitleContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'red',
    overflow: 'hidden',
  },
  ImageBackground: {
    flex: 1,
    padding: 15,
  },
});

export default Shortcut;

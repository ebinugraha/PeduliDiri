import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {slides} from '../../assets';
import AppIntroSlider from 'react-native-app-intro-slider';

const IntroSlider = ({navigation}) => {
  return (
    <AppIntroSlider
      onDone={() => navigation.replace('MainApp')}
      data={slides}
      renderItem={({item}) => (
        <View style={styles.container}>
          <View
            style={[
              styles.flexContainer,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={styles.title}>{item.title}</Text>
          </View>

          <View style={[styles.flexContainer, {justifyContent: 'center', alignItems: 'center'}]}>
            <Image source={item.image} style={styles.image} />
          </View>

          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.subJudul}>{item.text}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#125db1',
    justifyContent: 'center',
  },
  image: {
  },
  subJudul: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center'
  },
});

export default IntroSlider;

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const CovidCase = ({Aktif, Sembuh, Meninggal}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title('#FF7D1F')}>Aktif</Text>
        <Text style={styles.subTitle}>{Aktif}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title('#109836')}>Sembuh</Text> 
        <Text style={styles.subTitle}>{Sembuh}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title('#D71515')}>Meninggal</Text>
        <Text style={styles.subTitle}>{Meninggal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: (color) => ({
    color: color,
    fontFamily: 'Roboto-Bold',
    marginBottom: 4,
    fontSize: 16,
  }),
  subTitle: {
    color: '#4A4A4A',
    fontFamily: 'Roboto-Medium',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CovidCase;

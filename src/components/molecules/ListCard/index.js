import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Clock, Location, Temperature, Done} from '../../../assets';
import {Liner, Gap} from '../../atoms';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

const ListCard = ({
  elevation = 0,
  onPress,
  name,
  temperature,
  time,
  key,
  status,
}) => {
  return (
    <TouchableOpacity
      style={styles.container(elevation)}
      onPress={onPress}
      key={key}>
      <View
        style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Location />
      </View>
      <View style={{flex: 1}}>
        <View>
          <Text style={{color: '#4a4a4a'}}>{name}</Text>
        </View>
        <Gap height={2} />
        <Liner home={true} />
        <Gap height={2} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{temperature}°</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Clock />
            <Text style={{marginLeft: 5}}>{time}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        {status == true ? (
          <View style={{paddingHorizontal: 35, paddingVertical: 4}}>
            <Done />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: '#125DB1',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 31,
            }}>
            <Text style={{color: '#fff'}}>Check Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: elevation => ({
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: elevation,
    marginHorizontal: 2,
  }),
});

export default ListCard;

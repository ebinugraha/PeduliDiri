import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Delete, Location, Filter, Close} from '../../../assets';

const ModalOpen = ({
  open,
  onPressBack,
  onPressDelete,
  latitude,
  longitude,
  address,
  suhu,
  tanggal,
  jam,
  status,
}) => {
  return (
    <Modal
      isVisible={open}
      backdropColor="transparent"
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPressBack}
          style={{marginBottom: 9, alignItems: 'flex-end'}}>
          <Close />
        </TouchableOpacity>

        <View style={styles.wrapperMaps}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.00055,
              longitudeDelta: 0.0014,
            }}>
            <Marker
              pinColor="#212121"
              key={'User'}
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title="Lokasi Saya"
              description="Lokasi saya saat ini"
            />
          </MapView>
        </View>
        <View style={styles.wrapperDetail}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Location />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#fff',
                  fontFamily: 'Roboto-Bold',
                }}>
                {address}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: '#fff'}}>{suhu}° ({suhu < 40 ?'Normal' : 'Tidak Normal'})</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexDirection: 'row',
            }}>
            <Text style={{color: '#fff'}}>{jam}</Text>
            <Text style={{color: '#fff'}}>{tanggal}</Text>
          </View>
        </View>
        <View style={styles.operation}>
          <TouchableOpacity onPress={onPressDelete}>
            <Delete height={40} width={40} />
          </TouchableOpacity>
          <View>
            <Text style={{color: status==true?'#59B100':'#b63429'}}>{status == true ?'Sudah Checkin' : 'Belum Checkin'}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  operation: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  wrapperMaps: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  wrapperDetail: {
    backgroundColor: '#125db1',
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    padding: 6,
    paddingHorizontal: 10,
  },
});

export default ModalOpen;

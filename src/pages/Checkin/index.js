import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Maps} from '../../assets/';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getRelativeCoords} from 'react-native-reanimated';
import Geocoder from 'react-native-geocoding';

class Checkin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationData: {
        latitude: -6.9554025,
        longitude: 107.7586501,
      },
      address: '',
      url: 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=-6.9553717&longitude=107.7581528&localityLanguage=id',
    };
  }

  componentDidMount() {
    this.requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        const initalPosition = position;

        console.log(initalPosition);
        let latitude = initalPosition.coords.latitude;
        let longitude = initalPosition.coords.longitude;
        this.setState({
          locationData: {latitude: latitude, longitude: longitude},
        });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {},
    );
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Ijinkan Aplikasi mengakses lokasi',
          message: 'tes',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Diijinkan');
      } else {
        console.log('Tidak Di ijinkan');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  getLocationName = async () => {
    const latitude = this.state.locationData.latitude;
    const longitude = this.state.locationData.longitude;

    const url =
      'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' +
      latitude +
      '&longitude=' +
      longitude +
      '&localityLanguage=id';

    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({address: json}))
      .catch(err => console.log(err));
  };

  checkInHandler = () => {
    this.getLocationName();

    setTimeout(() => {
      let address =
        this.state.address.city +
        ' ' +
        this.state.address.principalSubdivision;
      if(this.state.address.city == undefined || this.state.address.principalSubdivision){
        address = '';
      }
      this.props.navigation.navigate('AddDataPages', {
        address: address,
        location: this.state.locationData,
      });
    }, 500);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{flex: 1}}
          region={{
            latitude: this.state.locationData.latitude,
            longitude: this.state.locationData.longitude,
            latitudeDelta: 0.00055,
            longitudeDelta: 0.0014,
          }}>
          <Marker
            pinColor="#212121"
            key={'User'}
            coordinate={{
              latitude: this.state.locationData.latitude,
              longitude: this.state.locationData.longitude,
            }}
            title="Lokasi Saya"
            description="Lokasi saya saat ini"
          />
        </MapView>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 25,
              paddingVertical: 8,
              backgroundColor: '#125DB1',
              borderRadius: 10,
            }}
            onPress={() => this.checkInHandler()}>
            <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
              Check In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Checkin;

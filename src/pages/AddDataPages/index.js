import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Header, TextInput, Gap} from '../../components';
import {BackArrow} from '../../assets';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AddDataPages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      suhu: '',
      tanggal: '',
      jam: '',
      status: 'false',
      location: {latitude: -6.9554025, longitude: 107.7586501},
      data: [],
      dataTemp: [],
    };
  }

  componentDidMount() {
    this.setState({
      address: this.props.route.params.address,
      location: this.props.route.params.location,
    });
    this.getDate();
    this.getData();
  }

  getDate = () => {
    let today = new Date();

    let tanggal = today.getDate();
    let bulan = parseInt(today.getMonth() + 1);

    if (bulan < 10) {
      bulan = '0' + bulan;
      console.log(bulan);
    }

    if (tanggal < 10) {
      tanggal = '0' + tanggal;
      console.log(tanggal);
    }

    let date = tanggal + '-' + bulan + '-' + today.getFullYear();

    let time =
      (today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) +
      ':' +
      (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());

    this.setState({tanggal: date, jam: time});
  };

  getData = async () => {
    try {
      let data = await AsyncStorage.getItem('user');

      data = JSON.parse(data);
      this.setState({dataTemp: data});
      console.log(this.state.dataTemp);
    } catch (e) {
      console.log(e);
    }
  };

  insertDataHandler = async () => {
    if(this.state.address == '' || this.state.suhu == ''){
      alert('Form tidak boleh kosong');
    }else{
      let data = {
        address: this.state.address,
        suhu: this.state.suhu,
        tanggal: this.state.tanggal,
        jam: this.state.jam,
        status: this.state.status,
        location: this.state.location,
      };
  
      this.state.dataTemp.dataUser.dataCatatan.push(data);
  
      try {
        await AsyncStorage.setItem('user', JSON.stringify(this.state.dataTemp));
        console.log('data User berhasil di tambah');
      } catch (e) {
        console.log(e);
      }
  
      this.props.navigation.replace('MainApp', {screen: 'History'});
    }

  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
        <View style={styles.topLayout}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Checkin')}>
              <BackArrow />
            </TouchableOpacity>
            <Text style={styles.title}>Tambah Perjalanan</Text>
          </View>
          <View style={styles.mapWrapper}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{flex: 1, borderRadius: 10}}
              region={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                latitudeDelta: 0.00055,
                longitudeDelta: 0.0014,
              }}>
              <Marker
                pinColor="#212121"
                key={'User'}
                coordinate={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                }}
                title="Lokasi Saya"
                description="Lokasi saya saat ini"
              />
            </MapView>
          </View>
          <Gap height={20} />
          <TextInput
            label={'Nama Tempat'}
            hasil={this.state.address}
            IconsName="location-outline"
            TampilIcon={true}
            placeholder="Masukan Nama tempat"
            value={this.state.address}
            onChangeText={text => this.setState({address: text})}
          />
          <Gap height={20} />
          <TextInput
            label={'Suhu'}
            hasil={this.state.suhu}
            IconsName="thermometer-outline"
            TampilIcon={true}
            placeholder="Suhu"
            onChangeText={text => this.setState({suhu: text})}
          />
          <Gap height={20} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TextInput
                label={'Tanggal'}
                hasil={this.state.tanggal}
                IconsName="calendar-outline"
                TampilIcon={true}
                placeholder="dd/mm/yyyy"
                value={this.state.tanggal}
                onChangeText={text => this.setState({tanggal: text})}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <TextInput
                label={'Jam'}
                hasil={this.state.jam}
                IconsName="time-outline"
                TampilIcon={true}
                placeholder="hh:mm"
                value={this.state.jam}
                onChangeText={text => this.setState({jam: text})}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomLayout}>
          <Button
            color={'#125DB1'}
            text={'Tambah'}
            onPress={() => this.insertDataHandler()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mapWrapper: {
    height: 150,
    overflow: 'hidden',
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  container: {
    flex: 1,
  },
  topLayout: {
    flex: 1,
    backgroundColor: '#125DB1',
    padding: 20,
  },
  bottomLayout: {
    padding: 20,
  },
});

export default AddDataPages;

// import React, { Component } from 'react';
// import {View, StyleSheet} from 'react-native';

// class Index extends Component {
//   render() {
//     return (
//       <View>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({})

// export default Index;

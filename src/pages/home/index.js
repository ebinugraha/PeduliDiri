import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {LogoBlueFill, PhotoProfile, NotFoundIL} from '../../assets';
import {CovidCase, Gap, Liner, ListCard, Shortcut} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      nama: '',
      nik: '',
      imageProfile: '',
      dataCovid: null,
      caseCovid: {
        aktif: '',
        sembuh: '',
        meninggal: '',
      },
      //103.146.244.181
      apiUrl: 'https://data.covid19.go.id/public/api/update.json',
      dataPerjalanan: [],
    };
  
  }

  async componentDidMount() {



    this.forceUpdate();
    this.getData();
    this.getCovidData(this.state.apiUrl);
    setTimeout(() => {
      this.setData();
    }, 1000);
  }

  getData = async () => {
    try {
      // AsyncStorage.clear()
      let data = await AsyncStorage.getItem('user');

      data = JSON.parse(data);
      console.log(data);
      this.setState({data: data});
      this.setState({
        nama: this.state.data.nama,
        nik: this.state.data.nik,
        imageProfile: this.state.data.dataUser.imageProfile,
        dataPerjalanan: this.state.data.dataUser.dataCatatan,
      });
    } catch (e) {
      console.log(e);
    }
  };

  getCovidData = url => {
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({dataCovid: json}))
      .catch(e => console.log(e));
  };

  setData = () => {
    if (this.state.dataCovid != null) {
      let aktif = this.state.dataCovid.update.penambahan.jumlah_positif;
      let penambahan = this.state.dataCovid.update.penambahan.jumlah_sembuh;
      let meninggal = this.state.dataCovid.update.penambahan.jumlah_meninggal;

      this.setState({
        caseCovid: {
          aktif: aktif,
          sembuh: penambahan,
          meninggal: meninggal,
        },
      });
    } else {
      this.setState({
        caseCovid: {
          aktif: '00000',
          sembuh: '00000',
          meninggal: '00000',
        },
      });
    }
  };

  shortCutHandler = () => {
    const data = this.state.dataPerjalanan;

    if (data == '') {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          <NotFoundIL />
        </View>
      );
    } else {
      let tempData = [];
      if (data.length == 1) {
        tempData.push(data[data.length-1]);
      } else {
        tempData.push(data[data.length-1]);
        tempData.push(data[data.length-2]);
      }

      return (
        <>
          <Gap height={10} />
          {tempData.map((prop, index) => (
            <React.Fragment key={index}>
              <ListCard
                name={prop.address}
                temperature={prop.suhu}
                time={prop.jam}
                status={prop.status}
                onPress={() => this.props.navigation.navigate('History')}
              />
              <Gap height={10} />
            </React.Fragment>
          ))}
        </>
      );
    }
    // return (
    //   <>

    //     <Gap height={10} />
    //     <ListCard
    //       name={'Jatinagor Town Square'}
    //       temperature={'39'}
    //       time={'12:30'}
    //       onPress={() => this.props.navigation.navigate('History')}
    //     />
    //   </>
    // );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topLayout}>
          <View style={styles.profileContainer}>
            <View style={styles.textAndLogo}>
              <LogoBlueFill />
              <View style={{marginLeft: 10}}>
                <Text style={styles.titleText}>Halo, {this.state.nama}</Text>
                <Text style={{color: '#4a4a4a'}}>{this.state.nik}</Text>
              </View>
            </View>
            <Image
              source={{
                uri:
                  this.state.imageProfile !== ''
                    ? this.state.imageProfile
                    : undefined,
              }}
              style={styles.imageProfile}
            />
          </View>
          <Gap height={9} />
          <Liner home={true} />
          <Gap height={20} />
          <Shortcut
            title="Lakukan Check In sekarang"
            subTitle="Check In"
            onPress={() => this.props.navigation.navigate('Checkin')}
          />
        </View>
        <Gap height={10} />
        <View style={styles.bottomLayout}>
          <View style={{flex: 1}}>
            <Text style={styles.subTitle}>Kasus covid 19 Hari ini</Text>
            <Gap height={5} />
            <CovidCase
              Aktif={this.state.caseCovid.aktif
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              Sembuh={this.state.caseCovid.sembuh
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              Meninggal={this.state.caseCovid.meninggal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            />
          </View>
          <Gap height={10} />
          <View style={{flex: 2}}>
            <Text style={styles.subTitle}>Riwayat Perjalanan</Text>
            <Gap height={5} />
            {this.shortCutHandler()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageProfile: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  subTitle: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },
  bottomLayout: {
    flex: 1,
    backgroundColor: '#125DB1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: '#4a4a4a',
  },
  textAndLogo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLayout: {
    padding: 17,
    flex: 1,
  },
});

export default Home;

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

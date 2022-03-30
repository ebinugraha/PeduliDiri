import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  Gap,
  ListCard,
  Liner,
  ModalOpen,
  Button,
  Header2,
  ButtonSort,
} from '../../components';
import {Delete, Location, Filter, Close} from '../../assets';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemSelected: '',
      itemSelected2: '',
      search: '',
      modal: false,
      modalSort: false,
      ListKolom: [
        {name: 'tanggal'},
        {name: 'suhu'},
        {name: 'checkin'},
        {name: 'checkout'},
      ],
      ListAksi: [{name: 'ascending'}, {name: 'descending'}],
      data: [],

      cordSelected: {
        latitude: -6.9419032,
        longitude: 107.739897,
      },
      itemModalSelected: {
        address: '',
        suhu: null,
        tanggal: '',
        jam: '',
        status: '',
        index: null,
      },
      searchText: '',
      dataTemp: [],
      allDataTemp: null,
    };
  }

  handleChange = value => {
    this.setState({searchText: value});
    this.filterData(value);
  };

  excludeColums = ['location', 'status'];

  // Data Action

  filterData = value => {
    const lowerCaseValue = value.toLowerCase().trim();

    if (!lowerCaseValue) {
      this.setState({dataTemp: this.state.data});
    } else {
      const filterData = this.state.dataTemp.filter(item => {
        return Object.keys(item).some(key => {
          return this.excludeColums.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowerCaseValue);
        });
      });
      this.setState({dataTemp: filterData});
    }
  };

  setDataDescendingDate = () => {
    const data = this.state.data;
    let dataDescend = [];

    for (let i = data.length - 1; i >= 0; i--) {
      dataDescend.push(data[i]);
    }

    this.setState({dataTemp: dataDescend});
  };

  setDataCheckInFalse = () => {
    let data = this.state.data;
    let dataFalse = [];


    for (let i = 0; i < data.length; i++) {
      if (data[i].status == 'false') {
        dataFalse.push(data[i]);
        console.log('nani')
      }
    }
    this.setState({dataTemp: dataFalse});
  };
  
  setDataCheckInTrue = () => {
    const data = this.state.data;
    let DataTrue = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].status == 'true') {
        DataTrue.push(data[i]);
      }
    }

    this.setState({dataTemp: DataTrue});
  };

  setAscendingSuhu = () => {
    const temp = this.state.dataTemp; 
    let data = temp.sort(suhuSort);

    this.setState({dataTemp: data});

    function suhuSort(a, b) {
      return parseInt(a.suhu) - parseInt(b.suhu);
    }
  };

  setDescendingSuhu = (data_asli) => {
    const temp = data_asli;
    let data = temp.sort(suhuSort);

    this.setState({dataTemp: data});

    function suhuSort(a, b) {
      return parseInt(b.suhu) - parseInt(a.suhu);
    }
  };

  componentDidMount() {
    this.getData();
    setTimeout(() => {
      this.setState({dataTemp: this.state.data});
      this.setDataDescendingDate()
    }, 200);
  }

  openModal = (item, index) => {
    let latitude = item.location.latitude;
    let longitude = item.location.longitude;
    let address = item.address;
    let suhu = item.suhu;
    let tanggal = item.tanggal;
    let jam = item.jam;
    let status = item.status;

    this.setState({cordSelected: {latitude: latitude, longitude: longitude}});
    this.setState({
      itemModalSelected: {
        address: address,
        suhu: suhu,
        tanggal: tanggal,
        jam: jam,
        status: status,
        index: index
      },
    });
    this.setState({modal: true});
  };

  sortHandler = () => {
    let sortBy = this.state.itemSelected;
    let option = this.state.itemSelected2;

    let sort = sortBy+option;

    if (sortBy == '') {
      alert('Tidak ada data yang di pilih');
    } else {
      if (sortBy == 'checkin' || sortBy == 'checkout') {
        console.log('nani');
        switch (sortBy) {
          case 'checkin':
            this.getData();
              setTimeout(() => {
                this.setDataCheckInTrue();
              }, 10);
            break;
          case 'checkout':
            this.getData();
              setTimeout(() => {
                this.setDataCheckInFalse();
              }, 10);
            break;
        }
      }else{
        console.log(sort);
        if(option == ''){
          alert('Tidak ada opsi yang dipilih');
        }else{
          switch (sort) {
            case 'tanggalascending':
              this.getData();
              setTimeout(() => {
                this.setState({dataTemp: this.state.data});
                this.setDataDescendingDate()
              }, 10);
            break;
            case 'tanggaldescending':
              this.getData();
              setTimeout(() => {
                this.setState({dataTemp: this.state.data});
              }, 10);
            break;
            case 'suhuascending':
              this.setAscendingSuhu();
            break;
            case 'suhudescending':
              this.setDescendingSuhu();
            break;
          }
        }
      }
    }
    this.setState({itemSelected: '', itemSelected2: ''});
    this.setState({modalSort: false});
  };

  getData = async () => {
    try {
      let data = await AsyncStorage.getItem('user');

      data = JSON.parse(data);
      this.setState({data: data.dataUser.dataCatatan, allDataTemp: data});

    } catch (e) {
      console.log(e);
    }
  }

  saveData = async (data) => {

    let value = this.state.allDataTemp;

    value.dataUser.dataCatatan = data;

    console.log(value);

    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
      console.log('data User berhasil di simpan');
    } catch (e) {
      console.log(e);
    }
  }

  onPressCheckout = () => {
    
  }

  onPressDelete = () => {
    let data = this.state.data;
    let nama = this.state.itemModalSelected.address;

    for(let i = 0;i < data.length;i++){
      if(data[i].address == nama){
        console.log(data.splice(i,1));
      }
    }
    this.saveData(data);
    this.setState({dataTemp: data, modal: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header2 />
        <View style={styles.pages}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.input}
                placeholder="Cari"
                onChangeText={text => this.handleChange(text)}
              />
            </View>
            <ButtonSort onPress={() => this.setState({modalSort: true})} />
          </View>
          <Gap height={10} />

          <View style={{height: 1, backgroundColor: '#c4c4c4'}} />

          <Gap height={20} />

          <FlatList
            style={{flex: 1, padding: 3}}
            data={this.state.dataTemp}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <>
                <ListCard
                  elevation={3}
                  onPress={() => this.openModal(item, index)}
                  status={item.status}
                  name={item.address}
                  time={item.jam}
                  temperature={item.suhu}
                />
                <Gap height={20} />
              </>
            )}
          />
        </View>

        <ModalOpen
          open={this.state.modal}
          onPressBack={() => this.setState({modal: false})}
          latitude={this.state.cordSelected.latitude}
          longitude={this.state.cordSelected.longitude}
          address={this.state.itemModalSelected.address}
          jam={this.state.itemModalSelected.jam}
          suhu={this.state.itemModalSelected.suhu}
          status={this.state.itemModalSelected.status}
          tanggal={this.state.itemModalSelected.tanggal}
          onPressDelete={() => this.onPressDelete()}
        />

        <Modal isVisible={this.state.modalSort}>
          <View
            style={{
              height: '90%',
              borderRadius: 10,
              backgroundColor: 'white',
              padding: 20,
            }}>
            <TouchableOpacity
              onPress={() => this.setState({modalSort: false})}
              style={{alignItems: 'flex-end'}}>
              <Close />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: '#4a4a4a',
                fontFamily: 'Roboto-Bold',
              }}>
              Urut berdasarkan
            </Text>

            <View style={{marginTop: 10}}>
              <FlatList
                data={this.state.ListKolom}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginHorizontal: 3,
                      borderWidth: 1,
                      padding: 5,
                      marginVertical: 5,
                      padding: 10,
                      borderRadius: 10,
                      borderColor:
                        this.state.itemSelected == item.name
                          ? '#fff'
                          : '#4a4a4a',
                      backgroundColor:
                        this.state.itemSelected == item.name
                          ? '#125DB1'
                          : '#fff',
                    }}
                    onPress={() => this.setState({itemSelected: item.name})}>
                    <Text
                      style={{
                        color:
                          this.state.itemSelected == item.name
                            ? '#fff'
                            : '#4a4a4a',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: '#4a4a4a',
                fontFamily: 'Roboto-Bold',
                marginVertical: 15,
              }}>
              Opsi
            </Text>
            <View>
              <FlatList
                data={this.state.ListAksi}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginHorizontal: 3,
                      borderWidth: 1,
                      padding: 5,
                      marginVertical: 5,
                      padding: 10,
                      borderRadius: 10,
                      borderColor:
                        this.state.itemSelected2 == item.name
                          ? '#fff'
                          : '#4a4a4a',
                      backgroundColor:
                        this.state.itemSelected2 == item.name
                          ? '#125DB1'
                          : '#fff',
                    }}
                    onPress={() => this.setState({itemSelected2: item.name})}>
                    <Text
                      style={{
                        color:
                          this.state.itemSelected2 == item.name
                            ? '#fff'
                            : '#4a4a4a',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{marginVertical: 5}}>
              <Button text="Proses" onPress={() => this.sortHandler()} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingLeft: 20,
    color: '#4a4a4a',
    borderColor: '#4a4a4a',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pages: {
    flex: 1,
    padding: 15,
  },
});

export default History;

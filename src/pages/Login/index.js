import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Gap, Header, TextInput, Button, Liner} from '../../components';
import {Logo} from '../../assets';
import {useForm} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const subTitle =
  'Selamat datang di tampilan masuk\n Harap asukan NIK dan Nama lengkap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nik: "",
      nama: "",
      data: [],
    };
  }
  
  async componentDidMount() {
    this.forceUpdate();
    this.getData();
  }

  getData = async () => {
    // AsyncStorage.clear()
    try {
      let value = await AsyncStorage.getItem('userData');

      value = JSON.parse(value);

      if (value != null) {
        this.setState({data: value});
      }

      console.log('data Berhasil di get ' + this.state.data);
      console.log('data Berhasil di string ' + JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  loginHandler = () => {
    const data = this.state.data;
    const nik = this.state.nik;
    const nama = this.state.nama;
    let status = false;

    for(let i = 0;i < data.length;i++){
      if(data[i].nik === nik && data[i].nama === nama){
        this.setUserData(data[i]);
        // this.props.navigation.replace('IntroSlider');
        status = true;
        break;
      }
    }

    if(status == true){
      this.props.navigation.replace('IntroSlider');
    }else{
      alert('Nik atau Nama tidak terdaftar');
    }
    // alert('Tidak Ketemu');
  };

  setUserData = async (value) => {
    console.log(value);
      try{
        await AsyncStorage.setItem('user', JSON.stringify(value));
        console.log(value);
      }catch(e){
        console.log(e);
      }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
        <View style={styles.topLayout}>
          <Header title="Masuk" subTitle={subTitle} />
          <Gap height={31} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Logo />
          </View>
          <Gap height={25} />
            <TextInput
              panjang={16}
              label="NIK"
              hasil={this.state.nik}
              placeholder="Masukan NIK"
              keyboardType="numeric"
              value={this.state.nik}
              onChangeText={text => this.setState({nik: text})}
            />
            <Gap height={20} />
            <TextInput
              panjang={1}
              label="Nama Lengkap"
              hasil={this.state.nama}
              placeholder="Masukan Nama Lengkap"
              value={this.state.nama}
              onChangeText={text => this.setState({nama: text})}
            />
        </View>
        <Gap height={10} />
        <View style={styles.bottomLayout}>
          <Button text="Masuk" onPress={() => this.loginHandler()} />
          <Gap height={10} />
          <Liner />
          <Gap height={10} />
          <Button
            text="Daftar"
            color="#fff"
            textColor="#4a4a4a"
            borderWidth={1}
            borderColor="#4a4a4a"
            onPress={() => this.props.navigation.replace('Daftar')}
          />
        </View>
      </ScrollView>
    );
  }
}

// const Login = ({navigation}) => {
//   const subTitle =
//     'Selamat datang di tampilan masuk\n Harap asukan NIK dan Nama lengkap';

//   const [form, setForm] = useForm({
//     nik: '',
//     nama: '',
//     dataUser: [
//       {
//         NIK: '',
//         nama: '',
//         profileImage: '',
//         data: [],
//       },
//     ],
//   });

//   const onSubmit = () => {
//     console.log(form);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topLayout}>
//         <Header title="Masuk" subTitle={subTitle} />
//         <Gap height={31} />
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <Logo />
//         </View>
//         <Gap height={25} />
//         <KeyboardAvoidingView>
//           <TextInput
//             panjang={16}
//             label="NIK"
//             hasil={form.nik}
//             placeholder="Masukan NIK"
//             keyboardType="numeric"
//             value={form.nik}
//             onChangeText={text => setForm('nik', text)}
//           />
//           <Gap height={20} />
//           <TextInput
//             panjang={1}
//             label="Nama Lengkap"
//             hasil={form.nama}
//             placeholder="Masukan Nama Lengkap"
//             value={form.nama}
//             onChangeText={text => setForm('nama', text)}
//           />
//         </KeyboardAvoidingView>
//       </View>
//       <Gap height={10} />
//       <View style={styles.bottomLayout}>
//         <Button text="Masuk" onPress={() => onSubmit()} />
//         <Gap height={10} />
//         <Liner />
//         <Gap height={10} />
//         <Button
//           text="Daftar"
//           color="#fff"
//           textColor="#4a4a4a"
//           borderWidth={1}
//           borderColor="#4a4a4a"
//           onPress={() => navigation.navigate('Daftar')}
//         />
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#125DB1',
  },
  topLayout: {
    padding: 20,
  },
  bottomLayout: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
});

export default Login;

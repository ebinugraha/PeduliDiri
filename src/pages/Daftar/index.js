import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {
  Gap,
  Header,
  TextInput,
  Button,
  Liner,
  CirclePhoto,
} from '../../components';
import {CheckList} from '../../assets';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useForm, storeHandler} from '../../utils';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Daftar = ({navigation}) => {
  const subTitle = 'Daftar lalu catat Perjalanan anda\n';
  const labelBottom = 'Pendaftaran\nAkun Berhasil';
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    console.log(form.dataUser);
  }, []);
  const close = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const hasil = async () => {
    const hasil2 = await ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log('User Cancel');
        } else if (response.errorCode) {
          console.log('Error code ' + response.errorCode);
        } else if (response.errorMessage) {
          console.log('Error Message' + response.errorMessage);
        } else {
          const source = response.assets[0].uri;
          setForm('imageProfile', source);
        }
      },
    );
  };

  //  data data state
  const [form, setForm] = useForm({
    dataUser: [],
    nik: '',
    nama: '',
    imageProfile: null,
  });

  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 0)
  },[])

  const storeData = (nik, nama, imageProfile) => {
    
    const data = form.dataUser;

    if (nik == '') {
      alert('Nik Tidak Boleh kosong');
      setForm('reset');
    } else {
      if (nama == '') {
        alert('Nama Tidak Boleh kosong');
        setForm('reset');
      } else {
        if (imageProfile == null) {
          alert('Gambar Kosong');
          setForm('reset');
        } else {
          if (nik.length < 16) {
            alert('Nik tidak valid');
          } else {
            data.push({
              nik: nik,
              nama: nama,
              dataUser: {
                imageProfile: imageProfile,
                status: false,
                dataCatatan: [],
              },
            });
            storeHandler(data);
            handlePresentModalPress();
          }
        }
      }
    }
  };

  const getData = async () => {

    // AsyncStorage.clear();
    let hasil = [];

    try {
      let value = await AsyncStorage.getItem('userData');

      value = JSON.parse(value);

      if (value !== null) {
        hasil = value;
        console.log('ini data user nya ' + hasil);
      }

    } catch (e) {
      hasil = value
    }
    setForm('dataUser', hasil);
    return hasil;

  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <BottomSheetModalProvider>
          <View style={styles.topLayout}>
            <Header
              title="Daftar"
              subTitle={subTitle}
              backArrow={true}
              
              onPress={() => navigation.replace('Login')}
            />
            <Gap height={31} />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <CirclePhoto onPress={() => hasil()} imageUrl={form.imageProfile} />
            </View>
            <Gap height={25} />
            <TextInput
              panjang={16}
              label="NIK"
              hasil={form.nik}
              placeholder="Masukan NIK"
              keyboardType="numeric"
              value={form.nik}
              onChangeText={text => setForm('nik', text)}
            />
            <Gap height={20} />
            <TextInput
              panjang={1}
              label="Nama Lengkap"
              hasil={form.nama}
              placeholder="Masukan Nama Lengkap"
              value={form.nama}
              onChangeText={text => setForm('nama', text)}
            />
          </View>
          <Gap height={10} />
          <View style={styles.bottomLayout}>
            <Button
              text="Daftar"
              onPress={() => storeData(form.nik, form.nama, form.imageProfile)}
            />
            <Gap height={10} />
            <Liner />
            <Gap height={10} />
            <Button
              text="Masuk"
              color="#fff"
              textColor="#4a4a4a"
              borderWidth={1}
              borderColor="#4a4a4a"
              onPress={() => navigation.replace('Login')}
            />
          </View>

          <BottomSheetModal
            index={0}
            snapPoints={snapPoints}
            style={styles.bottomSheet}
            ref={bottomSheetModalRef}
            handleIndicatorStyle={{backgroundColor: '#fff'}}>
            <View style={styles.contentContainer}>
              <View style={{alignItems: 'center'}}>
                <CheckList />
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  fontFamily: 'Roboto-Medium',
                  color: '#4a4a4a',
                }}>
                {labelBottom}
              </Text>
              <Button text="Masuk" onPress={() => navigation.replace('Login')} />
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      height: -5,
      width: 0,
    },
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
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

export default Daftar;

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeHandler = async (user) => {
  try {
    const jsonValue = JSON.stringify(user)
    await AsyncStorage.setItem('userData', jsonValue);
    console.log('Data berhasil di simpan');
  } catch (e) {
    console.log(e);
  }

};


const getData = async () => {

  let dataValue  = null;
  // AsyncStorage.clear()
  try {
    let jsonValue = await AsyncStorage.getItem('userData')

    if(jsonValue != null){
      console.log(JSON.parse(jsonValue));
      dataValue = JSON.parse(jsonValue);
    }else{
      console.log('null');
      dataValue = [];
    }

    // return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }

  return dataValue;

};

export {storeHandler, getData};

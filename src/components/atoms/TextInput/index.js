import React, {useState} from 'react';
import {View, StyleSheet, TextInput as Input, Text} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {Checklist2} from '../../../assets'

const TextInput = ({border = '' ,panjang,label, placeholder,hasil,IconsName,TampilIcon, keyboardType, ...restProps}) => {

  return (
    <View>
      {TampilIcon == true? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <Text style={styles.label}>{label}</Text>
            <Icons name={IconsName} size={22} color={'#fff'}/>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}

      <View style={styles.textInputWrapper}>
        <Input
          style={styles.input(border)}
          placeholder={placeholder}
          keyboardType={keyboardType ? 'numeric' : 'default'}
          {...restProps}
        />
        <View style={styles.rightItem}>
          {hasil.length >= panjang? <Checklist2/> : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
  },
  label: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginBottom: 5,
  },
  input: (border) =>  ({
    backgroundColor: '#fff',
    borderRadius: 10,
    flex: 1,
    borderWidth: border != '' ? 1 : 0,
    paddingLeft: 20,
    color: '#4a4a4a',
  }),
  rightItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default TextInput;

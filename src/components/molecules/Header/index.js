import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome'
import { BackArrow } from '../../../assets';

const Header = ({title, subTitle, backArrow, onPress}) => {

    return (
        <View style={styles.container}>
            {backArrow && (
                <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.backArrowWrapper}>
                    <BackArrow/>
                </TouchableOpacity>
            )}
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleWrapper: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    backArrowWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Roboto-Bold'
    },
    subTitle: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Roboto-Regular'
    }
})

export default Header;

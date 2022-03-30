import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({text,borderWidth = 0,borderColor = '#fafafa', color = '#125DB1', textColor = '#fff', onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={styles.container(color, borderWidth, borderColor)}>
                <Text style={styles.text(textColor)}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: (color, borderWidth, borderColor) => ({
        padding: 14,
        backgroundColor: color,
        borderRadius: 10,
        borderWidth: borderWidth,
        borderColor: borderColor
    }),

    text: (color) => ({
        color: color,
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 16
    })
        
})

export default Button;

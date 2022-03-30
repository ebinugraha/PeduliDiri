import React from 'react';
import {View, StyleSheet} from 'react-native';

const Gap = ({height = 0, width = 0}) => {
    return (
        <View style={{height: height, width: width}} />
    );
}

const styles = StyleSheet.create({})

export default Gap;

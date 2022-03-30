import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  HomeOn,
  HomeOff,
  PlusOn,
  PlusOff,
  HistoryOn,
  HistoryOff,
} from '../../../assets';

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Home':
      return focus ? (
        <View
          style={{
            backgroundColor: '#125DB1',
            height: 44,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 13,
          }}>
          <HomeOn />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#fff',
            height: 44,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 13,
          }}>
          <HomeOff />
        </View>
      );
    case 'Checkin':
      return focus ? (
        <View
          style={{
            backgroundColor: '#125DB1',
            height: 44,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 13,
          }}>
          <PlusOn />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#fff',
            height: 44,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 13,
          }}>
          <PlusOff />
        </View>
      );
    case 'History':
      return focus ? (
        <View
          style={{
            backgroundColor: '#125DB1',
            height: 44,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 13,
          }}>
          <HistoryOn />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#fff',
            height: 44,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 13,
          }}>
          <HistoryOff />
        </View>
      );
    default:
      return <HomeOn />;
  }
};

const BottomTabNavigator = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon focus={isFocused} label={label} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 7,
    paddingHorizontal: 35,
    justifyContent: 'space-between',
  },
});

export default BottomTabNavigator;

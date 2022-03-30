import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const BottomSheetCard = ({tampil}) => {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['50%'], []);

  if(tampil === true){
      useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          style={styles.modal}
          index={0}
          snapPoints={snapPoints}
          ref={bottomSheetModalRef}
          handleIndicatorStyle={{backgroundColor: '#fff'}}>
          <View style={styles.bottomContainer}>
            <Text>Ini modal</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomSheetCard;

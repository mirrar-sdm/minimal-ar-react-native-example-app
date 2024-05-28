import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Button,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import { ARViewComponent } from '@mirrar-sdm/minimal-ar-react-native-sdk';
import { AR_Service } from '../../services/AR_Service';
import RNPickerSelect from 'react-native-picker-select';
import { FaceModel, HandModel } from '../../constants/Images';

const CategorySwitcher = () => {
  const items = [
    { label: 'Face', value: 'face' },
    { label: 'Hand', value: 'hand' },
  ];

  const [selectedType, setSelectedType] = useState(items[0]?.value);

  const updateAR = (value: string) => {
    if (!AR_Service.arEngineSetupDone) return;

    let modelImage = '';
    if (value == 'face') {
      modelImage = FaceModel;
      AR_Service.setupFaceTracking();
    } else if (value == 'hand') {
      modelImage = HandModel;
      AR_Service.setupHandTracking();
    }

    if (AR_Service.currentMode == 'model') {
      AR_Service.changeModelImage(modelImage);
    }
  };

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 4,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      backgroundColor: 'white',
      paddingRight: 10, // to ensure the text is never behind the icon
    },
  });

  return (
    <View style={styles.picker}>
      <RNPickerSelect
        onValueChange={(value) => {
          updateAR(value);
          setSelectedType(value);
        }}
        items={items}
        style={pickerSelectStyles}
        value={selectedType}
      />
    </View>
  );
};

const AR_ModeSwitcher = () => {
  const [isCameraEnabled, setisCameraEnabled] = useState(false);

  const toggleSwitch = () =>
    setisCameraEnabled((previousState) => !previousState);

  useEffect(() => {
    console.log('React Native SDK: Switching modes');
    if (!isCameraEnabled) {
      let model = FaceModel;
      AR_Service.switchToModel(model);
    } else {
      AR_Service.switchToCamera();
    }
  }, [isCameraEnabled]);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('ar-event', (event) => {
      console.log('Event from WebView:', event);
      Alert.alert('Event from WebView', JSON.stringify(event));
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.switchContainer}>
      <Text>Model</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isCameraEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isCameraEnabled}
      />
      <Text>Camera</Text>
    </View>
  );
};

interface TakePhotoButtonProps {
  handleTakePhoto: () => void;
}

const TakePhotoButton = ({ handleTakePhoto }: TakePhotoButtonProps) => {
  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={handleTakePhoto} />
    </View>
  );
};

const AR_ViewComponent = () => {
  const [showActions, setShowActions] = useState(false);
  const handleTakePhotoPress = () => {};

  return (
    <View style={styles.container}>
      <ARViewComponent onLoad={() => setShowActions(true)} />
      {showActions && (
        <>
          <AR_ModeSwitcher />
          <View style={styles.takePhotoContainer}>
            <CategorySwitcher />
            <TakePhotoButton handleTakePhoto={handleTakePhotoPress} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  webViewContainer: {
    flex: 1,
  },
  productListContainer: {
    height: 250, // Adjust the height as needed for the product list
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  takePhotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  picker: {
    margin: 2,
    flex: 1,
    padding: 0,
  },
});

export default AR_ViewComponent;

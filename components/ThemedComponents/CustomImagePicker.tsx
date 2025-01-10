import React from 'react';
import ThemedIconSymbol from './ThemedIconSymbol';
import { Image, StyleSheet } from 'react-native';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedPressable from './ThemedPressable';
import * as ImagePicker from 'expo-image-picker';

export type CustomImagePickerProps = {
  image: string | null;
  setImage: (newUri: string) => void;
};

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ image, setImage }) => {
  const borderColor = useThemeColor({}, 'primary');

  const takePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    if (!result.canceled && !!result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  if (!image) {
    return (
      <ThemedPressable
        themeColor="primary_soft"
        style={[{ borderColor }, styles.containerPlaceholder]}
        onPress={takePicture}
      >
        <ThemedIconSymbol themeColor="primary" name="plus" size={50} />
      </ThemedPressable>
    );
  }

  return (
    <ThemedPressable style={styles.containerImage} onPress={takePicture}>
      <Image style={styles.image} source={{ uri: image }} />
    </ThemedPressable>
  );
};

export default CustomImagePicker;

const styles = StyleSheet.create({
  containerImage: {
    height: 150,
  },
  containerPlaceholder: {
    alignItems: 'center',
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 2,
    height: 150,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 15,
    flex: 1,
  },
});

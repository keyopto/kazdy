import React, { useState } from 'react';
import ThemedIconButton from '../ThemedComponents/ThemedIconButton';
import { StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import type { Recording } from 'expo-av/build/Audio';

export type RecordButtonProps = {
  onRecordDone: (uri: string) => void;
};

const RecordButton: React.FC<RecordButtonProps> = ({ onRecordDone }) => {
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [currentRecording, setCurrentRecording] = useState<Recording>();

  const onPressInButtonRecord = async () => {
    //start recording
    try {
      if (permissionResponse?.status !== 'granted') {
        await requestPermission();
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setCurrentRecording(recording);
    } catch (e) {
      throw new Error('Could not start recording', { cause: e });
    }
  };

  const onPressOutButtonRecord = async () => {
    if (!currentRecording) {
      throw new Error('Stopping non-existent recording');
    }

    await currentRecording.stopAndUnloadAsync();
    const uri = currentRecording.getURI();

    if (!uri) {
      throw new Error('Could not retrieve uri from recording');
    }
    setCurrentRecording(undefined);
    onRecordDone(uri);
  };

  return (
    <ThemedIconButton
      iconName="mic"
      style={styles.buttonRecord}
      onPressIn={onPressInButtonRecord}
      onPressOut={onPressOutButtonRecord}
    />
  );
};

export default RecordButton;

const styles = StyleSheet.create({
  buttonRecord: {
    bottom: 10,
    position: 'absolute',
    right: 10,
  },
});

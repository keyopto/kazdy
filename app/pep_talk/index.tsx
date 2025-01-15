import ModalAddPepTalk from '@/components/PepTalks/ModalAddPepTalk';
import PepTalkItem from '@/components/PepTalks/PepTalkItem';
import RecordButton from '@/components/PepTalks/RecordButton';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import usePepTalks from '@/hooks/usePepTalks';
import type { PepTalk } from '@/types/PepTalk';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export type PepTalkListProps = {
  goalId: string;
};

const PepTalkList: React.FC<PepTalkListProps> = () => {
  const [isModalAddPepTalkVisible, setIsModalPepTalkVisible] = useState<boolean>(false);
  const { goalId } = useLocalSearchParams<PepTalkListProps>();
  const [uriRecord, setUriRecord] = useState<string | undefined>(undefined);
  const { pepTalks } = usePepTalks({ goalId: Number(goalId) });
  const [soundPlaying, setSoundPlaying] = useState<
    { pepTalkId: number; sound: Sound } | undefined
  >();

  const stopSound = async () => {
    if (!soundPlaying) {
      return;
    }

    await soundPlaying.sound.stopAsync();
    await soundPlaying.sound.unloadAsync();
  };

  const onPressButtonSound = async (pepTalk: PepTalk) => {
    if (soundPlaying) {
      await stopSound();
      if (soundPlaying.pepTalkId === pepTalk.id) {
        setSoundPlaying(undefined);
        return;
      }
    }

    const { sound } = await Audio.Sound.createAsync({
      uri: pepTalk.uri,
    });

    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.isLoaded && status.didJustFinish) {
        await stopSound();
        setSoundPlaying(undefined);
      }
    });

    await sound.playAsync();

    setSoundPlaying({
      pepTalkId: pepTalk.id,
      sound,
    });
  };

  const closeModalAddPepTalk = () => {
    setIsModalPepTalkVisible(false);
    setUriRecord(undefined);
  };

  const onRecordDone = (uri: string) => {
    setUriRecord(uri);
    setIsModalPepTalkVisible(true);
  };

  const isPlaying = (pepTalk: PepTalk) => {
    return !!soundPlaying && pepTalk.id === soundPlaying.pepTalkId;
  };

  return (
    <ThemedView themeColor="background" style={styles.container}>
      <FlatList
        data={pepTalks}
        keyExtractor={(pepTalk) => {
          return pepTalk.id.toString();
        }}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }) => {
          return (
            <PepTalkItem
              pepTalk={item}
              onPressPlayButton={onPressButtonSound}
              isPlaying={isPlaying(item)}
            />
          );
        }}
      />
      <RecordButton onRecordDone={onRecordDone} />
      <ModalAddPepTalk
        isVisible={isModalAddPepTalkVisible}
        dismiss={closeModalAddPepTalk}
        uriRecord={uriRecord}
        goalId={Number(goalId)}
      />
    </ThemedView>
  );
};

export default PepTalkList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    gap: 10,
    padding: 10,
  },
});

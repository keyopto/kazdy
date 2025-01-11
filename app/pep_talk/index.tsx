import ModalAddPepTalk from '@/components/PepTalks/ModalAddPepTalk';
import RecordButton from '@/components/PepTalks/RecordButton';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import usePepTalks from '@/hooks/usePepTalks';
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

  const closeModalAddPepTalk = () => {
    setIsModalPepTalkVisible(false);
    setUriRecord(undefined);
  };

  const onRecordDone = (uri: string) => {
    setUriRecord(uri);
    setIsModalPepTalkVisible(true);
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={pepTalks}
        keyExtractor={(pepTalk) => {
          return pepTalk.id.toString();
        }}
        renderItem={({ item }) => {
          return (
            <ThemedView>
              <ThemedText> {item.uri} </ThemedText>
            </ThemedView>
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
});

import type { PepTalk } from '@/types/PepTalk';
import React from 'react';
import ThemedText from '../ThemedComponents/ThemedText';
import ThemedView from '../ThemedComponents/ThemedView';
import formatDate from '@/utils/formatDate';
import { StyleSheet } from 'react-native';
import ThemedIconButton from '../ThemedComponents/ThemedIconButton';
import type { IconSymbolName } from '../ThemedComponents/IconSymbol';
import useThemeColor from '@/hooks/useThemeColor';

export type PepTalkItemProps = {
  pepTalk: PepTalk;
  onPressPlayButton: (pepTalk: PepTalk) => Promise<void>;
  isPlaying: boolean;
};

const PepTalkItem: React.FC<PepTalkItemProps> = ({ pepTalk, onPressPlayButton, isPlaying }) => {
  const borderColor = useThemeColor({}, 'text');

  const getInformationContainer = () => {
    return (
      <ThemedView style={styles.informationContainer}>
        {pepTalk.title ? <ThemedText> {pepTalk.title} </ThemedText> : null}
        <ThemedText> {formatDate(pepTalk.date)} </ThemedText>
      </ThemedView>
    );
  };

  const getIconName = (): IconSymbolName => {
    if (isPlaying) {
      return 'stop';
    }
    return 'play';
  };

  return (
    <ThemedView style={[{ borderColor }, styles.container]}>
      {getInformationContainer()}
      <ThemedIconButton iconName={getIconName()} onPress={() => onPressPlayButton(pepTalk)} />
    </ThemedView>
  );
};

export default PepTalkItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  informationContainer: {
    gap: 5,
  },
});

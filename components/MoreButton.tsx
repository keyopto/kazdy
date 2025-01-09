import React from 'react';
import type { PressableProps } from 'react-native';
import ThemedPressable from './ThemedComponents/ThemedPressable';
import ThemedIconSymbol from './ThemedComponents/ThemedIconSymbol';

export type MoreButtonProps = PressableProps;

const MoreButton: React.FC<MoreButtonProps> = ({ ...rest }) => {
  return (
    <ThemedPressable {...rest}>
      <ThemedIconSymbol name="table.badge.more" />
    </ThemedPressable>
  );
};

export default MoreButton;

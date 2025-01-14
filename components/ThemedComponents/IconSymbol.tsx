import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { type OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

const MAPPING = {
  house: 'home',
  calendar: 'calendar-month',
  'table.badge.more': 'more-vert',
  'cross.fill': 'close',
  'bin.xmark.fill': 'delete',
  'calendar.circle.fill': 'edit-calendar',
  plus: 'add',
  checklist: 'check',
  mic: 'mic',
  'audio.jack.mono': 'multitrack-audio',
  play: 'play-arrow',
  stop: 'stop',
  gear: 'settings',
  'list.dash': 'list',
  magnifyingglass: 'search',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

export type IconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
};

const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color, style }) => {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
};

export default IconSymbol;

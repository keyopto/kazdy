import type { ImageSourcePropType } from 'react-native';

declare module '*.png' {
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpeg' {
  const value: ImageSourcePropType;
  export default value;
}
//declare module '*.svg' {
//  const content: ImageSourcePropType;
//  export default content;
//}

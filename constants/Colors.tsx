const Colors = {
  light: {
    text: '#11181C',
    text_error: '#cd2d0b',
    background: '#fff',
    background_transparent: 'rgba(255, 255, 255, 0.7)',
    border_input: '#c8c8c8',
    border_error_input: '#cd2d0b',
    box: '#c8c8c8',
    placeholder_color: '#ccc',
    add_button: '#cecece',
    primary: '#9c6f9f',
    primary_soft: '#c3acc4',
    button: '#9c6f9f',
    modal_bottom_color: '#ccc',
    transparent: 'transparent',
    correct: '#64a85e',
  },
  dark: {
    text: '#ECEDEE',
    text_error: '#cd2d0b',
    background: '#151718',
    background_transparent: 'rgba(0, 0, 0, 0.7)',
    border_input: '#c8c8c8',
    border_error_input: '#cd2d0b',
    box: '#c8c8c8',
    placeholder_color: '#ccc',
    add_button: '#cecece',
    primary: '#9c6f9f',
    primary_soft: '#4a414b',
    button: '#9c6f9f',
    modal_bottom_color: '#333',
    transparent: 'transparent',
    correct: '#64a85e',
  },
};

export default Colors;

export type ColorType = keyof typeof Colors.light & keyof typeof Colors.dark;

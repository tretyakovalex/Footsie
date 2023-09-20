// Public Import
import { StyleSheet } from 'react-native';
import { Colours } from '../global-style';

// Footer -> Navigation Section
export const footerStyle = StyleSheet.create({
  // Footer Container, 
  container: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
  },

  colours: {
    backgroundColor: Colours.bgColour,
  },

  borders: {
    borderTopColor: Colours.inactiveText,
    borderTopWidth: '1px',
  },

  navContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  pageText: {
    fontSize: 14 ,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 25,
  }
});


import { StyleSheet } from 'react-native';

export const TeamSection = StyleSheet.create({
  global: {
    logo: {
      height: 40,
      width: 40,
    },
    teamName: {
      fontSize: 15,
      color: '#99B494',
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      color: '#99B494',
    },
  },

  topPositioning: {
    structure: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    teamContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    middleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
    },
  },

  bottomPositioning: {
    structure: {
      marginTop: 10,
      width: '100%',
      flex: 1,
      flexDirection: 'column', // Updated to column
      justifyContent: 'flex-start', // Updated to flex-start
      alignItems: 'center', // Updated to center
    },
    valueContainer: {
      marginTop: 8,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 8,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
});

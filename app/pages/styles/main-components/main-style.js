// Public Import
import { StyleSheet } from 'react-native';
import { Colours } from '../global-style';

// Main -> Content Section
export const MainStructure = StyleSheet.create({
    size: {
      flex: 7,
    },
  
    colours: {
      backgroundColor: Colours.bgColour,
    },
});


export const loadingStyle = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    textStyle: {
        marginTop: 10,
        color: 'white',
        fontSize: 20,
    }
})


export const contentStyle = StyleSheet.create({
    noMatch: {
        color: Colours.inactiveText,
        fontSize: 24,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
    standardText: {
        color: 'white',
        fontSize: 20,
    }
})


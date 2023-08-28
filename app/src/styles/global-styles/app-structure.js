// Public Import
import { StyleSheet } from 'react-native';

// Private Import
import { Colours } from './global';

// Header -> Tab Section
export const HeaderStructure = StyleSheet.create({
    headerSize: {
        flex: 1.5,
    },

    colours: {
        backgroundColor: Colours.mainGreen,
    }, 
})


// Main -> Content Section
export const MainStructure = StyleSheet.create({
    size: {
        flex: 7,
    },

    colours: {
        backgroundColor: Colours.bgColour,
    }
})


// Footer -> Navigation Section
export const FooterStructure = StyleSheet.create({
    size: {
        flex: 1,
    },

    colours: {
        backgroundColor: Colours.bgColour,
    },

    borders: {
        borderTopColor: Colours.inactiveText,
        borderTopWidth: '1px',
    }
})


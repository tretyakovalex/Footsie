import { StyleSheet } from 'react-native';


// Image shown
export const PageImage = StyleSheet.create({
    imageSize: {
        height: '100%', 
        width: '100%', 
    }
});

// Small table
export const SmallTableDesign = StyleSheet.create({

    statDesign: {
        flexDirection: 'column'
    },  
    separationTopBottom: {
        flex: 1, 
    }, 

    teamBasicText: {
        fontSize: 12, 
        color: 'white', 
        textAlign: 'center'
    }, 

    teamStatText: {
        color: 'white', 
        fontSize: 13, 
        textAlign: 'center'
    }
})
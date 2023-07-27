import { StyleSheet } from 'react-native';

// Search Bar Component
export const SearchBarStyle = StyleSheet.create({
    // CHECK HEIGHT AND WIDTH
    container: {
        height: 80, 
    },

    searchContainer: {
        backgroundColor: 'rgba(203, 209, 201, 0.3)',
        borderRadius: 15,
        width: '85%',
        height: '60%',
        marginLeft: 'auto',
        marginRight: 'auto', 
        marginTop: 'auto', 
        marginBottom: 'auto'
    },  

    miniContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    // No user input
    inactiveText: {
        color: 'grey',
        textAlign: 'center'
    },

    // User input
    
    activeText: {
        flex: 4,
        color: 'black',
    },

    // CHECK HEIGHT AND WIDTH
    searchButton: {
        flex: 1,
        height: 35,
        width: 35
    },

    // TEMPORARY IMAGE
    searchImage: {
        textAlign: 'center',
        color: 'red',
        fontSize: 20,
    },


})

// Search Option Component 
export const SearchOptionStyle = StyleSheet.create({
    // Individual Options
    textContainer: {
        height: 40, 
        borderBottomWidth: 1.5, 
        borderBottomColor: '#5D685A',
        paddingTop: 5,
    },

    optionText: {
        fontSize: 18,
        textAlign: 'center',
    },

    // Search Option
    container: {
        flex: 1, 
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        borderWidth: 2, 
        borderColor: 'rgba(16, 70, 3, 0.4)',
    }
})

// Search Page Component
export const SearchPageStyle = StyleSheet.create({
    container: {
        flex: 2,
    },
})
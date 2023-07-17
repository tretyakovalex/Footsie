import { StyleSheet } from 'react-native';


export const SearchBar = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }, 

    pressableContainer: {
        height: 40,
        width: 100,
        marginRight: 30,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#AAB2A8',
      },

    temporaryText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    }, 

    closeButton: {
        position: 'absolute',
        top: -1,
        right: -1,
        marginLeft: 2,
        backgroundColor: '#103B05',
        height: 40,
        width: 30,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,

    },

    closeText: {
        color: 'black',
        marginTop: 'auto',
        marginBottom: 'auto',
        textAlign: 'center',
        fontSize: 18,
    }
})

export const LeagueStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    buttonContainer: {
        flex: 1,
    },

    optionText: {
        color: 'white', 
        fontSize: 18,
        textAlign: 'center',
    },

    leagueText: {
        textDecorationLine: 'underline',
    }
})
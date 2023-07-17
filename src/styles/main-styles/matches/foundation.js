import { StyleSheet } from 'react-native';

import { Colours } from '../../global-styles/global';

export const LeagueFoundation = StyleSheet.create({
    container: {
        backgroundColor: "#12320B",
        height: 40,
    },

    leagueContainer: {
        paddingLeft: 10,
        flexDirection: "row",
    },

    league: {
        fontSize: 16,
        color: Colours.inactiveText,
        marginTop: 10,
        marginLeft: 10,

    }
})

export const MatchFoundation = StyleSheet.create({
    container: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: Colours.inactiveText,
        flex: 1,
    },

    secondContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20
    },

    home: {
        marginTop: 'auto',
        marginBottom: 'auto',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '100%',

        logo: {
            marginTop: 'auto',
            marginBottom: 'auto',

            height: 20,
            width: 20,
        },

        name: {
            marginTop: 'auto',
            marginBottom: 'auto',
            color: 'white',
            fontSize: 13,
        }, 
        score: {
            marginTop: 'auto',
            marginBottom: 'auto',
            color: 'white', 
            fontSize: 18
        }
    },

    matchInformation: {
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 30,
        flex: 1,

        time: {
            color: 'white',
            fontSize: 8,
            textAlign: 'center',
            marginLeft: 3,
        },

        startTime: {
            color: 'white',
            fontSize: 12,
            textAlign: 'center',
            marginTop: -10,
            marginLeft: 3,
        },
        
        score: {
            color: 'white',
            fontSize: 12,
            textAlign: 'center',
        }
    },

    away: {
        marginTop: 'auto',
        marginBottom: 'auto',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',

        logo: {
            marginTop: 'auto',
            marginBottom: 'auto',

            height: 20,
            width: 20,
        },
        name: {
            marginTop: 'auto',
            marginBottom: 'auto',
            color: 'white',
            fontSize: 13,
            textAlign: "center"
        },

        score: {
            marginTop: 'auto',
            marginBottom: 'auto',
            color: 'white', 
            fontSize: 18,
        }
    },

    noMatch: {
        color: Colours.inactiveText,
        fontSize: 24,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }

    
})

export const MatchPopUp = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#0E3804',
    height: '60%',
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: "#187600"
  },
  modalText: {
    color: 'yellow',
    fontSize: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
  },
});


import { StyleSheet } from 'react-native';
import { Colours } from '../../global-styles/global';

// Global Text
export const TeamText = StyleSheet.create({
    importantText: {
        color: 'white',
        fontSize: 15,
    },
    statsText: {
        fontSize: 14,
        color: 'white',
    }, 
    centerText: {
        textAlign: 'center'
    },
})

// Team Template Style
export const TeamStyle = StyleSheet.create({
    // Each Team
    container: {
        flex: 1, 
        height: 50,
        justifyContent: 'center',
        paddingRight: 10, 
        paddingLeft: 0,
    },

    // Each Element For A Team (Rank, Stats etc)
    eachElementContainer: {
        flexDirection: 'row'
    },

    // Ranking
    ranking: {
        flex: 0.2, 
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    // Team Name
    teamNameContainer: {
        flex: 1.5, 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    teamImage: {
        height: 15, 
        width: 15
    },

    teamName: {
        marginLeft: 3
    },

    // Each Team Statistics
    statsContainer: {
        flex: 3.5, 
        flexDirection: 'row',
        marginTop: 5
    },  

    displayStats: {
        flex: 1, 
        alignItems: 'center',
    }, 

    form: {
        flex: 2, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

// Header Style
export const HeaderStyle = StyleSheet.create({
    // Header Container
    container: {
        height: 20,
        marginBottom: 10,
        flexDirection: 'row',
        paddingRight: 10, 
        paddingLeft: 10, 
    },  

    // Each Header Section
    eachHeaderElement: {
        marginLeft: 15, 
    },

    statsNumberSection: {
        flexDirection: 'row', 
        flex: 1, 
    }
})

export const BackgroundColours = StyleSheet.create({
    colorA: {
        backgroundColor: '#131614' // Grey
    },
    colorB: {
        backgroundColor: '#1B3613' // Green
    }
})
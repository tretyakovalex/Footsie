import { StyleSheet } from 'react-native';

// ORIGINAL MARGIN TOP 30

export const DropdownStyle = StyleSheet.create({
    statisticsContainer: {
        marginTop: 30,
    },  

    originalContainer: {
        position: 'absolute',
        left: 105,
        top: 50,
        height: 80,
        width: 200,
        borderRadius: 10,
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: "rgba(87, 74, 74, 0.5)",
        justifyContent: "center",
        alignItems: 'center'
    },

    optionContainer: {
        marginTop: 130,
        marginLeft: "auto",
        marginRight: "auto",
        height: 400,
        width: 300, 
    },

    options: {
        justifyContent: "center",
        borderWidth: 1, 
        borderColor: "rgba(131, 135, 130, 0.5)",
        height: 80,
        marginTop: 20,
        text: {
            color: "white",
            fontSize: 18,
        }
    }

})
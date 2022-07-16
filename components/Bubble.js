import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Bubble(props) {
    return (
        <View style={props.type === 'coach' ? styles.coachContainer : styles.userContainer}>
            <Text style={props.type === 'coach' ? styles.coachText : styles.userText}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    coachContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderColor: "rgba(232, 232, 234, 0.8)",
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 2,
        shadowColor: "rgba(17, 17, 17, 0.05)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 12,
        shadowRadius: 5,
        maxWidth: 320,
        alignSelf: 'flex-start'
    },
    userContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#6D31FF',
        borderColor: '#4919BD',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 8,

        shadowColor: "rgba(17, 17, 17, 0.05)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 4,
        shadowRadius: 5,

        maxWidth: 320,
        alignSelf: 'flex-end'
    },
    userText: {
        fontFamily: 'Gilroy-Medium',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: 20,
        color: '#F5F5FA',
    },
    coachText: {
        fontFamily: 'Gilroy-Medium',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: 20,
        color: '#121A24',
    }

});

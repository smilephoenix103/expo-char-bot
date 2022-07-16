import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

const Button = (props) => {
    var [isPress, setIsPress] = React.useState(false);
    var touchProps = {
        activeOpacity: 1,
        underlayColor: '#4919BD',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
        style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: props.onPress,
        title: props.title       // <-- "onPress" is apparently required
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight {...touchProps}>
                <Text style={styles.text}>{touchProps.title}</Text>
            </TouchableHighlight>
        </View>
    );
}

var styles = StyleSheet.create({
    btnNormal: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 3,
        backgroundColor: '#6d31ff',
        borderColor: '#4919BD',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 8,
        marginHorizontal: 6,
    },
    btnPress: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 3,
        backgroundColor: '#4919BD',
        borderColor: '#4919BD',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 8,
        marginHorizontal: 6,
    },
    text: {
        fontFamily: 'Gilroy-Medium',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: 0.25,
        color: '#F5F5FA',
    },

});

export default Button;

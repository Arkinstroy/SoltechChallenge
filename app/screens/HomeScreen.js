import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, Switch } from 'react-native';
import colors from '../config/colors';
import clock from '../Clock';

function HomeScreen(props) {

    const [counter, setCounter] = useState(0);
    const [counterChangeValue, setCounterChangeValue] = useState(1);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState, 
        setCounter(0), 
        setCounterChangeValue(isEnabled ? 1 : 2));

    return (
        <View style={styles.container}>
            <Text style = {styles.clockText}>{clock()}</Text>
            <View style = {styles.bottomContainer}>
                <View style = {{
                    width: '20%'
                }}/>
                <TouchableOpacity style = {styles.button} onPress = {() => setCounter(counter - counterChangeValue)}>
                    <Text style = {styles.counterText}>-</Text>
                </TouchableOpacity>
                <View style = {{
                    width: '20%'
                }}>
                    <Text style = {styles.counterText}>{counter}</Text>
                </View>
                <TouchableOpacity style = {styles.button} onPress = {() => setCounter(counter + counterChangeValue)}>
                    <Text style = {styles.counterText}>+</Text>
                </TouchableOpacity>
                <View style = {{
                    width: '20%'
                }}>
                    <Switch
                        trackColor= {{ false: 'black', true: 'gray' }}
                        thumbColor = 'white'
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>

            <StatusBar backgroundColor={colors.primary} barStyle='light-content'/>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: StatusBar.currentHeight,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: '10%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    clockText: {
        flex: 1,
        fontSize: 24,
        color: colors.text,
        textAlign: 'center',
        textAlignVertical: 'top',
        paddingTop: '10%'
    },
    counterText: {
        flex: 1,
        fontSize: 24,
        color: colors.text,
        textAlign: 'center',
        textAlignVertical: 'bottom'
    },
    button: {
        width: '10%',
        height: '10%',
    }
})

export default HomeScreen;
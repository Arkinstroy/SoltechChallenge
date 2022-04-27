import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, Text, Dimensions, Switch } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import colors from '../config/colors';
import getData from '../GetFromAPI';


function GraphScreen(props) {

    let parsedData = {
        labels: ['Loading'],
        datasets: []
    };
    parsedData.datasets.push({data: [3000]});
    parsedData.datasets.push({data: [3000]});

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const data = getData();
    parseData(data);

    function parseData (rawData) {
        if (rawData.chart != undefined) {
            parsedData = {
                labels: [],
                datasets: []
            };
            parsedData.datasets.push({data: []});
            parsedData.datasets.push({data: []});

            for (let i = 30; i >= 15; i--) {
                parsedData.labels.push((Math.ceil(rawData.chart[i][0] / 86400)).toString());
                parsedData.datasets[0].data.push(rawData.chart[i][1]);
                parsedData.datasets[1].data.push(rawData.chart[i][2]);
            }     
        }
    }
    
    
    return (
        <View style = {styles.container}>
            <View style = {{
                flex: 1,
            }}>
                <Text style = {styles.textTop}>
                    Etherium price in {isEnabled ? 'Bitcoin' : 'US dollars'}
                </Text>
            </View>
            <View style = {{
                flex: 1,
                justifyContent: 'flex-end',
                paddingTop: '40%'
            }}>
                <LineChart
                    data={{labels: parsedData.labels, datasets: [parsedData.datasets[isEnabled ? 1 : 0]]}}
                    width={Dimensions.get("window").width}
                    height={Dimensions.get("window").height / 2.5}
                    verticalLabelRotation= {-60}
                    xLabelsOffset = {20}
                    chartConfig={{
                        backgroundGradientFrom: colors.graphGradientStart,
                        backgroundGradientTo: colors.graphGradientEnd,
                        decimalPlaces: isEnabled ? 5 : 0,                        
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
            <View style = {{
                flex: 0.25,
                paddingTop: '5%'
            }}>
                <Text style = {styles.textBottom}>
                    Days since January 1st, 1970
                </Text>
            </View>
            <View style = {{
                flex: 0.75,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Switch
                    trackColor= {{ false: 'black', true: 'gray' }}
                    thumbColor = 'white'
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    
                />
            </View>

            <StatusBar backgroundColor={colors.primary} barStyle='light-content'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: StatusBar.currentHeight
    },
    textBottom: {
        flex: 1,
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
        textAlignVertical: 'top',
    },  
    textTop: {
        flex: 1,
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
        textAlignVertical: 'center',
    },  
})

export default GraphScreen;
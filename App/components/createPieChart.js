import React from 'react'
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function CreatePieChart({pieData}) {
    return(
    <PieChart
        data={pieData}
        width={Dimensions.get("window").width}
        height={200}
        chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
        }}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        center={[0, 0]}
        absolute
    />
    )
}
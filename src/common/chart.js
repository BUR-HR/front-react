import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    { date: "08-07", category: "근무시간", hours: 8 },
    { date: "08-07", category: "연장근무", hours: 1 },
    { date: "08-07", category: "휴가", hours: 0 },
    { date: "08-08", category: "근무시간", hours: 7 },
    { date: "08-08", category: "연장근무", hours: 2 },
    { date: "08-08", category: "휴가", hours: 0 },
    { date: "08-09", category: "근무시간", hours: 8 },
    { date: "08-09", category: "연장근무", hours: 0 },
    { date: "08-09", category: "휴가", hours: 1 },
    { date: "08-10", category: "근무시간", hours: 6 },
    { date: "08-10", category: "연장근무", hours: 3 },
    { date: "08-10", category: "휴가", hours: 0 },
    { date: "08-11", category: "근무시간", hours: 8 },
    { date: "08-11", category: "연장근무", hours: 0 },
    { date: "08-11", category: "휴가", hours: 0 },
];

let list = [];
const groupedData = data.reduce((acc, item) => {
    const existingItem = acc.find((entry) => entry.date === item.date);
    if (existingItem) {
        existingItem[item.category] = item.hours;
    } else {
        list.push({ date: item.date, [item.category]: item.hours });
    }
    return list;
}, [data]);

const Chart = () => {
    return (
        <BarChart width={500} height={150} data={groupedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis/>
            <Tooltip />
            <Legend align="right" verticalAlign="middle" layout="vertical" wrapperStyle={{right: 0}}/>
            <Bar dataKey="근무시간" fill="#8884d8" stackId="stack" />
            <Bar dataKey="연장근무" fill="#82ca9d" stackId="stack"/>
            <Bar dataKey="휴가" fill="#ffc658" stackId="stack"/>
        </BarChart>
    );
};

export default Chart;

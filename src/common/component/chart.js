import moment from "moment/moment";
import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { formattedDate } from "../function/DateFormat";

let data = [];
// [
//     { date: "08-07", "근무시간": 3, "연장근무": 4 },
//     { date: "08-07", category: "휴가", hours: 0 },
//     { date: "08-08", category: "근무시간", hours: 7 },
//     { date: "08-08", category: "연장근무", hours: 2 },
//     { date: "08-08", category: "휴가", hours: 0 },
//     { date: "08-09", category: "근무시간", hours: 8 },
//     { date: "08-09", category: "연장근무", hours: 0 },
//     { date: "08-09", category: "휴가", hours: 1 },
//     { date: "08-10", category: "근무시간", hours: 6 },
//     { date: "08-10", category: "연장근무", hours: 3 },
//     { date: "08-10", category: "휴가", hours: 0 },
//     { date: "08-11", category: "근무시간", hours: 8 },
//     { date: "08-11", category: "연장근무", hours: 0 },
//     { date: "08-11", category: "휴가", hours: 0 },
// ];

// let list = [];
// const groupedData = data.reduce((acc, item) => {
//     const existingItem = acc.find((entry) => entry.date === item.date);
//     if (existingItem) {
//         existingItem[item.category] = item.hours;
//     } else {
//         list.push({ date: item.date, [item.category]: item.hours });
//     }
//     return list;
// }, [data]);

const Chart = ({ history }) => {
    let data = [];

    if (history?.length !== 0) {
        

        data = history.map((item) => ({
            date: formattedDate(item.startDateTime),
            근무시간: item.workTime,
            연장근무: item.overTime,
        }));

        // 이번주 월요일부터 금요일까지의 날짜를 생성합니다.
        const currentDate = moment();
        const startOfWeek = currentDate.clone().isoWeekday(1); // 이번주 월요일
        const endOfWeek = currentDate.clone().isoWeekday(7); // 이번주 금요일

        const dateLabels = [];
        let currentDay = startOfWeek.clone();

        while (currentDay.isSameOrBefore(endOfWeek)) {
            dateLabels.push(currentDay.format("MM-DD"));
            currentDay.add(1, "day");
        }

        // 빈 데이터가 있는 날짜에 대한 레코드를 생성합니다.
        dateLabels.forEach((date) => {
            const existingData = data.find((item) => item.date === date);
            if (!existingData) {
                data.push({
                    date: date,
                    근무시간: 0,
                    연장근무: 0,
                });
            }
        });

        data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }
    
    return (
        <BarChart width={500} height={150} data={data} barCategoryGap={10}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis interval={1}/>
            <Tooltip />
            <Legend
                align="right"
                verticalAlign="middle"
                layout="vertical"
                wrapperStyle={{ right: 0 }}
            />
            <Bar dataKey="근무시간" fill="#8884d8" stackId="stack" />
            <Bar dataKey="연장근무" fill="#82ca9d" stackId="stack" />
            <Bar dataKey="휴가" fill="#ffc658" stackId="stack" />
        </BarChart>
    );
};

export default Chart;

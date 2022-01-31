import React, {useEffect, useMemo} from 'react';

import { Chart } from "react-charts";

import UseDemoConfig from "../config/useDemoConfig";
// import UseLagRadar from "../config/useLagRadar";
import ResizableBox from "../config/ResizableBox";

export default function HistoryChart(props) {
	const {
		data,
		primaryAxisShow,
		secondaryAxisShow,
		randomizeData,
		Options
	} = UseDemoConfig({
		series: 1,
		show: ["primaryAxisShow", "secondaryAxisShow"]
	});

	const axes = useMemo(
		() => [
			{
				primary: true,
				position: "bottom",
				type: "ordinal",
				show: primaryAxisShow
			},
			{ position: "left", type: "linear", show: secondaryAxisShow }
		],
		[primaryAxisShow, secondaryAxisShow]
	);
	
	const chartData = [
		{
			label: 'SLM',
			data: props.chartData,
			// fill: false,
			// borderColor: 'rgb(75, 192, 192)',
			// tension: 0.1
		}
	];
	
	return (
		<div>
			<ResizableBox>
				<Chart data={chartData} axes={axes} tooltip />
			</ResizableBox>
		</div>

	);

}


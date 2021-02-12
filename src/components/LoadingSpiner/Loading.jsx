import React from "react";
import { LoopCircleLoading } from "react-loadingg";
// import {MeteorRainLoading, SemipolarLoading} from "react-loadingg";
import s from "./css/style.module.css";

const Loading = () => (
	<div className={s.loading}>
		<LoopCircleLoading color="#db150b" size="large" />
	</div>
);

export default Loading;

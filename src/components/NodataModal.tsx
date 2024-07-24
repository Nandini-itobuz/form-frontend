import { useLottie } from "lottie-react";
import noDataAnimation from '../helper/noData.json'

const NodataModal = () => {
	const options = {
		animationData: noDataAnimation,
		loop: true,

	};

	const { View } = useLottie(options);
	return <div className=" w-[100%] sm:w-[55%] m-auto" >{View}</div>;
}

export default NodataModal
import {useEffect, useState} from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";

const MyTuits = () => {
	const [tuits, setTuits] = useState([]);
	const findMyTuits = () =>
		service.findTuitByUser("me")
			.then(tuits => setTuits(tuits));
	console.log(tuits)
	// on load invoke findMyTuits
	useEffect(findMyTuits, []);
	return(
		// render my tuits and pass refresh(findMyTuits) event handler
		<Tuits tuits={tuits}
			   refreshTuits={findMyTuits}/>
	);
};

export default MyTuits;
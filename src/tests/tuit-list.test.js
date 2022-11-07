import Tuits from "../components/tuits/index";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import {screen, render} from "@testing-library/react";
import axios from "axios";

//jest.mock('axios');

const MOCKED_USERS = [
	{username: 'alice', password: 'alice123', email: 'alice@gmail.com', _id: 'alice777'},
	{username: 'bob', password: 'bob123', email: 'bob@gmail.com', _id: 'bob777'},
	{username: 'charlie', password: 'charlie123', email: 'charlie@gmail.com', _id: 'charlie777'}
];

const MOCKED_TUITS = [
	"alice's tuit", "bob's tuit", "charlie's tuit"
];

test('tuit list renders static tuit array', () => {
	// mock inserting tuit
	const mockTuits = []
	for(var count = 0; count < MOCKED_TUITS.length; count++){
		mockTuits.push({_id: "tuit" + count, tuit: MOCKED_TUITS[count], postedBy: MOCKED_USERS[count]._id})
	}
	// render a tuit array
	render(
		<HashRouter>
			<Tuits tuits={mockTuits}/>
		</HashRouter>);
	// verify tuit appears in screen somewhere
	const linkElement = screen.getByText(/alice's tuit/i);
	expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
	// my implementation
	const tuits = await findAllTuits();
	
	render(
		<HashRouter>
			<Tuits tuits ={tuits}/>
		</HashRouter>);
		
		const linkElement = screen.getByText(/Dan's first tuit/i);
		expect(linkElement).toBeInTheDocument();
	
})

test('tuit list renders mocked', async () => {
	//my implementation
	const mocktuits = []
	for(var count = 0; count < MOCKED_TUITS.length; count++){
		mocktuits.push({_id: "tuit" + count, tuit: MOCKED_TUITS[count], postedBy: MOCKED_USERS[count]._id})
	}
	
	const mock = jest.spyOn(axios, 'get');
	
	mock.mockImplementation(() =>
	Promise.resolve({data:{tuits:mocktuits}}));
	
	const response = await findAllTuits();
	const tuitList = response.tuits;
	
	render(
		<HashRouter>
			<Tuits tuits={tuitList}/>
		</HashRouter>);
	
	const linkElement = screen.getByText(/bob's tuit/i);
	expect(linkElement).toBeInTheDocument();
});

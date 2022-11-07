import {createTuit, deleteTuitByContent, findAllTuits, findTuitById} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('can create tuit with REST API', () => {
	// my implementation
	
	const test1 = {
		username: 'test',
		password: 'test777',
		email: 'test1@gmail.com'
	};
	
	const testTuit = {
		tuit: 'Test1s first tuit. test1Rules'
	}
	
	beforeAll(async () => {
		return  await deleteTuitByContent(testTuit.tuit);
	})
	
	afterAll(async () => {
		 const delete1 = await deleteTuitByContent(testTuit.tuit)
		 const delete2 = await deleteUsersByUsername(test1.username)
		
		return await Promise.all([delete1, delete2])
		
	})
	
	test('can insert new tuit with REST API', async () => {
		const user = await createUser(test1);
		const tuit = await createTuit(user._id, testTuit)
		
		expect(tuit.tuit).toEqual(testTuit.tuit);
		expect(tuit.postedBy).toEqual(user._id)
	})
});

describe('can delete tuit wtih REST API', () => {
	// my implementation
	const test1 = {
		username: 'test',
		password: 'test777',
		email: 'test1@gmail.com'
	};
	
	const testTuit = {
		tuit: 'Test1 first tuit. test1Rules'
	}
	
	afterAll(async () =>{
		const delete3 = deleteTuitByContent(testTuit.tuit)
		const delete4 = deleteUsersByUsername(test1.username)
		return Promise.all([delete3, delete4])
		
	})
	
});

describe('can retrieve a tuit by their primary key with REST API', () => {
	// my implementation
	const test1 = {
		username: 'test',
		password: 'test777',
		email: 'test1@gmail.com'
	};
	
	const testTuit = {
		tuit: 'Test1 first tuit. test1Rules'
	}
	
	afterAll(async () =>{
		const delete5 =  deleteTuitByContent(testTuit.tuit)
		const delete6 = deleteUsersByUsername(test1.username)
		return Promise.all([delete5, delete6])
		
	})
	
	test('can retrieve a tuit by their primary key with REST API', async () =>{
		const user = await createUser(test1);
		const tuit = await  createTuit(user._id, testTuit)
		
		expect(tuit.tuit).toEqual(testTuit.tuit);
		expect(tuit.postedBy).toEqual(user._id);
		
		const tuitFromDb = await findTuitById(tuit._id);
		
		expect(tuitFromDb.tuit).toEqual(testTuit.tuit);
		expect(tuitFromDb.postedBy._id).toEqual(user._id);
	})
});

describe('can retrieve all tuits with REST API', () => {
	// my implementation
	const test1 = {
		username: 'test',
		password: 'test777',
		email: 'test1@gmail.com'
	};
	
	const listOfTuits = [
		"Sample tuit 1",
		"Sample tuit 2",
		"Sample tuit 3",
		"Sample tuit 4"
	];
	
	beforeAll(async () => {
		const  user = await createUser(test1)
		test1._id = user._id;
		
		await Promise.all(listOfTuits.map(tuit => createTuit(user._id, {tuit: tuit})))
	});
	
	afterAll(async () =>{
		await Promise.all(listOfTuits.map(tuit => deleteTuitByContent(tuit)))
		
		await deleteUsersByUsername(test1.username)
	});
	
	test('can retrieve all tuits with REST API', async () => {
		const tuits = await findAllTuits();
		
		const tuitsWeInserted = tuits.filter(
			tuit => listOfTuits.indexOf(tuit.tuit) >= 0
		);
		
		expect(tuitsWeInserted.length).toEqual(listOfTuits.length);
		console.log(tuitsWeInserted);
		tuitsWeInserted.forEach(tuit =>{
			const content = listOfTuits.find(content => content === tuit.tuit);
			expect(tuit.tuit).toEqual(content);
			expect(tuit.postedBy).toEqual(test1._id);
		});
	});
});

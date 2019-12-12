import 'react-app-polyfill/ie9';
import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Container/Home';
import { Collapse, Button } from '@material-ui/core';

function App() {
	const [checked, setChecked] = React.useState(true);
	const changeState=()=>{
		setChecked(false);
	}
	return (
		<div className="App">
			<Collapse in={checked}>
				<Home/>
				<Button onClick={changeState}>Comenzar</Button>
			</Collapse>
			{checked ? null : <NavBar/>}
		</div>
	);
}

export default App;

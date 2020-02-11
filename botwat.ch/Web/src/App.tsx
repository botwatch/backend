import React, {useEffect, useState} from 'react';
import './App.css';
import {Machine} from "./data/Machine";
import matchSorter from 'match-sorter';
import NavigationBar from "./components/NavigationBar";
import {Api} from './utilities/Api';
import MachineGrid from "./pages/MachineGrid";
import {Ticket} from "./data/Ticket";

function App() {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [displayMachines, setDisplayMachines] = useState<Machine[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        (async function anyNameFunction() {            
            let machineResponse: Machine[] = await Api.Fetch<Machine[]>("machine");
            setMachines(machineResponse);
            setDisplayMachines(machineResponse.sort((m, n) => n.machineNumber - m.machineNumber));
            let ticketResponse: Ticket[] = await Api.Fetch<Ticket[]>("ticket");
            setTickets(ticketResponse);           
        })();
    }, []);

    const filter = async (event: object, value: string) => {
        setDisplayMachines(matchSorter(machines, value, {keys: ['machineNumber', 'company', 'location']}));
    };
    return (
        <div>
            <NavigationBar filter={filter} machines={machines}/>
            <MachineGrid machines={displayMachines} tickets={tickets}/>
        </div>
    );
}


export default App;

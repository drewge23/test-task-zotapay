import './App.css';
import DateTimeRangeSelector from "./DateTimeRangeSelector";
import {useState} from "react";

function App() {
    const [value, onChange] = useState([null])

    return (
        <div className="App">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto corporis dignissimos dolorum id
                impedit in incidunt ipsam ipsum itaque laudantium odit porro quae quidem, quis reprehenderit sit ullam
                voluptas voluptate.</p>
            <DateTimeRangeSelector value={value} onChange={onChange}/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto corporis dignissimos dolorum id
                impedit in incidunt ipsam ipsum itaque laudantium odit porro quae quidem, quis reprehenderit sit ullam
                voluptas voluptate.</p>
        </div>
    );
}

export default App;

import './App.css';
import React from 'react';
import DateTimeRangeSelector from './DateTimeRangeSelector';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

function App() {
  const [value, onChange] = useState([new Date(), new Date()]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="App">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        corporis dignissimos dolorum id impedit in incidunt ipsam ipsum itaque
        laudantium odit porro quae quidem, quis reprehenderit sit ullam voluptas
        voluptate.
      </p>
      <DateTimeRangeSelector value={value} onChange={onChange} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        corporis dignissimos dolorum id impedit in incidunt ipsam ipsum itaque
        laudantium odit porro quae quidem, quis reprehenderit sit ullam voluptas
        voluptate.
      </p>
    </div>
  );
}

export default App;

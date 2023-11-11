import './styles/global.css';

import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        Counter
      </button>
      <p className="text-red-500 text-bold">{count}</p>
    </div>
  );
}

export default App;

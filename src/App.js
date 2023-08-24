import { useState } from 'react';
import axios from 'axios';
import CGLogo from './chatGPT.png';
import AppLogo from './app-logo.png';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // communicate with API
    // post input value  as 'prompt' to API end point 
    axios
      .post("http://localhost:5555/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  return (
    <div className="wrapper">
      <img src={AppLogo} alt="" className="app-logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything......"
        />
        <button type="submit">
          Send
        </button>
      </form>
      <p className="response-area">

        {loading ?
          <img src={CGLogo} alt="" className='cg-logo loading' />
          :
          response}
      </p>
      <div className="footer">
        run-ur-gpt
      </div>
    </div>
  );
}

export default App;
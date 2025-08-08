import { useState } from 'react';
import axios from 'axios';

function AssistantComponent() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    try {
      const res = await axios.post('/api/assistant/ask', { text: input });
      setResponse(res.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ask the Assistant</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Ask a question..."
      />
      <br />
      <button onClick={handleAsk}>Ask Assistant</button>
      <div style={{ marginTop: '20px' }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default AssistantComponent;

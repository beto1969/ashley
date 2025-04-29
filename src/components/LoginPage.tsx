import { useState } from 'react';


const PASSWORD = "you";

export default function LoginPage() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      navigate('/body');
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Enter</button>
      </form>
    </div>
  );
}

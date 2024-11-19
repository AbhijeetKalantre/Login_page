import { useState } from 'react';
import './App.css';
function App() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const handleSubmit = async (event) => {
event.preventDefault();
const userData = {
name: name,
email: email,
};
try {
const response = await
fetch('http://localhost:3000/api/data', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(userData),
});
const data = await response.json();
console.log('User added:', data);
alert('User added successfully!');
} catch (error) {
console.error('Error:', error);
alert('Failed to add user');
}
};
return (
<div>
<h1>Create User</h1>
<form onSubmit={handleSubmit}>
<div>
<label>Name:</label>
<input
type="text"
value={name}
onChange={(e) =>
setName(e.target.value)}
required
/>
</div>
<div>
<label>Email:</label>
<input
type="email"
value={email}
onChange={(e) =>
setEmail(e.target.value)}
required
/>
</div>
<button type="submit">Submit</button>
</form>
</div>
);
}
export default App;
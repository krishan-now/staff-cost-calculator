import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [jobs, setJobs] = useState([{ title: '', quantity: 1, level: 'Junior' }]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const handleAddJob = () => setJobs([...jobs, { title: '', quantity: 1, level: 'Junior' }]);

  const handleChange = (i, field, value) => {
    const updated = [...jobs];
    updated[i][field] = value;
    setJobs(updated);
  };

  const handleSubmit = () => {
    setShowForm(true);
  };

  const handleLeadSubmit = async () => {
    await axios.post('/api/submit-lead', {
      ...formData,
      jobs,
      timestamp: new Date().toISOString(),
    });
    window.location.href = '/results';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Staff Cost Calculator</h1>
      {jobs.map((job, i) => (
        <div key={i} className="mb-2 flex gap-2">
          <input className="border p-2 w-1/3" placeholder="Job Title"
            value={job.title} onChange={(e) => handleChange(i, 'title', e.target.value)} />
          <input className="border p-2 w-1/6" type="number" placeholder="Qty"
            value={job.quantity} onChange={(e) => handleChange(i, 'quantity', e.target.value)} />
          <select className="border p-2" value={job.level}
            onChange={(e) => handleChange(i, 'level', e.target.value)}>
            <option>Junior</option><option>Mid</option><option>Senior</option>
          </select>
        </div>
      ))}
      <button onClick={handleAddJob} className="mt-2 p-2 bg-blue-500 text-white rounded">Add Role</button>
      <button onClick={handleSubmit} className="mt-4 ml-4 p-2 bg-green-600 text-white rounded">Next</button>

      {showForm && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Enter Your Details</h2>
          <input className="border p-2 block w-full mb-2" placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input className="border p-2 block w-full mb-2" placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input className="border p-2 block w-full mb-2" placeholder="Company"
            onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
          <button onClick={handleLeadSubmit} className="mt-2 p-2 bg-purple-700 text-white rounded">Submit & View Results</button>
        </div>
      )}
    </div>
  );
}


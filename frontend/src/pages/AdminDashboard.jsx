import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ status: '', jobId: '' });
  const [loading, setLoading] = useState(true);
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    skills: '',
    type: 'Internship',
    location: '',
    stipend: '',
    isActive: true
  });
  const [savingJob, setSavingJob] = useState(false);

  const fetchData = () => {
    setLoading(true);
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.jobId) params.jobId = filters.jobId;

    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/applications`, { params }),
      axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
    ])
      .then(([appsRes, jobsRes]) => {
        setApplications(appsRes.data);
        setJobs(jobsRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/applications/${id}/status`, { status });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error updating status');
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.description || !jobForm.location || !jobForm.type) {
      alert('Please fill all required fields');
      return;
    }
    setSavingJob(true);
    try {
      const payload = {
        ...jobForm,
        skills: jobForm.skills ? jobForm.skills.split(',').map(s => s.trim()).filter(Boolean) : []
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, payload);
      alert('Job posted successfully!');
      setJobForm({
        title: '',
        description: '',
        skills: '',
        type: 'Internship',
        location: '',
        stipend: '',
        isActive: true
      });
      fetchData(); 
    } catch (err) {
      console.error('Job post error:', err.response?.data);
      alert(`Error: ${err.response?.data?.msg || 'Failed to post job'}`);
    } finally {
      setSavingJob(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* SECTION 1: POST NEW JOB */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Post a New Job / Internship</h2>
        <form onSubmit={handleJobSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={jobForm.title}
            onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
            required
          />
          <input
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Location"
            value={jobForm.location}
            onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
            required
          />
          <input
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Stipend (e.g. ₹5,000/mo or 'Unpaid')"
            value={jobForm.stipend}
            onChange={e => setJobForm({ ...jobForm, stipend: e.target.value })}
          />  
          <select
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={jobForm.type}
            onChange={e => setJobForm({ ...jobForm, type: e.target.value })}
          >
            <option value="Internship">Internship</option>
            <option value="Job">Job</option>
          </select>
          <input
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Skills (comma separated)"
            value={jobForm.skills}
            onChange={e => setJobForm({ ...jobForm, skills: e.target.value })}
          />
          <textarea
            className="md:col-span-2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Description"
            value={jobForm.description}
            onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
            required
          />
          <div className="flex items-center space-x-2">
            <input
              id="isActive"
              type="checkbox"
              checked={jobForm.isActive}
              onChange={e => setJobForm({ ...jobForm, isActive: e.target.checked })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Active (visible to applicants)
            </label>
          </div>
          <button
            type="submit"
            disabled={savingJob}
            className="btn-primary md:col-span-2"
          >
            {savingJob ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>

      {/* SECTION 2: APPLICATIONS LIST */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold">Applications</h2>
          <div className="flex flex-wrap gap-3">
            <select
              className="p-2 border border-gray-200 rounded-xl text-sm"
              value={filters.jobId}
              onChange={e => setFilters({ ...filters, jobId: e.target.value })}
            >
              <option value="">All Jobs</option>
              {jobs.map(job => (
                <option key={job._id} value={job._id}>{job.title}</option>
              ))}
            </select>
            <select
              className="p-2 border border-gray-200 rounded-xl text-sm"
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

<button 
  onClick={() => {
    // Create CSV header
    let csvContent = "data:text/csv;charset=utf-8,Applicant,Email,Job,Status,AppliedDate\n";
    
    // Add application rows
    applications.forEach(app => {
      const row = [
        app.userId?.name,
        app.userId?.email,
        app.jobId?.title,
        app.status,
        new Date(app.createdAt).toLocaleDateString()
      ].join(",");
      csvContent += row + "\n";
    });

    // Download the file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "job_applications_report.csv");
    document.body.appendChild(link);
    link.click();
  }}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-md"
>
  📊 Export Data (.CSV)
</button>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No applications found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold">Applicant</th>
                  <th className="px-4 py-3 font-semibold">Job</th>
                  <th className="px-4 py-3 font-semibold">Applied On</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app._id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <div className="font-medium">{app.userId?.name}</div>
                      <div className="text-gray-500 text-xs">{app.userId?.email}</div>
                    </td>
                    <td className="px-4 py-3">{app.jobId?.title || 'Job deleted'}</td>
                    <td className="px-4 py-3">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                    <td className="px-4 py-3 space-y-2">
                      <a href={app.resumeLink} target="_blank" rel="noreferrer" className="block text-blue-600 text-xs hover:underline">View resume</a>
                      <select
                        className="p-1 border border-gray-200 rounded text-xs w-full"
                        value={app.status}
                        onChange={e => handleStatusChange(app._id, e.target.value)}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
    Manage Jobs <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">({jobs.length})</span>
  </h2>
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-left">
          <th className="px-4 py-3 font-semibold text-gray-700">Title</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Location</th>
          <th className="px-4 py-3 font-semibold text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => (
          <tr key={job._id} className="border-t border-gray-100">
            <td className="px-4 py-4 font-medium">{job.title}</td>
            <td className="px-4 py-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                {job.type}
              </span>
            </td>
            <td className="px-4 py-4 text-gray-600">{job.location}</td>
            <td className="px-4 py-4 space-x-2">
              {/* 🔁 TOGGLE ACTIVE/CLOSED */}
              <button
                onClick={async () => {
                  try {
                    const newStatus = !job.isActive;
                    await axios.put(
                      `${import.meta.env.VITE_API_URL}/jobs/${job._id}`,
                      { isActive: newStatus }
                    );
                    fetchData(); // refresh jobs + applications
                    alert(`Job ${newStatus ? 'Activated' : 'Closed'}`);
                  } catch (err) {
                    alert('Status change failed');
                  }
                }}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm ${
                  job.isActive
                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {job.isActive ? '⏸️ Close Job' : '▶️ Reopen'}
              </button>

              {/* 🗑️ DELETE JOB */}
              <button 
                onClick={async () => {
                  if (confirm(`Delete "${job.title}"?`)) {
                    try {
                      await axios.delete(
                        `${import.meta.env.VITE_API_URL}/jobs/${job._id}`
                      );
                      fetchData(); // Refresh both lists
                      alert('✅ Job deleted!');
                    } catch (err) {
                      alert('Delete failed');
                    }
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

export default AdminDashboard;
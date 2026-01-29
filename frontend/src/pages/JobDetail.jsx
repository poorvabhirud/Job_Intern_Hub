import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import JobCard from '../components/JobCard';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({ resumeLink: '', coverNote: '' });
  const [loading, setLoading] = useState(true);
  const [appLoading, setAppLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then(res => setJob(res.data.find(j => j._id === id)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    setAppLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/applications`, { jobId: id, ...formData });
      alert('Applied successfully!');
      navigate('/dashboard/user');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error applying');
    }
    setAppLoading(false);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (!job) return <p className="text-center py-20 text-gray-500">Job not found.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <JobCard job={job} />
      <div className="card mt-12">
        <h2 className="text-3xl font-bold mb-8">Apply Now</h2>
        <form onSubmit={handleApply} className="space-y-6">
          <input
            type="url"
            placeholder="Resume Link (Google Drive / PDF URL)"
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={formData.resumeLink}
            onChange={e => setFormData({ ...formData, resumeLink: e.target.value })}
            required
          />
          <textarea
            placeholder="Cover Note (Why you're a great fit)"
            rows={5}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={formData.coverNote}
            onChange={e => setFormData({ ...formData, coverNote: e.target.value })}
            required
          />
          <button type="submit" disabled={appLoading} className="btn-primary w-full text-lg py-4">
            {appLoading ? 'Applying...' : 'Apply Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetail;

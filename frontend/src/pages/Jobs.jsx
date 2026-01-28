import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ 
    type: '', 
    location: '', 
    skills: '', 
    search: ''  // ✅ NEW: Search
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);  // ✅ NEW: Pagination

  const jobsPerPage = 9;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/jobs`, { params: { ...filters, page, limit: jobsPerPage } })
      .then(res => setJobs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [filters, page]);  // ✅ Added page

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(jobs.length / jobsPerPage);  // ✅ Pagination calc

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ✅ Sidebar Filters */}
        <div className="lg:w-1/4 space-y-4 sticky top-8">
          <input
            placeholder="🔍 Search jobs..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
          />
          <input
            placeholder="Location"
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
          />
          <select
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={filters.type}
            onChange={e => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="Internship">Internship</option>
            <option value="Job">Job</option>
          </select>
          <input
            placeholder="Skills (e.g. React)"
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={filters.skills}
            onChange={e => setFilters({ ...filters, skills: e.target.value })}
          />
          {/* ✅ NEW: Clear Filters */}
          <button 
            onClick={() => setFilters({ type: '', location: '', skills: '', search: '' })}
            className="w-full p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-medium"
          >
            Clear All Filters
          </button>
        </div>

        {/* ✅ Job Grid */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {jobs.map(job => (
              <Link key={job._id} to={`/jobs/${job._id}`} className="block hover:scale-105 transition-transform">
                <JobCard job={job} />
              </Link>
            ))}
          </div>

          {/* ✅ NEW: Pagination */}
          {jobs.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-lg sticky bottom-0">
              <div className="text-sm text-gray-600">
                Showing {((page-1)*jobsPerPage)+1}-{Math.min(page*jobsPerPage, jobs.length)} of {jobs.length} jobs
              </div>
              <div className="flex gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p-1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 font-medium transition-all"
                >
                  ← Previous
                </button>
                <span className="px-6 py-3 font-bold text-lg">{page}</span>
                <button 
                  disabled={jobs.length < jobsPerPage}
                  onClick={() => setPage(p => p+1)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium transition-all shadow-lg"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {jobs.length === 0 && (
            <div className="text-center py-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or clearing them.</p>
              <button 
                onClick={() => setFilters({ type: '', location: '', skills: '', search: '' })}
                className="btn-primary px-8 py-4 text-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;


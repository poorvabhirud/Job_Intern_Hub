import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/applications/me`)
      .then(res => {
        // Ensure array and handle missing data
        const safeApps = Array.isArray(res.data) 
          ? res.data.map(app => ({
              ...app,
              jobTitle: app.jobId?.title || 'Job Unavailable',
              safeStatus: app.status || 'Applied'
            }))
          : [];
        setApplications(safeApps);
      })
      .catch(err => {
        console.error('UserDashboard error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
        <h2 className="text-3xl font-bold mb-6">Your Applications</h2>
        {applications.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Yet</h3>
            <p className="text-gray-500 mb-6">Start applying to jobs from the Jobs page.</p>
            <a href="/jobs" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
              Browse Jobs
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div 
                key={app._id} 
                className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border-l-4 border-blue-500 hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {app.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Applied on: {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'short', day: 'numeric' 
                      }) : 'Date unavailable'}
                    </p>
                    {app.coverNote && (
                      <p className="text-gray-600 italic mb-4 text-sm line-clamp-2">
                        "{app.coverNote}"
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <StatusBadge status={app.safeStatus} />
                    {app.resumeLink && (
                      <a 
                        href={app.resumeLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        📄 View Resume
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

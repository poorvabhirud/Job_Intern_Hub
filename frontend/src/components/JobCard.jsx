import React from 'react';

const JobCard = ({ job }) => {
  const skillsArray = Array.isArray(job.skills) 
    ? job.skills 
    : (typeof job.skills === 'string' ? job.skills.split(',').map(s => s.trim()).filter(Boolean) : []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-[1.02]">
      {/* ✅ NEW: Stipend & Title Row */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
        {job.stipend && (
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100 shadow-sm">
            💰 {job.stipend}
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {job.type}
          </span>
          <span className="text-gray-500 text-sm">•</span>
          <span className="text-gray-700 font-medium">{job.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {skillsArray.length > 0 ? (
            skillsArray.map((skill, i) => (
              <span 
                key={`${job._id}-skill-${i}`} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs font-semibold"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs italic">No specific skills listed</span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
        {job.isActive ? (
          <span className="flex items-center text-green-600 text-sm font-bold">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Actively Hiring
          </span>
        ) : (
          <span className="text-red-500 text-sm font-bold">Closed</span>
        )}
        <span className="text-blue-600 text-sm font-semibold group-hover:underline">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default JobCard;

import React from 'react';

const StatusBadge = ({ status }) => {
  const safeStatus = status || 'Applied';

  const getStatusClasses = (status) => {
    switch(status) {
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shortlisted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Selected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border capitalize ${getStatusClasses(safeStatus)}`}>
      {safeStatus}
    </span>
  );
};

export default StatusBadge;


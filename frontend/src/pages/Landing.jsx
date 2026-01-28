import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Your Career Starts <span className="text-blue-600">Here.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            The all-in-one platform to find top internships and entry-level jobs. 
            Connect with companies, track applications, and land your dream role.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              to="/jobs" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-blue-200 hover:-translate-y-1"
            >
              Browse Opportunities
            </Link>
            <Link 
              to="/signup" 
              className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 border-2 border-gray-100 shadow-lg hover:-translate-y-1"
            >
              Join the Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {[
          { label: 'Active Postings', value: '500+' },
          { label: 'Partnerships', value: '120+' },
          { label: 'Hired Monthly', value: '1.2k' },
          { label: 'Success Rate', value: '94%' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Hub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Smart Matching',
              desc: 'Our algorithm finds roles that match your specific skill set and career goals perfectly.',
              icon: '🚀'
            },
            {
              title: 'Direct Dashboard',
              desc: 'Track every single application status in real-time. No more "ghosting" from recruiters.',
              icon: '📊'
            },
            {
              title: 'Verified Roles',
              desc: 'Every internship and job post is verified by our team to ensure high-quality opportunities.',
              icon: '✅'
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Ready to take the next step?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of students and graduates who have found their professional start through our platform.
            </p>
            <Link 
              to="/signup" 
              className="inline-block bg-white text-gray-900 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Started for Free
            </Link>
          </div>
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

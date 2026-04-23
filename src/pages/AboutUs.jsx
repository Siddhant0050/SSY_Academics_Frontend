import React from 'react';

const AboutUs = () => {
  const stats = [
    { label: 'Learners', value: '10k+', color: 'text-ssyPrimary' },
    { label: 'Courses', value: '50+', color: 'text-ssyInfo' },
    { label: 'Placements', value: '500+', color: 'text-ssySuccess' },
    { label: 'Expert Tutors', value: '15+', color: 'text-ssyWarning' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Vision Header */}
      <section className="bg-gradient-to-r from-ssySecondary to-gray-800 py-20 px-8 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission: Your Career</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            SSY Academics is dedicated to bridging the gap between classroom theory and industry reality. 
            We provide hands-on training that empowers developers to build the future.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-4">
              <div className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-600 font-medium uppercase text-sm tracking-widest mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-ssySecondary">Why Learn with SSY Academics?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-ssyPrimary font-bold">01</span>
              </div>
              <p className="text-gray-600"><strong>Practical Projects:</strong> We don't just teach syntax; we build real-world applications like E-commerce and CRM systems.</p>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-ssyInfo font-bold">02</span>
              </div>
              <p className="text-gray-600"><strong>Career Support:</strong> From resume building to mock interviews, we stay with you until you get placed.</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 h-80 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
           <span className="text-gray-400 font-semibold italic">Core Team Image / Illustration</span>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
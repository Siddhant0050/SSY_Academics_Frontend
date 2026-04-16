import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-udemyDark mb-4">
        Admin Dashboard 🛠️
      </h1>

      <div className="bg-white p-6 shadow border">
        <p className="text-gray-600">
          Welcome admin! Manage users, courses, batches, and placements here.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
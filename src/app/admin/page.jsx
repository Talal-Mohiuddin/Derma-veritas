export default function AdminDashboard() {
  const stats = [
    { name: 'Total Users', value: '1,234', change: '+12%', icon: '👥' },
    { name: 'Products', value: '89', change: '+5%', icon: '📦' },
    { name: 'Appointments', value: '156', change: '+18%', icon: '📅' },
    { name: 'Orders', value: '342', change: '+23%', icon: '🛍️' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-purple-100 text-lg">Here's what's happening with DermaVeritas today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">#{item}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{1000 + item}</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-green-600 text-sm font-medium">$89.99</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent appointments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A{item}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Patient Consultation</p>
                    <p className="text-xs text-gray-500">Today, 2:00 PM</p>
                  </div>
                </div>
                <span className="text-blue-600 text-sm font-medium">Pending</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

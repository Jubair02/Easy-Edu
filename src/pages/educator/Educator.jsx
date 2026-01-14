import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  FileText, 
  BarChart2, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X, 
  TrendingUp, 
  Plus, 
  Upload 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Footer from '../../Components/Student/Footer';

// --- MOCK DATA ---

const statsData = [
  { title: "Total Students", value: "1,240", change: "+12%", isPositive: true, icon: Users },
  { title: "Active Courses", value: "8", change: "0%", isPositive: true, icon: BookOpen },
  { title: "Avg Rating", value: "4.6", change: "+0.2", isPositive: true, icon: TrendingUp },
  { title: "Total Earnings", value: "$3,420", change: "+18%", isPositive: true, icon: BarChart2 },
];

const analyticsData = [
  { name: 'Mon', revenue: 400, students: 24 },
  { name: 'Tue', revenue: 300, students: 18 },
  { name: 'Wed', revenue: 550, students: 35 },
  { name: 'Thu', revenue: 450, students: 28 },
  { name: 'Fri', revenue: 700, students: 45 },
  { name: 'Sat', revenue: 600, students: 40 },
  { name: 'Sun', revenue: 800, students: 50 },
];

const coursesData = [
  { 
    title: "React for Beginners", 
    students: 120, 
    status: "Published", 
    rating: 4.8, 
    progress: 100, 
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
  },
  { 
    title: "Advanced Node.js API", 
    students: 85, 
    status: "Draft", 
    rating: 0, 
    progress: 40, 
    img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
  },
  { 
    title: "UI/UX Design Principles", 
    students: 200, 
    status: "Published", 
    rating: 4.9, 
    progress: 100, 
    img: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
  },
];

const recentActivity = [
  { user: "Sarah L.", action: "enrolled in", target: "React for Beginners", time: "2m ago" },
  { user: "Mike T.", action: "submitted assignment", target: "Node.js API", time: "15m ago" },
  { user: "System", action: "Course approved", target: "UI/UX Design", time: "1h ago" },
  { user: "Anna R.", action: "left a review", target: "React for Beginners", time: "3h ago" },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BookOpen, label: "My Courses", active: false },
  { icon: Users, label: "Students", active: false },
  { icon: FileText, label: "Assignments", active: false },
  { icon: BarChart2, label: "Analytics", active: false },
  { icon: MessageSquare, label: "Messages", active: false },
  { icon: Settings, label: "Settings", active: false },
];

// --- MAIN COMPONENT ---

export default function EducatorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* 1. MOBILE OVERLAY (Only visible on small screens when sidebar is open) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gray-800">EduDash</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group ${
                item.active 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon 
                size={20} 
                className={`mr-3 transition-colors ${item.active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}`} 
              />
              {item.label}
            </a>
          ))}
        </nav>

        {/* User Profile (Bottom of Sidebar) */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <div>
              <p className="text-sm font-semibold text-gray-700">Alex Morgan</p>
              <p className="text-xs text-gray-500">Lead Instructor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="flex-none h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-md"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400 ml-2">vs last month</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            {/* ANALYTICS CHART (Takes up 2 columns) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
                <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#9CA3AF', fontSize: 12}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#9CA3AF', fontSize: 12}} 
                      tickFormatter={(value) => `$${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#4F46E5' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4F46E5" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SIDE PANELS (Takes up 1 column) */}
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="font-bold text-lg mb-1">Quick Actions</h3>
                <p className="text-indigo-100 text-sm mb-6 opacity-90">Manage your content efficiently.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all border border-white/10 backdrop-blur-sm">
                    <Plus size={24} className="mb-2" />
                    <span className="text-sm font-medium">New Course</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all border border-white/10 backdrop-blur-sm">
                    <Upload size={24} className="mb-2" />
                    <span className="text-sm font-medium">Upload File</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-4 relative">
                      {/* Timeline Line */}
                      {index !== recentActivity.length - 1 && (
                        <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-gray-100"></div>
                      )}
                      
                      <div className="mt-1 w-6 h-6 rounded-full bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center flex-shrink-0 z-10">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-indigo-600">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MY COURSES SECTION */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">My Courses</h3>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All Courses →</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData.map((course, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.img} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.status === 'Published' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">{course.title}</h4>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{course.students} Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span>{course.rating > 0 ? course.rating : 'N/A'}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Course Completion</span>
                        <span className="font-medium text-gray-700">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-1000" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                        Edit Course
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100">
                        Analytics
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
      
    </div>
  );
}
import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    BarChart3,
    Calendar,
    Bell,
    Settings,
    User,
    LogOut,
    Search,
    Filter,
    ChevronDown,
    Plus,
    Eye,
    Edit,
    Trash2,
    Check,
    X,
} from 'lucide-react';

type Performance = 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
type Status = 'Active' | 'Inactive';

interface Student {
    id: string;
    name: string;
    email: string;
    grade: string;
    attendance: number;
    performance: Performance;
    status: Status;
    credits?: number;
    activities?: number;
    clubs?: string[];
    skills?: string[];
}

interface Activity {
    id: string;
    title: string;
    description: string;
    date: string;
    type: string;
    credits?: number;
    category?: string;
    status?: string;
    verifiedBy?: string;
}

const sampleStudents: Student[] = [
    { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', grade: 'B.Tech CSE 3rd Year', attendance: 92, performance: 'Excellent', status: 'Active', credits: 145, activities: 28, clubs: ['Coding Club'], skills: ['React', 'Python'] },
    { id: '2', name: 'Priya Patel', email: 'priya.patel@example.com', grade: 'MBA 2nd Year', attendance: 88, performance: 'Good', status: 'Active', credits: 120, activities: 22, clubs: ['Debate Society'], skills: ['Marketing'] },
    { id: '3', name: 'Aman Verma', email: 'aman.verma@example.com', grade: 'B.Sc 2nd Year', attendance: 74, performance: 'Average', status: 'Active', credits: 98, activities: 10, clubs: ['NSS'], skills: ['Public Speaking'] },
    { id: '4', name: 'Simran Kaur', email: 'simran.kaur@example.com', grade: 'B.Tech ECE 4th Year', attendance: 96, performance: 'Excellent', status: 'Active', credits: 160, activities: 35, clubs: ['Robotics'], skills: ['Embedded Systems'] },
];

const sampleActivities: Activity[] = [
    { id: 'a1', title: 'International AI Conference', description: '3-day international conference on AI.', date: '2024-01-15', type: 'Conference', credits: 5, category: 'Academic', status: 'Approved', verifiedBy: 'Dr. Amit Kumar' },
    { id: 'a2', title: 'Google Cloud Certification', description: 'Completed Google Cloud Associate Engineer.', date: '2024-01-10', type: 'Certification', credits: 8, category: 'Technical', status: 'Approved', verifiedBy: 'Prof. Sunita Singh' },
    { id: 'a3', title: 'NSS Community Service', description: 'Blood donation camp and tree plantation.', date: '2023-12-05', type: 'Community Service', credits: 6, category: 'Social', status: 'Pending Approval', verifiedBy: '' },
    { id: 'a4', title: 'Hackathon Winner', description: '1st prize in national hackathon.', date: '2023-11-20', type: 'Competition', credits: 12, category: 'Technical', status: 'Approved', verifiedBy: 'Dr. Anil Gupta' },
    { id: 'a5', title: 'Coursera ML Specialization', description: 'Completed Machine Learning specialization.', date: '2023-10-15', type: 'Online Course', credits: 7, category: 'Academic', status: 'Approved', verifiedBy: 'Prof. Neha Verma' },
];

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'activities' | 'reports'>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [userRole, setUserRole] = useState<'student' | 'faculty' | 'admin'>('admin');

    const [students] = useState<Student[]>(sampleStudents);
    const [activities] = useState<Activity[]>(sampleActivities);

    const pendingApprovals = activities.filter(a => a.status === 'Pending Approval' || a.status === 'Pending');

    const stats = {
        totalStudents: students.length,
        averageAttendance: Math.round(students.reduce((s, a) => s + a.attendance, 0) / Math.max(1, students.length)),
        totalCredits: activities.reduce((s, a) => s + (a.credits || 0), 0),
        pendingApprovals: pendingApprovals.length,
        activityCategories: {
            academic: activities.filter(a => a.category === 'Academic').length,
            technical: activities.filter(a => a.category === 'Technical').length,
            extracurricular: activities.filter(a => a.category === 'Extracurricular').length,
            social: activities.filter(a => a.category === 'Social').length
        } as Record<string, number>
    };

    /* -------------------
       Render helpers
       ------------------- */

    const renderDashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Students" value={stats.totalStudents} icon={<Users className="w-6 h-6 text-blue-600" />} />
                <StatCard label="Average Attendance" value={`${stats.averageAttendance}%`} icon={<Calendar className="w-6 h-6 text-green-600" />} />
                <StatCard label="Total Credits Earned" value={stats.totalCredits} icon={<BarChart3 className="w-6 h-6 text-purple-600" />} />
                <StatCard label="Pending Approvals" value={stats.pendingApprovals} icon={<BookOpen className="w-6 h-6 text-yellow-600" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                        <button className="text-blue-600 text-sm font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {activities.slice(0, 5).map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        activity.category === 'Academic' ? 'bg-blue-100' :
                                            activity.category === 'Technical' ? 'bg-purple-100' :
                                                activity.category === 'Extracurricular' ? 'bg-green-100' :
                                                    'bg-yellow-100'
                                    }`}>
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{activity.title}</p>
                                        <p className="text-sm text-gray-600">{activity.description}</p>
                                        <div className="flex items-center mt-1 space-x-2">
                                            <span className="text-xs text-gray-500">{activity.date}</span>
                                            <span className="text-xs font-medium text-blue-600">{activity.credits} credits</span>
                                            <span className={`px-1 py-0.5 rounded text-xs ${
                                                activity.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                        {activity.status}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Activity Categories</h3>
                        <button className="text-blue-600 text-sm font-medium">View Analytics</button>
                    </div>
                    <div className="space-y-4">
                        {Object.entries(stats.activityCategories).map(([category, count]) => (
                            <div key={category} className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${
                                                category === 'academic' ? 'bg-blue-600' :
                                                    category === 'technical' ? 'bg-purple-600' :
                                                        category === 'extracurricular' ? 'bg-green-600' :
                                                            'bg-yellow-600'
                                            }`}
                                            style={{ width: `${Math.min(100, (count / Math.max(1, activities.length)) * 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            { (userRole === 'faculty' || userRole === 'admin') && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Approval Queue</h3>
                        <button className="text-blue-600 text-sm font-medium">Process All</button>
                    </div>
                    <div className="space-y-4">
                        {pendingApprovals.slice(0, 3).map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{activity.title}</p>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">Submitted by: Student ID-{activity.id}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg hover:bg-green-200">
                                        Approve
                                    </button>
                                    <button className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-lg hover:bg-red-200">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                        {pendingApprovals.length > 3 && (
                            <div className="text-center pt-2">
                                <button className="text-blue-600 text-sm font-medium">
                                    View all {pendingApprovals.length} pending approvals
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    const renderStudents = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Student Profiles</h2>
                    <p className="text-gray-600">Comprehensive student activity records and analytics</p>
                </div>
                <div className="flex space-x-2">
                    <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center space-x-2">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Add Record</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search students by name, ID, or activity..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>All Departments</option>
                            <option>Computer Science</option>
                            <option>Business Administration</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program & Year</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activities</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <User className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                            <div className="text-sm text-gray-500">{student.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.grade}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">{student.activities}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {student.credits} credits
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                            student.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                                student.performance === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                    }`}>
                      {student.performance}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800" title="View Portfolio">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="text-green-600 hover:text-green-800" title="Edit Profile">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderActivities = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Activity Tracker</h2>
                    <p className="text-gray-600">Manage and track all student activities and achievements</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Log New Activity</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <SmallCard label="Total Activities" value={activities.length} />
                <SmallCard label="Approved" value={activities.filter(a => a.status === 'Approved').length} />
                <SmallCard label="Pending" value={activities.filter(a => a.status === 'Pending Approval' || a.status === 'Pending').length} />
                <SmallCard label="Total Credits" value={activities.reduce((sum, a) => sum + (a.credits || 0), 0)} />
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search activities..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg">
                            <option>All Types</option>
                            <option>Conference</option>
                            <option>Certification</option>
                            <option>Competition</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg">
                            <option>All Status</option>
                            <option>Approved</option>
                            <option>Pending Approval</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {activities.map((activity) => (
                            <tr key={activity.id}>
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                                        <div className="text-sm text-gray-500">{activity.description}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.type === 'Conference' ? 'bg-blue-100 text-blue-800' :
                            activity.type === 'Certification' ? 'bg-purple-100 text-purple-800' :
                                activity.type === 'Community Service' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.type}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {activity.credits}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {activity.verifiedBy || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="text-green-600 hover:text-green-800">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        { (userRole === 'faculty' || userRole === 'admin') && activity.status !== 'Approved' ? (
                                            <>
                                                <button className="text-green-600 hover:text-green-800" title="Approve"><Check className="w-4 h-4" /></button>
                                                <button className="text-red-600 hover:text-red-800" title="Reject"><X className="w-4 h-4" /></button>
                                            </>
                                        ) : null }
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderReports = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                    <p className="text-gray-600">Generate comprehensive reports for accreditation and evaluation</p>
                </div>
                <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4" />
                        <span>Generate Report</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReportCard title="NAAC Reports" description="Generate reports for NAAC accreditation requirements" />
                <ReportCard title="AICTE Reports" description="Create reports for AICTE compliance and submissions" />
                <ReportCard title="NIRF Reports" description="Prepare data for NIRF rankings and submissions" />
                <ReportCard title="Student Portfolio" description="Export digital portfolio for students" variant="green" />
                <ReportCard title="Department Analytics" description="Department-wise performance and activity reports" variant="purple" />
                <ReportCard title="Custom Reports" description="Create customized reports with specific parameters" variant="gray" />
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return renderDashboard();
            case 'students': return renderStudents();
            case 'activities': return renderActivities();
            case 'reports': return renderReports();
            default: return renderDashboard();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">EduTracker</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <nav className="p-4">
                    <div className="space-y-1">
                        {[
                            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                            { id: 'students', icon: Users, label: 'Students' },
                            { id: 'activities', icon: BookOpen, label: 'Activities' },
                            { id: 'reports', icon: BarChart3, label: 'Reports' },
                        ].map((item) => (
                            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <div className="mb-3 px-1">
                            <label className="text-xs text-gray-500">Role</label>
                            <select value={userRole} onChange={(e) => setUserRole(e.target.value as any)} className="mt-2 block w-full text-sm border border-gray-200 rounded px-2 py-2">
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {[ { id: 'settings', icon: Settings, label: 'Settings' }, { id: 'logout', icon: LogOut, label: 'Logout' } ].map((item) => (
                            <button key={item.id} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className={`lg:pl-64 transition-spacing duration-200 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}`}>
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900 capitalize">{activeTab}</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 text-gray-400 hover:text-gray-600 relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                            </div>
                            <div className="relative">
                                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">Admin</span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="p-6">
                    {renderContent()}
                </main>
            </div>

            {/* Backdrop for mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
        </div>
    );
};

/* ---------- small UI components ---------- */

const StatCard: React.FC<{ label: string; value: string | number; icon?: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
                {icon}
            </div>
        </div>
    </div>
);

const SmallCard: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-sm text-gray-600 mb-1">{label}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
);

const ReportCard: React.FC<{ title: string; description: string; variant?: 'blue' | 'green' | 'purple' | 'gray' }> = ({ title, description, variant = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700',
        purple: 'bg-purple-600 hover:bg-purple-700',
        gray: 'bg-gray-600 hover:bg-gray-700'
    } as const;
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <button className={`w-full ${colors[variant]} text-white px-4 py-2 rounded-lg`}>Generate</button>
        </div>
    );
};

export default App;

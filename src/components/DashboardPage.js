import React from 'react'

const DashboardPage = () => {

    //hardcoding
    const dashboardStats={
        totalTickets: 12,
        solvedTickets: 8,
        awaitingApproval: 2,
        inProgressTickets: 2
    };

    const StatCard=({title, value, bgColor})=>(
        <div className={`p-6 rounded-lg shadow-md flex items-center ${bgColor}`}>
            <div>
                <h3 className='text-xl font-semibold text-white mb-2'>{title}</h3>
                <p className='text-3xl font-bold text-white'>{value}</p>
            </div>
        </div>
    );

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
        <h1 className='text-4xl font-bold mb-8 text-center'>HelpDesk Dashboard</h1>
        <div className='grid grid-cols-2 gap-8'>
            <StatCard
            title="Total Tickets"
            value={dashboardStats.totalTickets}
            bgColor="bg-blue-600"
            />
            <StatCard
                title="Solved Tickets"
                value={dashboardStats.solvedTickets}
                bgColor="bg-green-600"
            />
            <StatCard
                title="Awaiting Approval"
                value={dashboardStats.awaitingApproval}
                bgColor="bg-yellow-600"
            />
            <StatCard
                title="In Progress"
                value={dashboardStats.inProgressTickets}
                bgColor="bg-purple-600"
            />

        </div>     
    </div>
  )
}

export default DashboardPage;

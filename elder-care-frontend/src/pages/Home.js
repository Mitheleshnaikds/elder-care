import React from "react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-blue-200 via-blue-50 to-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              ElderCare
            </h1>
            <p className="mt-4 text-gray-600">
              Safety, health monitoring, and peace of mind for elders and families.
            </p>
          </div>
          <div className="flex md:justify-end">
            <img
              src="https://img.icons8.com/fluency/256/elderly-person.png"
              alt="Elder icon"
              className="h-40 md:h-64 w-auto rounded-2xl object-cover shadow"
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.src = "/logo512.png"; }}
            />
          </div>
        </div>

        {/* Feature blocks (description + images only) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 transition hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 mb-3 text-blue-600">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
              <path fillRule="evenodd" d="M12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Elder Dashboard</h3>
            <p className="text-sm text-gray-600">Access SOS, attendance, and upcoming medication reminders.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 transition hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 mb-3 text-purple-600">
              <path d="M10 8a4 4 0 11-8 0 4 4 0 018 0z" />
              <path d="M14 12a4 4 0 100-8 4 4 0 000 8z" />
              <path d="M2 20v-1c0-2.21 2.686-4 6-4 .838 0 1.64.107 2.382.301A6.983 6.983 0 005 21H2zM14 15c-3.314 0-6 1.79-6 4v1h12v-1c0-2.21-2.686-4-6-4z" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Relative Dashboard</h3>
            <p className="text-sm text-gray-600">See recent alerts, quick links, and status at a glance.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 transition hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 mb-3 text-red-600">
              <path fillRule="evenodd" d="M12 2a1 1 0 01.894.553l9 18A1 1 0 0121 22H3a1 1 0 01-.894-1.447l9-18A1 1 0 0112 2zm0 6a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1zm0 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Alerts</h3>
            <p className="text-sm text-gray-600">View SOS alerts and mark them as read when handled.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 transition hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 mb-3 text-emerald-600">
              <path d="M10.5 2a4.5 4.5 0 00-4.5 4.5V9h9V6.5A4.5 4.5 0 0010.5 2z"/>
              <path fillRule="evenodd" d="M3 9a3 3 0 013-3h9a3 3 0 013 3v7a5 5 0 01-5 5H8a5 5 0 01-5-5V9zm6 2a1 1 0 10-2 0v2H5a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2H9v-2z" clipRule="evenodd"/>
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Medication</h3>
            <p className="text-sm text-gray-600">Add daily medicine reminders and get browser notifications.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 transition hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 mb-3 text-rose-600">
              <path d="M12 21s-6.716-4.532-9.193-7.01A6.5 6.5 0 1112 6.586 6.5 6.5 0 1121.193 13.99C18.716 16.468 12 21 12 21z"/>
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Health Monitoring</h3>
            <p className="text-sm text-gray-600">Record BP, sugar, and heart rate for quick tracking.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 transition hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 mb-3 text-cyan-600">
              <path fillRule="evenodd" d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd"/>
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Geo-Fencing</h3>
            <p className="text-sm text-gray-600">Define a safe zone and visualize SOS locations on map.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 transition hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 mb-3 text-amber-600">
              <path d="M12 8a1 1 0 011 1v3.382l2.447 1.224a1 1 0 11-.894 1.788l-3-1.5A1 1 0 0111 13V9a1 1 0 011-1z"/>
              <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" clipRule="evenodd"/>
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Emergency History</h3>
            <p className="text-sm text-gray-600">Search and review past alerts and events.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 transition hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 mb-3 text-slate-600">
              <path fillRule="evenodd" d="M11.983 2a1 1 0 01.993.883l.176 1.41a7.98 7.98 0 012.256.934l1.283-.77a1 1 0 011.366.366l1 1.732a1 1 0 01-.366 1.366l-1.122.674c.185.63.284 1.296.284 1.98s-.099 1.35-.284 1.98l1.122.674a1 1 0 01.366 1.366l-1 1.732a1 1 0 01-1.366.366l-1.283-.77a7.98 7.98 0 01-2.256.934l-.176 1.41a1 1 0 01-.993.883h-2a1 1 0 01-.993-.883l-.176-1.41a7.98 7.98 0 01-2.256-.934l-1.283.77a1 1 0 01-1.366-.366l-1-1.732a1 1 0 01.366-1.366l1.122-.674A7.953 7.953 0 014 12c0-.684.099-1.35.284-1.98l-1.122-.674a1 1 0 01-.366-1.366l1-1.732a1 1 0 011.366-.366l1.283.77a7.98 7.98 0 012.256-.934l.176-1.41A1 1 0 019.983 2h2z" clipRule="evenodd"/>
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Admin Dashboard</h3>
            <p className="text-sm text-gray-600">Manage users, logs, and system settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



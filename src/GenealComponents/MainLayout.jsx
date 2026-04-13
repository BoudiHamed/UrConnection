import { Outlet, Link, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-black text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity"
          >
            UrConnections
          </Link>

          {isCreatePage ? (
            <Link
              to="/"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all flex items-center shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              ← Go Back
            </Link>
          ) : (
            <Link
              to="/create"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all flex items-center shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              Create New Group
            </Link>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        {/* Specific page content */}
        <Outlet />
      </main>
    </div>
  );
}

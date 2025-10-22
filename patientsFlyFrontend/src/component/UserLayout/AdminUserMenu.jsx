import { Link, useLocation } from "react-router-dom";

const AdminUserMenu = () => {
  const { pathname } = useLocation();
  const navigation = [
    {
      to: "/dashboard/admin",
      name: "Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878..." />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/edit-profile",
      name: "Edit Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13.5l6.768-6.768a2.25..." />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/users-list",
      name: "Users List",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18M3 16h18M3 12h18" />
        </svg>
      ),
    },
    // bookings icon menu
    {
      to: "/dashboard/admin/bookings",
      name: "Bookings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/team-member",
      name: "Team Meet Post",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5V4H2v16h5m10-6a3 3 0 110-6 3 3 0 010 6zm-6 3a6 6 0 0112 0" />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/blog-posts",
      name: "Blog Posts",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25v13.5h13.5V5.25H5.25zM9 9h6M9 12h6M9 15h4" />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/patient-reviews",
      name: "Patient Reviews",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.03 9-6.75S16.97 6.75 12 6.75 3 9.78 3 13.5 7.03 20.25 12 20.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5h.008v.008H12V13.5zM12 9.75v2.25" />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/videos-reviews",
      name: "Videos Reviews",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.03 9-6.75S16.97 6.75 12 6.75 3 9.78 3 13.5 7.03 20.25 12 20.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5h.008v.008H12V13.5zM12 9.75v2.25" />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/company-info",
      name: "Company Info",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75l-9 6.75-9-6.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75v10.5A2.25 2.25 0 006 19.5h12a2.25 2.25 0 002.25-2.25V6.75" />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/registration",
      name: "Admin Registration",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75l-9 6.75-9-6.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75v10.5A2.25 2.25 0 006 19.5h12a2.25 2.25 0 002.25-2.25V6.75" />
        </svg>
      ),
    },
    // admin/contacts icon menu
    {
      to: "/dashboard/admin/contacts",
      name: "Contacts",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75l-9 6.75-9-6.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75v10.5A2.25 2.25 0 006 19.5h12a2.25 2.25 0 002.25-2.25V6.75" />
        </svg>
      ),
    },
    {
      to: "/dashboard/admin/hospital-list",
      name: "Hospital list",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75l-9 6.75-9-6.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75v10.5A2.25 2.25 0 006 19.5h12a2.25 2.25 0 002.25-2.25V6.75" />
        </svg>
      ),
    },
  ];


  return (
    <div className="w-full">
      <nav className="w-full sm:w-80 bg-white dark:bg-gray-900 shadow rounded-xl p-4 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Admin User Menu
        </h2>
        <ul className="space-y-2 text-sm font-medium">
          {navigation.map((item, idx) => {
            const isActive = pathname === item.to;
            return (
              <li key={idx}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-main-color text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="shrink-0">{item.icon}</div>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminUserMenu;

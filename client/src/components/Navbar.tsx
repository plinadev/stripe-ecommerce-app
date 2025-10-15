import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState as useStateHook } from "react";
import {
  HiMenu,
  HiX,
  HiBookOpen,
  HiQuestionMarkCircle,
  HiLogin,
  HiLogout,
  HiUser,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface AuthItem {
  icon: IconType;
  label: string;
  path?: string;
  action?: () => void;
  color?: string;
}
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useStateHook<User | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [auth, setUser]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  const handleNavigate = (path: string) => {
    console.log("Navigate to:", path);
    navigate(path);
    setIsOpen(false);
  };
  const menuItems = [
    { icon: HiBookOpen, label: "Courses", path: "/", color: "text-blue-500" },
    {
      icon: HiQuestionMarkCircle,
      label: "About",
      path: "/about",
      color: "text-purple-500",
    },
  ];

  const authItems: AuthItem[] = user
    ? [
        {
          icon: HiLogout,
          label: "Logout",
          action: logout,
          color: "text-red-500",
        },
      ]
    : [
        {
          icon: HiLogin,
          label: "Login",
          path: "/login",
          color: "text-indigo-500",
        },
      ];

  return (
    <>
      {/* Overlay with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side drawer with gradient */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-2xl z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 hover:text-indigo-600 hover:cursor-pointer rounded-full transition-all"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {user && (
            <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="h-12 w-12 rounded-full border-2 border-white shadow-lg"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <HiUser className="w-6 h-6" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-indigo-500">
                  {user.displayName || "User"}
                </p>
                <p className="text-sm text-blue-300 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col p-4 space-y-2">
          <div className="mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 mb-2">
              Navigation
            </p>
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigate(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group"
              >
                <item.icon
                  className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`}
                />
                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 mb-2">
              Account
            </p>
            {authItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action || (() => handleNavigate(item.path!))}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group"
              >
                <item.icon
                  className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`}
                />
                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-100 to-transparent">
          <p className="text-xs text-center text-gray-500">
            © 2025 Learning Platform
          </p>
        </div>
      </div>

      <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white h-16 px-6 shadow-lg w-full fixed z-20 backdrop-blur-sm">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 hover:bg-white hover:bg-opacity-20 hover:text-indigo-600 hover:cursor-pointer rounded-lg transition-all duration-200 active:scale-95"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <HiMenu className="w-6 h-6" />
          </button>

          <div className="hidden sm:flex items-center space-x-2">
            <HiBookOpen className="w-6 h-6" />
            <span className="font-bold text-lg">LearnHub</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-full pl-3 pr-1 py-1 backdrop-blur-sm">
              <span className="hidden sm:inline text-sm font-bold text-indigo-400">
                {user.displayName}
              </span>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="h-9 w-9 rounded-full border-2 border-white shadow-md"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <HiUser className="w-5 h-5" />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavigate("/login")}
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 hover:shadow-lg active:scale-95 hover:cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;

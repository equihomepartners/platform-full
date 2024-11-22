import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, PieChart, Settings, Brain, ListFilter, Calculator } from 'lucide-react';
import Logo from './Logo';
const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (_jsx("nav", { className: "bg-white shadow-sm", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-16 items-center", children: [_jsx(Link, { to: "/", className: "flex items-center", children: _jsx(Logo, {}) }), _jsxs("div", { className: "bg-gray-100 rounded-lg p-1 flex space-x-1", children: [_jsxs(Link, { to: "/deals", className: `flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${isActive('/deals')
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'}`, children: [_jsx(LayoutGrid, { className: `h-5 w-5 transition-colors ${isActive('/deals') ? 'text-indigo-600' : 'group-hover:text-indigo-600'}` }), _jsx("span", { children: "Loans" })] }), _jsxs(Link, { to: "/fund-dashboard", className: `flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${isActive('/fund-dashboard')
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'}`, children: [_jsx(PieChart, { className: `h-5 w-5 transition-colors ${isActive('/fund-dashboard') ? 'text-indigo-600' : 'group-hover:text-indigo-600'}` }), _jsx("span", { children: "Report" })] }), _jsxs(Link, { to: "/underwrite", className: `flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${isActive('/underwrite')
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'}`, children: [_jsx(Brain, { className: `h-5 w-5 transition-colors ${isActive('/underwrite') ? 'text-indigo-600' : 'group-hover:text-indigo-600'}` }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { children: "Underwrite" }), _jsx("span", { className: "ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono", children: "alpha" })] })] }), _jsxs(Link, { to: "/cio-dashboard", className: `flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${isActive('/cio-dashboard')
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'}`, children: [_jsx(Settings, { className: `h-5 w-5 transition-colors ${isActive('/cio-dashboard') ? 'text-indigo-600' : 'group-hover:text-indigo-600'}` }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { children: "CIO" }), _jsx("span", { className: "ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono", children: "alpha" })] })] }), _jsxs(Link, { to: "/pipeline", className: `flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${isActive('/pipeline')
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'}`, children: [_jsx(ListFilter, { className: `h-5 w-5 transition-colors ${isActive('/pipeline') ? 'text-indigo-600' : 'group-hover:text-indigo-600'}` }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { children: "Pipeline" }), _jsx("span", { className: "ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono", children: "alpha" })] })] }), _jsxs(Link, { to: "/financial-modeling", className: `flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${isActive('/financial-modeling')
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'}`, children: [_jsx(Calculator, { className: `h-5 w-5 transition-colors ${isActive('/financial-modeling') ? 'text-indigo-600' : 'group-hover:text-indigo-600'}` }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { children: "Model" }), _jsx("span", { className: "ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono", children: "alpha" })] })] })] })] }) }) }));
};
export default Navbar;

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">PR Services</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded transition">Dashboard</Link>
          <Link to="/add-client" className="hover:bg-blue-700 px-3 py-2 rounded transition">Add Client</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
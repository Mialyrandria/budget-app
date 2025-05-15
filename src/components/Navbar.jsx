import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-center gap-4">
        <Link to="/" className="hover:text-gray-300">Accueil</Link>
        <Link to="/expenses" className="hover:text-gray-300">Dépenses</Link>
        <Link to="/income" className="hover:text-gray-300">Revenus</Link>
        <Link to="/categories" className="hover:text-gray-300">Catégories</Link>
      </div>
    </nav>
  );
}
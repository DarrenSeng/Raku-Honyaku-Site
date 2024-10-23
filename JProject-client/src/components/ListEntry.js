import { Link } from 'react-router-dom';


export default function ListEntry({ name }) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
            <Link to={`/details/${name}`} className="block text-center">
                <h3 className="text-slate-200 text-lg font-semibold mb-2">{name}</h3>
                {/* You can add additional content here */}
            </Link>
        </div>
    );
}
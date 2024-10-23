import {Link} from 'react-router-dom';

export default function Header({heading,paragraph,linkName, linkUrl="#"}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-200">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-slate-300 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-blue-600 hover:text-blue-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}
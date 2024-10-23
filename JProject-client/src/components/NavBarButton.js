import {Link} from 'react-router-dom';

export default function NavBarButton({linkName, linkUrl="#", isUnique=false}){
    return(
        <div >
            <Link to={linkUrl} className = {`font-semibold text-slate-200 hover:text-slate-400 ${isUnique ? 'text-xl' : ''}`}>
                {linkName}
            </Link>
        </div>
    )
}
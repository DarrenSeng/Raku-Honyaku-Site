import ListEntry from './ListEntry';
export default function List({name,listItems=[]}){
    return (
        <div className="py-4">
            <h2 className="text-slate-200 text-xl font-semibold mb-2">{name}</h2>
            <div className="flex gap-4">
                {listItems.map((item, index) => (
                        <ListEntry key={index} name={item} />
                    ))}
            </div>
        </div>
    );
}
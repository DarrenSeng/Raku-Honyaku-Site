import SearchTools from '../components/SearchTools';

export default function HomePage() {
  return (
    <div className="flex flex-col px-72 pt-10" style={{ backgroundColor: "#313131", minHeight: "100vh" }}>
      <SearchTools isHomePage={true}/>
    </div>
  );
}

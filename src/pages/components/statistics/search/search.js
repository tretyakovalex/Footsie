// Public Imports
// Private Imports
import SearchPage from './design/search-home';

export default function Search({userSearch, setSearch, setSearchStatus }) {

    return (
        <>
            <SearchPage searchInput={userSearch} setSearch={setSearch} setSearchStatus={setSearchStatus} />
        </>
    )
}
import "../ComponentCSS/SearchArea.css";
import "../Reusables.css"

export const SearchArea = () => {
    return (
        <div className="search-area flex-dir-col flex-c-c">
            <div className="address-container flex-dir-col flex-c-c">
                <h1>Enter Your Address</h1>

                <input type="text" placeholder="e.g. 3 Jo Road, Nelson, New Zealand"/>
            </div>

            <div className="distance-container flex-dir-col flex-c-c">
                <h1>Maximum Travel Distance</h1>

                <input type="number" placeholder="e.g. 35"/>
            </div>

            <button>
                Find Restaurants
            </button>
        </div>
    );
}
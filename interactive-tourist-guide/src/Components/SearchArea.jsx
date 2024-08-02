import "../ComponentCSS/SearchArea.css";
import "../Reusables.css"

export const SearchArea = () => {
    return (
        <div className="search-area flex-dir-col flex-c-c">
            <div className="address-input flex-dir-col flex-c-c">
                <h1>Enter Your Address</h1>

                <input type="text" />
            </div>

            <div className="distance-input flex-dir-col flex-c-c">
                <h1>Maximum Travel Distance</h1>

                <input type="number" />
            </div>

            <button>
                Find Restaurants
            </button>
        </div>
    );
}
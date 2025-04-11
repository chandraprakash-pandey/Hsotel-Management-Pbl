import { useState, useEffect } from "react";

function HostelSearch() {
  const [hostels, setHostels] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [maxPrice, setMaxPrice] = useState(7000);
  const [loading, setLoading] = useState(true);

  // Fetch hostels from backend
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await fetch("http://localhost:5173/api/rooms/search");
        const data = await res.json();
        setHostels(data);
      } catch (err) {
        console.error("Failed to fetch hostels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  const filteredHostels = hostels
    .filter(h => filter === "all" || h.location?.toLowerCase().includes(filter.toLowerCase()))
    .filter(h => h.name?.toLowerCase().includes(search.toLowerCase()))
    .filter(h => h.price <= maxPrice)
    .sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Hostel Listings</h1>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="all">Filter by Location / Facility</option>
          <optgroup label="Radius">
            <option value="campus">within college campus</option>
            <option value="500m">within 500m</option>
            <option value="1km">within 1km</option>
            <option value="5km">within 4-5kms</option>
          </optgroup>
          <optgroup label="Facilities">
            <option value="single bed">Single Bed</option>
            <option value="double bed">Double Bed</option>
            <option value="wifi">Free Wifi</option>
            <option value="ro">RO Water</option>
            <option value="security">Security</option>
          </optgroup>
        </select>

        <div>
          <label className="block mb-1 font-semibold">Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min="1000"
            max="8000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="name">Sort</option>
          <option value="price">Low to High</option>
          <option value="high">High to Low</option>
          <option value="pop">Popularity</option>
          <option value="rate">Most Rated</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Loading hostels...</p>
      ) : filteredHostels.length === 0 ? (
        <p className="text-center text-red-500">No hostels match the criteria.</p>
      ) : (
        <ul className="space-y-6">
          {filteredHostels.map((hostel, index) => (
            <li
              key={index}
              className="flex items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all"
            >
              <img
                src={
                  hostel.image ||
                  "https://via.placeholder.com/150x100.png?text=No+Image"
                }
                alt={hostel.name}
                className="w-32 h-24 object-cover rounded-lg mr-6"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {hostel.name}
                </h2>
                <p className="text-gray-600">📍 {hostel.location}</p>
                <p className="text-green-600 font-medium mt-1">
                  ₹{hostel.price} / month
                </p>
              </div>
              <button className="ml-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HostelSearch;

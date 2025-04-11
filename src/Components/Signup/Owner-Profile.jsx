import React, { useEffect, useState } from 'react';

const OwnerProfile = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomname: '',
    ownername: '',
    maxcount: '',
    phonenumber: '',
    rentpermonth: '',
    type: '',
    description: '',
    nearbymess: false,
    img: [],
  });

  // ✅ Fetch rooms by owner (POST request sending ownername)
  const fetchRooms = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/rooms/registerrooms  ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ownername: newRoom.ownername })  // 👈 Customize this as per backend
      });

      const data = await res.json();

      if (res.ok) {
        setRooms(data.rooms || data);  // Adjust based on your backend response shape
      } else {
        alert("Failed to fetch rooms: " + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert("Error fetching rooms.");
    }
  };

  // 👇 Trigger fetch after entering owner name
  useEffect(() => {
    if (newRoom.ownername) {
      fetchRooms();
    }
  }, [newRoom.ownername]);

  // ✅ Add new room
  const handleAddRoom = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/rooms/registerrooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomname: newRoom.roomname || "",
          ownername: newRoom.ownername || "",
          maxcount: parseInt(newRoom.maxcount) || 0,
          phonenumber: parseInt(newRoom.phonenumber) || 0,
          rentpermonth: parseInt(newRoom.rentpermonth) || 0,
          type: newRoom.type || "",
          description: newRoom.description || "",
          nearbymess: !!newRoom.nearbymess,
          img: newRoom.img || []
          
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setRooms((prev) => [...prev, data.data.newRoom]);
        setNewRoom({
          roomname: '',
          ownername: newRoom.ownername,  // keep owner for refetch
          maxcount: '',
          phonenumber: '',
          rentpermonth: '',
          type: '',
          description: '',
          nearbymess: false,
          img: [],
        });
        fetchRooms();  // Refresh room list
      } else {
        alert("Error adding room: " + (data.message || 'Unknown Error'));
      }
    } catch (err) {
      console.log(err);
      console.error("Error:", err);
      console.log(err);
      alert("Failed to add room.");
    }
  };

  // ✅ Delete room
    // const handleDelete = async (id) => {
    //   try {
    //     const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
    //       method: 'DELETE',
    //     });

    //     if (res.ok) {
    //       setRooms((prev) => prev.filter((r) => r._id !== id));
    //     } else {
    //       const err = await res.json();
    //       alert("Error deleting room: " + err.message);
    //     }
    //   } catch (error) {
    //     console.error("Error deleting room:", error);
    //   }
    // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="ownername" placeholder="Owner Name" value={newRoom.ownername} onChange={handleChange} className="border p-2 col-span-2" />

        <input name="roomname" placeholder="Room Name" value={newRoom.roomname} onChange={handleChange} className="border p-2" />
        <input type="number" name="maxcount" placeholder="Max Count" value={newRoom.maxcount} onChange={handleChange} className="border p-2" />
        <input type="number" name="phonenumber" placeholder="Phone Number" value={newRoom.phonenumber} onChange={handleChange} className="border p-2" />
        <input type="number" name="rentpermonth" placeholder="Rent per Month" value={newRoom.rentpermonth} onChange={handleChange} className="border p-2" />
        <input name="type" placeholder="Type (Boys/Girls)" value={newRoom.type} onChange={handleChange} className="border p-2" />
        <textarea name="description" placeholder="Description" value={newRoom.description} onChange={handleChange} className="border p-2 col-span-2" />
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" name="nearbymess" checked={newRoom.nearbymess} onChange={handleChange} />
          Nearby Mess
        </label>
        <button onClick={handleAddRoom} className="bg-blue-500 text-white px-4 py-2 rounded col-span-2">
          Add Room
        </button>
      </div>

      <ul className="space-y-4">
        {rooms.map((room) => (
          <li key={room._id} className="bg-white shadow p-4 rounded flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{room.roomname}</h2>
              <p>Owner: {room.ownername}</p>
              <p>Phone: {room.phonenumber}</p>
              <p>Type: {room.type}</p>
              <p>₹{room.rentpermonth} / month</p>
              <p>{room.description}</p>
              <p>{room.nearbymess ? "Nearby mess available" : "No mess nearby"}</p>
            </div>
            <button onClick={() => handleDelete(room._id)} className="text-red-500 font-bold">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerProfile;
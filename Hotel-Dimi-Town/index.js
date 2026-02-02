import React, { useState } from 'react';

// მონაცემები
const roomsData = [
  { id: 1, name: "სტანდარტი", price: 120, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=400" },
  { id: 2, name: "დელუქსი", price: 200, img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400" },
  { id: 3, name: "სუიტა", price: 350, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400" },
];

const servicesData = [
  { id: "spa", name: "სპა", price: 50 },
  { id: "pool", name: "აუზი", price: 30 },
  { id: "breakfast", name: "საუზმე", price: 25 },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });

  // სერვისების დამატება/მოკლება
  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.find(s => s.id === service.id) 
        ? prev.filter(s => s.id !== service.id) 
        : [...prev, service]
    );
  };

  // ჯამური ფასის გამოთვლა
  const calculateTotal = () => {
    let total = selectedRoom ? selectedRoom.price : 0;
    const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
    return total + servicesTotal;
  };

  // 1. ავტორიზაციის გვერდი
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <span className="text-5xl">🏨</span>
            <h1 className="text-3xl font-black text-gray-800 mt-4">DREAM HOTEL</h1>
            <p className="text-gray-500 italic">კეთილი იყოს თქვენი მობრძანება</p>
          </div>
          <div className="space-y-4">
            <input type="email" placeholder="ელ-ფოსტა" className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            <input type="password" placeholder="პაროლი" className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            <button 
              onClick={() => setIsLoggedIn(true)} 
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transform active:scale-95 transition shadow-lg shadow-blue-200"
            >
              შესვლა
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. მთავარი გვერდი (ავტორიზაციის შემდეგ)
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* ნავიგაცია */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm p-4 flex justify-between items-center px-6 lg:px-20 border-b border-gray-100">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter">DREAM HOTEL</h1>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-gray-500 text-sm font-medium italic">სასიამოვნო დასვენებას გისურვებთ!</span>
          <button 
            onClick={() => setIsLoggedIn(false)} 
            className="text-red-500 font-bold border-2 border-red-50 border px-4 py-1.5 rounded-xl hover:bg-red-50 transition"
          >
            გამოსვლა
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* მარცხენა მხარე: ნომრები და სერვისები */}
        <div className="lg:col-span-8">
          <h2 className="text-3xl font-black text-gray-800 mb-8 flex items-center gap-3">
            <span className="bg-blue-600 text-white p-2 rounded-lg text-sm">01</span>
            აირჩიეთ ნომერი
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomsData.map(room => (
              <div 
                key={room.id} 
                onClick={() => setSelectedRoom(room)}
                className={`group cursor-pointer bg-white rounded-3xl shadow-sm hover:shadow-xl overflow-hidden border-2 transition-all duration-300 transform ${selectedRoom?.id === room.id ? 'border-blue-500 scale-[1.02] ring-4 ring-blue-50' : 'border-transparent'}`}
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img src={room.img} alt={room.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    ⭐ 5.0
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">{room.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                    <span>📶 WiFi</span> <span>☕ ყავა</span> <span>❄️ კონდიცირება</span>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-blue-600 font-black text-2xl">{room.price}₾ <span className="text-sm text-gray-400 font-normal">/ ღამე</span></p>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition ${selectedRoom?.id === room.id ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                      {selectedRoom?.id === room.id ? '✓' : '+'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-black text-gray-800 mt-16 mb-8 flex items-center gap-3">
            <span className="bg-blue-600 text-white p-2 rounded-lg text-sm">02</span>
            დამატებითი სერვისები
          </h2>
          <div className="flex gap-4 flex-wrap">
            {servicesData.map(service => (
              <button 
                key={service.id}
                onClick={() => toggleService(service)}
                className={`px-8 py-4 rounded-2xl border-2 font-bold transition-all ${selectedServices.find(s => s.id === service.id) ? 'bg-gray-800 text-white border-gray-800 shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
              >
                {service.name} <span className="opacity-60 ml-2">+{service.price}₾</span>
              </button>
            ))}
          </div>
        </div>

        {/* მარჯვენა მხარე: შეჯამება */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl h-fit sticky top-28 border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-8 border-b pb-4">თქვენი ჯავშანი</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">ჩამოსვლა</label>
                    <input type="date" className="w-full p-3 border-0 bg-gray-50 rounded-xl mt-1 font-semibold text-gray-700 outline-none" onChange={(e) => setDates({...dates, checkIn: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">წასვლა</label>
                    <input type="date" className="w-full p-3 border-0 bg-gray-50 rounded-xl mt-1 font-semibold text-gray-700 outline-none" onChange={(e) => setDates({...dates, checkOut: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>ნომერი ({selectedRoom?.name || '...'}):</span>
                    <span className="font-bold text-gray-800">{selectedRoom ? `${selectedRoom.price}₾` : '0₾'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>სერვისები:</span>
                    <span className="font-bold text-gray-800">{selectedServices.reduce((sum, s) => sum + s.price, 0)}₾</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-blue-700 pt-6 border-t-2 border-dashed">
                    <span>ჯამი:</span>
                    <span>{calculateTotal()}₾</span>
                  </div>
                </div>

                <button 
                  disabled={!selectedRoom || !dates.checkIn}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl mt-6 hover:bg-blue-700 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-xl shadow-blue-100"
                  onClick={() => alert(`🎉 გილოცავთ! თქვენ წარმატებით დაჯავშნეთ ${selectedRoom.name}.\nჯამური გადასახდელი: ${calculateTotal()}₾`)}
                >
                  დაჯავშნა
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 italic font-medium">გადახდა შესაძლებელია როგორც ბარათით, ასევე ადგილზე.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
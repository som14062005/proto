import { useState, useEffect, useRef } from 'react';

const TouristSafetySystem = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const touristMarkerRef = useRef(null);
  const dangerZoneRef = useRef(null);
  
  const [inDangerZone, setInDangerZone] = useState(false);
  const [approved, setApproved] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [touristStatus, setTouristStatus] = useState('Safe Zone');
  const [statusType, setStatusType] = useState('safe');
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());
  const [notifications, setNotifications] = useState([]);

  // Initialize map
  useEffect(() => {
    const initMap = () => {
      if (typeof window !== 'undefined' && window.L && mapRef.current) {
        const map = window.L.map(mapRef.current).setView([13.0827, 80.2707], 13);
        mapInstanceRef.current = map;
        
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add safe zones (green)
        window.L.circle([13.0827, 80.2707], {
          color: '#2ed573',
          fillColor: '#2ed573',
          fillOpacity: 0.3,
          radius: 2000
        }).addTo(map).bindPopup("Marina Beach - Safe Tourist Area");

        window.L.circle([13.0878, 80.2785], {
          color: '#2ed573',
          fillColor: '#2ed573',
          fillOpacity: 0.3,
          radius: 1500
        }).addTo(map).bindPopup("Fort St. George - Safe Tourist Area");

        // Add danger zone (red)
        const dangerZone = window.L.circle([13.0756, 80.2563], {
          color: '#ff4757',
          fillColor: '#ff4757',
          fillOpacity: 0.5,
          radius: 1000
        }).addTo(map).bindPopup("⚠️ DANGER ZONE - Restricted Access");
        dangerZoneRef.current = dangerZone;

        // Add tourist marker
        const touristMarker = window.L.marker([13.0827, 80.2707], {
          icon: window.L.divIcon({
            className: 'tourist-marker',
            html: '👤',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })
        }).addTo(map).bindPopup("Rajesh Kumar - Tourist");
        touristMarkerRef.current = touristMarker;
      }
    };

    // Load Leaflet if not already loaded
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    // Update timestamp every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const playAlertSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not available');
    }
  };

  const updateTouristStatus = (type, text) => {
    setStatusType(type);
    setTouristStatus(text);
    setLastUpdate(new Date().toLocaleTimeString());
  };

  const showAutoNotifications = () => {
    const notificationData = [
      { type: 'police', icon: '🚔', text: 'Alert sent to Chennai Police Control Room', delay: 0 },
      { type: 'family', icon: '📱', text: 'Emergency SMS sent to: +91 98765 43210 (Family)', delay: 1000 },
      { type: 'blockchain', icon: '⛓️', text: 'Incident logged to blockchain ledger', delay: 2000 }
    ];

    setNotifications([]);
    
    notificationData.forEach((notif, index) => {
      setTimeout(() => {
        setNotifications(prev => [...prev, { ...notif, id: Date.now() + index }]);
      }, notif.delay);
    });
  };

  const simulateDangerEntry = () => {
    if (inDangerZone) return;

    // Show danger flash
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 500);

    // Play alert sound
    playAlertSound();

    // Move tourist to danger zone
    const dangerLat = 13.0756;
    const dangerLng = 80.2563;
    
    if (touristMarkerRef.current && mapInstanceRef.current) {
      touristMarkerRef.current.setLatLng([dangerLat, dangerLng]);
      mapInstanceRef.current.setView([dangerLat, dangerLng], 15);
    }

    // Update status
    setInDangerZone(true);
    updateTouristStatus('danger', 'DANGER ZONE!');

    // Show alert modal
    setTimeout(() => {
      setShowAlert(true);
    }, 500);

    // Start auto notifications
    setTimeout(showAutoNotifications, 1000);
  };

  const approveAccess = () => {
    if (!inDangerZone) return;

    // Change danger zone to approved (yellow/orange)
    if (mapInstanceRef.current && dangerZoneRef.current) {
      mapInstanceRef.current.removeLayer(dangerZoneRef.current);
      const approvedZone = window.L.circle([13.0756, 80.2563], {
        color: '#ffa502',
        fillColor: '#ffa502',
        fillOpacity: 0.4,
        radius: 1000
      }).addTo(mapInstanceRef.current).bindPopup("✅ APPROVED ACCESS - Proceed with Caution");
      dangerZoneRef.current = approvedZone;
    }

    // Update status
    updateTouristStatus('safe', 'Approved Access');
    
    // Add approval notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'police',
      icon: '✅',
      text: 'Police approval granted - Access authorized'
    }]);

    setApproved(true);
  };

  const resetSimulation = () => {
    // Reset map
    if (mapInstanceRef.current && dangerZoneRef.current) {
      mapInstanceRef.current.removeLayer(dangerZoneRef.current);
      const dangerZone = window.L.circle([13.0756, 80.2563], {
        color: '#ff4757',
        fillColor: '#ff4757',
        fillOpacity: 0.5,
        radius: 1000
      }).addTo(mapInstanceRef.current).bindPopup("⚠️ DANGER ZONE - Restricted Access");
      dangerZoneRef.current = dangerZone;
    }

    // Reset tourist position
    if (touristMarkerRef.current && mapInstanceRef.current) {
      touristMarkerRef.current.setLatLng([13.0827, 80.2707]);
      mapInstanceRef.current.setView([13.0827, 80.2707], 13);
    }

    // Reset state
    setInDangerZone(false);
    setApproved(false);
    updateTouristStatus('safe', 'Safe Zone');
    setNotifications([]);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-x-hidden">
      {/* Danger Flash Effect */}
      {showFlash && (
        <div className="fixed inset-0 bg-red-500 bg-opacity-30 pointer-events-none z-50 animate-pulse" />
      )}

      {/* Header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-5 text-center border-b border-white border-opacity-20">
        <h1 className="text-4xl font-bold mb-2 text-shadow-lg">🛡️ Tourist Safety Geo-fencing System</h1>
        <p className="text-xl opacity-90">Real-time Danger Zone Monitoring & Emergency Response</p>
      </div>

      {/* Main Container */}
      <div className="grid lg:grid-cols-3 gap-5 p-5 max-w-7xl mx-auto">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-white bg-opacity-95 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 text-xl font-semibold">
            🗺️ Live Tourist Location Tracking
          </div>
          <div ref={mapRef} className="h-96 lg:h-[500px] w-full" />
        </div>

        {/* Control Panel */}
        <div className="bg-white bg-opacity-95 rounded-2xl p-5 shadow-2xl text-gray-800">
          {/* Tourist Info */}
          <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-4 rounded-lg mb-5 text-center">
            <h3 className="font-semibold mb-2">👤 Tourist: Rajesh Kumar</h3>
            <p className="flex items-center justify-center mb-1">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 animate-pulse ${statusType === 'safe' ? 'bg-green-400' : 'bg-red-400'}`}></span>
              Status: {touristStatus}
            </p>
            <p className="mb-1">📍 Location: Marina Beach, Chennai</p>
            <p>🕒 Last Update: {lastUpdate}</p>
          </div>

          {/* Legend */}
          <div className="bg-gray-100 p-4 rounded-lg mb-5">
            <h4 className="font-semibold mb-3 text-gray-800">🎯 Zone Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">Safe Tourist Areas</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-red-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">Danger Zones (Restricted)</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-orange-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">Approved Access</span>
              </div>
            </div>
          </div>

          {/* Simulation Buttons */}
          <div className="space-y-4 mb-5">
            {!inDangerZone ? (
              <button
                onClick={simulateDangerEntry}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-5 rounded-lg font-semibold uppercase tracking-wide transform transition-all hover:scale-105 hover:shadow-lg active:scale-95"
              >
                ⚠️ Simulate Danger Zone Entry
              </button>
            ) : !approved ? (
              <button
                onClick={approveAccess}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-5 rounded-lg font-semibold uppercase tracking-wide transform transition-all hover:scale-105 hover:shadow-lg active:scale-95"
              >
                ✅ Police Approval Override
              </button>
            ) : (
              <button
                onClick={resetSimulation}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-5 rounded-lg font-semibold uppercase tracking-wide transform transition-all hover:scale-105 hover:shadow-lg active:scale-95"
              >
                🔄 Reset Simulation
              </button>
            )}
          </div>

          {/* Notification Panel */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-800">📢 Live Notifications</h4>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {notifications.length === 0 ? (
                <p className="text-center text-gray-500 italic">No alerts yet...</p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-center p-3 rounded-lg border-l-4 animate-slide-in ${
                      notif.type === 'police' 
                        ? 'bg-blue-50 border-blue-500' 
                        : notif.type === 'family'
                        ? 'bg-purple-50 border-purple-500'
                        : 'bg-green-50 border-green-500'
                    }`}
                  >
                    <span className="text-xl mr-3">{notif.icon}</span>
                    <span className="text-sm text-gray-700">{notif.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl text-center max-w-md w-11/12 text-gray-800 animate-slide-up">
            <div className="text-6xl text-red-500 mb-5 animate-bounce">⚠️</div>
            <h2 className="text-2xl font-bold text-red-500 mb-4">DANGER ZONE BREACH!</h2>
            <p className="mb-4 text-gray-600">Tourist has entered a restricted area without authorization.</p>
            <p className="font-bold text-gray-800 mb-6">Immediate action required!</p>
            <button
              onClick={closeAlert}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg font-semibold transform transition-all hover:scale-105 active:scale-95"
            >
              Acknowledge Alert
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        
        .animate-slide-up {
          animation: slideUp 0.5s ease;
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .tourist-marker {
          background: none;
          border: none;
          font-size: 24px;
        }
      `}</style>
    </div>
  );
};

export default TouristSafetySystem;
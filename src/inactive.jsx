import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Shield, Phone, MessageSquare, Clock, Wifi, WifiOff } from 'lucide-react';

const TouristEmergencySimulation = () => {
  const [touristPosition, setTouristPosition] = useState({ x: 50, y: 60 });
  const [lastMovement, setLastMovement] = useState('2 min ago');
  const [isMoving, setIsMoving] = useState(true);
  const [emergencyState, setEmergencyState] = useState('normal'); // normal, inactive, location_lost
  const [showAlert, setShowAlert] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [blockchainLog, setBlockchainLog] = useState('');

  // Simulate tourist movement
  useEffect(() => {
    if (!isMoving || emergencyState !== 'normal') return;

    const moveInterval = setInterval(() => {
      setTouristPosition(prev => ({
        x: Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * 8)),
        y: Math.max(10, Math.min(90, prev.y + (Math.random() - 0.5) * 8))
      }));
      setLastMovement('Just now');
    }, 2000);

    return () => clearInterval(moveInterval);
  }, [isMoving, emergencyState]);

  // Update last movement timer
  useEffect(() => {
    if (emergencyState === 'normal' && isMoving) {
      const timer = setInterval(() => {
        const times = ['Just now', '30 sec ago', '1 min ago', '2 min ago'];
        setLastMovement(times[Math.floor(Math.random() * times.length)]);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [emergencyState, isMoving]);

  const simulateInactivity = () => {
    setIsMoving(false);
    setEmergencyState('inactive');
    setLastMovement('30+ minutes ago');
    setShowAlert(true);
    
    setTimeout(() => {
      setShowNotifications(true);
      setBlockchainLog(`Incident Logged on Blockchain:
- Time: ${new Date().toLocaleTimeString()}
- Reason: Prolonged Inactivity in High-Risk Zone
- Action: Alert sent to authorities
- Hash: 0x7f9a2b8c4e6d3f1a9b5c2e8f4a7b3d9e`);
    }, 2000);
  };

  const simulateLocationLoss = () => {
    setIsMoving(false);
    setEmergencyState('location_lost');
    setShowAlert(true);
    
    setTimeout(() => {
      setShowNotifications(true);
      setBlockchainLog(`Incident Logged on Blockchain:
- Time: ${new Date().toLocaleTimeString()}
- Reason: GPS Module Disconnected
- Action: Emergency Protocol Activated
- Hash: 0x4a7b3d9e2f8c1e5a8b4d7f2c9e6b1a5d`);
    }, 2000);
  };

  const resetSimulation = () => {
    setEmergencyState('normal');
    setIsMoving(true);
    setShowAlert(false);
    setShowNotifications(false);
    setBlockchainLog('');
    setTouristPosition({ x: 50, y: 60 });
  };

  const getMarkerColor = () => {
    if (emergencyState === 'inactive') return 'bg-orange-500 animate-pulse';
    if (emergencyState === 'location_lost') return 'bg-red-600 animate-ping';
    return 'bg-blue-500';
  };

  const getStatusColor = () => {
    if (emergencyState === 'inactive') return 'border-orange-500 bg-orange-50';
    if (emergencyState === 'location_lost') return 'border-red-500 bg-red-50';
    return 'border-green-500 bg-green-50';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">AI Emergency Detection System</h1>
        </div>
        <p className="text-lg text-gray-600">Real-time tourist safety monitoring with automated emergency response</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Tracking Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                Live Tracking Map
              </h2>
              <div className="flex items-center gap-2">
                {emergencyState === 'location_lost' ? (
                  <WifiOff className="w-5 h-5 text-red-500" />
                ) : (
                  <Wifi className="w-5 h-5 text-green-500" />
                )}
                <span className={`text-sm font-medium ${
                  emergencyState === 'location_lost' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {emergencyState === 'location_lost' ? 'Signal Lost' : 'Connected'}
                </span>
              </div>
            </div>
            
            {/* Map Area */}
            <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-lg h-96 overflow-hidden border-2 border-gray-200">
              {/* Grid lines for realism */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{top: `${i * 10}%`}} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{left: `${i * 10}%`}} />
                ))}
              </div>
              
              {/* Location markers */}
              <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded text-xs font-medium">
                Delhi Tourism Zone
              </div>
              
              {/* Tourist position */}
              {emergencyState !== 'location_lost' && (
                <div
                  className={`absolute w-4 h-4 rounded-full ${getMarkerColor()} border-2 border-white shadow-lg transition-all duration-500`}
                  style={{
                    left: `${touristPosition.x}%`,
                    top: `${touristPosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Tourist #T00231
                  </div>
                </div>
              )}
              
              {/* Last known location for lost signal */}
              {emergencyState === 'location_lost' && (
                <div
                  className="absolute w-6 h-6 rounded-full bg-red-200 border-2 border-red-500 animate-pulse"
                  style={{
                    left: `${touristPosition.x}%`,
                    top: `${touristPosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Last Known Location
                  </div>
                </div>
              )}
              
              {/* Emergency overlay */}
              {emergencyState !== 'normal' && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-10 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${getStatusColor()}`}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tourist Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tourist ID:</span>
                <span className="font-mono text-gray-800">#T00231</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-mono text-gray-800 text-sm">
                  {emergencyState === 'location_lost' ? 'UNKNOWN' : '28.6129°N, 77.2295°E'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Movement:</span>
                <span className={`font-medium ${
                  emergencyState === 'inactive' ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {lastMovement}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  emergencyState === 'normal' ? 'text-green-600' : 
                  emergencyState === 'inactive' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {emergencyState === 'normal' ? 'SAFE' : 
                   emergencyState === 'inactive' ? 'INACTIVE' : 'SIGNAL LOST'}
                </span>
              </div>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Demo Controls</h3>
            <div className="space-y-3">
              <button
                onClick={simulateInactivity}
                disabled={emergencyState !== 'normal'}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Simulate Inactivity
              </button>
              
              <button
                onClick={simulateLocationLoss}
                disabled={emergencyState !== 'normal'}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <WifiOff className="w-4 h-4" />
                Disable Location
              </button>
              
              <button
                onClick={resetSimulation}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Reset Simulation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-bounce">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🚨 EMERGENCY DETECTED
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <p className="text-red-800 font-semibold mb-2">Possible Emergency Detected</p>
                <p className="text-red-700 text-sm mb-2">
                  <strong>Reason:</strong> {emergencyState === 'inactive' ? 
                    'No activity in high-risk zone for 30+ minutes' : 
                    'GPS signal suddenly lost - possible device tampering'}
                </p>
                <p className="text-red-700 text-sm">
                  <strong>Action:</strong> Notifying Police & Emergency Contacts
                </p>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Acknowledge Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed bottom-6 right-6 space-y-4 z-40">
          {/* Police Notification */}
          <div className="bg-blue-900 text-white p-4 rounded-lg shadow-2xl max-w-sm animate-slide-in-right">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Police Notification Sent</span>
            </div>
            <div className="text-sm space-y-1">
              <p><strong>Tourist ID:</strong> #T00231</p>
              <p><strong>Last Seen:</strong> 28.6129° N, 77.2295° E</p>
              <p><strong>Event:</strong> {emergencyState === 'inactive' ? 'Prolonged Inactivity' : 'Signal Lost'}</p>
              <p><strong>ETA for Response:</strong> 5 mins</p>
            </div>
          </div>

          {/* Emergency Contact Notification */}
          <div className="bg-green-600 text-white p-4 rounded-lg shadow-2xl max-w-sm animate-slide-in-right">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold">Emergency Contact Alerted</span>
            </div>
            <div className="text-sm">
              <p className="mb-1">WhatsApp sent to: John Doe</p>
              <p className="text-xs bg-green-700 p-2 rounded">
                "Emergency: Your family member may need assistance. Location: Delhi. Authorities contacted. Call +91-100 for updates."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Blockchain Log */}
      {blockchainLog && (
        <div className="mt-6 bg-gray-900 text-green-400 p-6 rounded-xl shadow-lg font-mono text-sm">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Blockchain Transaction Log
          </h3>
          <pre className="whitespace-pre-wrap">{blockchainLog}</pre>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-center text-gray-600">
        <p className="text-sm">
          This simulation demonstrates AI-powered anomaly detection with automated emergency response protocols.
          <br />
          Real system processes 1000+ data points per minute for accurate threat assessment.
        </p>
      </div>
    </div>
  );
};

export default TouristEmergencySimulation;
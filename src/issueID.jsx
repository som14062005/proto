import React, { useState, useEffect } from 'react';

const BlockchainTouristID = () => {
  const [isIssued, setIsIssued] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [showBlockchainInfo, setShowBlockchainInfo] = useState(false);
  const [timestamp, setTimestamp] = useState('');
  const [particles, setParticles] = useState([]);

  // Create particles effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 3,
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, newParticle.animationDuration * 1000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const issueID = () => {
    if (isIssued) return;

    setIsProcessing(true);
    setTimestamp(new Date().toLocaleString());

    setTimeout(() => {
      setShowProfile(true);
      
      setTimeout(() => {
        setShowCheckmark(true);
      }, 300);

      setTimeout(() => {
        setShowBlockchain(true);
        
        setTimeout(() => {
          setShowBlockchainInfo(true);
        }, 800);
      }, 500);

      setIsProcessing(false);
      setIsIssued(true);
    }, 2000);
  };

  const simulateExpiry = () => {
    if (!isIssued || isExpired) return;
    setIsExpired(true);
  };

  const resetDemo = () => {
    setIsIssued(false);
    setIsExpired(false);
    setIsProcessing(false);
    setShowProfile(false);
    setShowCheckmark(false);
    setShowBlockchain(false);
    setShowBlockchainInfo(false);
    setTimestamp('');
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px',
      color: '#333',
      position: 'relative',
      overflow: 'hidden'
    },
    maxContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      color: 'white'
    },
    headerTitle: {
      fontSize: '3rem',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    headerSubtitle: {
      fontSize: '1.2rem',
      opacity: 0.9
    },
    demoContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      marginBottom: '40px'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)'
    },
    issueButton: {
      background: isIssued ? '#4caf50' : 'linear-gradient(135deg, #00c853, #00e676)',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      fontSize: '1.2rem',
      borderRadius: '50px',
      cursor: isProcessing ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(0, 200, 83, 0.3)',
      width: '100%',
      marginBottom: '20px',
      opacity: isProcessing ? 0.7 : 1
    },
    touristProfile: {
      textAlign: 'center',
      opacity: showProfile ? 1 : 0,
      transform: showProfile ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease'
    },
    profilePhoto: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      margin: '0 auto 20px',
      border: '4px solid #00c853',
      objectFit: 'cover'
    },
    checkmark: {
      display: 'inline-block',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: '#00c853',
      color: 'white',
      textAlign: 'center',
      lineHeight: '50px',
      fontSize: '1.5rem',
      margin: '10px auto',
      opacity: showCheckmark ? 1 : 0,
      transform: showCheckmark ? 'scale(1)' : 'scale(0)',
      transition: 'all 0.5s ease',
      animation: showCheckmark ? 'bounce 0.6s ease' : 'none'
    },
    qrCode: {
      width: '150px',
      height: '150px',
      margin: '20px auto',
      border: '2px solid #ddd',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      color: isExpired ? '#f44336' : '#666'
    },
    status: {
      display: 'inline-block',
      padding: '8px 20px',
      borderRadius: '25px',
      fontWeight: 'bold',
      margin: '10px 0',
      background: isExpired ? '#f44336' : '#00c853',
      color: 'white'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      margin: '20px 0'
    },
    infoItem: {
      background: '#f8f9fa',
      padding: '15px',
      borderRadius: '10px',
      borderLeft: '4px solid #00c853'
    },
    infoLabel: {
      fontWeight: 'bold',
      color: '#666',
      fontSize: '0.9rem',
      marginBottom: '5px'
    },
    infoValue: {
      color: '#333',
      fontSize: '1rem'
    },
    blockchainAnimation: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px 0',
      opacity: showBlockchain ? 1 : 0,
      transform: showBlockchain ? 'scale(1)' : 'scale(0.8)',
      transition: 'all 0.5s ease'
    },
    block: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      margin: '0 10px',
      position: 'relative',
      animation: 'pulse 2s infinite'
    },
    hashDisplay: {
      background: '#1a1a1a',
      color: '#00ff00',
      padding: '15px',
      borderRadius: '10px',
      fontFamily: "'Courier New', monospace",
      margin: '20px 0',
      fontSize: '0.9rem',
      overflowWrap: 'break-word'
    },
    simulateButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginTop: '20px'
    },
    simulateBtn: {
      padding: '12px 20px',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },
    expireBtn: {
      background: '#f44336',
      color: 'white'
    },
    resetBtn: {
      background: '#2196f3',
      color: 'white'
    },
    loading: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #00c853',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '10px'
    },
    particle: {
      position: 'fixed',
      width: '4px',
      height: '4px',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: -1,
      animation: 'fall linear forwards'
    },
    expiredMessage: {
      marginTop: '15px',
      padding: '10px',
      background: '#ffebee',
      border: '1px solid #f44336',
      borderRadius: '5px',
      color: '#d32f2f',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    blockchainSuccess: {
      marginTop: '20px',
      padding: '15px',
      background: '#e8f5e8',
      borderRadius: '10px',
      borderLeft: '4px solid #4caf50',
      opacity: showBlockchainInfo ? 1 : 0,
      transition: 'all 0.5s ease'
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: scale(1); }
            40%, 43% { transform: scale(1.2); }
            70% { transform: scale(1.1); }
          }
          @keyframes fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          @media (max-width: 768px) {
            .demo-container {
              grid-template-columns: 1fr !important;
            }
            .info-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
      
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            ...styles.particle,
            left: `${particle.left}vw`,
            animationDuration: `${particle.animationDuration}s`
          }}
        />
      ))}

      <div style={styles.container}>
        <div style={styles.maxContainer}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>🔐 Blockchain Tourist ID System</h1>
            <p style={styles.headerSubtitle}>Secure • Immutable • Verifiable • Temporary</p>
          </div>

          <div style={styles.demoContainer} className="demo-container">
            {/* Left Panel: ID Issuance */}
            <div 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <h2>🆔 Issue Tourist ID</h2>
              
              <button 
                style={styles.issueButton}
                onClick={issueID}
                disabled={isProcessing}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 200, 83, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isProcessing) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 200, 83, 0.3)';
                  }
                }}
              >
                {isProcessing ? (
                  <>
                    <span style={styles.loading}></span>
                    Processing...
                  </>
                ) : isIssued ? (
                  '✅ ID Created on Blockchain'
                ) : (
                  'Issue ID'
                )}
              </button>

              <div style={styles.touristProfile}>
                <div style={styles.checkmark}>✅</div>
                
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                  alt="Tourist Photo" 
                  style={styles.profilePhoto}
                />
                
                <h3>John Doe</h3>
                <div style={styles.status}>
                  {isExpired ? 'EXPIRED' : 'ACTIVE'}
                </div>
                
                <div style={styles.qrCode}>
                  <div>
                    <div style={{fontSize: '40px'}}>
                      {isExpired ? '❌' : '📱'}
                    </div>
                    <div>{isExpired ? 'ID Expired' : 'QR Generated'}</div>
                  </div>
                </div>

                <div style={styles.infoGrid} className="info-grid">
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Tourist Name</div>
                    <div style={styles.infoValue}>John Doe</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Visit Validity</div>
                    <div style={styles.infoValue}>3 Sept 2025 – 7 Sept 2025</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>KYC Type</div>
                    <div style={styles.infoValue}>Passport</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>KYC Number</div>
                    <div style={styles.infoValue}>AB1234567</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Emergency Contact</div>
                    <div style={styles.infoValue}>+91 98765 43210</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Medical Info</div>
                    <div style={styles.infoValue}>Blood Group: O+<br/>Allergies: None</div>
                  </div>
                </div>

                <div style={styles.simulateButtons}>
                  <button 
                    style={{...styles.simulateBtn, ...styles.expireBtn}}
                    onClick={simulateExpiry}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#d32f2f';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f44336';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Simulate End of Visit
                  </button>
                  <button 
                    style={{...styles.simulateBtn, ...styles.resetBtn}}
                    onClick={resetDemo}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1976d2';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#2196f3';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Reset Demo
                  </button>
                </div>

                {isExpired && (
                  <div style={styles.expiredMessage}>
                    This ID is now invalid. Cannot be used.
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Blockchain Visualization */}
            <div 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div style={{textAlign: 'center'}}>
                <h2>⛓️ Blockchain Security</h2>
                <p style={{color: '#666', marginBottom: '20px'}}>
                  Immutable • Tamper-proof • Verifiable
                </p>

                <div style={styles.blockchainAnimation}>
                  <div style={styles.block}>
                    <div>Block</div>
                    <div>#1247</div>
                    <div style={{
                      position: 'absolute',
                      right: '-25px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '2rem'
                    }}>⛓️</div>
                  </div>
                  <div style={styles.block}>
                    <div>Block</div>
                    <div>#1248</div>
                    <div style={{
                      position: 'absolute',
                      right: '-25px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '2rem'
                    }}>⛓️</div>
                  </div>
                  <div style={styles.block}>
                    <div>Block</div>
                    <div>#1249</div>
                  </div>
                </div>

                <div style={{opacity: showBlockchainInfo ? 1 : 0, transition: 'all 0.5s ease'}}>
                  <h3>📊 Block Information</h3>
                  <div style={styles.hashDisplay}>
                    <div><strong>Block ID:</strong> #1249</div>
                    <div><strong>Hash:</strong> 0x7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730</div>
                    <div><strong>Timestamp:</strong> {timestamp}</div>
                    <div><strong>Previous Hash:</strong> 0x2cf24dba4f21d4288094c0b8e9c2d4f8b2a9c3e6f1a8b7e5d4c3b2a190887654</div>
                  </div>

                  <div style={styles.blockchainSuccess}>
                    <strong>✅ ID Successfully Recorded on Blockchain</strong><br/>
                    <span style={{color: '#666'}}>
                      This tourist ID is now immutable and cannot be tampered with. The blockchain ensures complete security and verifiability of all tourist data.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockchainTouristID;
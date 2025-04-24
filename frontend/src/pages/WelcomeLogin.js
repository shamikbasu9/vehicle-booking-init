import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API helpers
const sendOtpRequest = async (phoneNumber, userType) => {
  const fullPhone = phoneNumber.replace('+', '');
  const response = await axios.post('http://localhost:3030/send-otp', {
    phoneNumber: fullPhone,
    userType
  });
  return response.data;
};

const verifyOtpRequest = async (sessionId, otp) => {
  const response = await axios.post('http://localhost:3030/verify-otp', { sessionId, otp });
  return response.data;
};

export default function WelcomeLogin() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState(null);

  const handleSendOtp = async () => {
    const fullPhone = `${countryCode}${phoneNumber}`;
    try {
      const res = await sendOtpRequest(fullPhone, userType);
      if (res.success) {
        setSessionId(res.sessionId);
        setShowOtpPopup(true);
      } else {
        alert('Failed to send OTP');
      }
    } catch (err) {
      alert('Error sending OTP');
      console.error(err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtpRequest(sessionId, otp);
      if (res.success) {
        navigate('/home');
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      alert('Error verifying OTP');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card} className="animate-fade-slide">
        <div style={styles.logo}>🚘</div>
        <h1 style={styles.title}>Welcome to RideNow</h1>

        {!userType ? (
          <>
            <h2 style={styles.subtitle}>Who are you?</h2>
            <button style={styles.primaryButton} onClick={() => setUserType('rider')}>I’m a Rider</button>
            <button style={styles.primaryButton} onClick={() => setUserType('driver')}>I’m a Driver</button>
          </>
        ) : (
          <>
            <h2 style={styles.subtitle}>Enter your mobile number</h2>
            <div style={styles.inputRow}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                style={styles.select}
              >
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, '');
                  if (onlyNums.length <= 10) setPhoneNumber(onlyNums);
                }}
                maxLength={10}
                style={styles.phoneInput}
              />
            </div>
            <button style={styles.primaryButton} onClick={handleSendOtp}>Continue</button>
            <button style={styles.backButton} onClick={() => setUserType(null)}>← Back</button>
          </>
        )}
      </div>

      {showOtpPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2>Enter OTP</h2>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              style={styles.otpInput}
              placeholder="123456"
            />
            <button style={styles.primaryButton} onClick={handleVerifyOtp}>Verify</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '5vh 4vw',
    boxSizing: 'border-box',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
    opacity: 0.2,
    zIndex: 1,
  },
  card: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
    padding: '32px 16px',
    textAlign: 'center',
    animation: 'fade-slide 0.6s ease',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '42px',
    marginBottom: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '14px',
    color: '#0077ff',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '18px',
    color: '#333',
  },
  primaryButton: {
    width: '100%',
    marginBottom: '15px',
    padding: '12px',
    fontSize: '15px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    background: '#007bff',
    color: '#fff',
    fontWeight: '500',
    transition: 'background 0.3s ease',
  },
  backButton: {
    marginTop: '10px',
    background: 'none',
    color: '#007bff',
    border: 'none',
    fontSize: '15px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    gap: '10px',
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  phoneInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  secondaryButton: {
    width: '100%',
    marginBottom: '10px',
    padding: '12px',
    fontSize: '15px',
    borderRadius: '10px',
    border: '1px solid #007bff',
    background: '#fff',
    color: '#007bff',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  popup: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '360px',
    textAlign: 'center',
  },
  otpInput: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  }
};

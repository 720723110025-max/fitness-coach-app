import React, { useState, useEffect } from 'react';
import './Clock.css';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [timeZones, setTimeZones] = useState(['UTC', 'Asia/Kolkata']);
  const [showDropdown, setShowDropdown] = useState(false);

  const availableTimeZones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Toronto',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'Europe/London',
    'Europe/Paris',
    'Europe/Istanbul',
    'Africa/Cairo',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Hong_Kong',
    'Asia/Singapore',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  const timeZoneLabels = {
    'UTC': 'UTC',
    'America/New_York': 'New York',
    'America/Los_Angeles': 'Los Angeles',
    'America/Toronto': 'Toronto',
    'America/Mexico_City': 'Mexico City',
    'America/Sao_Paulo': 'São Paulo',
    'Europe/London': 'London',
    'Europe/Paris': 'Paris',
    'Europe/Istanbul': 'Istanbul',
    'Africa/Cairo': 'Cairo',
    'Asia/Dubai': 'Dubai',
    'Asia/Kolkata': 'Mumbai',
    'Asia/Bangkok': 'Bangkok',
    'Asia/Hong_Kong': 'Hong Kong',
    'Asia/Singapore': 'Singapore',
    'Asia/Tokyo': 'Tokyo',
    'Australia/Sydney': 'Sydney',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, timeZone) => {
    const options = {
      timeZone,
      hour: is24Hour ? '2-digit' : 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: !is24Hour,
    };
    return date.toLocaleTimeString('en-US', options);
  };

  const formatDate = (date, timeZone) => {
    const options = {
      timeZone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getTimeZoneOffset = (timeZone) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(new Date());
    const tzDate = new Date(
      parts[4].value +
        '-' +
        parts[0].value +
        '-' +
        parts[2].value +
        'T' +
        parts[6].value +
        ':' +
        parts[8].value +
        ':' +
        parts[10].value
    );

    const offset = (new Date() - tzDate) / (1000 * 60);
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset > 0 ? '+' : '-';

    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const addTimeZone = (tz) => {
    if (!timeZones.includes(tz)) {
      setTimeZones([...timeZones, tz]);
      setShowDropdown(false);
    }
  };

  const removeTimeZone = (tz) => {
    if (timeZones.length > 1) {
      setTimeZones(timeZones.filter((t) => t !== tz));
    }
  };

  return (
    <div className="clock-container">
      <div className="clock-header">
        <h1>🕐 World Clock</h1>
        <div className="controls">
          <button
            className="format-toggle"
            onClick={() => setIs24Hour(!is24Hour)}
          >
            {is24Hour ? '12 Hour' : '24 Hour'}
          </button>
          <div className="dropdown-wrapper">
            <button
              className="add-tz-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              + Add Time Zone
            </button>
            {showDropdown && (
              <div className="timezone-dropdown">
                {availableTimeZones.map((tz) => (
                  <button
                    key={tz}
                    className="tz-option"
                    onClick={() => addTimeZone(tz)}
                    disabled={timeZones.includes(tz)}
                  >
                    {timeZoneLabels[tz]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="clocks-grid">
        {timeZones.map((tz) => (
          <div key={tz} className="clock-card">
            <div className="clock-city">
              <h2>{timeZoneLabels[tz]}</h2>
              <span className="offset">{getTimeZoneOffset(tz)}</span>
            </div>
            <div className="clock-display">
              <div className="time">{formatTime(currentTime, tz)}</div>
              <div className="date">{formatDate(currentTime, tz)}</div>
            </div>
            {timeZones.length > 1 && (
              <button
                className="remove-btn"
                onClick={() => removeTimeZone(tz)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clock;

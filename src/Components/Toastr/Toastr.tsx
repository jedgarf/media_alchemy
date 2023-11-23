import React, { useState, useEffect } from 'react';
import './Toastr.css'; // You can customize the styles in this file

interface ToastrProps {
  message: string;
  duration?: number; // Duration in milliseconds, optional
}

const Toastr: React.FC<ToastrProps> = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [duration]);

  return isVisible ? (
    <div className="toastr">
      <span>{message}</span>
    </div>
  ) : null;
};

export default Toastr;

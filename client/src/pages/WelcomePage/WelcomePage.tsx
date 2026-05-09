import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './WelcomePage.module.scss';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false); 
  
  const sentence = "Let’s start with your";
  const words = sentence.split(" ");

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    const navTimer = setTimeout(() => {
      navigate('/');
    }, 3800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`${style.wellcomeContainer} ${isExiting ? style.fadeOut : ''}`}>
      <h1>
        {words.map((word, index) => (
          <span 
            key={index} 
            className={style.word} 
            style={{ '--i': index } as React.CSSProperties}
          >
            {word}
          </span>
        ))}
        
        <span 
          className={style.highlight} 
          style={{ '--i': words.length } as React.CSSProperties}
        >
          <span className={style.boldWord}>Shit
            <AutoAwesomeIcon />
          </span>
        </span>
      </h1>
    </div>
  );
};
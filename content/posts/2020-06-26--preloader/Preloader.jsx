import React from 'react';
import './Preloader.scss';
import '../../fontello-db8c689e/css/fontello.css';

export default function Preloader() {
  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const preloader = document.getElementsByClassName('preloader')[0];
      preloader.classList.add('preloader--finished');
      setIsPlaying(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isPlaying]);

  function reset() {
    setIsPlaying(true);
    const preloader = document.getElementsByClassName('preloader')[0];
    preloader.classList.remove('preloader--finished');
  }

  return (
    <div className="demo">
      <div className="your-website">
        <div className="preloader">
          <div className="preloader__wall preloader__wall--left" />
          <div className="preloader__wall preloader__wall--right" />
          <div className="preloader__ring" />
        </div>
        <div className="your-website__content">Your Beautiful Website!</div>
        <button className="preloader__reset-button" type="button" onClick={reset} disabled={isPlaying} tabIndex={0}>
          <i className="icon-arrows-cw" />
        </button>
      </div>
    </div>
  );
}

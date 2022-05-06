import { useEffect } from 'react';
import s from './Modal.module.css';

export default function Modal({ url, onClose }) {
  useEffect(() => {
    const close = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
    // eslint-disable-next-line
  }, []);

  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.overlay} onClick={clickBackdrop}>
      <div className={s.modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import getImages from '../../services/imgApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default function ImageGallery({
  onClick,
  loadMoreBtn,
  inputValue,
  page,
}) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (inputValue === '') return;
    setImages([]);
    fetchLoad();
    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (page === 1) return;
    if (inputValue === '') {
      setStatus('idle');
      return;
    }
    fetchLoadMore();
    // eslint-disable-next-line
  }, [page]);

  const fetchLoad = () => {
    getImages(inputValue)
      .then(response => {
        if (response.hits.length === 0) {
          setStatus('rejected');
        } else {
          setImages([...response.hits]);
          setStatus('resolve');
        }
      })
      .catch(error => setStatus('rejected'));
  };
  const fetchLoadMore = () => {
    getImages(inputValue, page)
      .then(response => {
        setImages([...images, ...response.hits]);
        setStatus('resolve');
      })
      .catch(error => setStatus('rejected'));
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    alert('No results');
    setStatus('idle');
  }

  if (status === 'resolve') {
    return (
      <>
        <ul className={s.gallery}>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          ))}
        </ul>
        {images.length !== 0 && <Button onClick={loadMoreBtn} />}
      </>
    );
  }
}

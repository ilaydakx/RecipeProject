import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/CustomDropzone.css';
import uploadIcon from '../images/upload.svg';

const CustomDropzone = ({ onDrop }) => {
  const onDropAccepted = useCallback((acceptedFiles) => {
    // Dosya türlerini kontrol et
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']; // İzin verilen MIME türleri
    const filteredFiles = acceptedFiles.filter(file => validTypes.includes(file.type));

    if (filteredFiles.length > 0) {
      onDrop(filteredFiles);
    } else {
      alert('Lütfen geçerli bir dosya türü yükleyin (JPEG, PNG, GIF).');
    }
  }, [onDrop]);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    accept: 'image/jpeg, image/png, image/gif', // Yalnızca belirli türleri kabul et
    multiple: false,
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <div className="dropzone-content">
        <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
        <p>Upload Image</p>
      </div>
    </div>
  );
};

export default CustomDropzone;

import React, { useState, useEffect } from 'react';
import { Button, Upload, notification, Image, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export function PhotoScreen() {
  const [uploading, setUploading] = useState(false);
  const [imgLoad, setImgLoad] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const storage = getStorage();

  const handleUpload = async ({ file }) => {
    setUploading(true);
    setImgLoad(true);
    const storageRef = ref(storage, `images/${uuidv4()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        notification.error({
          message: 'Upload failed',
          description: error.message,
        });
        setUploading(false);
        setImgLoad(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrls((prevUrls) => [...prevUrls, downloadURL]);
          setUploading(false);
          setImgLoad(false)
          notification.success({
            message: 'Upload successful',
          });
        });
      }
    );
  };

  const fetchImages = async () => {
    const imagesRef = ref(storage, 'images/');
    listAll(imagesRef)
      .then((res) => {
        const urls = res.items.map((itemRef) => {
          return getDownloadURL(itemRef);
        });
        return Promise.all(urls);
      })
      .then((urls) => {
        setImgLoad(false);
        setImageUrls(urls);
      })
      .catch((error) => {
        setImgLoad(false)
        console.error('Failed to fetch images:', error);
      });
  };

  useEffect(() => {
    fetchImages(); // Fetch existing images when the component mounts
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Photo Screen</h1>
      <Upload
        customRequest={handleUpload}
        showUploadList={false}
        accept="image/*"
      >
        <Button
          type="primary"
          icon={<UploadOutlined />}
          loading={uploading}
          disabled={uploading}
        >
          {uploading ? 'Uploading' : 'Click to Upload'}
        </Button>
      </Upload>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {imgLoad ? 
          <Spin />
        :
        imageUrls.map((url, index) => (
          <Image
            key={index}
            width={200}
            src={url}
            alt={`Uploaded photo ${index + 1}`}
            style={{ margin: '10px', padding: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}

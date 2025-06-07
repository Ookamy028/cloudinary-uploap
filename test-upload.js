import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dbkrm3bsr',
  api_key: '461647172395345',
  api_secret: 'I1cbC-xhZWKxqo54Z0FCHNNb9j4',
});

(async () => {
  try {
    const result = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      { public_id: 'shoes' }
    );
    console.log('Upload OK:', result);
  } catch (error) {
    console.error('Error al subir imagen:', error);
  }
})();

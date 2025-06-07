import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
  cloud_name: 'dbkrm3bsr',
  api_key: '461647172395345',
  api_secret: 'I1cbC-xhZWKxqo54Z0FCHNNb9j4',
});

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), async (req, res) => {
  const imageUrl = req.body.imageUrl;
  const titulo = req.body.titulo?.trim() || `archivo_${Date.now()}`; // usa el título o crea uno

  try {
    let result;

    const uploadOptions = {
      public_id: titulo.replace(/\s+/g, '_').toLowerCase(), // formatea el título para usar como ID
      resource_type: 'auto', // permite subir cualquier tipo de archivo
    };

    if (imageUrl) {
      result = await cloudinary.uploader.upload(imageUrl, uploadOptions);
    } else if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, uploadOptions);
      fs.unlinkSync(req.file.path); // elimina el archivo local
    } else {
      return res.status(400).json({ error: 'No se proporcionó archivo ni URL' });
    }

    res.json({ url: result.secure_url, titulo: titulo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

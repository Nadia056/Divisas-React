const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'db.json');
const estadosFilePath = path.join(__dirname, 'estados.json');
const configFilePath = path.join(__dirname, 'config.json');
const uploadsDir = path.join(__dirname, 'src/uploads');
const ventasFilePath = path.join(__dirname, 'ventas.json');
const comprasFilePath = path.join(__dirname, 'compras.json');

// Configurar multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Leer datos del archivo JSON
const readData = (filePath) => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Escribir datos en el archivo JSON
const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Servir la carpeta uploads como archivos estáticos
app.use('/uploads', express.static(uploadsDir));

// Ruta para obtener todas las monedas
app.get('/currencies', (req, res) => {
    const data = readData(dataFilePath);
    res.json(data.currencies);
});

// Ruta para guardar una venta
app.post('/ventas', (req, res) => {
    const venta = { id: uuidv4(), ...req.body };
    const ventas = readData(ventasFilePath);
    ventas.ventas.push(venta);
    writeData(ventasFilePath, ventas);
    res.status(201).json(venta);
});

// Ruta para guardar una compra
app.post('/compras', (req, res) => {
    const compra = { id: uuidv4(), ...req.body };
    const compras = readData(comprasFilePath);
    compras.compras.push(compra);
    writeData(comprasFilePath, compras);
    res.status(201).json(compra);
});

// Ruta para agregar una nueva moneda
app.post('/currencies', (req, res) => {
    const data = readData(dataFilePath);
    const newCurrency = req.body;
    data.currencies.push(newCurrency);
    writeData(dataFilePath, data);
    res.status(201).json(newCurrency);
});

// Ruta para eliminar una moneda
app.delete('/currencies/:name', (req, res) => {
    const data = readData(dataFilePath);
    const currencyName = req.params.name;
    const currencyIndex = data.currencies.findIndex(c => c.name.toLowerCase() === currencyName.toLowerCase());

    if (currencyIndex !== -1) {
        const deletedCurrency = data.currencies.splice(currencyIndex, 1);
        writeData(dataFilePath, data);
        res.status(200).json(deletedCurrency);
    } else {
        res.status(404).json({ message: 'Moneda no encontrada' });
    }
});

// Ruta para actualizar una moneda
app.put('/currencies/:name', (req, res) => {
    const data = readData(dataFilePath);
    const currencyName = req.params.name;
    const currencyIndex = data.currencies.findIndex(c => c.name.toLowerCase() === currencyName.toLowerCase());

    if (currencyIndex !== -1) {
        data.currencies[currencyIndex] = req.body;
        writeData(dataFilePath, data);
        res.status(200).json(data.currencies[currencyIndex]);
    } else {
        res.status(404).json({ message: 'Moneda no encontrada' });
    }
});

// Ruta para obtener los estados
app.get('/estados', (req, res) => {
    const data = readData(estadosFilePath);
    res.json(data);
});

// Ruta para obtener la configuración
app.get('/configuraciones', (req, res) => {
    const data = readData(configFilePath);
    res.json(data);
});

// Ruta para manejar la subida de archivos y guardar los datos del negocio
app.post('/configuraciones', upload.single('logo'), (req, res) => {
    const data = readData(configFilePath);
    const newConfig = {
        id: uuidv4(),
        businessName: req.body.businessName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        logo: req.file ? `uploads/${req.file.filename}` : data.configuration.logo // mantiene el logo actual si no se sube uno nuevo
    };
    writeData(configFilePath, { configuration: newConfig });
    res.status(201).json(newConfig);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
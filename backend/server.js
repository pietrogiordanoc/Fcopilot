const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const sendEmail = require("./sendgrid");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "https://fcpilot.vercel.app"
}));

app.use(express.static(path.join(__dirname, "../frontend")));

const upload = multer({ storage: multer.memoryStorage() });

app.post("/send", upload.array("photos"), async (req, res) => {
console.log("BODY:", req.body);
console.log("FILES:", req.files);
  
const { name, email, message } = req.body;
  const files = req.files;

  try {
    await sendEmail({ name, email, message, files });
    res.json({ message: "¡Correo enviado con éxito!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al enviar el correo." });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

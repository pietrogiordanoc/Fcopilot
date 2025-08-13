const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function sendEmail({ name, email, message, files }) {
  const attachments = files.map((file) => ({
    content: file.buffer.toString("base64"),
    filename: file.originalname,
    type: file.mimetype,
    disposition: "attachment",
  }));

  const msg = {
    to: "TU_CORREO_DE_DESTINO@example.com", // ← Cambia esto por tu correo
    from: "TU_CORREO_VERIFICADO@sendgrid.com", // ← Debe estar verificado en SendGrid
    subject: `Nuevo mensaje de ${name}`,
    text: `${message}\n\nCorreo del remitente: ${email}`,
    attachments,
  };

  await sgMail.send(msg);
};

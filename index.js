const express = require("express");
const convertImageToPDF = require("./utils/imageToPdfConverter");
const fs = require("fs");

const app = express();

app.get("/image_to_pdf/:is_pdf_doc?", async (req, res) => {
  try {
    const { is_pdf_doc } = req.params;
    const { url } = req.query;
    const pdfResponse = await convertImageToPDF(url, is_pdf_doc);
    if (is_pdf_doc && parseInt(is_pdf_doc) === 1) {
      res.contentType("application/pdf");
      res.send(pdfResponse);
    } else {
      const pdfData = Buffer.from(pdfResponse, "base64url").toJSON();
      res.send(pdfData);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});

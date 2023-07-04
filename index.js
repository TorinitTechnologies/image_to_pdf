const express = require("express");
const convertImageToPDF = require("./utils/imageToPdfConverter");
const fs = require("fs");

const app = express();

app.get("/image_to_pdf/", async (req, res) => {
  try {
    const { url } = req.query;
    const pdfBuffer = await convertImageToPDF(url);
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});

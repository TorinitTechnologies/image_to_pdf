const express = require("express");
const convertImageToPDF = require("./utils/imageToPdfConverter");
const fs = require("fs");
 
const app = express();

app.get("/image_to_pdf/", async (req, res) => {
  const { url } = req.query;
  const pdfData = await convertImageToPDF(url);
  if (fs.existsSync("output.pdf")) {
    fs.unlinkSync("./output.pdf");
  } else {
    const pipeRes = pdfData.pipe(fs.createWriteStream("output.pdf"));
    pipeRes.addListener("close", () => {
      const pdfFileData = fs.readFileSync("./output.pdf");
      fs.unlinkSync("./output.pdf");
      res.contentType("application/pdf");
      res.send(pdfFileData);
      
    });
  }
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});

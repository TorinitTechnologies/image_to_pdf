const https = require("https");
const imageToPDF = require("./imageToPdf");

const convertImageToPDF = async (imageURL, isPDFDoc) => {
  try {
    const imageData = await loadImageDataFromURL(imageURL);
    const pages = [imageData];
    const method = isPDFDoc ? imageToPDF : imageToPDF.imageToPDFBase64;
    const pdfBuffer = await method(pages, imageToPDF.sizes.A4);
    return pdfBuffer;
  } catch (error) {
    throw new Error(error);
  }
};

const loadImageDataFromURL = (url) => {
  return new Promise((res, rej) => {
    https.get(url, (resp) => {
      resp.setEncoding("base64");
      body = "data:" + resp.headers["content-type"] + ";base64,";
      resp.on("data", (data) => {
        body += data;
      });
      resp.on("end", () => {
        return res(body);
      });
    });
  });
};

module.exports = convertImageToPDF;

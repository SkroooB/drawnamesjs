const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const imagePath = './input.jpg'; // replace with your image file
const fontFilePath = './cairo.tff'; // replace with your font file path
const fontSize = 50; // replace to the font size required
const fontColor = '##373739'; // replace with the text color needed

(async () => {
   // Load the image
   const image = await loadImage(imagePath);
   
   // Read the text file and loop through the names
   const names = fs.readFileSync('./names.txt', 'utf-8').split('\n');
   for (let i = 0; i < names.length; i++) {
       const name = names[i].trim();
       
       // Create a canvas for the name
       const canvas = createCanvas(image.width, image.height);
       const ctx = canvas.getContext('2d');
       ctx.drawImage(image, 0, 0, image.width, image.height);
       
       // Draw the name on the canvas
       ctx.font = `${fontSize}px ${fontFilePath}`;
       ctx.fillStyle = fontColor;
       ctx.textAlign = 'center';
       ctx.fillText(name, canvas.width / 2 + 10, canvas.height / 2 + 15); // change 2 + 15 to 2 + 50 to add 50px on the text placement
       
       // Save the canvas as a new image file with the name as the file name
       const output = fs.createWriteStream(`./output/${name}.jpg`);

       // log file name
       console.log(`${name} was saved successfully. 🚀`)

       const stream = canvas.createJPEGStream();
       stream.pipe(output);
   }
   // log finished
   console.log(`All images were saved successfully. ✅`)
})();

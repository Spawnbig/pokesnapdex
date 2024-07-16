const fs = require('fs');
const path = require('path');

const initialPath = path.join(__dirname, 'assets', 'images', 'sprites');
const spritesDir = path.join(initialPath);
const outputFilePath = path.join(initialPath, 'image_map.ts');

const outputDir = path.dirname(outputFilePath);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(spritesDir, (err, files) => {
    if (err) {
        console.error('Error reading the sprites directory', err);
        return;
    }

    const imageMapEntries = files
        .filter(file => path.extname(file) === '.png')
        .map(file => {
            const fileNameWithoutExt = path.basename(file, '.png');
            return `  ${fileNameWithoutExt}: require('./${file}'),`;
        });

    const importStatement = `import { ImageMap } from "@/interfaces/custom";\n`;
    const imageMapContent = `export const imageMap : ImageMap = {\n${imageMapEntries.join('\n')}\n};\n`;

    fs.writeFile(outputFilePath, importStatement + imageMapContent, err => {
        if (err) {
            console.error('Error writing the image_map.ts file', err);
            return;
        }

        console.log('image_map.ts has been successfully generated');
    });
});

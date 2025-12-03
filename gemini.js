import {
  GoogleGenAI,
  createUserContent,
} from "@google/genai";

import * as fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

function ImagePathToInline(img_path) {
    const base64Image1File = fs.readFileSync(img_path, {
        encoding: "base64",
    });

    return {
        inlineData: {
            mimeType: "image/png",
            data: base64Image1File,
        },
    }
}

async function main() {

    let imageInlineData = [];

    const img1Data = ImagePathToInline("imgs/img1.png");
    const img2Data = ImagePathToInline("imgs/img2.png");

    imageInlineData.push(img1Data);
    imageInlineData.push(img2Data);

    // Create prompt with text and inline images
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: createUserContent([
        "What is different between these two images?",
        ...imageInlineData
    ]),
});
console.log(response.text);
}

await main();
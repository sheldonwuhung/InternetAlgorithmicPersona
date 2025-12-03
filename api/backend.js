// import {GoogleGenAI, createUserContent} from "@google/genai";
// import * as fs from "node:fs";
// import dotenv from "dotenv";

// dotenv.config();

import { GoogleGenAI, createUserContent } from "@google/genai";

export default async function handler(req, res) {
    try {
        const { prompt, images } = req.body;

        const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

        let parts = [];

        for (const img of images) {
            parts.push({
                inlineData: {
                    mimeType: img.mimeType,
                    data: img.data
                }
            });
        }

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: createUserContent([{prompt, ...parts}])
        });

        console.log(result.response.text());

        res.status(200).json({ result: result.response.text() });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
        console.log("error");
    }
}

// const prompt = `The internet is a medium of how people can express themselves. 
//                 They can use it for platforms like social media, shopping sites, 
//                 music listening apps, and games, making it an every day reliance. 
//                 The images provided are a person's presence or usage of the internet. 
//                 Provide an identity report consisting of the following topics: 
//                 (Personality, Behavior) and feel free to add additional topics
//                 which best represent this person using the images provided.`;

// function ImagePathToInline(img_path, fileType) {
//     if (fileType == "jpg" || fileType == "jpeg") fileType = "jpeg";

//     const base64Image1File = fs.readFileSync(img_path, {
//         encoding: "base64",
//     });

//     return {
//         inlineData: {
//             mimeType: "image/" + fileType,
//             data: base64Image1File,
//         },
//     }
// }

// export default async function main(req, res) {
//     try {
//         let imageInlineData = [];
        
//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: createUserContent([prompt, ...imageInlineData]),
//         });
//         console.log(response.text);
//         res.status(200).json({ result: result.text });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Server error" });
//     }
// }

// function GetImgTypeFromAlt(string) {
//     let reversed = string.split('').reverse().join('');
//     return reversed.substring(0, reversed.indexOf("."));
// }
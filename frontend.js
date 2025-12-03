async function filesToBase64Array(files) {
  const base64Array = [];

  for (const file of files) {
    const base64 = await fileToBase64(file);
    const fileType = file.type;

    base64Array.push({
      mimeType: fileType,
      data: base64
    });
  }

  return base64Array;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(reader.result.split(",")[1]); 
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function send() {
    const input = document.getElementById("file-input");
    const files = input.files;

    const prompt = `The internet is a medium of how people can express themselves. 
                They can use it for platforms like social media, shopping sites, 
                music listening apps, and games, making it an every day reliance. 
                The images provided are a person's presence or usage of the internet. 
                Provide an identity report consisting of the following topics: 
                (Personality, Behavior) and feel free to add additional topics
                which best represent this person using the images provided.`;

    const images = await filesToBase64Array(files);

    const response = await fetch("https://internet-algorithmic-persona.vercel.app/backend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, images })
    });

    const data = await response.json();
    console.log(data.result);
}

document.getElementById("get-report-button").addEventListener('click', () => send());
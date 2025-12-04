const dataP = document.getElementById("data-p");
const tryAgainButton = document.getElementById("try-again-button");
const getReportButton = document.getElementById("get-report-button");
const header_2 = document.getElementById("first-scroll");

let sending = false;

function tryAgain() {
  window.location.reload()

  const location = header_2.getBoundingClientRect();
  let y = location.top + window.scrollY;
  window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
}

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
  if (sending) {
    console.log("Please wait before submitting another request");
    return;
  }
  sending = true;
  const input = document.getElementById("file-input");
  const files = input.files;

  const prompt = `Prompt Instructions: The internet is a medium of how people can express themselves. 
              They can use it for platforms like social media, shopping sites, 
              music listening apps, and games, making it an every day reliance. 
              The images provided are a person's presence or usage of the internet. 
              Provide an identity report.
              
              Technical Instructions: The identity report should be split into the following
              topics: (Personality, Behavior) and feel free to add additional topics
              which best represent this person using the images provided.
              This text will be put into an innerHTML of a paragraph HTML
              element. Provide proper line breaks within this text in the form of "<br>".
              Use proper HTML syntax such as putting words in between <b> and </b> to bold
              them instead of using astericks`;

  const images = await filesToBase64Array(files);

  const response = await fetch("https://internet-algorithmic-persona.vercel.app/api/backend", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt, images: images })
  });

  try {
      const data = await response.json();
      if (!response.ok) console.log("oh no");

      dataP.style.display = "block";
      console.log("ewdsavbew");
      dataP.textContent = "Creating Identity Report...";

      // const newString1 = data.result.replaceAll("***", "<br>");
      // const newString2 = data.result.replaceAll("**", "<br>");
      // const newString3 = data.result.replaceAll("*", "<br>");

      dataP.innerHTML = data.result;

      tryAgainButton.style.display = "inline";
      // console.log(data.result); 
  } catch (error) {
    // console.log();
      console.log(error);
  }

  sending = false;
}

getReportButton.addEventListener('click', () => send());
tryAgainButton.addEventListener('click', () => tryAgain());

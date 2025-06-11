const btn = document.querySelector(".verse__btn");
const verseRef = document.querySelector(".verse__ref");
const verseText = document.querySelector(".verse__text");

async function fetchVerse() {
  verseText.textContent = "Loading, one moment...";
  try {
    const res = await fetch("/api/verse");
    const data = await res.json();

    verseText.textContent = data.text.trim();
    verseRef.textContent = `— ${data.reference}`;
  } catch (err) {
    console.error("Fetch error:", err);
    verseText.textContent = "Something went wrong. Try again later.";
    verseRef.textContent = "";
  }
}

fetchVerse()

btn.addEventListener("click", fetchVerse);
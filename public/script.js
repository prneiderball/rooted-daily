const btn = document.getElementById("verse-btn");
const verseText = document.getElementById("verse-text");
const verseRef = document.getElementById("verse-reference");
const refSpan = document.getElementById("ref-text");
const themeToggle = document.getElementById("theme-toggle");
const shareBtn = document.getElementById("share-btn");

async function fetchVerse() {
  verseText.classList.remove("animate");
  verseRef.classList.remove("animate");

  void verseText.offsetWidth;

  verseText.textContent = "Loading, one moment...";
  refSpan.textContent = "";

  try {
    const res = await fetch("/.netlify/functions/verse");
    const data = await res.json();

    verseText.textContent = data.text.trim();
    refSpan.textContent = data.reference;

    verseText.classList.add("animate");
    verseRef.classList.add("animate");
  } catch (err) {
    console.error("Fetch error:", err);
    verseText.textContent = "Sorry, something went wrong.";
  }
}

btn.addEventListener("click", fetchVerse);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

shareBtn.addEventListener("click", async () => {
  const text = verseText.textContent + " — " + refSpan.textContent;
  if (navigator.share) {
    try {
      await navigator.share({ text });
    } catch {}
  } else {
    await navigator.clipboard.writeText(text);
    alert("Verse copied to clipboard!");
  }
});

fetchVerse();

import { extractBears } from './bearExtractor.js';
import { toggleComments, addComment } from './commentService.js';

const getBearData = async () => {
  const baseUrl = "https://en.wikipedia.org/w/api.php";
  const params = {
    action: "parse",
    page: "List_of_ursids",
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
  };
  
  try {
    const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`);
    if (!response.ok) throw new Error("Failed to fetch bear data.");
    const data = await response.json();
    await extractBears(data.parse.wikitext['*']);
  } catch (error) {
    console.error("Error fetching bear data:", error);
    alert("Unable to load bear data at this time. Please try again later.");
  }
};

// Initialize all event listeners
document.addEventListener("DOMContentLoaded", () => {
  toggleComments();
  addComment();
  getBearData();
});

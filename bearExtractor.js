import { fetchImageUrl } from './imageService.js';

export const extractBears = async (wikitext) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^\|]*)(?=\s*\()/);

      if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        const imageUrl = await fetchImageUrl(fileName);

        bears.push({
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: rangeMatch[1] || "Range information not available"
        });
      }
    }
  }

  // Render all bears
  const moreBearsSection = document.querySelector('.more_bears');
  moreBearsSection.innerHTML = bears.map(bear => `
    <div>
      <h3>${bear.name} (${bear.binomial})</h3>
      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
      <p><strong>Range:</strong> ${bear.range}</p>
    </div>
  `).join('');
};

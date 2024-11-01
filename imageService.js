export const fetchImageUrl = async (fileName) => {
    const baseUrl = "https://en.wikipedia.org/w/api.php";
    const params = {
      action: "query",
      titles: `File:${fileName}`,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*"
    };
  
    try {
      const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`);
      if (!response.ok) throw new Error(`Failed to fetch image for ${fileName}`);
      const data = await response.json();
  
      const pages = data.query.pages;
      const imageInfo = Object.values(pages)[0].imageinfo;
      return imageInfo ? imageInfo[0].url : "media/placeholder.jpg";
    } catch (error) {
      console.error("Image fetch error:", error);
      return "placeholder.jpg";
    }
  };
  

import axios from "axios";

const API_KEY = "49639271-38d2af22ba8dd6f27b20ef155"

export async function getImagesByQuery(query) {
  const response = await axios.get("https://pixabay.com/api/", {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    },
  });

  return response.data;
}






    

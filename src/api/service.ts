import axios from "axios";

const baseUrl = "https://api.thecatapi.com/v1";
const apiKey = process.env.API_KEY; // Replace with your actual API key OR put ur key in a .env file in this format, API_KEY="..."

async function getRandomCatImage(includeBreeds = false): Promise<string> {
  try {
    const response = await axios.get(`${baseUrl}/images/search`, {
      headers: {
        "x-api-key": apiKey,
      },
      params: {
        size: "small",
        limit: 2,
        has_breeds: includeBreeds,
        include_breeds: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

async function searchBreeds(query): Promise<string> {
  try {
    const response = await axios.get(
      `${baseUrl}/breeds/search?q=${query}&attach_image=1`,
      {
        headers: {
          "x-api-key": apiKey,
        },
        params: {
          attach_image: 1,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export default {
  getRandomCatImage,
  searchBreeds,
};

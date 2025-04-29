const BASE_URL = "https://app.ticketmaster.com/discovery";
const API_VERSION = "v2";
const API_KEY = "REMOVED_TICKETMASTER_KEY";

// Fetches attractions based on ID
// String Ids separated with comma
export const fetchAttractionsById = async (attractionsId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions?apikey=${API_KEY}&id=${attractionsId}&locale=*`)
      .then((response) => response.json())
      .then((data) => apiresponse = data);
    return apiresponse;
  };
  
  // Fetcher arrangementer basert på slug
  export const fetchEventsByCategory = async (categorySlug) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&classificationName=${categorySlug}&locale=*`
      );
      const data = await response.json();
      return data._embedded?.events || [];
    } catch (error) {
      console.error("Kunne ikke finne event gjennom kategori", error);
      return [];
    }
  };
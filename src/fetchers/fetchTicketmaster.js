// Requests go through our own /api/ticketmaster proxy, which adds the API key on the server
export const BASE_URL = "/api/ticketmaster";
export const API_VERSION = "v2";

// Fetches multiple classifications based on IDS
// param: String Ids separated with comma (in same string)
export const fetchSelectedClassifications = async (classificationIDs) => {
  let apiresponse = null;

  await fetch(`${BASE_URL}/${API_VERSION}/classifications?id=${classificationIDs}&locale=no`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded.classifications)
  return apiresponse || [];
}

// Fetches attractions based on ID
// param: String Ids separated with comma (in same string)
export const fetchAttractionsById = async (attractionsId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions?id=${attractionsId}&locale=*`)
      .then((response) => response.json())
      .then((data) => apiresponse = data._embedded?.attractions); 
    return apiresponse || []; 
  };

  // fetched single attraction by id
  // param: string id
  export const fetchSingleAttractionById = async (attracionId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions/${attracionId}?locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data);
    return apiresponse;
}

  // fetches single events by id
  // param: string id
  export const fetchSingleEventsById = async (eventId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/events/${eventId}?locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data);
    return apiresponse;
}

  // fetches multiple events by id
  // param: string ids, separated by comma in the same string.
  export const fetchMultipleEventsById = async (eventIds) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/events/?id=${eventIds}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded?.events);
    // Expired events disappear from Ticketmaster, so an empty result must not crash the page
    return apiresponse || [];
}

  // Fetches attractions, events and venues from suggest endpoint
  // param: string of parameters such as segmentId, countryCode, geoPoint, keyword
  export const fetchSuggestions = async (catFilter) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/suggest?locale=*${catFilter}&resource=events,venues`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded)
    
    return apiresponse;
  }

  // Fetch events by attraction ID
  // param: string, attraction ID to fetch events from
  export const fetchEventSearchInfo = async (attracionId) => {
    let apiresponse = null
    await fetch(`${BASE_URL}/${API_VERSION}/events?attractionId=${attracionId}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded?.events)

    return apiresponse || []
  }


  // Fetcher enkelt event med ID
  // param: string eventId
  export const fetchSingleEventById = async (eventId) => {
    if (!eventId) {
      console.error("Mangler eventId");
      return null;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/${API_VERSION}/events/${eventId}.json?locale=*`
      );

      if (!response.ok) {
        console.error(`Feil ved henting av event ${eventId}`);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Feil ved henting av enkelt event:", error);
      return null;
    }
};

//Fetch for 10 events for diffrent citys
// param: string, name of city to fetch related events
export const fetchTenEventsByCity = async(city_name)=> {
  let apiresponse = null
  await fetch(`${BASE_URL}/${API_VERSION}/events?locale=*&size=10&city=${city_name}`)
  .then((response) => response.json())
  .then((data)=> apiresponse = data._embedded.events)
  .catch((error) => console.error("Feil ved henting av byer", error))

  return apiresponse
}





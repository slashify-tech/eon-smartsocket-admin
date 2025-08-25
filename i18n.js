module.exports = {
    "locales": ["en", "ar"],
    "defaultLocale": "ar",
    "localeDetection": false,
   "experimental": {
      "skipLocaleHandlingForApiRoutes": true
    },
    // "loadLocaleFrom": () => (
    //   fetch(`${process.env.NEXT_PUBLIC_CMS_STRAPI_API_BASE_URL}/translations?locale=en`, {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN}`, // Include the authorization key here
    //       'Content-Type': 'application/json', // Optional, but good practice
    //     },
    //   })
    //   .then((res) => res.json()) // Use .json() to parse the response
    //   .then((data) => data.data[0].data) // getting data key
    // ),
    "pages": {
      "*": ["translations"]
    }
  };
  
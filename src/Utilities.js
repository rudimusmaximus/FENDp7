//Common functions to support Components
// see https://developers.google.com/web/updates/2015/03/introduction-to-fetch
/**
 * a call back used in a chained fetch
 * fetch(url).then(useHere).then(parseJson).then(dataCB).catch(errorCB)
 */
export const status = response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

/**
 * a call back used in a chained fetch
 * fetch(url).then(useHere).then(parseJson).then(dataCB).catch(errorCB)
 */
export const json = response => {
    return response.json();
};

// /**
//    * Integrates a script by url into the react app without any external
//    * components, we use to load the Google Maps API
//    * credit to Elharony walk through video
//    * https://www.youtube.com/watch?v=W5LhLZqj76s
//    * for the excellent approach. Also used https://snazzymaps.com/build-a-map for
//    * cetner lat long, zoom level, and styling inspirations.
//    */
// export const loadScript = (url) => {
//     let index = window.document.getElementsByTagName("script")[0];
//     let script = window.document.createElement("script");
//     script.src = url;
//     script.async = true;
//     script.defer = true;
//     //basically, make sure our script is the first one
//     index.parentNode.insertBefore(script, index);
// };

export const loadGoogleMapsPromise = () => {
    return new Promise((resolve, reject) => {
        window.resolveGoogleMapsPromise = () => {
            resolve(window.google);
            //clean up
            delete window.resolveGoogleMapsPromise;
        };
        // load the API
        const script = document.createElement('script');
        const API_KEY = `AIzaSyBQF4afYXb3lcv9KcI6BforUA1YfFBWank`;
        script.src = `https://maps.googleapis.com/maps/api/js?&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
    });
};

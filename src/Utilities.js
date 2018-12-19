//Common functions to support Components
// see https://developers.google.com/web/updates/2015/03/introduction-to-fetch
/**
 * a call back used in a chained fetch, it resolves or rejects a fetch it's
 * chained to by examining the status value of the 'response' object
 * fetch(url).then(useHere).then(parseJson).then(dataCB).catch(errorCB)
 * @param { object } - stream object response from fetch call.
 * see https://streams.spec.whatwg.org/
 * @return { string } - response to thenable or statusText
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
 * @param { response } - thenable from stream object response of upstream fetch
 * @return { object } - json
 */
export const json = response => {
    return response.json();
};

/**
 * This function loads the google api and returns a promise
 * Credit: Ryan Waite youtube coding
 * session https://www.youtube.com/watch?v=5J6fs_BlVC0&t=1298s
 * @return { object } - promise
 */
export function loadGoogleMapsPromise () {
    return new Promise(function(resolve, reject) {
        window.resolveGoogleMapsPromise = function() {
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
}

/**
 * This function takes in a COLOR, and then creates a new marker
 * icon of that color. The icon will be 21 px wide by 34 high, have an origin
 * of 0, 0 and be anchored at 10, 34).
 * credit: 'Project_Code_5_BeingStylish.html in ud864 on GitHub from course'
 */
export function makeMarkerIcon(markerColor) {
    var markerImage = new window.google.maps.MarkerImage(
        'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+
        markerColor + '|40|_|%E2%80%A2',
        new window.google.maps.Size(21, 34),
        new window.google.maps.Point(0, 0),
        new window.google.maps.Point(10, 34),
        new window.google.maps.Size(21,34)
    );
    return markerImage;
}

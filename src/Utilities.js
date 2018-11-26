//placeholder for common functions to support Components
//see https://developers.google.com/web/updates/2015/03/introduction-to-fetch
export const status = response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

export const json = response => {
    return response.json();
};

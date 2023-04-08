const key = 'api_url';

const APIStore = (() => {
  let baseUrl = window.localStorage.getItem(key) ?? import.meta.env.API_URL;

  return {
    getBaseUrl() {
      return baseUrl;
    },

    setBaseUrl(newUrl: string) {
      window.localStorage.setItem(key, newUrl);
      baseUrl = newUrl;
    },
  };
})();

export default APIStore;

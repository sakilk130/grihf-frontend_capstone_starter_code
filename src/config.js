export const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8181'
    : 'https://oussam92ing-8181.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/';
console.log('API_URL :', API_URL);

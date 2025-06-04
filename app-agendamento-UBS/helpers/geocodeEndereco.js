export const geocodeEndereco = async (endereco) => {
  const API_KEY = "c4e729adb4804b2793d70556479c7ad6"; // substitua pela sua chave

  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      endereco
    )}&key=${API_KEY}`
  );

  const data = await response.json();

  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    return { latitude: lat, longitude: lng };
  }

  return null;
};

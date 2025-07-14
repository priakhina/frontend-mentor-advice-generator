const BASE_URL = 'https://api.adviceslip.com/advice';

const getRandomAdvice = async () => {
  const response = await fetch(`${BASE_URL}?timestamp=${Date.now()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch a random advice');
  }
  return response.json();
};

export default { getRandomAdvice };

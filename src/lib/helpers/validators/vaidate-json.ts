export default function validateJson(text: string) {
  if (typeof text !== 'string') {
    return false;
  }

  try {
    const json = JSON.parse(text);

    return typeof json === 'object';
  } catch (error) {
    console.log(error);
    return false;
  }
}

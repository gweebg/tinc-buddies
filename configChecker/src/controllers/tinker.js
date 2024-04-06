module.exports.fetchTinkerData = async () => {
  try {
    const response = await fetch("http://tinker:3010/result");
    const tinkerData = await response.json();
    return tinkerData;
  } catch (error) {
    return { error: error.message };
  }
};

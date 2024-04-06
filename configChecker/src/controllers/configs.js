module.exports.getActiveConfigs = async () => {
  try {
    const response = await fetch("http://backend-app:3000/configs");
    configs = await response.json();
    return configs;
  } catch (error) {
    return { error: error.message };
  }
};

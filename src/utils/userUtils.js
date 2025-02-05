export const idTokenKey = () => {
  try {
    const idTokenKey = Object.keys(localStorage).find((key) =>
      key.includes('CognitoIdentityServiceProvider') && key.endsWith('.idToken')
    );
    if (idTokenKey) {
      return localStorage.getItem(idTokenKey);
    }
  } catch (error) {
    console.error("Error retrieving ID Token:", error);
  }
};
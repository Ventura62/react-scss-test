export const getViews = (callback) => {
  const context = require.context("src/views", true, /index\.js$/);
  const routes = [];

  context.keys().forEach((file) => {
    const routePath = file
      .replace("./", "")
      .replace("/index.js", "")
      .toLowerCase();
    const module = context(file);

    const routeData = callback(routePath, module);
    if (routeData) {
      const routeWithOrder = { ...routeData, order: getRoutesOrder(routePath) };
      if (routeWithOrder.order !== null){
        routes.push(routeWithOrder);
      }
    }
  });

  routes.sort((a, b) => a.order - b.order);

  return routes;
};


export const getRoutesOrder = (routePath) => {
  const orderMap = {
    "monitor": 1,
    "configure": 2
  };

  return orderMap[routePath] || null;
}
const listRoutes = (app) => {
  const routes = [];
  let i = 0;
  // Iterate through the app's router stack
  app._router.stack.forEach((middleware) => {
    if (i == 3) {
      console.log("Middleware Route Info:", {
        mid: middleware,
      });
      console.log(i);
    }
    i++;
    // Check if it's a route or a sub-router (nested route)
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods)
        .map((method) => method.toUpperCase())
        .join(", ");
      routes.push({
        method: methods,
        path: cleanPath(middleware.route.path),
      });
    } else if (middleware.name === "router") {
      // Handle nested routes
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods)
            .map((method) => method.toUpperCase())
            .join(", ");

          const fullPath = `${cleanPath(
            middleware.regexp.source.replace(/^\/\^|\$\/$/g, "")
          )}${cleanPath(handler.route.path)}`;
          routes.push({
            method: methods,
            path: fullPath,
          });
          if (i == 3) {
            console.log("Middleware Route Info:", {
              path: handler,
              name: handler.route.stack,
              mid: middleware,
            });
            console.log(i);
          }
          i++;
        }
      });
    }
  });

  return routes;
};

// Clean path to remove regex markers and format it properly
const cleanPath = (path) => {
  // Remove regex anchors (e.g., ^, $, etc.)
  path = path
    .replace(/^\^/, "") // Remove starting ^
    .replace(/\$$/, ""); // Remove trailing $

  // Replace escaped slashes with normal slashes
  path = path.replace(/\\\//g, "/");

  // Replace regex wildcards like `?`, `*`, and `+` with readable characters
  path = path.replace(/\(\?=\//g, "/"); // Clean up lookaheads like (?=/)

  // If a route parameter is present, replace with :parameter
  path = path.replace(/:([^\/]+)/g, "/:$1");

  return path;
};

const renderRoutes = (routes) => {
  return `
    <html>
      <head>
        <title>API Routes</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
          a { text-decoration: none; color: #3498db; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>API Routes</h1>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            ${routes
              .map(
                (route) => `
                <tr>
                  <td>${route.method}</td>
                  <td>
                    <a href="${route.path}" target="_blank">${route.path}</a>
                  </td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
};

export { listRoutes, renderRoutes };

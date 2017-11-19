export default ({content, state}) => {
  return `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <title>Electra Monitor</title>
        <link href='sanfona.css' rel='stylesheet' />
        <link href='http://localhost:8080/styles.css' rel='stylesheet' />
       </head>
      <body>
        <div id="app">${content}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(state)};
        </script>
        <script id='bundle' src="http://localhost:8080/bundle.js"></script>
      </body>
      </html>
  `;
}

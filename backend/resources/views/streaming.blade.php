
<!DOCTYPE html>
<html>
  <head>
    <script src='https://8x8.vc/vpaas-magic-cookie-fdf1f2ce238d4b2c99f0b71a86cc123f/external_api.js' async></script>
    <style>html, body, #jaas-container { height: 100%; }</style>
    <script type="text/javascript">
      window.onload = () => {
        const api = new JitsiMeetExternalAPI("8x8.vc", {
          roomName: "vpaas-magic-cookie-fdf1f2ce238d4b2c99f0b71a86cc123f/SampleAppDifferentMinistriesReadClearly",
          parentNode: document.querySelector('#jaas-container'),
                        // Make sure to include a JWT if you intend to record,
                        // make outbound calls or use any other premium features!
                        // jwt: "null"
        });
      }
    </script>
  </head>
  <body>
        <a style="font-size: 17px;margin:4vh; color:rgb(37, 168, 48)128, 128, 128); font-weight:bold; display:block" href="http://localhost:3000/courses">Go to courses page</a>
        <div id="jaas-container">
    </body>
</html>
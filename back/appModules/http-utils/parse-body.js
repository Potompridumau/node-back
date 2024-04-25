function parseBody(req) {
  return new Promise((resolve, reject) => {
       let body = "";
       req.on("data", (chunk) => {
         body += chunk.toString();
       });
       req.on("end", () => {
        //  console.log('Received body:', body); // Логирование тела запроса
         if (!body) {
           console.error('Empty request body');
           reject(new Error('Empty request body'));
           return;
         }
         try {
           const parsedBody = JSON.parse(body);
           resolve(parsedBody);
         } catch (e) {
           console.error('Error parsing JSON:', e);
           reject(e);
         }
       });
       req.on("error", (e) => {
         console.error('Error reading request body:', e);
         reject(e);
       });
  });
 }
 
 module.exports = parseBody;
 
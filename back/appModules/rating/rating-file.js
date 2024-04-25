const fs = require("fs").promises;

async function makeRatingFile(path, array) {
 try {
    const ratingFile = await fs.readFile(path, "utf8");
    let ratingArray = JSON.parse(ratingFile);

    
    const ratingMap = new Map(ratingArray.map(item => [item.id, item]));

    array.forEach((item) => {
      if (!ratingMap.has(item.id)) {
        let obj = {
          id: item.id,
          title: item.title,
          image: item.image,
          link: item.link,
          description: item.description,
          rating: 0,
        };
        
        ratingArray.push(obj);
        ratingMap.set(item.id, obj); 
      }
    });

    await fs.writeFile(path, JSON.stringify(ratingArray));
 } catch (error) {
    console.error('Error in makeRatingFile:', error);
    throw error;
 }
}

module.exports = makeRatingFile;

function createRating(obj, weight) {
    return (
       obj.gameplay * weight.gameplay +
       obj.design * weight.design +
       obj.idea * weight.idea
    );
   }
   
   function updateRating(array, id, rating) {
    const index = array.findIndex((item) => item.id === id);
    if (index === -1) {
       console.error(`Item with id ${id} not found`);
       return array; 
    }
   
    return array.map((item, idx) => idx === index ? { ...item, rating: item.rating + rating } : item);
   }
   
   module.exports = { createRating, updateRating };
   
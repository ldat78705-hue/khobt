const { getCategories } = require('./src/lib/neon/queries');
require('dotenv').config({ path: '.env.local' });
(async () => {
   const cats = await getCategories();
   console.log(JSON.stringify(cats.slice(0, 2), null, 2));
})();

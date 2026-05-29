const { getQuestions, getQuestionCount } = require('./src/lib/neon/queries');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const filters = {
    topic: 'so_hoc',
    category_id: 'c7854e13-38e0-4426-9b37-81d97ca07f62'
  };
  try {
    const q = await getQuestions(filters);
    const count = await getQuestionCount(filters);
    console.log("Count:", count);
    console.log("First question:", q[0]?.question_code);
  } catch(e) {
    console.error(e);
  }
})();

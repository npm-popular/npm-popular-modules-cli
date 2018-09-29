import test from 'ava';
import execa from 'execa';

test('write to Popular', async t => {
  const res = await execa('./cli.js');
  t.is(res.stdout, 'Write into Popular successfully.');
});

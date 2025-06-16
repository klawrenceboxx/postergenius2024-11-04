import fs from 'fs/promises';
import assert from 'node:assert';
import { test } from 'node:test';

const FILE = 'src/app/api/order/create/route.ts';

test('order create route uses valid status', async () => {
  const content = await fs.readFile(FILE, 'utf8');
  assert(/status:\s*"Not Processed"/.test(content), 'status should be "Not Processed"');
});

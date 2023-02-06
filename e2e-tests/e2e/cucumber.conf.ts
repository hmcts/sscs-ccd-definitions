import { setDefaultTimeout } from '@cucumber/cucumber';
import { Wait } from './enums/wait';

// eslint-disable-next-line no-magic-numbers
setDefaultTimeout(2 * Wait.max);

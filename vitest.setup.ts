// Date tests assert calendar days for UTC timestamps; run them in UTC so they
// pass in any local timezone, as they do in CI.
process.env.TZ = 'UTC';

import '@testing-library/jest-dom';

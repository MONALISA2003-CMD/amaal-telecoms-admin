export const config = {
  engineUrl: process.env.AMAAL_ENGINE_URL?.replace(/\/$/, '') || 'http://localhost:10000',
};

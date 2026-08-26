const configuredEngineUrl = process.env.AMAAL_ENGINE_URL?.trim().replace(/\/$/, '');

export const config = {
  engineUrl: configuredEngineUrl || (process.env.NODE_ENV === 'development' ? 'http://localhost:10000' : ''),
};

export function requireEngineUrl() {
  if (!config.engineUrl) {
    throw new Error('AMAAL_ENGINE_URL is not configured for this deployment.');
  }
  return config.engineUrl;
}

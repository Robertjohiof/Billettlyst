import { createClient } from 'https://esm.sh/@sanity/client';

export const client = createClient({
    projectId: 'zpqcgvdr',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-04-02', // Oppdatert API version
});
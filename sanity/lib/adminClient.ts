import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../env';

export const adminClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
});

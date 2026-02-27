import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || '';

  return (
    <div className="bg-background min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">
          Résultats pour "{query}"
        </h1>
        <Suspense fallback={<div className="flex justify-center items-center h-64"><p>Recherche en cours...</p></div>}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  );
}
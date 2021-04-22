import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <section className="flex items-center justify-center w-screen h-screen bg-rose-200">
      <article className="text-center">
        <h2>404 | Page not Found</h2>
        <p className="mt-5">
          Let us take you{' '}
          <Link to="/" className="underline text-rose-500 hover:text-rose-800">
            home
          </Link>
        </p>
      </article>
    </section>
  );
}

export default ErrorPage;

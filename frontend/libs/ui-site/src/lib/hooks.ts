import { GlossaryTerm, Reference } from '@algocount/shared/types';
import { useEffect, useState } from 'react';
import * as React from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { useReactHash } from './useReactPath';
export function useReferencesAdjuster(references: Reference[]) {
  //adjust reference numbers to respect the list numeration
  return useEffect(() => {
    references.forEach((reference, index) => {
      const referencesElements = window.document.querySelectorAll(
        `[data-reference="${reference.id.toString()}"]`
      );
      referencesElements.forEach((referenceEl) => {
        referenceEl.innerHTML = `${reference.in_text_citation}`;
      });
    });
  }, []);
}

export function useGlossaryAdjuster(glossaryTerms: GlossaryTerm[]) {
  //adjust reference numbers to respect the list numeration
  return useEffect(() => {
    const glossarySpans =
      window.document.querySelectorAll<HTMLElement>('span.mention');
    glossarySpans.forEach((span, index) => {
      const link = span.querySelector('a');
      const glossaryId = link?.hash.replace('#glossary/', '');
      const term = glossaryTerms.find(
        (term) => term.id.toString() === glossaryId
      );

      if (term) {
        span.style.backgroundColor = term.color;
      }
    });
  }, [glossaryTerms]);
}

export function useAnchors(basePath: string) {
  const hash = useReactHash();
  useEffect(() => {
    const serverPath = process.env.NX_BASE_PATH
      ? process.env.NX_BASE_PATH
      : basePath;
    const path = serverPath.endsWith('/') ? serverPath : `${serverPath}/`;

    const anchors = document.querySelectorAll('.anchorExperiments');
    anchors.forEach((element) => {
      const el = element as HTMLAnchorElement;
      const href = el.getAttribute('data-href');
      el.href = `${path}${href}`;
    });
  });

  useEffect(() => {
    //remember there is another useeffect watching for hash in glossarysidebar, so we mush check there is no glossary/ in hash
    if (hash && !hash.includes('glossary/')) {
      const anchorId = decodeURI(hash.replace('#', ''));
      const element = document.getElementById(anchorId);
      if (!element) {
        const anchor = document.querySelector(
          `span[data-anchor-id="${anchorId}"]`
        );
        if (anchor)
          anchor.scrollIntoView({
            behavior: 'smooth', // smooth scroll
            block: 'start',
          });
      }
    }
  }, [hash]);
}
export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        if (value !== debouncedValue) setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default useDebounce;

export const useSize = (target: HTMLElement | null) => {
  const [size, setSize] = React.useState<DOMRect>();

  React.useLayoutEffect(() => {
    if (target) setSize(target.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

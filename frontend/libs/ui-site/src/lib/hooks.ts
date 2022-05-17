import { GlossaryTerm } from '@algocount/shared/types';
import { DependencyList, useEffect } from 'react';

export function useReferencesAdjuster() {
  //adjust reference numbers to respect the list numeration
  return useEffect(() => {
    const ul = window.document.getElementById('referenceList');
    if (ul) {
      const list = ul.querySelectorAll('li');
      list.forEach((li, index) => {
        const id = li.getAttribute('data-reference-id');
        const references = window.document.querySelectorAll(
          `[data-reference="${id}"]`
        );
        references.forEach((reference) => {
          reference.innerHTML = `${index + 1}`;
        });
      });
    }
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

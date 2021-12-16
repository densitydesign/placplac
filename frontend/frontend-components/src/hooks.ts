import { useEffect } from "react";

export function useReferencesAdjuster() {
  //adjust reference numbers to respect the list numeration
  return useEffect(() => {
    const ul = window.document.getElementById("referenceList");
    if (ul) {
      const list = ul.querySelectorAll("li");
      list.forEach((li, index) => {
        const id = li.getAttribute("data-reference-id");
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

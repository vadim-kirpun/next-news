import "server-only";

import sanitizeHtml from "sanitize-html";

function normalizeControlCharacters(input: string, keepNewlines: boolean) {
  return input
    .replaceAll(/\r\n?/g, "\n")
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0);
      if (keepNewlines && code === 10) {
        return true;
      }
      return code >= 32 && code !== 127;
    })
    .join("");
}

export function sanitizePlainText(input: string) {
  const withoutHtml = sanitizeHtml(input.normalize("NFKC"), {
    allowedTags: [],
    allowedAttributes: {},
  });

  return normalizeControlCharacters(withoutHtml, false)
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeMultilineText(input: string) {
  const withoutHtml = sanitizeHtml(input.normalize("NFKC"), {
    allowedTags: [],
    allowedAttributes: {},
  });

  return normalizeControlCharacters(withoutHtml, true)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

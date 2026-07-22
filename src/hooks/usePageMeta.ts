import { useEffect } from 'react';

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    const ogTags: { attr: string; value: string; content: string }[] = [
      { attr: 'property', value: 'og:title', content: title },
      { attr: 'property', value: 'og:description', content: description },
      { attr: 'property', value: 'og:url', content: window.location.href },
      { attr: 'property', value: 'og:type', content: 'website' },
      { attr: 'name', value: 'twitter:card', content: 'summary_large_image' },
    ];

    ogTags.forEach(({ attr, value, content }) => {
      const selector = `meta[${attr}="${value}"]`;
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, value);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [title, description]);
}

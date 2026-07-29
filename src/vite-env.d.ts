/// <reference types="vite/client" />

// vite-imagetools query imports used for responsive AVIF/WebP srcsets.
declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}

declare module "*&format=jpg" {
  const src: string;
  export default src;
}

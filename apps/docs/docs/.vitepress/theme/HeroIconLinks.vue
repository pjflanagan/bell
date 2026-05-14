<template>
  <div class="hero-icon-links">
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :aria-label="link.label"
      target="_blank"
      rel="noopener noreferrer"
      class="hero-icon-link"
    >
      <span v-html="link.svg" />
    </a>
  </div>
</template>

<script setup>
const links = [
  {
    href: 'https://github.com/pjflanagan/bell',
    label: 'GitHub',
    svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
  },
  {
    href: 'https://www.npmjs.com/package/bell-lang',
    label: 'npm',
    svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456l-.005 10.382H5.113z"/></svg>'
  },
  {
    href: 'https://marketplace.visualstudio.com/items?itemName=pjflanagan.bell',
    label: 'VS Code Marketplace',
    svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>'
  }
]
</script>

<style scoped>
.hero-icon-links {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding-top: 24px;
  vertical-align: middle;
  margin-left: 6px;
}

@media (min-width: 640px) {
  .hero-icon-links {
    gap: 12px;
    margin-left: 12px;
    padding-top: 32px;
  }
}

.hero-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--vp-button-alt-border);
  background: rgba(128, 128, 128, 0.15);
  color: var(--vp-button-alt-text);
  transition: background-color 0.25s, color 0.25s;
}

.hero-icon-link:hover {
  background: rgba(128, 128, 128, 0.3);
  color: var(--vp-button-alt-hover-text);
}

.hero-icon-link :deep(svg) {
  width: 20px;
  height: 20px;
}
</style>

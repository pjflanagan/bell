<template>
  <div class="home-code-block">
    <div class="code-header">
      <span class="dot dot-red" />
      <span class="dot dot-yellow" />
      <span class="dot dot-green" />
      <span class="filename">example.GET.bel</span>
    </div>
    <pre class="code-body"><code><span class="c"># Fetch a user from an API</span>
<span class="kw">url</span> <span class="str">"https://api.example.com/users/123"</span>

<span class="method">GET</span>

<span class="kw">log</span> <span class="id">response</span><span class="op">.</span><span class="id">body</span><span class="op">.</span><span class="id">name</span>
</code></pre>
  </div>
</template>

<style scoped>
.home-code-block {
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-code-block-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 14px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.code-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot-red    { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green  { background: #27c93f; }

.filename {
  margin-left: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.code-body {
  margin: 0;
  padding: 20px 24px;
  line-height: 1.7;
  font-family: var(--vp-font-family-mono);
  overflow-x: auto;
}

code {
  background: none;
  padding: 0;
  font-size: inherit;
}

.c    { color: var(--vp-c-text-3); }
.kw   { color: var(--vp-c-brand-1); font-weight: 600; }
.str  { color: #a8cc8c; }
.method { color: #e06c75; font-weight: 700; }
.id   { color: var(--vp-c-text-1); }
.op   { color: var(--vp-c-text-3); }

@media (max-width: 959px) {
  .home-code-block {
    max-width: 100%;
  }
}
</style>

const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach((element) => fadeObserver.observe(element));

const heroButton = document.querySelector('.book-call-hero');
const stickyCta = document.querySelector('.sticky-cta');

const stickyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    stickyCta.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
    stickyCta.style.opacity = entry.isIntersecting ? '0' : '1';
  });
}, {
  threshold: 0
});

stickyCta.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
stickyObserver.observe(heroButton);

const articles = {
  'zero-devs': {
    title: 'How I Build Production Software with Zero Developers',
    body: [
      'I do not have a conventional dev team. I ship by writing specs, running agent workflows, reviewing aggressively, and keeping the architecture simple enough that one operator can own the whole system.',
      'The work is still real software: FastAPI backends, React frontends, Chrome extensions, queues, databases, auth, CRM integrations, enrichment, deployment, monitoring, and boring production details. AI changes the throughput, not the need for judgment.',
      'The pattern that works is spec → agent → review → verify → ship. I use agents for architecture exploration, implementation, QA, code review, and refactoring, but the product taste and final decisions stay human.',
      'This is especially powerful for GTM products. You can go from a market hypothesis to a working lead magnet, enrichment pipeline, CRM import, and outbound workflow in days instead of quarters.',
      'The lesson: the bottleneck is no longer access to developers. It is clarity of thought, distribution, and whether you can turn messy commercial insight into a system that actually runs.'
    ]
  },
  'ai-2026': {
    title: 'What Actually Works with AI in 2026',
    body: [
      'Everyone\'s talking about AI. Most of it is noise. Here\'s what I\'ve found actually works after two years of building with it every day.',
      'Voice agents are real now. Not the robotic ones from 2024 \u2014 actually good ones that handle nuance, interruptions, and complex conversations. I built Milly, an AI voice agent for recruitment, and it outperforms human screeners on consistency.',
      'Code generation has crossed the threshold from "helpful" to "I can\'t imagine working without it." The models understand architecture now, not just syntax. You can describe a system and get something that actually works.',
      'What doesn\'t work: autonomous agents left unsupervised, AI-generated content without human editing, and any tool that promises to "replace" thinking. AI amplifies your judgment \u2014 it doesn\'t replace it.',
      'The biggest unlock isn\'t any single tool. It\'s the workflow: specs \u2192 agents \u2192 review \u2192 ship. Once you internalise that loop, everything speeds up. The people winning with AI aren\'t the ones with the best prompts. They\'re the ones with the clearest thinking.'
    ]
  },
  'distribution': {
    title: 'Distribution-First Thinking for AI Products',
    body: [
      'The graveyard of AI products is full of technically impressive things nobody uses. I\'ve learned the hard way that distribution isn\'t something you add later \u2014 it\'s the first thing you design for.',
      'Before I write a single spec, I ask: where do the users already hang out, and how does this product reach them without me manually pushing it? If I can\'t answer that, I don\'t build it.',
      'My music platform got 10,000 users in 48 hours not because the product was perfect \u2014 it wasn\'t \u2014 but because we built it around a distribution channel that already existed. The product was designed to be shared.',
      'For AI products specifically, the distribution advantage is even more important. Everyone has access to the same models. The moat isn\'t the AI \u2014 it\'s the audience, the workflow integration, the switching cost you create.',
      'Build something people want to tell others about. Build it where people already are. Make the first experience so fast that there\'s no friction between curiosity and value. Everything else is optimisation.'
    ]
  },
  'ai-tools': {
    title: 'The Founder\'s Guide to Using AI Tools',
    body: [
      'I use AI in every part of my day. Not as a gimmick \u2014 as infrastructure. Here\'s the honest breakdown of what\'s in my stack and how I actually use it.',
      'For building: Claude is my primary thinking partner. I use it for architecture decisions, code review, writing specs, and debugging. Cursor is where the code happens. Between these two, I can build and ship a full product in days.',
      'For content: I write everything myself, then use AI to edit. Never the other way around. AI-generated content is obvious and nobody wants to read it. But AI as an editor? Incredible. It catches things I miss and tightens everything up.',
      'For operations: voice agents handle repetitive calls, AI processes data that would take humans hours, and automated workflows handle the boring stuff so I can focus on decisions that matter.',
      'The founder\'s trap is trying every new AI tool that launches. Don\'t. Pick a small stack, learn it deeply, and build real things. The value isn\'t in the tools \u2014 it\'s in what you build with them. One founder with the right AI setup can outship a team of ten.'
    ]
  }
};

const overlay = document.getElementById('articleOverlay');
const articleBody = document.getElementById('articleBody');
const closeButton = document.getElementById('articleClose');

function openArticle(articleId) {
  const article = articles[articleId];
  if (!article) return;

  let html = '<h2>' + article.title + '</h2>';
  article.body.forEach(function(paragraph) {
    html += '<p>' + paragraph + '</p>';
  });
  articleBody.innerHTML = html;

  document.body.classList.add('article-open');
  overlay.classList.add('active');
  articleBody.scrollTop = 0;
}

function closeArticle() {
  overlay.classList.remove('active');
  document.body.classList.remove('article-open');
}

document.querySelectorAll('.writing-card').forEach(function(card) {
  card.addEventListener('click', function(e) {
    e.preventDefault();
    openArticle(this.dataset.article);
  });
});

closeButton.addEventListener('click', closeArticle);

overlay.addEventListener('click', function(e) {
  if (e.target === overlay) closeArticle();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && overlay.classList.contains('active')) closeArticle();
});

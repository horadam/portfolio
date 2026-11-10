// Everything shown on the site lives here. Replace the placeholders marked TODO.

export const profile = {
  name: "Adam Horvath",
  title: "Senior full-stack engineer",
  pitch:
    "Software engineer with a background in psychology. I like building software and AI that work with and for people, not around them.",
  now: "Building Fieldwork. Open to full-stack and AI engineering roles.",
  about: [
    "I studied psychology at Masaryk University in Brno, then spent a few years working as a therapist in the US. Later, while working as a bartender in Las Vegas, I found my way into QA, learned to program at a bootcamp, and eventually started writing production code.",
    "Over the past seven years, I've built full-stack applications and backend systems across aviation, gaming payments, and enterprise commerce. More recently, I've built production AI agents for enterprise clients. I care about software that works beyond the demo: thoughtful design, reliable systems, solid testing, and human oversight where it matters.",
  ],
  // TODO: add a public email; until then Contact links to LinkedIn.
  email: "",
  linkedin: "https://www.linkedin.com/in/horadam",
  links: [
    { label: "GitHub", href: "https://github.com/horadam" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/horadam" },
    { label: "Résumé", href: "/resume.pdf" },
  ],
};

export type Proof = { value: string; label: string };

export type CaseStudy = {
  problem: string;
  steps: { title: string; body: string }[];
  architecture: string;
  hardProblems: { title: string; body: string }[];
  evidence: {
    intro: string;
    rows: { name: string; cases: number; passed: number; latency: string }[];
    findings: string;
    // The case study's "at a glance" row lists every eval row by default.
    // Set this when the rows are metrics over one suite, not separate suites.
    glance?: { term: string; value: string }[];
  };
  next: string[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  // Your part in it, shown in the case study's "at a glance" row.
  role?: string;
  // Featured projects get the large tile; the rest get compact cards.
  featured: boolean;
  summary: string;
  image: { src: string; alt: string; width: number; height: number };
  tags: string[];
  // Code, demo and similar. The case-study link is added automatically.
  links: { label: string; href: string }[];
  proof?: Proof[];
  // When the proof numbers were last taken from the project's own results.
  proofAsOf?: string;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "fieldwork",
    name: "Fieldwork",
    tagline: "Interview prep that can't invent your experience",
    year: "2026",
    role: "Solo: product, build and evals",
    featured: true,
    summary:
      "Import a resume into an experience bank you confirm line by line, check each job description against it requirement by requirement, and turn the gaps into a reviewed preparation plan.",
    image: {
      src: "/projects/fieldwork.jpg",
      alt: "Fieldwork applications view: a job list with fit coverage and requirement-by-requirement evidence",
      width: 800,
      height: 500,
    },
    tags: [
      "Next.js",
      "TypeScript",
      "OpenAI Agents SDK",
      "Ollama",
      "Supabase RLS",
      "Zod",
    ],
    links: [{ label: "Code", href: "https://github.com/horadam/fieldwork" }],
    // From Fieldwork's evals/results.md.
    proofAsOf: "Nov 2026",
    proof: [
      {
        value: "8 / 8",
        label: "resume eval cases passed, 3.8 s median on local qwen3:8b",
      },
      {
        value: "7 / 8",
        label: "job import cases passed, including prompt injection",
      },
    ],
    caseStudy: {
      problem:
        "Interview prep works best when it's grounded in what you've actually done. A model can draft that material quickly, but it also invents ownership, shifts dates and turns a team result into a personal one. Fieldwork makes every one of those interpretations visible and reviewable before it becomes evidence.",
      steps: [
        {
          title: "Experience bank",
          body: "Upload a resume PDF (parsed in the browser) or paste text, inspect the extracted text, then review and confirm each drafted role.",
        },
        {
          title: "Applications",
          body: "Import a job from its URL or pasted text; the extracted company, role and description are editable before saving.",
        },
        {
          title: "Fit analysis",
          body: "A bounded agent marks each requirement met, partial or gap and links it to the evidence behind it.",
        },
        {
          title: "Preparation plan",
          body: "Questions, answer outlines and a schedule built from the gaps, edited and activated by the user.",
        },
      ],
      architecture:
        "Storage and inference are independent: browser storage or a Supabase account with row-level security, and a local Ollama model or OpenAI. Every model call has a deadline, makes one attempt and has no paid fallback.",
      hardProblems: [
        {
          title: "Fetching untrusted job pages safely",
          body: "The server fetches a public listing on the user's behalf, which is a classic SSRF risk. Every redirect is re-checked, private and reserved addresses are denied, and the validated DNS result is pinned to the socket so a second lookup can't point somewhere else. Bytes, time and redirects are all bounded, and oversized pages are rejected rather than truncated.",
        },
        {
          title: "Never trusting the model's output",
          body: "Every response is validated with Zod, and each requirement and evidence ID is checked against the inputs the model was given. The plan schema only accepts link keys that exist. Drafts stay drafts until the user confirms them, so nothing the model invents becomes evidence for the next step.",
        },
        {
          title: "Retries that can't create duplicates",
          body: "Confirmations carry stable batch and item IDs. Browser storage validates the whole batch before one write; Supabase inserts it in a transaction with a per-user lock and uniqueness constraints. A failed save keeps the review open, and retrying it never overwrites or duplicates records.",
        },
      ],
      evidence: {
        intro:
          "Labelled synthetic cases run against the local model, scored by deterministic checks that CI tests against canned outputs. They're heuristics, so raw outputs are reviewed before a number is quoted.",
        rows: [
          { name: "Resume extraction", cases: 8, passed: 8, latency: "3.8 s" },
          { name: "Job import", cases: 8, passed: 7, latency: "6.8 s" },
          { name: "Preparation plan", cases: 3, passed: 2, latency: "37.6 s" },
        ],
        findings:
          "The evals found real bugs. Injected text in a job page once set the company to “EvilCorp”; a prompt change plus a field guard now keeps injected values out of the draft. Resume bullets were sometimes split into fake projects; they're now merged back into their role with a warning.",
      },
      next: [
        "Plans for several jobs at once can skip question practice; that case still fails.",
        "Very tight weekly budgets leave some gaps unscheduled.",
        "Fit analysis has a 20-case eval for OpenAI that hasn't been run yet.",
      ],
    },
  },
  {
    slug: "handbook-rag",
    name: "Handbook RAG",
    tagline: "A RAG assistant that shows its evidence and grades itself",
    year: "2026",
    role: "Solo: build, evals and deploy",
    featured: true,
    summary:
      "Answers questions about a fictional company's HR handbook from retrieved passages only, links every citation to the exact passage, and scores retrieval and answers separately so a wrong answer can be traced to the stage that failed.",
    image: {
      src: "/projects/handbook-rag.jpg",
      alt: "Handbook RAG eval results page: headline metric tiles for a judged run, compared with the run before it",
      width: 800,
      height: 500,
    },
    tags: [
      "Python",
      "FastAPI",
      "OpenAI embeddings",
      "Claude / GPT",
      "LLM-as-judge",
      "Vercel",
    ],
    links: [
      { label: "Live evals", href: "https://handbook-rag.vercel.app/evals" },
      {
        label: "Live demo (your API key)",
        href: "https://handbook-rag.vercel.app",
      },
      { label: "Code", href: "https://github.com/horadam/handbook-rag" },
    ],
    // From the project's evals/results.md (run 20261109T150357Z-prompt-v2);
    // "12 / 17" and the before latency are from run 20261109T143938Z.
    proofAsOf: "Nov 2026",
    proof: [
      {
        value: "17 / 17",
        label:
          "answers graded correct by a GPT-5 judge, up from 12 / 17 after one prompt change",
      },
      {
        value: "15 / 17",
        label: "answers fully grounded in the retrieved passages",
      },
    ],
    caseStudy: {
      problem:
        "A RAG answer can fail in two places: retrieval never found the passage, or the model had it and answered wrongly, left something out or added a detail it wasn't given. Grading only the final answer can't tell those apart, and a reader has no way to check a claim. This project makes both stages measurable and every answer checkable.",
      steps: [
        {
          title: "Ingest",
          body: "Ten handbook documents are split on paragraph boundaries into ~500-token chunks with overlap, embedded with text-embedding-3-small and exported, with their vectors, to a committed JSON index.",
        },
        {
          title: "Retrieve",
          body: "The question is embedded with the same model and the five nearest chunks are found by an exact squared-L2 search, the measure Chroma used, so distances match earlier runs.",
        },
        {
          title: "Generate",
          body: "A system prompt allows answers only from the supplied passages, requires filename citations and has one fixed refusal sentence for questions the handbook doesn't answer.",
        },
        {
          title: "Inspect",
          body: "Each answer opens to show every retrieved chunk with its distance, which were cited, timing and tokens; each citation opens the source page with that passage highlighted.",
        },
        {
          title: "Evaluate",
          body: "Labelled questions are scored for retrieval (hit, recall, MRR, precision), for keywords and refusals, and optionally by a judge model for correctness and groundedness. Runs are saved with their config, commit and dataset hash, and can be compared on the evals page.",
        },
      ],
      architecture:
        "FastAPI with a vanilla-JS UI, no LangChain or LlamaIndex. One adapter module is the only code that knows the Anthropic and OpenAI APIs, so answers and the judge run on either provider. Visitors bring their own key; it's used for that request only.",
      hardProblems: [
        {
          title: "Knowing which stage failed",
          body: "Each question is labelled with the documents a correct answer needs, so retrieval is scored before the model writes anything. A separate, larger judge model sees the same passages and returns two verdicts, correct against a written rubric and grounded in the context, through a forced tool call. A judge that returns something invalid counts as an error, not a failed case.",
        },
        {
          title: "Serverless without the vector database",
          body: "On Vercel, Chroma at query time meant about 308 MB of dependencies, a database file opened read-write on a read-only disk and a slow cold start. The index has 14 chunks, so the server now does an exact search over a committed JSON file, checked against Chroma's own results. Chroma only builds the index, and a test fails if the server imports it.",
        },
        {
          title: "Visitor API keys, used once",
          body: "Keys typed in the UI stay in the tab's session storage and go to the server in a header, never the URL. The server builds a client for that request only, never caches or logs the key, and masks anything key-shaped in provider error messages before passing the rest through.",
        },
      ],
      evidence: {
        intro:
          "17 labelled questions across five categories, including out-of-scope and false-premise cases, run on gpt-5-mini and judged by gpt-5. None of the 13 answerable questions was refused. Keyword and refusal checks are deterministic; judge verdicts aren't yet calibrated against human labels, so they're indicative.",
        rows: [
          {
            name: "Keyword and refusal checks",
            cases: 17,
            passed: 17,
            latency: "8.27 s",
          },
          { name: "Judge: correct", cases: 17, passed: 17, latency: "—" },
          { name: "Judge: grounded", cases: 17, passed: 15, latency: "—" },
          {
            name: "Refused when unanswerable",
            cases: 4,
            passed: 4,
            latency: "—",
          },
          {
            name: "Retrieval hit @5",
            cases: 13,
            passed: 13,
            latency: "0.30 s",
          },
        ],
        findings:
          "In the first judged run, 16 of 17 answers passed the keyword checks but the judge rated only 12 correct: answers stopped at the headline number and dropped the conditions around it. Asking for the direct answer plus the details the passages state alongside it raised that to 17 of 17, at a cost: output tokens nearly doubled and median answer time went from 3.11 s to 8.27 s. The two grounded failures added a derived figure and a claim the passages didn't make.",
        glance: [
          { term: "Eval set", value: "17 questions, 5 categories" },
          // Non-breaking spaces keep each fraction on one line.
          {
            term: "Judge",
            value: "17 / 17 correct, 15 / 17 grounded",
          },
        ],
      },
      next: [
        "Retrieval scores are perfect because 14 chunks with k = 5 retrieves a third of the index; a larger corpus is needed before they mean anything.",
        "Hand-label about 30 answers to measure how often the judge agrees with a person.",
        "Citations are document-level, inferred from filenames; claim-level citations are the next step.",
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function projectLinks(p: Project) {
  return p.caseStudy
    ? [{ label: "Case study", href: `/projects/${p.slug}` }, ...p.links]
    : p.links;
}

export type Role = {
  years: string;
  role: string;
  company: string;
  href?: string;
  summary: string;
  tags: string[];
};

// Most recent first. Wording follows the résumé in public/resume.pdf.
export const experience: Role[] = [
  {
    years: "2024 — 2026",
    role: "Senior Software Engineer",
    company: "Altimetrik",
    summary:
      "Built production AI agents on the Sierra platform for enterprise clients, including an incident-response agent that triages reports and opens Salesforce cases. Refining it with real interaction data raised meaningful submissions by about 20%.",
    tags: ["TypeScript", "Sierra", "LLM agents", "Salesforce"],
  },
  {
    years: "2021 — 2024",
    role: "Senior Software Engineer",
    company: "Fabric",
    summary:
      "Built serverless payment and reconciliation APIs on AWS, led a Vue to React and Redux migration, and set up a Cypress suite covering hundreds of user scenarios. Promoted from Software Engineer in 2023.",
    tags: ["Node.js", "AWS Lambda", "React", "MongoDB", "Cypress"],
  },
  {
    years: "2020 — 2021",
    role: "Full-stack Software Engineer",
    company: "Marker Trax",
    summary:
      "Built Node.js and Lambda APIs for payment, customer and gaming data, integrated payment and credit-check services, and shipped Angular and Ionic apps.",
    tags: ["TypeScript", "Express", "Angular", "Ionic"],
  },
  {
    years: "2019 — 2020",
    role: "Full-stack Software Engineer",
    company: "Allegiant Air",
    summary:
      "Built customer-facing React apps and Java Spring Boot APIs for passenger and accounting systems.",
    tags: ["React", "Redux-Saga", "Spring Boot", "MySQL"],
  },
];

export type Publication = {
  title: string;
  venue: string;
  date: string;
  credit: string;
  summary: string;
  tags: string[];
  href: string;
};

// Byline and summary checked against the published page.
export const publications: Publication[] = [
  {
    title:
      "SchemaFlow: agentic database change impact analysis, SQL generation and eval guardrails",
    venue: "OpenAI Cookbook",
    date: "Jun 2026",
    credit:
      "Co-author: built it as a Jupyter notebook and implemented the Promptfoo evals",
    summary:
      "Turns a plain-language database change request into structured JSON, a rollout plan with prechecks and rollback, and SQL across data layers, then checks it with deterministic guardrails and optional Promptfoo evals.",
    tags: ["OpenAI Agents SDK", "File Search", "Promptfoo", "SQL"],
    href: "https://developers.openai.com/cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook",
  },
];

export const alsoNotable = [
  "OpenAI Hackathon: an AI-assisted engineering workflow across Slack, GitHub and enterprise data",
  "Certified: OpenAI Technical Practitioner, Codex Deployment Practitioner, Claude with the Anthropic API",
];


const STORAGE_KEY = "lakehouse-pro-prep-v1";
const START_DATE = new Date("2026-05-17T09:00:00");
const navItems = [
  ["dashboard", "Dashboard", "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z"],
  ["topics", "Topics", "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 4v15.5 M20 22V6a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 6.5"],
  ["practice", "Practice", "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"],
  ["plan", "4-week plan", "M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18"],
  ["docs", "Docs", "M14 2H6v20h12V8z M14 2v6h6 M16 13H8 M16 17H8"]
];
const icon = (path) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"></path></svg>`;
const docs = {
  exam: ["Professional exam guide", "https://www.databricks.com/sites/default/files/2025-11/databricks-certified-data-engineer-professional-exam-guide-november-30-2025_0.pdf"],
  cert: ["Certification page", "https://www.databricks.com/learn/certification/data-engineer-professional"],
  bundles: ["Databricks Asset Bundles", "https://docs.databricks.com/aws/en/dev-tools/bundles/"],
  ldp: ["Lakeflow Declarative Pipelines", "https://docs.databricks.com/aws/en/ldp/"],
  autoloader: ["Auto Loader", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/"],
  cdf: ["Delta change data feed", "https://docs.databricks.com/aws/en/delta/delta-change-data-feed"],
  sharing: ["Delta Sharing", "https://docs.databricks.com/aws/en/delta-sharing/"],
  federation: ["Lakehouse Federation", "https://docs.databricks.com/aws/en/query-federation/"],
  queryProfile: ["Query profile", "https://docs.databricks.com/aws/en/query-profile/"],
  sparkUi: ["Spark UI", "https://docs.databricks.com/aws/en/compute/spark-ui"],
  systemTables: ["System tables", "https://docs.databricks.com/aws/en/admin/system-tables/"],
  jobs: ["Jobs", "https://docs.databricks.com/aws/en/jobs/"],
  jobRepair: ["Repair job runs", "https://docs.databricks.com/aws/en/jobs/repair-job-failures"],
  optimize: ["Optimization recommendations", "https://docs.databricks.com/aws/en/optimizations/"],
  liquid: ["Liquid clustering", "https://docs.databricks.com/aws/en/delta/clustering"],
  masks: ["Row filters and column masks", "https://docs.databricks.com/aws/en/tables/row-and-column-filters"],
  privileges: ["Unity Catalog privileges", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/"],
  managed: ["Managed tables", "https://docs.databricks.com/aws/en/tables/managed"],
  sqlUdf: ["User-defined functions", "https://docs.databricks.com/aws/en/udf/"],
  cli: ["Databricks CLI", "https://docs.databricks.com/aws/en/dev-tools/cli/"]
};
const link = (key) => ({ label: docs[key][0], url: docs[key][1] });
const topics = [
  {
    id: "python-sql", domain: "Python and SQL Development", weight: "20%", title: "Reusable Python and SQL development",
    summary: "Build modular transformations, parameterized SQL, UDFs, and testable PySpark logic that can move from notebook exploration into production jobs.",
    keyPoints: ["Use SQL and Python where each is clearest", "Keep transformations composable and testable", "Know UDF tradeoffs and when built-ins are better"], docs: [link("sqlUdf"), link("bundles")],
    questions: [
      ["A pipeline has repeated SQL logic across jobs. What is the best production-oriented move?", ["Keep copying the query so each job is independent", "Extract shared logic into versioned code or SQL objects and deploy it consistently", "Store the query in a dashboard description", "Disable tests so deployment is faster"], 1, "Reusable code and deployable assets reduce drift and make testing possible across environments.", docs.bundles[1], "warmup"],
      ["When should you be cautious about Python UDFs in Spark transformations?", ["When a native Spark SQL function can express the same logic", "Only when the output is a string", "Only in serverless warehouses", "Never, UDFs are always faster"], 0, "Built-in Spark functions usually optimize better than custom UDF logic.", docs.sqlUdf[1], "exam-style"]
    ]
  },
  {
    id: "ingestion", domain: "Ingestion and Orchestration", weight: "10%", title: "Auto Loader, CDC, and pipeline orchestration",
    summary: "Ingest incremental cloud data reliably, handle schema changes, and design jobs or Lakeflow pipelines that recover cleanly.",
    keyPoints: ["Use Auto Loader for incremental file ingestion", "Plan schema inference and evolution", "Understand CDC with change data feed"], docs: [link("autoloader"), link("cdf"), link("jobs")],
    questions: [
      ["Which feature is designed for incrementally processing new files arriving in cloud object storage?", ["Lakehouse Federation", "Auto Loader", "Delta Sharing", "Column masks"], 1, "Auto Loader discovers and processes new files as they arrive in cloud object storage.", docs.autoloader[1], "warmup"],
      ["A downstream table must process row-level changes from an upstream Delta table. Which capability is most relevant?", ["Change data feed", "Liquid clustering", "Query history", "Foreign catalogs"], 0, "Change data feed exposes inserts, updates, and deletes so downstream consumers can process changes.", docs.cdf[1], "exam-style"]
    ]
  },
  {
    id: "transform-quality", domain: "Transformation and Data Quality", weight: "18%", title: "Lakeflow pipelines and quality rules",
    summary: "Create reliable declarative pipelines with streaming tables, materialized views, expectations, and maintainable transformation layers.",
    keyPoints: ["Know streaming tables vs materialized views", "Use expectations for data quality", "Keep medallion layers purposeful"], docs: [link("ldp"), link("autoloader")],
    questions: [
      ["Why use expectations in a Lakeflow Declarative Pipeline?", ["To document cluster policy owners", "To define data quality rules and control invalid records", "To create external locations", "To tune Photon automatically"], 1, "Expectations let a pipeline validate records and define what happens when records fail quality checks.", docs.ldp[1], "exam-style"],
      ["A table is refreshed from a query result and should represent the latest computed state. Which Lakeflow concept fits best?", ["Materialized view", "Foreign catalog", "Recipient", "Audit log"], 0, "Materialized views store the result of a query and refresh as the pipeline updates.", docs.ldp[1], "warmup"]
    ]
  },
  {
    id: "sharing-federation", domain: "Data Sharing and Federation", weight: "8%", title: "Share and query governed data",
    summary: "Use Delta Sharing for controlled data sharing and Lakehouse Federation for querying external systems through governed catalogs.",
    keyPoints: ["Distinguish sharing from federation", "Know providers, recipients, and shares", "Understand foreign catalogs and connections"], docs: [link("sharing"), link("federation")],
    questions: [
      ["A partner needs read-only access to selected tables without copying files into their workspace. What should you evaluate first?", ["Delta Sharing", "A local temp view", "A cluster init script", "A deleted checkpoint"], 0, "Delta Sharing is the Databricks open protocol for securely sharing live data.", docs.sharing[1], "warmup"],
      ["What is Lakehouse Federation primarily used for?", ["Querying external data sources through Databricks governance", "Converting SQL into Python", "Creating personal access tokens", "Repairing failed task runs"], 0, "Lakehouse Federation lets Databricks query external systems using connections and foreign catalogs.", docs.federation[1], "exam-style"]
    ]
  },
  {
    id: "monitoring", domain: "Monitoring and Logging", weight: "12%", title: "Observe jobs, pipelines, and platform events",
    summary: "Use job run details, pipeline event logs, system tables, query history, alerts, and notifications to detect and explain failures.",
    keyPoints: ["Read job and pipeline run state", "Use system tables for account-level observability", "Connect alerts to operational signals"], docs: [link("systemTables"), link("jobs"), link("queryProfile")],
    questions: [
      ["Which source is best for account-level operational data such as audit, billing, lineage, or query history?", ["System tables", "Notebook comments", "Cluster name prefixes", "A local CSV"], 0, "System tables expose Databricks-hosted operational data for observability and governance use cases.", docs.systemTables[1], "exam-style"],
      ["A production workflow failed overnight. What should you inspect first to understand which task failed and why?", ["The job run details and task output", "The certification page", "A Delta Sharing recipient", "The warehouse color theme"], 0, "Job run details show task states, output, retries, and failure messages.", docs.jobs[1], "warmup"]
    ]
  },
  {
    id: "performance", domain: "Performance and Cost Optimization", weight: "12%", title: "Optimize compute, tables, and queries",
    summary: "Tune table layout, query plans, file sizes, clustering, and compute choices while watching cost and latency tradeoffs.",
    keyPoints: ["Use query profile to find bottlenecks", "Know data skipping and clustering goals", "Match compute to workload"], docs: [link("queryProfile"), link("sparkUi"), link("optimize"), link("liquid")],
    questions: [
      ["A SQL query is slow and you need to identify expensive operators. Which tool is most directly useful?", ["Query profile", "Delta Sharing recipient list", "Personal access token page", "Column mask DDL only"], 0, "Query profile visualizes query execution and helps identify bottlenecks.", docs.queryProfile[1], "warmup"],
      ["A large Delta table is commonly filtered by a few columns. Which table feature may improve data skipping over time?", ["Liquid clustering", "Open sharing", "A job notification", "A foreign connection"], 0, "Liquid clustering can improve data layout for selective queries without static partition choices.", docs.liquid[1], "exam-style"]
    ]
  },
  {
    id: "security", domain: "Security and Compliance", weight: "8%", title: "Protect sensitive data access",
    summary: "Apply row filters, column masks, secure privileges, and least-privilege access patterns in Unity Catalog governed environments.",
    keyPoints: ["Use column masks for sensitive fields", "Use row filters for row-level access", "Prefer least privilege"], docs: [link("masks"), link("privileges")],
    questions: [
      ["Analysts can query a customer table but should not see full Social Security numbers. Which feature fits?", ["Column mask", "Liquid clustering", "Query profile", "Repair run"], 0, "Column masks can transform or hide sensitive values at query time based on governance rules.", docs.masks[1], "warmup"],
      ["A regional team should only see rows for its own region. Which Unity Catalog feature is designed for this?", ["Row filter", "Auto Loader schema hint", "Photon toggle", "Foreign recipient"], 0, "Row filters enforce row-level access control on tables.", docs.masks[1], "exam-style"]
    ]
  },
  {
    id: "governance", domain: "Governance and Data Management", weight: "8%", title: "Unity Catalog objects and lifecycle",
    summary: "Understand catalogs, schemas, managed tables, permissions, ownership, and how governance boundaries shape production data design.",
    keyPoints: ["Know managed table behavior", "Understand privilege inheritance", "Separate environments intentionally"], docs: [link("managed"), link("privileges")],
    questions: [
      ["What is a core reason to use Unity Catalog managed tables?", ["Databricks manages the table data location and lifecycle", "They bypass all governance checks", "They only work with CSV files", "They cannot be queried from SQL"], 0, "Managed tables are governed Unity Catalog tables where Databricks manages the underlying data lifecycle.", docs.managed[1], "warmup"],
      ["Permissions are granted at a catalog level. What should you remember about lower-level objects?", ["Privilege inheritance can apply to contained objects", "Permissions never apply below catalogs", "Only notebooks can inherit privileges", "Privileges are controlled by file names"], 0, "Unity Catalog privileges can be inherited by child objects depending on the object hierarchy and grant model.", docs.privileges[1], "exam-style"]
    ]
  },
  {
    id: "debug-deploy", domain: "Debugging and Deployment", weight: "12%", title: "Deploy, repair, and troubleshoot production workloads",
    summary: "Use Asset Bundles, CLI workflows, job repair, run outputs, and deployment separation to move data products safely across environments.",
    keyPoints: ["Use DABs for versioned deployment", "Repair failed job runs instead of rerunning everything", "Inspect logs before changing code"], docs: [link("bundles"), link("cli"), link("jobRepair"), link("jobs")],
    questions: [
      ["Which tool is designed to define and deploy Databricks resources as versioned project files?", ["Databricks Asset Bundles", "A query profile", "Open sharing", "A row filter"], 0, "Databricks Asset Bundles let you describe jobs, pipelines, and related resources for deployment.", docs.bundles[1], "warmup"],
      ["One task failed near the end of a multi-task job. What feature can avoid rerunning successful upstream tasks?", ["Repair run", "Column mask", "Foreign catalog", "Auto compaction"], 0, "Repair runs can rerun failed and dependent tasks without repeating every successful task.", docs.jobRepair[1], "exam-style"]
    ]
  },
  {
    id: "modeling", domain: "Data Modeling", weight: "8%", title: "Model reliable lakehouse data products",
    summary: "Choose medallion layers, dimensional models, primary query shapes, table ownership, and freshness patterns that match user needs.",
    keyPoints: ["Use bronze, silver, gold deliberately", "Model for query patterns and governance", "Know when denormalization helps analytics"], docs: [link("managed"), link("ldp"), link("optimize")],
    questions: [
      ["A gold table serves business reporting. What should shape its design most?", ["The reporting query patterns and business definitions", "The color of the notebook", "The number of workspace users only", "The name of the source bucket"], 0, "Gold tables should reflect business-ready entities, definitions, and consumption patterns.", docs.ldp[1], "warmup"],
      ["Why might a team avoid excessive partitioning on a Delta table?", ["It can create too many small files or rigid layouts for evolving query patterns", "It disables SQL", "It removes all governance", "It prevents Auto Loader from running anywhere"], 0, "Table layout should match access patterns; excessive partitioning can hurt maintenance and performance.", docs.optimize[1], "hard"]
    ]
  }
];

topics.forEach((topic) => {
  topic.questions = topic.questions.map((q) => ({ prompt: q[0], choices: q[1], answerIndex: q[2], explanation: q[3], docsUrl: q[4], difficulty: q[5] }));
});

const studyPlan = [
  ["Diagnostic and app setup", "Take a mixed quiz and mark confidence for every domain."], ["Python and SQL", "Review reusable functions, UDF tradeoffs, and production code shape."],
  ["Asset Bundles", "Study bundle files, targets, variables, and deployment workflow."], ["Lakeflow basics", "Compare streaming tables, materialized views, and expectations."],
  ["Auto Loader", "Review file discovery, schema inference, schema evolution, and checkpoints."], ["CDC patterns", "Study change data feed and downstream incremental logic."],
  ["Week 1 review", "Retake weak questions and update confidence."], ["Data quality", "Practice expectation behavior and invalid record handling."],
  ["Transformation design", "Map bronze, silver, and gold responsibilities."], ["Delta Sharing", "Study shares, recipients, providers, and sharing modes."],
  ["Lakehouse Federation", "Study connections, foreign catalogs, and governance boundaries."], ["Jobs orchestration", "Review job tasks, parameters, retries, and notifications."],
  ["Pipeline operations", "Read pipeline event and monitoring concepts."], ["Week 2 review", "Do a weak-area quiz and summarize misses."],
  ["System tables", "Study audit, billing, lineage, query history, and access patterns."], ["Query profile", "Practice identifying bottlenecks from query execution details."],
  ["Spark UI", "Review stages, tasks, shuffles, skew signals, and executor behavior."], ["Optimization", "Study data skipping, file pruning, compute sizing, and recommendations."],
  ["Liquid clustering", "Review layout optimization and when it beats static partitions."], ["Security", "Practice row filters, column masks, and least privilege decisions."],
  ["Week 3 review", "Retake performance, monitoring, and security misses."], ["Unity Catalog", "Review managed tables, object hierarchy, and privilege inheritance."],
  ["Deployment", "Study DAB deploy flow, CLI usage, targets, and promotion."], ["Debugging", "Practice job repair, logs, retries, and failure isolation."],
  ["Data modeling", "Review medallion design, dimensional thinking, and table ownership."], ["Mock drill 1", "Take a mixed quiz and write down the top five weak concepts."],
  ["Mock drill 2", "Focus on hard questions and official docs for every miss."], ["Final review", "Only review weak topics, cheat sheet notes, and docs bookmarks."]
];
let state = loadState();
let activeRoute = "dashboard";
let activeFilter = "all";
let quizMode = "weak";
let quizQuestions = [];
let quizIndex = 0;
let selectedAnswer = null;

function defaultState() {
  return { completedDays: [], confidence: Object.fromEntries(topics.map((topic) => [topic.id, "weak"])), answers: {} };
}
function loadState() {
  try { return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; } catch { return defaultState(); }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function allQuestions() {
  return topics.flatMap((topic) => topic.questions.map((question, index) => ({ ...question, id: `${topic.id}-${index}`, topicId: topic.id, topicTitle: topic.title, domain: topic.domain })));
}
function confidenceScore(value) { return { weak: 0, brushing: 50, strong: 100 }[value] ?? 0; }
function topicAccuracy(topicId) {
  const ids = allQuestions().filter((q) => q.topicId === topicId).map((q) => q.id);
  const answered = ids.filter((id) => state.answers[id]);
  if (!answered.length) return 0;
  return Math.round((answered.filter((id) => state.answers[id].correct).length / answered.length) * 100);
}
function topicReadiness(topic) {
  return Math.round(confidenceScore(state.confidence[topic.id]) * 0.55 + topicAccuracy(topic.id) * 0.45);
}
function overallReadiness() { return Math.round(topics.reduce((sum, topic) => sum + topicReadiness(topic), 0) / topics.length); }
function currentDayIndex() {
  const diff = Math.floor((new Date() - START_DATE) / 86400000);
  return Math.min(Math.max(diff, 0), 27);
}
function routeTo(route) {
  activeRoute = route;
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
  document.getElementById(`${route}View`).classList.add("is-active");
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("is-active", button.dataset.route === route));
  document.getElementById("viewTitle").textContent = navItems.find((item) => item[0] === route)?.[1] || "Dashboard";
  if (route === "practice") prepareQuiz();
  render();
}
function renderNav() {
  document.getElementById("navList").innerHTML = navItems.map(([id, label, path]) => `<button class="nav-button ${id === activeRoute ? "is-active" : ""}" type="button" data-route="${id}">${icon(path)}<span>${label}</span></button>`).join("");
}
function renderDashboard() {
  const readiness = overallReadiness();
  document.getElementById("readinessScore").textContent = `${readiness}%`;
  document.getElementById("readinessRing").style.strokeDashoffset = String(352 - readiness * 3.52);
  const answered = Object.keys(state.answers).length;
  const correct = Object.values(state.answers).filter((answer) => answer.correct).length;
  const strong = topics.filter((topic) => topicReadiness(topic) >= 75).length;
  document.getElementById("statGrid").innerHTML = [
    ["Days complete", `${state.completedDays.length}/28`], ["Strong domains", `${strong}/10`], ["Questions answered", answered], ["Quiz accuracy", answered ? `${Math.round((correct / answered) * 100)}%` : "0%"]
  ].map(([label, value]) => `<article class="stat-card"><span>${label}</span><strong>${value}</strong></article>`).join("");
  const day = currentDayIndex();
  const [title, detail] = studyPlan[day];
  const completedToday = state.completedDays.includes(day);
  document.getElementById("todayTitle").textContent = `Day ${day + 1}: ${title}`;
  document.getElementById("todayContent").innerHTML = `<ul class="today-list"><li><span class="check-dot">1</span><span>Read the linked official docs for the topic.</span></li><li><span class="check-dot">2</span><span>${detail}</span></li><li><span class="check-dot">3</span><span>Answer at least 5 practice questions or review every miss.</span></li></ul><p class="small-note">Status: ${completedToday ? "completed today" : "not complete yet"}</p>`;
  document.getElementById("completeToday").textContent = completedToday ? "Today is complete" : "Mark today complete";
  document.getElementById("weakList").innerHTML = [...topics].sort((a, b) => topicReadiness(a) - topicReadiness(b)).slice(0, 4).map((topic, index) => `<article class="weak-item"><span class="check-dot">${index + 1}</span><span><strong>${topic.title}</strong><span>${topicReadiness(topic)}% ready - ${topic.domain}</span></span></article>`).join("");
  document.getElementById("strengthMap").innerHTML = topics.map((topic) => {
    const score = topicReadiness(topic);
    return `<button class="strength-card" type="button" data-topic="${topic.id}" aria-label="Open ${topic.title}"><span class="domain-meta">${topic.weight}</span><strong>${topic.title}</strong><div class="progress-bar" aria-hidden="true"><span style="width:${score}%"></span></div><span class="small-note">${score}% ready</span></button>`;
  }).join("");
}
function renderTopics() {
  const filters = ["all", "weak", "brushing", "strong"];
  document.getElementById("topicFilters").innerHTML = filters.map((filter) => `<button class="chip-button ${filter === activeFilter ? "is-active" : ""}" type="button" data-filter="${filter}">${filter === "all" ? "All topics" : filter}</button>`).join("");
  const visible = activeFilter === "all" ? topics : topics.filter((topic) => state.confidence[topic.id] === activeFilter);
  document.getElementById("topicGrid").innerHTML = visible.map((topic) => {
    const score = topicReadiness(topic);
    return `<article class="topic-card" id="topic-${topic.id}"><header><div><span class="domain-meta">${topic.domain} - ${topic.weight}</span><h3>${topic.title}</h3></div><span class="status-pill">${score}%</span></header><p>${topic.summary}</p><ul class="key-list">${topic.keyPoints.map((point) => `<li><span class="check-dot">✓</span><span>${point}</span></li>`).join("")}</ul><div class="confidence-row" aria-label="Confidence for ${topic.title}">${["weak", "brushing", "strong"].map((level) => `<button class="confidence-button ${state.confidence[topic.id] === level ? "is-active" : ""}" type="button" data-confidence="${level}" data-topic="${topic.id}">${level}</button>`).join("")}</div><div class="doc-links">${topic.docs.map((doc) => `<a class="doc-link" href="${doc.url}" target="_blank" rel="noreferrer">${doc.label}</a>`).join("")}</div></article>`;
  }).join("");
}
function prepareQuiz() {
  const questions = allQuestions();
  if (quizMode === "weak") {
    const weakIds = topics.filter((topic) => topicReadiness(topic) < 70).map((topic) => topic.id);
    quizQuestions = questions.filter((question) => weakIds.includes(question.topicId));
  } else if (quizMode !== "mixed") quizQuestions = questions.filter((question) => question.topicId === quizMode);
  else quizQuestions = questions;
  if (!quizQuestions.length) quizQuestions = questions;
  quizIndex = Math.min(quizIndex, quizQuestions.length - 1);
  selectedAnswer = null;
}
function renderPractice() {
  const modes = [{ id: "weak", label: "Weak-area quiz" }, { id: "mixed", label: "Mixed mock drill" }, ...topics.map((topic) => ({ id: topic.id, label: topic.title }))];
  document.getElementById("quizModes").innerHTML = modes.map((mode) => `<button class="mode-button ${quizMode === mode.id ? "is-active" : ""}" type="button" data-mode="${mode.id}">${mode.label}</button>`).join("");
  const answered = Object.keys(state.answers).length;
  const correct = Object.values(state.answers).filter((answer) => answer.correct).length;
  document.getElementById("answeredCount").textContent = answered;
  document.getElementById("accuracyScore").textContent = answered ? `${Math.round((correct / answered) * 100)}%` : "0%";
  const question = quizQuestions[quizIndex] || allQuestions()[0];
  document.getElementById("quizCount").textContent = `${quizIndex + 1} / ${quizQuestions.length}`;
  const saved = state.answers[question.id];
  const chosen = selectedAnswer ?? saved?.chosenIndex;
  const answeredQuestion = chosen !== undefined;
  document.getElementById("quizCard").innerHTML = `<span class="domain-meta">${question.domain} - ${question.difficulty}</span><p class="question-text">${question.prompt}</p><div class="answer-list">${question.choices.map((choice, index) => { let className = "answer-button"; if (answeredQuestion && index === question.answerIndex) className += " is-correct"; if (answeredQuestion && index === chosen && index !== question.answerIndex) className += " is-wrong"; return `<button class="${className}" type="button" data-answer="${index}" ${answeredQuestion ? "disabled" : ""}>${choice}</button>`; }).join("")}</div>${answeredQuestion ? `<div class="explanation"><strong>${chosen === question.answerIndex ? "Correct" : "Review this"}</strong><p>${question.explanation}</p><a class="doc-link" href="${question.docsUrl}" target="_blank" rel="noreferrer">Open source doc</a></div>` : ""}<div class="quiz-footer"><button class="ghost-button" type="button" id="prevQuestion">Previous</button><span class="small-note">Topic: ${question.topicTitle}</span><button class="primary-button" type="button" id="nextQuestion">Next</button></div>`;
}
function renderPlan() {
  const weeks = [0, 1, 2, 3].map((week) => studyPlan.slice(week * 7, week * 7 + 7));
  document.getElementById("weekGrid").innerHTML = weeks.map((days, weekIndex) => `<article class="week-card"><span class="day-pill">Week ${weekIndex + 1}</span><h3>${["Build foundations", "Data movement", "Operate and optimize", "Deploy and review"][weekIndex]}</h3><ul class="day-list">${days.map(([title, detail], index) => { const absoluteDay = weekIndex * 7 + index; const done = state.completedDays.includes(absoluteDay); return `<li><strong>Day ${absoluteDay + 1}: ${title}</strong><span>${detail}</span><span class="small-note">${done ? "Complete" : "Pending"}</span></li>`; }).join("")}</ul></article>`).join("");
}
function renderDocs() {
  document.getElementById("docsGrid").innerHTML = topics.map((topic) => `<article class="doc-card"><span class="domain-meta">${topic.domain}</span><h3>${topic.title}</h3><p>${topic.summary}</p><div class="doc-links">${topic.docs.map((doc) => `<a class="doc-link" href="${doc.url}" target="_blank" rel="noreferrer">${doc.label}</a>`).join("")}</div></article>`).join("");
}
function render() {
  document.getElementById("dateLine").textContent = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
  renderNav();
  renderDashboard();
  renderTopics();
  if (!quizQuestions.length) prepareQuiz();
  renderPractice();
  renderPlan();
  renderDocs();
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}
function handleClick(event) {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) { routeTo(routeButton.dataset.route); return; }
  const topicButton = event.target.closest("[data-topic]");
  if (topicButton && topicButton.classList.contains("strength-card")) {
    activeFilter = "all"; routeTo("topics");
    window.setTimeout(() => document.getElementById(`topic-${topicButton.dataset.topic}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    return;
  }
  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) { activeFilter = filterButton.dataset.filter; renderTopics(); return; }
  const confidenceButton = event.target.closest("[data-confidence]");
  if (confidenceButton) { state.confidence[confidenceButton.dataset.topic] = confidenceButton.dataset.confidence; saveState(); render(); showToast("Confidence updated"); return; }
  const modeButton = event.target.closest("[data-mode]");
  if (modeButton) { quizMode = modeButton.dataset.mode; quizIndex = 0; prepareQuiz(); renderPractice(); return; }
  const answerButton = event.target.closest("[data-answer]");
  if (answerButton) {
    const question = quizQuestions[quizIndex];
    const chosenIndex = Number(answerButton.dataset.answer);
    selectedAnswer = chosenIndex;
    state.answers[question.id] = { chosenIndex, correct: chosenIndex === question.answerIndex, answeredAt: new Date().toISOString() };
    saveState(); render(); return;
  }
  if (event.target.id === "nextQuestion") { quizIndex = (quizIndex + 1) % quizQuestions.length; selectedAnswer = null; renderPractice(); return; }
  if (event.target.id === "prevQuestion") { quizIndex = (quizIndex - 1 + quizQuestions.length) % quizQuestions.length; selectedAnswer = null; renderPractice(); }
}
document.addEventListener("click", handleClick);
document.getElementById("completeToday").addEventListener("click", () => {
  const day = currentDayIndex();
  if (!state.completedDays.includes(day)) { state.completedDays.push(day); saveState(); showToast("Nice. Today's hour is logged."); }
  render();
});
document.getElementById("startPractice").addEventListener("click", () => routeTo("practice"));
document.getElementById("resetProgress").addEventListener("click", () => {
  if (!window.confirm("Reset local progress, confidence, and quiz history?")) return;
  state = defaultState(); saveState(); quizIndex = 0; selectedAnswer = null; prepareQuiz(); render(); showToast("Progress reset");
});
render();

const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function upsert(table: string, rows: object[], onConflict = "id") {
  const res = await fetch(`${BASE}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${table} upsert failed (${res.status}): ${body}`);
  }
}

const programs = [
  {
    title: "Generative AI & Prompt Engineering Workshop",
    slug: "generative-ai-prompt-engineering",
    audience: "BE / MCA final year students",
    duration: "2 days (16 hours)",
    format: "On-campus, hands-on",
    tools: ["ChatGPT API", "LangChain", "Stable Diffusion", "Hugging Face"],
    outcomes: [
      "Build a working GenAI application from scratch",
      "Understand LLM internals — tokenization, attention, RLHF",
      "Write effective prompts using chain-of-thought and few-shot techniques",
      "Deploy a LangChain pipeline with tool use and memory",
      "Generate and fine-tune images using Stable Diffusion + LoRA",
    ],
    aicte: true,
    order: 1,
    excerpt:
      "A hands-on 2-day workshop where students build GenAI applications using real APIs — ChatGPT, LangChain, Stable Diffusion, and Hugging Face.",
    content: `## What This Workshop Is About

Generative AI is not just a trend — it is the current frontier of software engineering. Every company building products today is integrating LLMs, image generation, and AI-assisted workflows. This workshop teaches students to work with these tools the way industry practitioners do, not the way textbooks describe them.

Students leave with a functional project they can demo in interviews, and an understanding of why these models work — not just which API to call.

## Curriculum

### Day 1 — LLMs, APIs, and Prompt Engineering (8 hours)

**Module 1: How LLMs Work (1.5 hours)**
- Transformer architecture intuition (no math heavy-lifting)
- Tokenization, embeddings, and context windows
- RLHF and instruction fine-tuning — why GPT-4 follows instructions
- Comparing frontier models: GPT-4o, Claude 3, Gemini, Llama 3

**Module 2: Working with the OpenAI API (2 hours)**
- API authentication, rate limits, cost management
- Chat completions, system prompts, and temperature
- Streaming responses in a web app
- Hands-on: Build a domain-specific Q&A bot

**Module 3: Prompt Engineering Techniques (2.5 hours)**
- Zero-shot, few-shot, and chain-of-thought prompting
- ReAct prompting for reasoning + action
- Structured output with JSON mode
- Prompt injection risks and mitigation
- Hands-on: Prompt optimization lab — iterating to get reliable outputs

**Module 4: LangChain & Agentic Pipelines (2 hours)**
- LangChain chains, memory, and tool use
- Building a RAG (Retrieval-Augmented Generation) pipeline
- Vector databases: ChromaDB basics
- Hands-on: Build a chatbot that answers questions from a PDF

### Day 2 — Multimodal AI & Deployment (8 hours)

**Module 5: Image Generation with Stable Diffusion (3 hours)**
- Diffusion model intuition — forward and reverse process
- Prompt anatomy for image generation
- ControlNet and image-to-image workflows
- Fine-tuning on custom subjects with LoRA (Dreambooth)
- Hands-on: Generate a consistent character / product visualization

**Module 6: Hugging Face Ecosystem (2 hours)**
- Model Hub — finding and loading models
- Inference API vs. local inference
- Gradio for rapid demo UIs
- Hands-on: Deploy a sentiment analysis model with a Gradio interface

**Module 7: Capstone Project (3 hours)**
- Teams of 3–4 build one of:
  - A RAG-powered college FAQ bot
  - An AI image generator for a specific domain
  - A prompt-powered content repurposing tool
- Code review and demo presentation

## Who Should Attend

- Final year BE / MCA students in CS, IS, AI/ML, or Data Science streams
- Students preparing for product company placements
- Anyone who has seen GenAI demos and wants to understand how to build them

## AICTE Activity Points

This workshop is structured to qualify for **AICTE activity points** under the Professional Development category.

## Inquiry

Interested in running this program for your college? [Request a proposal →](/contact?program=generative-ai-prompt-engineering)`,
    published: true,
  },
  {
    title: "Computer Vision Bootcamp",
    slug: "computer-vision-bootcamp",
    audience: "BE / MCA students (Python basics required)",
    duration: "3 days (24 hours)",
    format: "On-campus lab sessions",
    tools: ["OpenCV", "PyTorch", "YOLO", "Roboflow"],
    outcomes: [
      "Build and evaluate an object detection model end-to-end",
      "Understand CNN architectures — from LeNet to ResNet to ViT",
      "Collect, annotate, and prepare a custom image dataset",
      "Run real-time inference on video streams",
      "Deploy a CV model as a REST API",
    ],
    aicte: true,
    order: 2,
    excerpt:
      "A 3-day deep-dive into computer vision using PyTorch, YOLO, and Roboflow. Students build and deploy an object detection model on a real-world dataset.",
    content: `## What This Bootcamp Is About

Computer Vision is the branch of AI that has had the most industrial deployment — from manufacturing defect detection to medical imaging to autonomous vehicles. This bootcamp teaches students to build real CV pipelines: from raw images to annotated datasets to trained models to deployed APIs.

## Curriculum

### Day 1 — Image Processing Fundamentals (8 hours)

**Module 1: How Machines See (1.5 hours)**
- Pixel representations, color spaces (RGB, HSV, grayscale)
- Image as a tensor — shapes, channels, and batch dimensions

**Module 2: OpenCV in Practice (2.5 hours)**
- Reading, resizing, and color-space conversion
- Edge detection: Canny, Sobel
- Hands-on: Build a card/document scanner using contour detection

**Module 3: Deep Dive into CNNs (4 hours)**
- Convolution operation — filters, stride, padding
- Architecture evolution: LeNet → AlexNet → VGG → ResNet
- Transfer learning — why we don't train from scratch
- Hands-on: Fine-tune ResNet-18 on a custom 5-class image dataset (PyTorch)

### Day 2 — Object Detection with YOLO (8 hours)

**Module 4: Object Detection Fundamentals (2 hours)**
- Detection vs. classification vs. segmentation
- Anchor boxes, IoU, non-max suppression
- mAP — the primary evaluation metric

**Module 5: Dataset Preparation with Roboflow (2.5 hours)**
- Image annotation workflow (bounding boxes)
- Dataset augmentation strategies
- Hands-on: Annotate a small custom dataset

**Module 6: Training YOLOv8 (3.5 hours)**
- YOLOv8 training configuration
- Evaluation: mAP, precision-recall curves, confusion matrix
- Hands-on: Full training run on the custom dataset

### Day 3 — Real-Time Inference and Deployment (8 hours)

**Module 7: Running Models on Video (3 hours)**
- Frame-by-frame inference on video files
- Webcam inference with OpenCV
- Hands-on: Real-time helmet/safety detection demo

**Module 8: Deploying a CV API (3 hours)**
- FastAPI basics — endpoints, file uploads, responses
- Wrapping a YOLO model in a REST API
- Dockerizing the API
- Hands-on: Ship a working \`/detect\` endpoint

**Module 9: Capstone Project (2 hours)**
- Teams pick one: pothole detection, attendance system, defect detection, PPE compliance checker

## AICTE Activity Points

Eligible for **AICTE activity points** under the Technical Activities category.

## Inquiry

Want to run this bootcamp at your college? [Request a proposal →](/contact?program=computer-vision-bootcamp)`,
    published: true,
  },
  {
    title: "Faculty Development Program (FDP) — AI Tools for Education",
    slug: "fdp-ai-tools-education",
    audience: "Faculty / teaching staff",
    duration: "2 days (16 hours)",
    format: "Workshop, interactive",
    tools: ["Claude", "ChatGPT", "Canva AI", "Gamma.app", "NotebookLM"],
    outcomes: [
      "Create AI-assisted lesson plans, assessments, and rubrics",
      "Build quizzes and question banks in minutes using LLMs",
      "Summarize research papers and course textbooks with NotebookLM",
      "Generate professional presentation decks using Gamma.app",
      "Develop a personal AI toolkit workflow for daily teaching tasks",
    ],
    aicte: true,
    order: 3,
    excerpt:
      "A 2-day FDP for teaching faculty on using AI tools — ChatGPT, Claude, NotebookLM, Gamma.app — to reduce prep time and enhance student engagement.",
    content: `## What This FDP Is About

AI tools are changing how educators work. Faculty who learn to use them effectively can cut lesson preparation time by 60%, create more engaging assessments, and stay current with evolving research — all without learning to code.

This FDP is practical and tool-focused. Every session involves direct hands-on use of the tools — not slides about AI, but AI in action.

## Curriculum

### Day 1 — Core AI Tools for Teaching (8 hours)

**Module 1: Understanding the AI Landscape for Educators (1.5 hours)**
- What LLMs can and cannot do — setting realistic expectations
- Comparing tools: ChatGPT vs. Claude vs. Gemini for education tasks

**Module 2: Lesson Planning and Content Generation (2.5 hours)**
- Generating lesson plans aligned to VTU / AICTE syllabi
- Writing learning objectives in Bloom's taxonomy format with AI
- Hands-on: Each participant builds a complete lesson plan for one unit

**Module 3: Assessment Design and Question Banks (2 hours)**
- Creating MCQs with correct and plausible distractors
- Generating rubrics for assignments and project work
- Hands-on: Build a 20-question mixed-format question bank

**Module 4: NotebookLM for Research and Course Prep (2 hours)**
- Uploading papers, textbooks, and syllabi
- Generating summaries, timelines, and study guides
- Hands-on: Upload 3 research papers and extract key insights

### Day 2 — Presentations, Tools Integration, and Workflow (8 hours)

**Module 5: Presentations with Gamma.app and Canva AI (3 hours)**
- Generating full slide decks from a topic outline using Gamma.app
- Canva AI for quick graphics, infographics, and course thumbnails
- Hands-on: Each participant creates a 10-slide presentation

**Module 6: AI for Student Communication and Feedback (2 hours)**
- Writing constructive feedback on student assignments using AI
- Academic integrity: how to set boundaries with AI tool usage

**Module 7: Building Your Personal AI Workflow (2 hours)**
- Mapping repetitive tasks in your current workflow
- Setting up a personal prompt library

**Module 8: Capstone and Showcase (1 hour)**
- Participants share one AI-created artifact from the 2 days

## AICTE FDP Credit

This program is structured as a formal Faculty Development Program and is eligible for **AICTE FDP credit hours**.

## Inquiry

Plan an FDP for your faculty team. [Request a proposal →](/contact?program=fdp-ai-tools-education)`,
    published: true,
  },
  {
    title: "MLOps & Deployment for Final Year Projects",
    slug: "mlops-deployment-final-year",
    audience: "BE / MCA project students",
    duration: "1 day (8 hours)",
    format: "Hands-on lab",
    tools: ["Docker", "FastAPI", "AWS EC2", "GitHub Actions", "Prometheus + Grafana"],
    outcomes: [
      "Deploy a real machine learning model to a live URL",
      "Understand the production ML lifecycle from training to monitoring",
      "Containerize an ML application with Docker",
      "Set up a CI/CD pipeline that auto-deploys on push",
      "Monitor model performance and server health in real-time",
    ],
    aicte: false,
    order: 4,
    excerpt:
      "A 1-day intensive lab where students take a trained ML model and deploy it to AWS with Docker, FastAPI, and CI/CD — the way it's done in industry.",
    content: `## What This Lab Is About

Most final year projects end at model training. The model sits in a Jupyter notebook, evaluated on a test set, and never used again. That gap — between a trained model and a deployed product — is exactly what this lab bridges.

In one day, students take a pre-trained ML model (or bring their own final year project model) and deploy it to a live URL with proper containerization, automated deployment, and monitoring.

## Curriculum

### Session 1 — FastAPI & Model Serving (2 hours)

- REST API design for ML: inputs, outputs, versioning
- FastAPI basics: routes, request models, response schemas
- Hands-on: Wrap your model in a FastAPI app with \`/predict\`, \`/health\`, and \`/metrics\` endpoints

### Session 2 — Containerization with Docker (2 hours)

- Dependency isolation — "it works on my machine" → solved
- Docker for ML: dealing with large model files
- Hands-on: Write an efficient \`Dockerfile\`, build and run the container locally

### Session 3 — AWS EC2 Deployment (2 hours)

- EC2 instance types: what to pick for ML serving
- Nginx as a reverse proxy
- Hands-on: Deploy to a live EC2 instance, test the live API endpoint

### Session 4 — CI/CD and Monitoring (2 hours)

- Writing a GitHub Actions workflow: test → build → push → deploy
- Monitoring with Prometheus + Grafana
- Hands-on: Push a code change and watch it auto-deploy; set up a live dashboard

## What Students Will Have After This Lab

A live URL (EC2) serving predictions, a GitHub repo with CI/CD, and a Grafana dashboard — enough to explain their deployment stack in any interview.

## Inquiry

Ready to give your students a deployment-ready edge? [Request a proposal →](/contact?program=mlops-deployment-final-year)`,
    published: true,
  },
];

const blogPosts = [
  {
    title: "How We Ran a 2-Day FDP on AI Tools for 40 Faculty Members",
    slug: "how-we-ran-a-2-day-fdp-ai-tools-40-faculty",
    date: "2024-10-03",
    excerpt:
      "A behind-the-scenes look at designing and running an AI tools FDP for 40 faculty members at a Karnataka engineering college — what worked, what didn't, and what surprised us.",
    tags: ["fdp", "genai"],
    author: "Harshith",
    content: `In September 2024, I ran a 2-day Faculty Development Program on AI Tools for Education at a mid-sized engineering college in Karnataka. 40 faculty members. Mixed departments — CS, ECE, MBA, and a few from Physics and Maths. Most had used ChatGPT for something, many only barely.

Here's how we designed it, what actually happened, and what I'd change next time.

## The Brief

The HOD who reached out had a specific ask: "Our faculty need to understand AI tools — but not just ChatGPT. We want them to actually use these tools for their teaching work, not just learn about AI as a topic."

That framing shaped everything. This was not an "introduction to AI" FDP. It was a workflow change workshop. The goal was: every faculty member leaves with a tool they'll use from the next working day.

We had 16 hours spread across two days. 40 participants. A mix of departments, age ranges (25 to 55+), and technical comfort levels.

## Day 1 Design: Start With the Pain

I've learned that if you start with the tools, you get resistance. "I don't have time to learn another app." "Our students will misuse this."

Instead, I start Day 1 with a 20-minute discussion: what are the most time-consuming parts of your current job?

The answers are always the same:
- Writing question papers
- Preparing slides for a new topic
- Marking assignments and writing feedback
- Reading research papers (for PhD faculty)
- Drafting circulars and communication

Once the pain is on the board, I pull up the tools. Suddenly it's not "a new app to learn" — it's "a thing that solves the problem we just listed."

### What Actually Happened in the Classroom

The moment that changed the room: a Physics professor had a unit on Quantum Mechanics that she described as "notoriously hard to make interesting." I pulled up Claude, dropped in the learning objectives, and in 90 seconds generated six different analogy-based explanations at different abstraction levels, a 5-question formative quiz, and a 3-slide outline.

Her reaction — and the visible ripple through the room — was worth more than any introductory lecture I could have given.

By the lunch break on Day 1, every single participant had generated at least one artifact they said was genuinely useful.

## The NotebookLM Session

This was the surprise hit of the FDP. I expected the LLM chatbot sessions to get the most engagement. NotebookLM outperformed everything.

Two reasons:
1. **It's non-threatening.** You upload documents you already have — your own notes, a textbook chapter, NPTEL PDFs. It's not "AI generating content" — it's AI helping you understand content you're responsible for.
2. **The Audio Overview feature.** When I showed a faculty member that NotebookLM could generate a 10-minute podcast-style discussion of their uploaded research paper, there was a genuine pause of disbelief.

## What Didn't Work

**Gamma.app on slow college WiFi.** We knew this might be an issue and brought a mobile hotspot. Still, the cloud-rendered presentations were slow to generate during the session. Next time: preload demos, don't rely on live generation for time-sensitive sessions.

**The "academic integrity" detour.** I had a 30-minute slot for discussing AI tool policies with students. The discussion got heated (in a good way — a lot of genuine debate about what's fair), but it ran 45 minutes and compressed the hands-on time for Module 4.

Lesson: Put the policy discussion at the end of a day, not the middle.

**The tech confidence gap was wider than expected.** About 8 faculty members in the ECE and MBA departments had never used a browser extension or copy-pasted a prompt.

Fix: Pair programming style — assign one tech-comfortable faculty member as a "buddy" to every less-comfortable participant for the tool setup sessions.

## Day 2: Building Personal Workflows

Day 2 was more applied. Each participant mapped their own top 3 repetitive teaching tasks and spent time finding the specific tool/prompt combination that addressed each one.

The structured "workflow documentation" exercise — where participants wrote out their before/after workflow — turned out to be the thing that made the learning stick.

## Outcomes We Could Measure

- **Time saved (self-reported):** Average participant reported 3–4 hours/week of potential time savings
- **Tools adopted by end of day 2:** Every participant had set up at least 2 tools; 70% had used at least one to generate a real artifact they planned to use
- **3-week follow-up (informal):** 8 of 40 participants reached out directly to share artifacts they'd made

## What I'd Do Differently

1. **Send a pre-FDP survey.** Collect: what subjects do you teach, what are your 3 most time-consuming tasks, have you used AI tools before?
2. **Offline-first demos.** Cloud tools are unreliable on college WiFi. Preload every demo.
3. **Leave time for "custom problem" sessions.** By Day 2, participants had their own problems they wanted help with.

---

Running FDPs for faculty is some of the most impactful training work I do. The multiplier effect is real — 40 faculty members who are AI-fluent are in rooms with thousands of students every week.

If you're a TPO or HOD thinking about whether an FDP makes sense for your faculty, [reach out here](/contact) — happy to walk you through what a customised session would look like for your team.`,
    published: true,
  },
  {
    title: "What Engineering Colleges Get Wrong About AI Curriculum",
    slug: "what-engineering-colleges-get-wrong-about-ai-curriculum",
    date: "2024-11-15",
    excerpt:
      "Most AI/ML courses in engineering colleges haven't changed since 2019. Here's a ground-level view of what's broken — and what a better approach looks like.",
    tags: ["fdp", "genai", "computer-vision"],
    author: "Harshith",
    content: `I've had the same conversation in about a dozen college staff rooms over the past two years.

A TPO or HOD pulls up their current AI/ML course syllabus — often a PDF that hasn't been touched since 2020 — and asks me whether it prepares students for the industry. They already know the answer. They're asking because they want someone outside their department to say it out loud.

The answer is: not really. And here's why.

## The Textbook Problem

Most AI/ML courses in engineering colleges are taught from textbooks published between 2015 and 2019. Those books cover:

- Logistic regression, decision trees, SVMs
- Basic neural network math (backpropagation, gradient descent)
- "Introduction to Deep Learning" chapters that stop at CNNs
- R or "MATLAB" exercises that no one uses in production

None of this is *wrong*. Some of it is genuinely important foundational knowledge. But it describes a version of AI that the industry left behind several years ago.

The gap between what's in those textbooks and what a fresh hire is expected to know on day one is enormous — and it's widening every year.

## What the Industry Actually Uses

When I'm hiring or reviewing resumes at Cosmoverge, here's what I'm actually looking for:

**For a junior ML role:**
- Can you fine-tune a pretrained model on a custom dataset?
- Do you know how to use Hugging Face pipelines?
- Can you wrap a model in a FastAPI endpoint?
- Have you worked with vector databases for retrieval?

**For a GenAI / LLM role:**
- Can you build a RAG pipeline?
- Do you understand prompt engineering beyond "write better prompts"?
- Have you worked with LangChain or LlamaIndex?
- Do you know the difference between fine-tuning and in-context learning?

None of these appear in a 2019 textbook. Most of them didn't exist in 2019.

## The Lab Problem

Even when colleges have updated theory content, the lab component lags even further. The typical lab exercise:

1. Load the Iris dataset
2. Train a random forest classifier
3. Print accuracy

This builds zero transferable skills. In the real world, you spend 80% of your time on data — collecting it, cleaning it, augmenting it, versioning it. You don't get handed a pre-cleaned CSV.

A better lab exercise:
1. Scrape or photograph 200 images from a real scenario
2. Annotate them using Roboflow
3. Train a YOLO model
4. Evaluate with mAP
5. Deploy as an API

That's one day of hands-on work that builds five tangible skills.

## Why This Isn't the Faculty's Fault

Faculty are not failing their students because they're lazy or incompetent. They're failing because the system isn't designed for keeping pace with this field.

A faculty member teaching AI/ML is also teaching two other subjects, managing their own research, preparing for NAAC audits, and attending departmental meetings. Finding time to rebuild a course from scratch — using tools that changed fundamentally 18 months ago — is not realistic.

This is why FDPs matter. Not as tick-box exercises, but as actual skill transfer sessions where faculty get hands-on with the tools their students will encounter in interviews.

## What a Better Approach Looks Like

When I design a workshop or FDP for a college, I start with a simple question: what would a first-year employee at a product company be expected to do on day 30?

Then I work backwards from there.

The answer in 2024 almost always involves:
- Working with pre-trained models, not building from scratch
- Using APIs (OpenAI, Hugging Face, Roboflow) as first-class tools
- Understanding deployment — Docker, APIs, basic cloud
- Knowing how to iterate on prompts and evaluate model outputs

## The Opportunity for Colleges

Colleges that update their AI/ML programs are going to see measurable placement outcomes in the next 2–3 years. The companies hiring right now are specifically looking for students who have shipped something with GenAI.

A student who has done a 2-day hands-on workshop where they built and deployed something walks into an interview with a fundamentally different story to tell than one who trained a logistic regression model on the Iris dataset.

---

*Harshith runs AI/ML workshops and FDPs for engineering colleges across India. If you're thinking about updating your college's AI curriculum or running a student workshop, [reach out here](/contact).*`,
    published: true,
  },
];

const testimonials = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    quote: "The GenAI workshop was unlike anything we've run before. Students were building functional applications by day two — not just watching demos. We had placement officers from three companies ask us what program the students had completed after seeing their demo day projects.",
    name: "Dr. Ramesh Babu",
    initials: "RB",
    designation: "Head of Department, CS",
    college: "BMS College of Engineering",
    order: 1,
    published: true,
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    quote: "We ran the Computer Vision Bootcamp for our pre-final year batch as part of placement preparation. The results were visible immediately — students went into interviews with a deployed model and a GitHub repo they could point to. Two of them got interview shortlists directly off the back of it.",
    name: "Prof. Kavitha Nair",
    initials: "KN",
    designation: "Training & Placement Officer",
    college: "Mahajana PGC Mysore",
    order: 2,
    published: true,
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    quote: "The FDP was the most practically useful training I have attended in seven years of teaching. By day two I had already rebuilt three of my lesson plans using the tools. I have recommended it to our principal for all departments.",
    name: "Dr. Suresh Patil",
    initials: "SP",
    designation: "Associate Professor, ECE",
    college: "Dhawan College",
    order: 3,
    published: true,
  },
];

const teamMembers = [
  {
    id: "b1000000-0000-0000-0000-000000000000",
    name: "Harshith",
    role: "founder",
    specialization: "Founder & Solutions Architect",
    bio: "AI/ML engineer and practitioner based in Bengaluru. Founder of Cosmoverge — a boutique tech agency building AI products in production. Started CosmoLearn to fix the gap between what colleges teach and what industry actually needs.\n\nSpecialises in Computer Vision and Generative AI — Stable Diffusion, LoRA fine-tuning, LangChain pipelines. Active contributor to the Keras ecosystem (keras-hub), which puts him in direct contact with the ML research community.",
    tags: ["Computer Vision", "Generative AI", "LangChain", "Stable Diffusion", "Keras", "Python"],
    photo_url: "",
    order: 0,
    published: true,
  },
  {
    id: "b1000000-0000-0000-0000-000000000001",
    name: "[Instructor Name]",
    role: "instructor",
    specialization: "Cybersecurity",
    bio: "Background in offensive and defensive security. Real-world experience in penetration testing, network security, and SOC operations. Industry certifications and projects.",
    tags: ["Ethical Hacking", "Network Security", "Penetration Testing", "SOC", "OSCP"],
    photo_url: "",
    order: 1,
    published: true,
  },
  {
    id: "b1000000-0000-0000-0000-000000000002",
    name: "[Instructor Name]",
    role: "instructor",
    specialization: "Full Stack — MERN · MEAN",
    bio: "Experience building and shipping production web applications with React, Angular, Node.js, and MongoDB. Strong focus on project-based, outcome-driven teaching.",
    tags: ["React", "Angular", "Node.js", "MongoDB", "Express", "TypeScript"],
    photo_url: "",
    order: 2,
    published: true,
  },
  {
    id: "b1000000-0000-0000-0000-000000000003",
    name: "[Instructor Name]",
    role: "instructor",
    specialization: "Python · Django · FastAPI",
    bio: "Full-stack Python developer with production experience in Django REST frameworks and FastAPI microservices. Covers backend architecture, APIs, and deployment.",
    tags: ["Python", "Django", "FastAPI", "REST APIs", "PostgreSQL", "Celery"],
    photo_url: "",
    order: 3,
    published: true,
  },
  {
    id: "b1000000-0000-0000-0000-000000000004",
    name: "[Instructor Name]",
    role: "instructor",
    specialization: "DevOps & Cloud",
    bio: "Hands-on DevOps engineer with CI/CD, containerisation, and cloud infrastructure experience. Teaches tools used in actual production deployments — not toy examples.",
    tags: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Terraform", "Linux"],
    photo_url: "",
    order: 4,
    published: true,
  },
  {
    id: "b1000000-0000-0000-0000-000000000005",
    name: "[Instructor Name]",
    role: "instructor",
    specialization: "VLSI & Embedded Systems",
    bio: "Industry experience in VLSI design, RTL coding, and embedded firmware. Covers digital design theory alongside hands-on board-level programming and simulation.",
    tags: ["Verilog", "VHDL", "FPGA", "ARM Cortex", "Arduino", "STM32"],
    photo_url: "",
    order: 5,
    published: true,
  },
  {
    id: "b1000000-0000-0000-0000-000000000006",
    name: "[Instructor Name]",
    role: "instructor",
    specialization: "Robotics",
    bio: "Robotics engineer with experience in autonomous systems, ROS, and mechatronics. Brings real project experience from robotics competitions and industrial automation work.",
    tags: ["ROS", "Python", "Computer Vision", "Sensors", "Kinematics", "Arduino"],
    photo_url: "",
    order: 6,
    published: true,
  },
];

const collegeEngagements = [
  { id: "c1000000-0000-0000-0000-000000000001", name: "BMS College of Engineering", order: 1, published: true },
  { id: "c1000000-0000-0000-0000-000000000002", name: "Dhawan College", order: 2, published: true },
  { id: "c1000000-0000-0000-0000-000000000003", name: "Mahajana PGC Mysore", order: 3, published: true },
];

async function seed() {
  console.log("Seeding programs...");
  await upsert("programs", programs, "slug");
  console.log(`✓ ${programs.length} programs inserted`);

  console.log("Seeding blog posts...");
  await upsert("blog_posts", blogPosts, "slug");
  console.log(`✓ ${blogPosts.length} blog posts inserted`);

  console.log("Seeding testimonials...");
  await upsert("testimonials", testimonials, "id");
  console.log(`✓ ${testimonials.length} testimonials inserted`);

  console.log("Seeding team members...");
  await upsert("team_members", teamMembers, "id");
  console.log(`✓ ${teamMembers.length} team members inserted`);

  console.log("Seeding college engagements...");
  await upsert("college_engagements", collegeEngagements, "id");
  console.log(`✓ ${collegeEngagements.length} college engagements inserted`);
}

seed();

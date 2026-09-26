"""
Canonical content for the portfolio API.

Everything here is sourced from Vismaya's resume (FlowCV, 2026-09-22),
LinkedIn project exports, and two interview-prep documents (PROJECTS.docx,
REVISION.docx) that corrected a couple of resume claims against the real
code. Where the docs disagreed with the resume, the more accurate,
verified description was used:

- AURA's routing is a greedy nearest-safe-neighbor algorithm, not A*.
- FlashRescue's routing is OSRM + post-hoc hazard filtering, not A*.
- IntelliCheck AI is a local-first Streamlit app (TF-IDF + RAG/FAISS +
  FLAN-T5), not a FastAPI service; its GitHub Actions CI was planned,
  not shipped.
- Kazunov1AI's image-fraud-detection pipeline is explicitly described as
  an experimental, still-inconsistent model in her own notes -- so it is
  described qualitatively here rather than with a specific accuracy
  figure that she flagged as unreliable.
"""

DOMAINS = [
    {
        "id": "ai",
        "label": "AI / ML",
        "short": "AI/ML",
        "color": "#b3541e",
        "description": "Applied machine learning, generative AI, and evaluation/explainability.",
    },
    {
        "id": "cv",
        "label": "Computer Vision",
        "short": "CV",
        "color": "#2f6f6a",
        "description": "Real-time detection, tracking, and video analytics.",
    },
    {
        "id": "iot",
        "label": "IoT & Embedded",
        "short": "IoT",
        "color": "#5c6b2e",
        "description": "Sensors, microcontrollers, and on-device inference.",
    },
    {
        "id": "backend",
        "label": "Backend & Systems",
        "short": "Backend",
        "color": "#3c4a6b",
        "description": "APIs, test infrastructure, async pipelines, and deployed full-stack apps.",
    },
]

PROFILE = {
    "name": "Vismaya M",
    "location": "Bengaluru, Karnataka, India",
    "tagline": "Final-year CSE engineer working across AI, IoT, and backend systems engineering.",
    "abstract": (
        "I build the parts most portfolios keep separate: the sensors that "
        "gather signal, the models that interpret it, and the backend and "
        "test infrastructure that keep the whole thing honest in production. "
        "One filed patent, one SCOPUS-indexed publication, three internships, "
        "eleven shipped projects -- all built, none simulated for a demo."
    ),
    "email": "vismayamsagar@gmail.com",
    "phone": "+91 93802 12798",
    "linkedin": "https://linkedin.com/in/vismaya-m-b381a8243",
    "github": "https://github.com/vismayaM-2005",
    "resumeUrl": "/resume.pdf",
    "stats": [
        {"label": "CGPA", "value": "9.73/10"},
        {"label": "Patents filed", "value": "1"},
        {"label": "Published papers", "value": "1"},
        {"label": "Internships", "value": "3"},
    ],
    "capabilities": [
        {"domain": "ai", "level": 9},
        {"domain": "cv", "level": 8},
        {"domain": "iot", "level": 8},
        {"domain": "backend", "level": 8},
    ],
}

PROJECTS = [
    {
        "slug": "flashrescue",
        "title": "FlashRescue",
        "subtitle": "Smart-City Disaster Response Platform",
        "domains": ["ai", "backend", "iot"],
        "status": ["Patent filed", "Published — ICSDSA 2026 (Springer, SCOPUS)", "2nd Prize — K-GIS 2.0"],
        "team": "3-person hackathon team, developed over ~7 months across several competitions",
        "featured": True,
        "summary": (
            "A disaster-response platform that turns chaotic, unverified information during a "
            "disaster -- citizen reports, photos, and simulated IoT sensor signals -- into "
            "trusted, real-time operational intelligence for responders during floods, fires, "
            "earthquakes, and structural failures."
        ),
        "role": (
            "My scope was the AI triage and hazard-aware routing side of the system. When citizen "
            "reports come in, I run them through three pretrained Hugging Face vision models "
            "(a fire/smoke detector, a Vision Transformer for general scene understanding, and "
            "ResNet-50) for images, and Whisper for speech-to-text on voice reports, followed by a "
            "bilingual (English/Hindi) keyword-based urgency scorer. The core piece I designed is "
            "the confidence-fusion layer: confidence rises only when multiple independent citizen "
            "reports converge on the same location *and* the simulated IoT sensor grid corroborates "
            "it -- rather than trusting any single report, weak or inconsistent signals get flagged "
            "for review instead of auto-trusted. For routing, I integrated OSRM (Open Source Routing "
            "Machine) and filter its suggested routes against live hazard data after the fact -- if a "
            "route intersects a flagged hazard zone, the app requests an alternate one. I also built "
            "a small real-time layer with Express and Socket.io that broadcasts live volunteer "
            "position updates and disaster reports to the dashboard over WebSockets."
        ),
        "teammates": (
            "Built with two teammates: one led IoT sensor networks, grid-based risk forecasting, "
            "and the dashboard; the other led trust-scoring for duplicate reports and volunteer "
            "micro-task allocation."
        ),
        "whatWorked": [
            "Sub-500ms alert latency and sub-200ms hazard-aware route computation.",
            "Redundant multimodal input (image + voice) means the system still works if a citizen can only send one signal type.",
            "Corroboration-based confidence resists being fooled by a single fake or isolated report.",
        ],
        "limitations": [
            "The voice/text urgency scorer is a rule-based keyword matcher, not a trained NLP model -- fast and explainable, but less robust to phrasing than a trained classifier would be.",
            "The IoT sensor grid is simulated for the prototype rather than live hardware in the field.",
            "This is a fully working prototype, tested locally, not deployed to production hardware.",
        ],
        "metrics": [
            {"label": "Alert latency", "value": "< 500ms"},
            {"label": "Route recompute", "value": "< 200ms"},
            {"label": "Signal types fused", "value": "5"},
            {"label": "Recognition", "value": "Patent + SCOPUS paper"},
        ],
        "techStack": [
            "Hugging Face Transformers (ViT, ResNet-50, fire/smoke CNN)",
            "Whisper ASR",
            "OSRM",
            "Express.js",
            "Socket.io",
            "WebSockets",
        ],
        "qa": [
            {
                "q": "Why pretrained models instead of training your own?",
                "a": "A hackathon doesn't give you enough time or data to train reliable models from scratch, so using well-tested pretrained models let us focus effort on the harder, more novel problem: fusing multiple signals into one trustworthy classification.",
            },
            {
                "q": "Why OSRM instead of building your own routing algorithm?",
                "a": "OSRM is a mature, well-tested open-source routing engine. Building custom pathfinding from scratch in a hackathon timeline would mean reinventing something that already works well, at the cost of the more novel part: the hazard classification feeding into it.",
            },
            {
                "q": "What was the hardest part of your work?",
                "a": "Fusing signals that aren't naturally comparable -- an image classifier's confidence score and a keyword-match score from text don't mean the same thing numerically, so I had to design thresholds and rules to combine them into one meaningful, trustworthy output.",
            },
        ],
        "note": "This version won 2nd prize at K-GIS -- it lost at 3-4 earlier competitions first.",
        "repoUrl": None,
    },
    {
        "slug": "aura",
        "title": "AURA",
        "subtitle": "Adaptive Urban Risk Analyzer for Crowd Management",
        "domains": ["cv", "ai", "backend"],
        "status": ["Real-time CV pipeline", "4-person team"],
        "team": "4-person team -- teammates built the video-analytics pipeline, admin dashboard, and mobile app",
        "featured": True,
        "summary": (
            "A real-time crowd-safety system designed to prevent stampedes at large gatherings. "
            "It turns crowd metrics -- density, speed, movement patterns -- into live risk scores, "
            "zone classifications, and safe evacuation guidance."
        ),
        "role": (
            "My scope was the core intelligence engine. It takes processed video metrics (density, "
            "average speed, direction conflict, surge/bottleneck indices per zone, frame by frame) "
            "and computes a smoothed Risk Score (0-100) from three weighted components -- pressure "
            "(45%), flow instability (30%), and structural risk (25%) -- smoothed over time with an "
            "exponential moving average so scores don't jump erratically frame to frame. I built a "
            "Crowd Pressure Index (CPI) targeting physical crush-pressure specifically, a zone "
            "classification (Green/Yellow/Orange/Red, 60% risk + 40% CPI with override rules -- a "
            "critical CPI auto-escalates a zone to Red regardless of the blended score), panic and "
            "huddle/clumping detectors from signal-counting heuristics, an Exit Load Balance Score "
            "(ELBS) for overloaded-exit detection, and a greedy safe-routing algorithm that threads "
            "the path through the lowest-cost sequence of zones, refusing to enter zones above a "
            "danger threshold."
        ),
        "whatWorked": [
            "Lightweight greedy routing keeps recomputation fast enough for near-real-time updates.",
            "EMA smoothing stops a single noisy frame from causing a false escalation.",
            "Explicit override rules catch dangerous spikes the blended score alone might under-react to.",
        ],
        "limitations": [
            "The greedy router is fast but can dead-end into a local minimum if no safe neighboring zone exists -- a fuller graph search would find better global routes, and is the natural next step.",
            "The risk-score component weights (45/30/25) are hand-tuned starting points, not yet learned from real crowd data.",
            "The pipeline currently runs on pre-extracted metrics rather than a live, end-to-end video stream.",
        ],
        "metrics": [
            {"label": "Video throughput", "value": "25–30 FPS"},
            {"label": "Risk metrics computed", "value": "5"},
            {"label": "Zone classes", "value": "4"},
        ],
        "techStack": ["Python", "OpenCV (MOG2 + Farneback optical flow)", "React", "Express"],
        "qa": [
            {
                "q": "Why a greedy algorithm instead of Dijkstra or A*?",
                "a": "It's simpler and faster to compute at each step, which matters for near-real-time updates -- it picks the best next move based on current cost rather than solving the whole path upfront. The trade-off is it can get stuck in a local dead-end, which the algorithm handles explicitly by returning 'no acceptable neighbor' rather than looping forever.",
            },
            {
                "q": "How do Risk Score and CPI differ -- why have both?",
                "a": "Risk Score is a broad composite of pressure, flow instability, and structural risk. CPI specifically targets crush pressure -- density times relative speed change times a compression factor -- a more targeted way to catch dangerous physical compression even before the general risk score spikes.",
            },
            {
                "q": "Why smooth the risk score over time instead of using raw values?",
                "a": "Raw frame-by-frame values can be noisy -- a single frame's density spike doesn't necessarily mean real danger. Smoothing with an exponential moving average means the score reflects a sustained trend while still reacting quickly, since the smoothing factor is weighted toward the current value.",
            },
        ],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "intellicheck-ai",
        "title": "IntelliCheck AI",
        "subtitle": "AI Integrity & Plagiarism Detection Platform",
        "domains": ["ai", "backend"],
        "status": ["Local-first, zero paid API"],
        "team": "2-person project, built jointly across most modules",
        "featured": True,
        "summary": (
            "A local-first academic-integrity platform that goes beyond flagging plagiarism: it "
            "explains why a passage was flagged and helps rewrite it properly -- running almost "
            "entirely on-device with open-source models, no paid API required."
        ),
        "role": (
            "When a document is uploaded, it's split into sentences and compared against a local "
            "reference corpus using TF-IDF and cosine similarity -- fast, deterministic, and "
            "independent of any external API. For sentences flagged as too similar, a RAG layer "
            "(sentence-transformers embeddings indexed with FAISS) retrieves the most relevant "
            "matching passages, and FLAN-T5, running locally, uses that retrieved context to explain "
            "why the sentence was flagged and suggest a rewrite. A heatmap highlights which words "
            "contributed most to the similarity score -- explicitly a heuristic proxy for attention, "
            "not literal transformer attention, and documented as such. The app runs in Docker for "
            "portable, single-command setup, with a rule-based fallback if the local models can't "
            "load, so it degrades gracefully instead of breaking."
        ),
        "whatWorked": [
            "Fully local and private -- no paid API dependency for either detection or explanation.",
            "Explainable by design: a flag comes with retrieved evidence and a heatmap, not a bare accusation.",
            "Graceful degradation via a rule-based fallback path when the local models aren't available.",
        ],
        "limitations": [
            "TF-IDF only catches lexical, word-level similarity -- well-paraphrased plagiarism with different wording but the same meaning can slip through. This is a documented, known limitation; semantic-embedding-based primary detection is the planned upgrade.",
            "GitHub Actions CI was planned but not completed in the current version.",
            "OCR/multimodal document input was scaffolded (dependencies present) but not implemented yet.",
        ],
        "metrics": [
            {"label": "External calls", "value": "Zero (fully local)"},
            {"label": "Setup", "value": "Single Docker command"},
        ],
        "techStack": ["TF-IDF / cosine similarity", "Sentence-Transformers (MiniLM-L6-v2)", "FAISS", "FLAN-T5", "Streamlit", "Docker"],
        "qa": [
            {
                "q": "What is RAG, and why use it here?",
                "a": "Retrieval-augmented generation: instead of asking a language model to explain something purely from what it already knows, you first retrieve real matching passages from the reference documents and feed those in, so the explanation is grounded in actual evidence rather than guesswork.",
            },
            {
                "q": "What's the limitation of TF-IDF here?",
                "a": "It only catches lexical, word-level similarity -- if someone paraphrases a source well enough that the words differ but the meaning is the same, TF-IDF alone might miss it. That's a documented limitation; replacing it with semantic embeddings for deeper detection is a planned improvement.",
            },
            {
                "q": "Is the attention heatmap real transformer attention?",
                "a": "No -- it's a heuristic, not true transformer attention. It scores each token by overlap with the matched source passage, weighted by TF-IDF importance, and visualizes that as a heatmap. It approximates what mattered for the similarity decision, but it isn't extracted from the model's actual internal attention weights.",
            },
        ],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "reviewmate",
        "title": "ReviewMate",
        "subtitle": "AI Coding-Interview Evaluator",
        "domains": ["backend", "ai"],
        "status": ["Solo project", "Deployed — live"],
        "team": "Solo, full-stack",
        "featured": True,
        "summary": (
            "A solo full-stack project: an AI-powered coding-interview evaluator that scores a code "
            "submission the way a specific company's interviewers would -- Google, Amazon, Microsoft, "
            "Meta, Oracle, Goldman Sachs, or a custom rubric -- built to get hands-on with real, "
            "structured LLM-API integration rather than just prompting a chat model."
        ),
        "role": (
            "A user submits code plus the company they want evaluated against. The backend builds a "
            "persona-conditioned prompt instructing the LLM to evaluate the submission the way that "
            "company's interview standards would, then parses the model's free-form response into a "
            "consistent structure: a 0-100 score, a hire/no-hire verdict, strengths, weaknesses, "
            "time/space complexity analysis, and improvement suggestions. Results persist to MongoDB "
            "so users can revisit their evaluation history. LLM access goes through OpenRouter for "
            "model-agnostic access (GPT-4o-mini by default, temperature 0.2 for repeatable scoring, "
            "swappable per request), with the API key loaded from environment variables and a "
            "graceful mock-response fallback when no key is configured. Frontend in Next.js + "
            "Tailwind, backend in FastAPI, deployed live on Vercel and Render."
        ),
        "whatWorked": [
            "Actually deployed and reachable, not just a local demo.",
            "Model-agnostic design via OpenRouter -- swapping the underlying LLM is a parameter, not a rewrite.",
            "A graceful mock-response fallback keeps the app fully demoable without live API cost.",
        ],
        "limitations": [
            "LLM outputs vary run-to-run even for identical input -- an inherent limitation of building on a non-deterministic API, reduced but not eliminated by a low temperature.",
            "Evaluation is single-pass rather than multi-sample consistency-checked scoring.",
        ],
        "metrics": [
            {"label": "Status", "value": "Deployed & live"},
            {"label": "Company personas", "value": "6 + custom"},
            {"label": "Default model", "value": "GPT-4o-mini"},
        ],
        "techStack": ["Next.js", "Tailwind CSS", "FastAPI", "MongoDB", "OpenRouter API", "python-dotenv"],
        "qa": [
            {
                "q": "Why OpenRouter instead of calling OpenAI directly?",
                "a": "OpenRouter gives unified API access to multiple LLMs through one interface, which mattered since I wanted model selection as a feature -- letting the evaluation run on different models rather than being locked into one provider.",
            },
            {
                "q": "Why MongoDB instead of a SQL database?",
                "a": "Evaluation results are naturally nested, semi-structured objects -- verdict, scores, strengths lists, complexity analysis -- rather than clean relational rows, so a document store was a more natural fit.",
            },
            {
                "q": "Is this actually deployed?",
                "a": "Yes -- Vercel for the frontend, Render for the backend.",
            },
        ],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "imdb-sentiment",
        "title": "IMDB Sentiment Analysis",
        "subtitle": "BiLSTM vs. DistilBERT, with a Conflict-Score evaluation framework",
        "domains": ["ai"],
        "status": ["3-person project"],
        "team": "3-person project -- teammates trained the BiLSTM and fine-tuned DistilBERT; my scope was evaluation and explainability",
        "featured": True,
        "summary": (
            "A comparative NLP sentiment-classification study on the IMDB Large Movie Reviews "
            "dataset: a BiLSTM trained from scratch against a fine-tuned DistilBERT, evaluated on "
            "more than just accuracy."
        ),
        "role": (
            "I built a Conflict Score framework -- the absolute difference between a model's "
            "predicted probability and the correct label -- to flag high-confidence wrong "
            "predictions specifically, since a model that's confidently wrong is more dangerous in "
            "deployment than one that's honestly uncertain (high confidence discourages a human from "
            "double-checking). I used this to surface the top-10 highest-risk misclassifications for "
            "each model. I then applied LIME to the BiLSTM model for local, per-review word-level "
            "explanations, and SHAP to DistilBERT for a more global view of feature importance across "
            "its behavior."
        ),
        "whatWorked": [
            "DistilBERT was both more accurate and better-calibrated than the from-scratch BiLSTM.",
            "The Conflict Score surfaced a concrete, evaluation-driven case for why calibration -- not just accuracy -- matters before deployment.",
        ],
        "limitations": [
            "The analysis flagged individual high-risk misclassifications but didn't yet cluster them into systematic failure patterns (e.g. sarcasm, mixed sentiment) -- a clear next step.",
        ],
        "metrics": [
            {"label": "Models compared", "value": "2"},
            {"label": "High-risk cases surfaced", "value": "Top 10 per model"},
        ],
        "techStack": ["BiLSTM (Keras)", "DistilBERT (Hugging Face Transformers)", "LIME", "SHAP"],
        "qa": [
            {
                "q": "Why does confidently-wrong matter more than uncertain?",
                "a": "In real deployment, a model that says '55% confident' when wrong is a much smaller problem -- a human reviewer would likely double check it. A model that says '95% confident' and is wrong is dangerous because that confidence discourages a human from double-checking.",
            },
            {
                "q": "Why LIME on BiLSTM but SHAP on DistilBERT?",
                "a": "We wanted to explore both explainability techniques across our two models rather than applying the same tool twice, so we could compare how each surfaces insight differently.",
            },
        ],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "smart-agriculture",
        "title": "Smart Agriculture Intelligence System",
        "subtitle": "Deep learning for crop health and yield planning",
        "domains": ["cv", "iot", "ai"],
        "status": ["Hackathon", "3-person team"],
        "team": "3-person hackathon team -- teammates built webcam disease detection and satellite/weather yield prediction; my scope was image-upload disease classification and explainability",
        "featured": True,
        "summary": (
            "A real-time, AI-powered agricultural decision-support system combining computer vision, "
            "weather data, and satellite imagery to help farmers assess crop health and plan for "
            "yield."
        ),
        "role": (
            "I trained a MobileNetV2 model via transfer learning on the PlantVillage dataset to "
            "classify 15 leaf-disease classes across pepper, potato, and tomato plants, and built a "
            "Streamlit interface with Grad-CAM heatmaps showing exactly where on the leaf the model "
            "focused. I added a confidence-aware UX layer -- below a 50% confidence threshold, the "
            "app surfaces likely reasons for the uncertainty (image quality, visually similar "
            "diseases) instead of presenting a guess as definitive -- and paired every detected "
            "disease with a description, cause, and treatment recommendation, so the output is "
            "actionable for a farmer, not just a classification label."
        ),
        "whatWorked": [
            "Transfer learning made a strong classifier feasible within hackathon time and data constraints.",
            "Grad-CAM builds trust and helps debug even wrong predictions by showing what the model actually looked at.",
        ],
        "limitations": [
            "Trained on PlantVillage's clean, controlled lab images -- real field photos (poor lighting, cluttered backgrounds, multiple leaves) would need more diverse training data to generalize well.",
        ],
        "metrics": [
            {"label": "Disease classes", "value": "15"},
            {"label": "Crops covered", "value": "Pepper, potato, tomato"},
        ],
        "techStack": ["MobileNetV2", "TensorFlow/Keras", "Grad-CAM", "Streamlit", "Google Earth Engine (NDVI)", "OpenWeatherMap API"],
        "qa": [
            {
                "q": "Did you train from scratch or use transfer learning?",
                "a": "Transfer learning, starting from a MobileNetV2 pretrained on ImageNet, then fine-tuned on PlantVillage -- accurate to what I did, and a better use of limited hackathon time and data than training a CNN from scratch.",
            },
            {
                "q": "Why Grad-CAM instead of LIME or SHAP?",
                "a": "Grad-CAM is well-suited to CNNs specifically since it works directly with the convolutional feature maps and gradients, producing an intuitive visual heatmap over the image -- far more natural for a farmer to interpret than a list of feature importances.",
            },
        ],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "assistive-navigation-stick",
        "title": "Smart AI-Powered Assistive Navigation Stick",
        "subtitle": "Edge AI mobility aid for visually impaired users",
        "domains": ["iot", "ai"],
        "status": ["ACM India Winter School on Edge AI — IISc Bengaluru", "5-person team"],
        "team": "Built during an 8-day national Edge AI program at IISc Bengaluru, team of 5",
        "featured": True,
        "summary": (
            "A navigation stick for visually impaired users that detects obstacles in real time, "
            "gives directional buzzer feedback, and includes fall detection that alerts a caregiver "
            "-- fully on-device inference, no cloud dependency."
        ),
        "role": (
            "My scope was the IoT and sensor side: a ToF (Time-of-Flight) sensor for real-time "
            "obstacle-distance detection, IMU-based fall detection (accelerometer + gyroscope "
            "pattern-matching for a sudden orientation/acceleration change consistent with a fall, "
            "distinct from normal walking), and the directional buzzer-feedback system translating "
            "obstacle direction into distinct buzz patterns. On the CNN side it was a whole-team "
            "effort -- we all contributed to dataset collection and training on Edge Impulse, and "
            "shipped the teammate's best-performing trained model version."
        ),
        "whatWorked": [
            "Fully on-device inference -- privacy-preserving, no cloud round-trip for obstacle detection.",
            "ToF sensing is fast and accurate enough for real-time handheld use.",
        ],
        "limitations": [
            "Quantizing the CNN to fit on-device memory constraints repeatedly traded off accuracy -- it took several rounds of retraining as a team to find a workable balance.",
            "A working prototype from an 8-day program, not field-deployed for real users yet.",
        ],
        "metrics": [
            {"label": "Program", "value": "8-day national, IISc Bengaluru"},
            {"label": "Team size", "value": "5"},
        ],
        "techStack": ["Nicla Vision", "ToF sensor", "IMU", "Edge Impulse", "On-device CNN"],
        "qa": [
            {
                "q": "What was the biggest challenge you personally worked on?",
                "a": "Getting the ToF and buzzer logic to translate into fast, reliable directional feedback -- testing the buzz patterns to make sure they were quick enough to be useful in real-time obstacle avoidance, not just accurate on paper.",
            },
            {
                "q": "Is this deployed?",
                "a": "It's a working prototype built during the program -- real sensors and a real trained model running on a Nicla Vision board, but not deployed for actual visually impaired users yet.",
            },
        ],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "smart-irrigation",
        "title": "Smart Irrigation & Rain Alert System",
        "subtitle": "Weather-aware automated watering",
        "domains": ["iot"],
        "status": ["2-person project"],
        "team": "2-person project -- teammate handled hardware assembly; I owned the software stack",
        "featured": False,
        "summary": (
            "An IoT-based smart irrigation system that automates watering using real-time soil "
            "moisture sensing and weather forecast data, reducing unnecessary irrigation and "
            "conserving water."
        ),
        "role": (
            "I wrote the ESP32 logic reading soil-moisture sensor data and driving a relay-controlled "
            "water pump, triggering only below a calibrated dryness threshold. I integrated the "
            "OpenWeatherMap API as a weather-aware override -- skipping irrigation if rain, drizzle, "
            "or cloud cover is already forecast, even if the soil is dry -- and added Twilio SMS "
            "alerts so users get notified remotely about rain predictions and pump actions."
        ),
        "whatWorked": [
            "Combining sensor and forecast signals avoided both under- and over-watering.",
            "Tested in a real garden/potted-plant setup with a 3-5 second sensor/API-to-pump-action response time.",
        ],
        "limitations": [
            "Moisture and weather thresholds were calibrated by hand during initial testing rather than tuned from logged historical data -- a natural next step.",
        ],
        "metrics": [
            {"label": "Response time", "value": "3-5s"},
            {"label": "Alerting", "value": "SMS via Twilio"},
        ],
        "techStack": ["ESP32", "Soil moisture sensor", "Relay module", "OpenWeatherMap API", "Twilio"],
        "qa": [
            {
                "q": "Why check weather data instead of just the moisture sensor?",
                "a": "Soil can be dry right now, but if rain is imminent, watering anyway wastes water and can cause overwatering once the rain arrives too -- combining both signals gives a smarter decision than either alone.",
            },
        ],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "morse-code-converter",
        "title": "Morse Code Converter",
        "subtitle": "Real-time text ⇄ Morse tool with audio and an emergency mode",
        "domains": ["backend"],
        "status": ["Personal project"],
        "team": "Solo",
        "featured": False,
        "summary": (
            "A real-time Morse Code converter with instant text-to-Morse translation, audio "
            "generation and playback, save-to-file export, an emergency-keyword detection mode, "
            "and a speed-challenge game mode."
        ),
        "role": (
            "Built audio generation and playback for dots and dashes using the Java Sound API with "
            "accurate signal/pause timing, save functionality to export as .txt/.wav via File I/O, "
            "an emergency-detection mode that identifies critical keywords (e.g. 'SOS', 'HELP') and "
            "triggers visual alerts plus accelerated playback, and a speed-challenge mode that "
            "generates random sequences and tracks speed and accuracy."
        ),
        "whatWorked": [
            "Accurate timing-sensitive audio playback for dots, dashes, and pauses.",
            "Robust validation and error handling for unsupported characters and audio/file failures.",
        ],
        "limitations": [],
        "metrics": [],
        "techStack": ["Java", "Java Swing", "Java Sound API"],
        "qa": [],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "theatre-info-system",
        "title": "Theatre Info System",
        "subtitle": "Movie/show management and ticket booking",
        "domains": ["backend"],
        "status": ["Coursework"],
        "team": "Solo",
        "featured": False,
        "summary": (
            "A theatre information system digitizing movie/show management, ticket booking, and "
            "user interactions for a cinema environment."
        ),
        "role": (
            "Built browsing of movies/showtimes with cast & crew details, secure authentication "
            "(signup, login, password reset, profile update), real-time seat booking with "
            "availability checks, cancellation, and e-ticket generation, a review/feedback module, "
            "and admin-side management of movies, shows, pricing, and seating."
        ),
        "whatWorked": [],
        "limitations": [],
        "metrics": [],
        "techStack": ["HTML5", "CSS3", "JavaScript"],
        "qa": [],
        "note": None,
        "repoUrl": None,
    },
    {
        "slug": "voyagera",
        "title": "Voyagera",
        "subtitle": "Travel planning & booking platform",
        "domains": ["backend"],
        "status": ["Coursework"],
        "team": "Team project",
        "featured": False,
        "summary": (
            "A travel planning and booking platform letting users explore destinations, customize "
            "travel packages, and manage hotel and transport bookings from a single interface."
        ),
        "role": (
            "Implemented a rule-based FAQ chatbot for common queries, a package-recommendation "
            "system suggesting packages by budget/trip-type/duration, a step-by-step package "
            "customization flow, hotel and transport booking modules with backend storage, and "
            "real-time weather/traffic/local-event data via external APIs."
        ),
        "whatWorked": [],
        "limitations": [],
        "metrics": [],
        "techStack": ["MongoDB", "Node.js"],
        "qa": [],
        "note": None,
        "repoUrl": None,
    },
]

EXPERIENCE = [
    {
        "id": "wg-tech",
        "role": "Edge AI Intern",
        "org": "WG Tech Solutions Pvt. Ltd.",
        "start": "2026-07",
        "end": None,
        "status": "active",
        "points": [
            "Built a real-time people-detection and zone-intrusion system: YOLOv8 Nano on an RTSP camera "
            "stream, FastAPI + OpenCV + FFmpeg backend, React frontend, live video and detections streamed "
            "over WebSockets. Users draw a custom polygon zone on the video feed; intrusion is tested using "
            "each detection's bottom-center point (their feet) against the polygon via OpenCV's "
            "pointPolygonTest, rather than the whole bounding box -- avoiding false alarms when someone just "
            "leans into frame.",
            "Designed a Jenkins CI/CD pipeline proof-of-concept: dependency install → syntax check "
            "(compileall) → static analysis (flake8) → pytest suite → coverage report → coverage gate "
            "(fails the build below 55%) → frontend build/lint → smoke test.",
            "Built DeepInsight, a manifest-driven test-orchestration framework on top of pytest: YAML-declared "
            "test suites resolved via a dependency DAG (topological sort, cycle detection), a precondition "
            "engine with configurable skip/stop/ignore policies, before/after stable-state directory audits, "
            "self-healing recovery (automatic git-checkout restore on a detected deviation), automatic "
            "MongoDB→mongomock fallback for portable unit tests, and console/JSON/HTML reporting.",
            "Led R&D generalizing an open-set defect-detection pipeline across product lines: a new "
            "single-model approach matched a 9-model baseline's accuracy at ~3x faster inference; "
            "root-caused a false-alarm issue via leave-one-panel-out testing back to training-data volume.",
            "Built a YOLOv8 animal-detection pipeline (0.817 precision / 0.701 recall / 0.752 mAP50) on a "
            "~76K-image dataset, fixing a validation blind spot with a capped negative-to-positive ratio and "
            "ByteTrack temporal confirmation.",
        ],
    },
    {
        "id": "kazunov1ai",
        "role": "AI Engineer Intern",
        "org": "Kazunov 1AI Pvt. Ltd.",
        "start": "2026-03",
        "end": "2026-07",
        "status": "closed",
        "points": [
            "Iteratively engineered a PDF fraud-detection pipeline -- metadata analysis, text-density "
            "statistics, font-switch rate, hidden-text thresholds, watermark detection, layout-consistency "
            "features -- lifting a 3-class Random Forest classifier (CLEAN / FORGED / AI_GENERATED, 300 "
            "trees, depth 12) from a 60-65% baseline to a best evaluated run of 95.12% accuracy (39/41).",
            "Built an image fraud-detection pipeline fusing an EfficientNetB0 transfer-learning CNN with 35 "
            "engineered forensic features (EXIF/provenance, Error Level Analysis, noise/sharpness, DCT "
            "frequency, OCR-based layout signals), cutting clean-document false positives to zero -- an "
            "actively-tuned pipeline, less mature than the PDF side.",
            "Redesigned document processing from a synchronous bottleneck into a two-stage AWS SQS queue "
            "architecture (classification queue → confidence-gated handoff to a processing/extraction "
            "queue), with S3 for large file payloads, retry logic, and a Dead Letter Queue for stuck "
            "messages.",
            "Built a digital-signature proof-of-concept for signed insurance-quote PDFs using pyHanko and a "
            "self-signed PKCS#12 test certificate -- automatically locating the signature area via pdfplumber "
            "text search instead of hardcoded coordinates, then hashing and cryptographically signing the "
            "document.",
        ],
    },
    {
        "id": "ssra",
        "role": "Web Development Intern",
        "org": "Sankhyatraya Science and Research Association (SSRA)",
        "start": "2025-06",
        "end": "2025-11",
        "status": "closed",
        "points": [
            "Delivered the organization's production website end-to-end as part of a 5-person team: "
            "responsive HTML/CSS/JS frontend, Netlify hosting wired to GitHub for auto-deploy on push, and "
            "DNS + SSL (Let's Encrypt via Netlify) configuration to take it live.",
        ],
    },
]

ACHIEVEMENTS = [
    {
        "title": "Published Indian Patent",
        "detail": "FlashRescue — Smart-City Disaster Response Platform, Indian Patent Office",
    },
    {
        "title": "Second Prize, ₹50,000",
        "detail": "K-GIS 2.0 State-Level Exhibition, Karnataka State Remote Sensing Applications Centre (KSRSAC)",
    },
    {
        "title": "Best Elevator Pitch",
        "detail": "NEC's Eureka, ED-Cell BNMIT | E-Cell, IIT Bombay",
    },
    {
        "title": "2nd Runner-up",
        "detail": "State-Level Project Competition 2025, Bangalore Institute of Technology",
    },
]

EDUCATION = [
    {"school": "B N M Institute of Technology", "degree": "B.E., Computer Science", "period": "2023–2027", "score": "CGPA 9.73"},
    {"school": "Jain PU College", "degree": "Senior Secondary (XII)", "period": "2021–2023", "score": "94.66%"},
    {"school": "Kendriya Vidyalaya", "degree": "Secondary (X)", "period": "2011–2021", "score": "95.5%"},
]

PROGRAMS = [
    {
        "title": "ACM India Winter School on Edge AI",
        "org": "IISc Bengaluru — Selected Participant, National 8-day program",
        "detail": "Hands-on training in Edge AI, TinyML, Federated Learning, and model optimization/deployment. Built the Assistive Navigation Stick as the program's team project.",
    },
    {
        "title": "Samsung Innovation Campus",
        "org": "Student Trainee",
        "detail": "Industry-focused training in IoT systems, embedded programming, and sensor integration.",
    },
    {
        "title": "BNMIT Super 60 Leadership Academy",
        "org": "Student Member",
        "detail": "Selected for a mentor-led leadership and professional-development program.",
    },
]

COURSES = [
    {"title": "Artificial Intelligence Fundamentals", "org": "IBM SkillsBuild"},
    {"title": "Introduction to Internet of Things", "org": "NPTEL — Top 2% of learners"},
    {"title": "Foundations of Deep Learning: Concepts and Applications", "org": "NPTEL — Elite Certificate, 78%"},
]

// Project + case-study content. Every number here comes from the project
// descriptions / resume — edit freely, the UI is driven entirely by this file.
//
// motif: cover artwork drawn in code (see ProjectCover.jsx)
// image: optional screenshot shown inside the case study
// compare: optional before/after slider (low/high image pair) shown instead of a screenshot

export const PROJECTS = [
  {
    id: 'hitl-rl',
    title: 'Human-in-the-Loop RL with Preference-Based Rewards',
    short: 'A reward model trained on human preferences instead of a hand-written reward.',
    year: '2026',
    featured: true,
    motif: 'rl',
    metric: { value: '+31%', label: 'policy alignment over baseline PPO' },
    tags: ['Reinforcement Learning', 'PyTorch', 'Preference Learning', 'MuJoCo'],
    link: 'https://github.com/Arman-02',
    case: {
      question: 'How well can a policy learn from pairwise human preferences, and how much human feedback does it actually need?',
      approach: [
        'Architected and trained a PyTorch reward model on 1,200+ pairwise human preferences using Bradley-Terry comparisons.',
        'Evaluated policy alignment across 4 MuJoCo tasks against a baseline PPO agent.',
        'Ran annotation-budget and feedback-noise ablations to quantify the tradeoff between label cost and policy quality.',
      ],
      results: [
        { value: '+31%', label: 'alignment vs. baseline PPO' },
        { value: '−40%', label: 'human queries required' },
        { value: '94%', label: 'of full-feedback performance retained' },
      ],
    },
  },
  {
    id: 'medical-imaging',
    title: 'Medical Image Analysis',
    short: 'Fracture segmentation and chest X-ray classification under extreme class imbalance.',
    year: '2025',
    featured: true,
    motif: 'medical',
    metric: { value: '93.1%', label: 'fracture classification accuracy' },
    tags: ['U-Net++', 'EfficientNet', 'PyTorch', 'Computer Vision'],
    link: 'https://github.com/Arman-02/Final-FAI-Project-Updated',
    image: '/MedicalImageAnalysis.png',
    case: {
      question: 'Can one system both localise bone fractures and classify chest X-rays when the positive classes are rare?',
      approach: [
        'Fracture segmentation with U-Net++ on an EfficientNet-B4 encoder.',
        'Chest X-ray classifier (COVID-19, Pneumonia, TB, Normal) built on EfficientNet-B3.',
        'Custom Dice-Focal-BCE loss to handle extreme class imbalance; both models implemented and tested in PyTorch.',
      ],
      results: [
        { value: '93.14%', label: 'fracture classification accuracy' },
        { value: '61.48%', label: 'fracture Dice score' },
        { value: '84.92%', label: 'chest X-ray accuracy' },
        { value: '0.84', label: 'chest X-ray macro-F1' },
      ],
    },
  },
  {
    id: 'auto-assess',
    title: 'Auto-Assess',
    short: 'Natural language to SQL with a fine-tuned Llama 3.1 — published at IEEE SCEECS 2025.',
    year: '2025',
    featured: true,
    motif: 'sql',
    metric: { value: '87%', label: 'execution accuracy on WikiSQL' },
    tags: ['Llama 3.1', 'LoRA', 'NLP', 'PyTorch'],
    link: 'https://github.com/Arman-02',
    image: '/AutoAssessImage.png',
    case: {
      question: 'Can an LLM generate and grade SQL reliably enough to power an automated learning platform?',
      approach: [
        'Fine-tuned Llama 3.1 with LoRA on Spider for natural-language-to-SQL generation.',
        'Built an evaluation pipeline over 8,000+ queries measuring execution accuracy and logical-form correctness (Hugging Face Transformers, PyTorch, MongoDB, Flask).',
        'Added automated question generation, flashcards, and answer generation on top of the model.',
      ],
      results: [
        { value: '87%', label: 'execution accuracy on WikiSQL' },
        { value: '8,000+', label: 'queries evaluated' },
        { value: 'IEEE', label: 'SCEECS 2025 publication' },
      ],
    },
  },
  {
    id: 'super-resolution',
    title: 'Image Super Resolution',
    short: 'WGAN-GP upscaling with a VGG19 perceptual loss.',
    motif: 'gan',
    metric: { value: '0.74', label: 'SSIM' },
    tags: ['GANs', 'TensorFlow', 'Computer Vision'],
    link: 'https://github.com/Arman-02',
    compare: {
      low: '/lowres.jpg',
      high: '/highres.jpg',
      alt: 'Tree-lined park at golden hour',
      caption: 'Drag to compare the low-resolution input with the high-resolution image.',
    },
    case: {
      question: 'How much detail can a GAN recover when upscaling low-resolution images?',
      approach: [
        'WGAN-GP generator with residual blocks for upscaling low-resolution images.',
        'VGG19 perceptual loss to favour detail fidelity over pixel-level smoothness.',
      ],
      results: [
        { value: '21.1', label: 'PSNR' },
        { value: '0.74', label: 'SSIM' },
      ],
    },
  },
  {
    id: 'fetch-agents',
    title: 'Inventory Automation with Fetch AI Agents',
    short: 'Microagents that check stock, place orders, and forecast demand.',
    motif: 'agents',
    metric: { value: '93%', label: 'stocking forecast accuracy' },
    tags: ['Agents', 'LSTM', 'Simulation'],
    link: 'https://github.com/Arman-02',
    case: {
      question: 'Can a team of autonomous agents run an inventory loop end to end?',
      approach: [
        'Built Fetch AI microagents to simulate stock checks, order placement, prediction, and financial management.',
        'Trained LSTMs for pre-emptive stocking.',
      ],
      results: [{ value: '93%', label: 'pre-emptive stocking accuracy' }],
    },
  },
  {
    id: 'sarcasm',
    title: 'Sarcasm Detection',
    short: 'CNN vs. sequential network comparison with hyperparameter tuning.',
    motif: 'nlp',
    metric: { value: '80.1%', label: 'accuracy' },
    tags: ['NLP', 'Deep Learning', 'Model Tuning'],
    link: 'https://github.com/Arman-02',
    case: {
      question: 'Which architecture picks up sarcasm better: a CNN or a sequential network?',
      approach: [
        'Developed and compared two deep learning NLP models (CNN vs. Sequential NN).',
        'Hyperparameter tuning on both; the Sequential model performed best.',
      ],
      results: [{ value: '80.1%', label: 'accuracy (Sequential model)' }],
    },
  },
  {
    id: 'skai',
    title: 'SkAI: Flight Safety & Automation',
    short: 'Weather-safety modelling on JFK data with a live rerouting demo.',
    motif: 'flight',
    tags: ['Time Series', 'LSTM', 'Random Forest', 'Streamlit'],
    link: 'https://github.com/Arman-02',
    image: '/SKAI_FlightAutomation.png',
    case: {
      question: 'Can weather data predict when a flight needs service or rerouting?',
      approach: [
        'Modeled a weather safety system on JFK data with neural networks and LSTMs.',
        'Built a Random Forest to predict service urgency.',
        'Deployed a Streamlit demo that simulates dynamic rerouting under random conditions.',
      ],
    },
  },
  {
    id: 'sales-forecasting',
    title: 'AI-Driven Sales Forecasting',
    short: 'ARIMA / Auto-ARIMA forecasting with seasonal decomposition.',
    motif: 'timeseries',
    tags: ['Time Series', 'ARIMA', 'pandas'],
    link: 'https://github.com/Arman-02',
    image: '/SalesForecasting.png',
    case: {
      question: 'How well do classical statistical models capture sales trend and seasonality?',
      approach: [
        'Forecasting with ARIMA and Auto ARIMA.',
        'Stationarity checks and seasonal decomposition to model trend and seasonality.',
      ],
    },
  },
]

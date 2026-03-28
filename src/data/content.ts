// ─── Central Content Configuration ───────────────────────────────────────────
// All personalised copy lives here. Edit this file to update the portfolio.

export const META = {
  name: 'Rushikesh Bodhe',
  title: 'ML Engineer & AI Researcher',
  tagline: 'Building intelligent systems that scale.',
  email: 'rushikeshsbodhe@gmail.com',
  phone: '+44 7466 501997',
  github: 'https://github.com/Rushikesh042',
  linkedin: 'https://www.linkedin.com/in/rushikesh-bodhe/',
  location: 'Coventry, United Kingdom',
  cvUrl: '/Rushikesh_Bodhe_CV.pdf',
}

export const HERO = {
  greeting: 'Hello, I\'m',
  name: 'Rushikesh Bodhe',
  roles: [
    'Machine Learning Engineer',
    'Generative AI Developer',
    'MLOps Practitioner',
    'AI Researcher',
  ],
  summary:
    'AWS Certified ML Engineer with 3 years of production experience — fine-tuning LLMs, building scalable MLOps pipelines, and deploying GenAI solutions that move the needle.',
  cta: {
    primary: { label: 'View My Work', href: '#projects' },
    secondary: { label: 'Get in Touch', href: '#contact' },
  },
}

export const ABOUT = {
  heading: 'About Me',
  subheading: 'Engineer by practice. Researcher by curiosity.',
  bio: [
    'I\'m a Machine Learning Engineer pursuing an M.Sc. in Applied AI at the University of Warwick. With 3 years of industry experience at Cybage Software, I\'ve shipped production-grade ML pipelines, fine-tuned large language models, and built end-to-end GenAI architectures that serve real business needs.',
    'My work sits at the intersection of research and engineering — from curating 50,000+ QA datasets for instruction tuning to reducing data processing latency by 25% through distributed GPU training. I hold an AWS Certified Machine Learning Engineer credential and bring deep expertise across Python, PyTorch, and the full AWS ML stack.',
    'When I\'m not training models, I\'m publishing research, competing in hackathons, or exploring the latest developments in vision–language models and multimodal AI.',
  ],
  stats: [
    { value: '3+', label: 'Years Experience' },
    { value: '50K+', label: 'QA Samples Curated' },
    { value: '5', label: 'Peer-reviewed Papers' },
    { value: '25%', label: 'Latency Reduction' },
  ],
  education: [
    {
      degree: 'M.Sc. Applied Artificial Intelligence',
      institution: 'University of Warwick',
      location: 'Coventry, UK',
      period: 'Sep 2025 – Sep 2026 (Expected)',
      grade: '',
      courses: ['Applied ML', 'Applied Deep Learning', 'AI Research & Industry', 'Database Management'],
    },
    {
      degree: 'PG Diploma in Data Science & AI',
      institution: 'COEP Technological University',
      location: 'India',
      period: 'Sep 2022 – Aug 2023',
      grade: 'CGPA: 8.37',
      courses: ['Advanced ML', 'NLP', 'Time Series Analysis', 'Big Data Analytics'],
    },
    {
      degree: 'B.E. in Information Technology',
      institution: 'S. B. Jain Institute of Technology',
      location: 'India',
      period: 'Jul 2018 – Jun 2022',
      grade: 'CGPA: 9.20',
      courses: ['Algorithms & Data Structures', 'Cloud Computing', 'Data Warehousing & Mining'],
    },
  ],
}

export const WHAT_I_DO = {
  heading: 'What I Do',
  subheading: 'End-to-end AI engineering — from research to production.',
  services: [
    {
      icon: 'brain',
      title: 'LLM Fine-Tuning & GenAI',
      description:
        'Fine-tuning Qwen, Llama, and other foundation models using LoRA, DoRA, and QLoRA on domain-specific datasets. Building RAG pipelines with dense embeddings and vector search for production-grade retrieval quality.',
    },
    {
      icon: 'pipeline',
      title: 'MLOps & Pipelines',
      description:
        'Designing scalable MLOps workflows with automated ETL, CI/CD integration, distributed GPU training, and Kubernetes-based batch serving. Reducing retraining latency and enabling reliable model lifecycle management.',
    },
    {
      icon: 'cloud',
      title: 'AWS ML Platform',
      description:
        'End-to-end solutions on AWS SageMaker, EC2, S3, Lambda, and Step Functions. From training infrastructure to inference endpoints — deploying, monitoring, and scaling ML systems in the cloud.',
    },
    {
      icon: 'research',
      title: 'Applied AI Research',
      description:
        'Publishing peer-reviewed research in vision–language models, EEG-based mental health classification, and human activity recognition. Bridging academic rigour with real-world applicability.',
    },
    {
      icon: 'vision',
      title: 'Computer Vision & VLMs',
      description:
        'Building vision–language pipelines for medical imaging, dental diagnostics, and object detection. Leveraging multimodal architectures to extract structured insights from complex visual data.',
    },
    {
      icon: 'data',
      title: 'Data Engineering',
      description:
        'Engineering SQL workflows, Apache Spark pipelines, and Dockerised ETL services to move data reliably at scale. Enabling reproducible, traceable data flows for model training and evaluation.',
    },
  ],
}

export const EXPERIENCE = [
  {
    role: 'Software Engineer — ML & GenAI',
    company: 'Cybage Software Pvt. Ltd.',
    location: 'India',
    period: 'Aug 2022 – Jun 2025',
    type: 'Full-time',
    highlights: [
      'Led deployment of Qwen-2.5-VL and Llama-3 for production GenAI workflows by fine-tuning on 50,000+ QA samples; built RAG pipelines with dense embeddings and vector search.',
      'Deployed REST inference endpoints and Kubernetes-based batch serving to improve retrieval quality and response relevance at scale.',
      'Built scalable MLOps pipelines for high-frequency retraining by automating ETL workflows with Python, SQL, and Apache Spark; enabled distributed training across GPU clusters, reducing data processing latency by 25%.',
      'Applied parameter-efficient fine-tuning (LoRA, DoRA, QLoRA), increasing benchmark accuracy by 3.7% and reducing execution time by 2% while tracking distribution shifts.',
      'Engineered SQL data workflows and Dockerised services to support reliable, reproducible model deployment.',
    ],
    tags: ['LLM Fine-tuning', 'RAG', 'MLOps', 'Kubernetes', 'LoRA', 'PyTorch', 'AWS', 'Apache Spark'],
  },
]

export const PROJECTS = [
  {
    id: 'dental-vlm',
    title: 'Vision–Language Models for Dental Radiographs',
    subtitle: 'Tooth-Level Reasoning, Localisation & Explainability',
    description:
      'Optimised Qwen2.5-VL-7B via DoRA-based fine-tuning, outperforming standard few-shot prompting by 12% in cosine similarity and 10% in AUROC on specialised dental diagnostics. Integrated dental notation, structured prompting, and spatial localisation achieving a 15% improvement in tooth-level QA accuracy.',
    tags: ['Qwen2.5-VL', 'DoRA', 'VLM', 'Medical AI', 'PyTorch', 'HuggingFace'],
    metrics: ['+12% cosine sim', '+10% AUROC', '+15% QA accuracy'],
    featured: true,
  },
  {
    id: 'mental-health-eeg',
    title: 'Multi-Model Approach for Mental Disorder Severity',
    subtitle: 'EEG-Based Deep Learning Classification',
    description:
      'Developed a hybrid EEG-based deep learning framework comparing 3D-CNN (VGG-19), MobileNet, and Random Forest for classifying and measuring severity across 5 neurological and psychiatric disorders. Achieved ~97% overall classification accuracy with F1-score >0.95 for depression and schizophrenia.',
    tags: ['EEG', 'CNN', 'MobileNet', 'Random Forest', 'Healthcare AI', 'PyTorch'],
    metrics: ['~97% accuracy', 'F1 >0.95', '5 disorder classes'],
    featured: true,
  },
  {
    id: 'activity-classification',
    title: 'Outdoor Activity Classification via Inertial Sensors',
    subtitle: 'CNN-FCM-LSTM Hybrid Architecture',
    description:
      'Designed a hybrid CNN-FCM-LSTM architecture combining convolutional feature extraction, fuzzy c-means clustering for feature reduction, and LSTM for temporal modelling. Achieved 99.69% accuracy on MotionSense and 97.27% on WISDM, demonstrating strong generalisation.',
    tags: ['CNN', 'LSTM', 'FCM', 'Time Series', 'Sensor Fusion', 'TensorFlow'],
    metrics: ['99.69% accuracy', '99.62% sensitivity', '97.27% on WISDM'],
    featured: true,
  },
]

export const TECH_STACK = {
  heading: 'Tech Stack',
  subheading: 'Tools and technologies I work with every day.',
  categories: [
    {
      label: 'Languages',
      items: ['Python', 'SQL', 'MATLAB', 'R'],
    },
    {
      label: 'AI & ML',
      items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'HuggingFace', 'PEFT', 'Accelerate', 'LangChain'],
    },
    {
      label: 'AWS',
      items: ['SageMaker', 'EC2', 'S3', 'Lambda', 'Step Functions', 'ECR', 'Rekognition', 'Comprehend'],
    },
    {
      label: 'MLOps & DevOps',
      items: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'CI/CD', 'Datadog'],
    },
    {
      label: 'Data Engineering',
      items: ['Apache Spark', 'SQL Server', 'Jupyter', 'Anaconda', 'VS Code', 'PyCharm'],
    },
  ],
}

export const CERTIFICATIONS = [
  {
    title: 'AWS Certified Machine Learning Engineer – Associate',
    issuer: 'Amazon Web Services',
    issued: 'March 23, 2026',
    expires: 'March 23, 2029',
    validationId: '65250e1e09a8455a9b4c2f1f5b2947d7',
    badge: 'aws-mle',
  },
]

export const PUBLICATIONS = [
  {
    title: 'Outdoor Activity Classification using Smartphone-based Inertial Sensor Measurements',
    venue: 'Multimedia Tools and Applications',
    type: 'Journal',
    date: 'February 2024',
    link: 'https://link.springer.com/article/10.1007/s11042-024-18599-w',
  },
  {
    title: 'Design and Development of a Deep Learning Approach for Dental Implant Planning',
    venue: 'GECOST Conference, Malaysia',
    type: 'Conference',
    date: 'October 2022',
    link: 'https://ieeexplore.ieee.org/abstract/document/10010527/',
  },
  {
    title: 'Multi-Model Deep Learning-based Approach for Scaling the Severity of Mental Disorders',
    venue: 'GECOST Conference, Malaysia',
    type: 'Conference',
    date: 'October 2022',
    link: 'https://ieeexplore.ieee.org/document/10010680/',
  },
  {
    title: 'Heterogeneous Spatiotemporal Graph-based Deep CNN for Pattern Mining and Outlier Detection',
    venue: 'International Research Journal of Engineering and Technology',
    type: 'Journal',
    date: 'November 2021',
    link: 'https://www.irjet.net/archives/V8/i11/IRJET-V8I1162.pdf',
  },
  {
    title: 'IoT-based Humanoid Software for Identification and Diagnosis of COVID-19 Suspects',
    venue: 'IEEE Sensors Journal',
    type: 'Journal',
    date: 'October 2020',
    link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9564039/',
  },
]

export const AWARDS = [
  {
    title: 'First Place — National Level Project Competition',
    event: 'G.H. Raisoni Institute of Engineering, Nagpur',
    date: 'April 2022',
    icon: 'trophy',
  },
  {
    title: 'First Place — National Level Paper Presentation',
    event: 'K.D.K. College of Engineering, Nagpur',
    date: 'March 2022',
    icon: 'trophy',
  },
  {
    title: 'Third Place — National Level Coding Contest',
    event: 'IEEE Bombay Section, Nagpur',
    date: 'September 2021',
    icon: 'medal',
  },
  {
    title: 'First Place — Xperion Hackathon',
    event: 'IEEE Kerala Section, Palakkad',
    date: 'February 2020',
    icon: 'trophy',
  },
  {
    title: 'First Place — Mindfest Presentation Competition',
    event: 'SBJITMR, Nagpur',
    date: 'January 2020',
    icon: 'trophy',
  },
]

export const CONTACT = {
  heading: 'Let\'s Build Something',
  subheading: 'Open to ML engineering roles, research collaborations, and AI consulting.',
  body: 'Whether you\'re hiring for an ML engineering position, exploring research partnerships, or just want to talk about the latest in LLMs — I\'d love to hear from you.',
  availability: 'Currently available for full-time roles & research collaborations',
  cta: 'Send a Message',
  links: [
    { label: 'Email', value: 'rushikeshsbodhe@gmail.com', href: 'mailto:rushikeshsbodhe@gmail.com', icon: 'email' },
    { label: 'LinkedIn', value: 'rushikesh-bodhe', href: 'https://www.linkedin.com/in/rushikesh-bodhe/', icon: 'linkedin' },
    { label: 'GitHub', value: 'Rushikesh042', href: 'https://github.com/Rushikesh042', icon: 'github' },
  ],
}

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'What I Do', href: '#what-i-do' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

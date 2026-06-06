export type BlogCategory = 'AI' | 'Ethical Hacking' | 'Web3 Development' | 'Web3 Marketing';

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  readTime: string;
  date: string;
  featured: boolean;
  content: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
};

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: 'ai-agents-future-in-automation',
    title: 'AI Agents Are Replacing SaaS Workflows Faster Than You Think',
    excerpt:
      'We are moving from software tools to autonomous AI agents. Here is how AI systems are quietly replacing traditional SaaS workflows in 2025.',
    category: 'AI',
    tags: ['AI', 'Automation', 'Agents'],
    readTime: '8 min read',
    date: 'May 28, 2025',
    featured: true,
    author: { name: 'Alex Morgan', role: 'AI & Web3 Engineer', initials: 'AM' },
    content: `## AI Agents

Software is moving from tools → autonomous agents.

Agents now:
- Execute tasks
- Call APIs
- Make decisions

This replaces traditional SaaS workflows.`,
  },

  {
    id: 2,
    slug: 'web3-security-smart-contract-attacks',
    title: 'How Smart Contract Exploits Actually Happen (And How Hackers Think)',
    excerpt: 'Most Web3 hacks are logic failures, not genius attacks.',
    category: 'Ethical Hacking',
    tags: ['Security', 'Smart Contracts', 'DeFi'],
    readTime: '10 min read',
    date: 'May 10, 2025',
    featured: true,
    author: { name: 'Alex Morgan', role: 'Security Researcher', initials: 'AM' },
    content: `## Smart Contract Attacks

Most exploits are simple:
- Reentrancy
- Oracle manipulation
- Bad access control

Hackers look for:
- Reusable functions
- State inconsistencies
- External call weaknesses`,
  },

  {
    id: 3,
    slug: 'ai-powered-web3-marketing-engine',
    title: 'Building an AI-Powered Web3 Marketing Engine That Scales Communities',
    excerpt: 'AI is transforming Web3 marketing into a fully automated system.',
    category: 'Web3 Marketing',
    tags: ['Marketing', 'AI', 'Web3'],
    readTime: '9 min read',
    date: 'April 22, 2025',
    featured: false,
    author: { name: 'Alex Morgan', role: 'Web3 Growth Strategist', initials: 'AM' },
    content: `## AI Marketing

Marketing is now automated:

- Content generation
- Audience segmentation
- Sentiment tracking

Marketing = system, not team.`,
  },

  {
    id: 4,
    slug: 'ethical-hacking-web3-career-path',
    title: 'Becoming a Web3 Ethical Hacker in 2025',
    excerpt: 'Roadmap to becoming a smart contract auditor.',
    category: 'Ethical Hacking',
    tags: ['Career', 'Security', 'Web3'],
    readTime: '7 min read',
    date: 'April 10, 2025',
    featured: false,
    author: { name: 'Alex Morgan', role: 'Security Engineer', initials: 'AM' },
    content: `## Web3 Security Career

Skills:
- Solidity
- Foundry
- Auditing

Security = highest value skill in Web3.`,
  },

  {
    id: 5,
    slug: 'ai-vs-traditional-software',
    title: 'Why AI Will Replace Traditional Software Interfaces',
    excerpt: 'The GUI era is ending.',
    category: 'AI',
    tags: ['AI', 'UX', 'Future'],
    readTime: '6 min read',
    date: 'March 28, 2025',
    featured: false,
    author: { name: 'Alex Morgan', role: 'AI Architect', initials: 'AM' },
    content: `## UI is Dead

Old:
- Buttons
- Menus

New:
- Intent
- AI execution`,
  },

  {
    id: 6,
    slug: 'web3-growth-hacking-strategies',
    title: 'Web3 Growth Hacking Strategies That Actually Work in 2025',
    excerpt: 'Growth is no longer marketing — it is product design.',
    category: 'Web3 Marketing',
    tags: ['Growth', 'Web3', 'Strategy'],
    readTime: '8 min read',
    date: 'March 12, 2025',
    featured: false,
    author: { name: 'Alex Morgan', role: 'Growth Engineer', initials: 'AM' },
    content: `## Growth in Web3

Old growth:
- Airdrops

New growth:
- Behavior rewards
- On-chain progression`,
  },

  {
    id: 7,
    slug: 'ai-x-blockchain-future',
    title: 'AI + Blockchain: The Convergence That Will Redefine the Internet',
    excerpt: 'AI + blockchain = autonomous decentralized systems.',
    category: 'AI',
    tags: ['AI', 'Web3', 'Blockchain'],
    readTime: '9 min read',
    date: 'February 25, 2025',
    featured: false,
    author: { name: 'Alex Morgan', role: 'Tech Strategist', initials: 'AM' },
    content: `## Convergence

AI = intelligence  
Blockchain = trust  

Together:
- Smart agents
- DAOs
- Autonomous systems`,
  },

  {
    id: 8,
    slug: 'web3-development-foundations',
    title: 'Web3 Development: Building Decentralized Applications from Scratch',
    excerpt: 'A practical guide to building dApps, smart contracts, and blockchain systems.',
    category: 'Web3 Development',
    tags: ['Solidity', 'Blockchain', 'dApps'],
    readTime: '10 min read',
    date: 'January 15, 2025',
    featured: true,
    author: { name: 'Alex Morgan', role: 'Blockchain Developer', initials: 'AM' },
    content: `## Web3 Development

Core stack:
- Solidity
- EVM
- Smart contracts

Build:
- dApps
- Tokens
- Protocols

Web3 = programmable money + logic.`,
  },
];

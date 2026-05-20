-- Seed data for skills
INSERT INTO skills (name, category, proficiency, icon_name, years_experience, sort_order) VALUES
('Solidity', 'blockchain', 95, 'code-2', 3.5, 1),
('Ethereum', 'blockchain', 92, 'box', 3.5, 2),
('Hardhat', 'blockchain', 90, 'hammer', 3, 3),
('Web3.js', 'blockchain', 88, 'globe', 3, 4),
('Ethers.js', 'blockchain', 90, 'link', 3, 5),
('IPFS', 'blockchain', 80, 'database', 2, 6),
('Chainlink', 'blockchain', 82, 'link-2', 2, 7),
('Polygon', 'blockchain', 85, 'hexagon', 2.5, 8),
('Rust (Solana)', 'blockchain', 75, 'cpu', 1.5, 9),
('DeFi', 'blockchain', 88, 'trending-up', 3, 10),
('Penetration Testing', 'cybersecurity', 92, 'shield', 4, 20),
('OSINT', 'cybersecurity', 88, 'search', 4, 21),
('Kali Linux', 'cybersecurity', 90, 'terminal', 4, 22),
('Metasploit', 'cybersecurity', 85, 'crosshair', 3, 23),
('Burp Suite', 'cybersecurity', 88, 'bug', 3, 24),
('Wireshark', 'cybersecurity', 85, 'activity', 3, 25),
('Malware Analysis', 'cybersecurity', 80, 'virus', 2, 26),
('Network Security', 'cybersecurity', 88, 'network', 4, 27),
('TypeScript', 'languages', 92, 'file-code', 4, 40),
('Python', 'languages', 90, 'file-code', 5, 41),
('Go', 'languages', 78, 'file-code', 2, 42);

-- Seed data for projects
INSERT INTO projects (title, slug, description, category, tech_stack, featured, status, sort_order) VALUES
('DeFi Lending Protocol', 'defi-lending-protocol', 'Decentralized lending platform with dynamic interest rates and multi-collateral support.', 'defi', ARRAY['Solidity','Hardhat','Ethers.js','Next.js'], true, 'completed', 1),
('Smart Contract Security Audit', 'smart-contract-audit', 'Comprehensive security audit of an NFT marketplace contract, identifying 12 vulnerabilities.', 'audit', ARRAY['Slither','Mythril','Foundry','Solidity'], true, 'completed', 2),
('Cross-Chain Bridge', 'cross-chain-bridge', 'Bridge enabling asset transfers between Ethereum and Polygon with multi-sig validation.', 'blockchain', ARRAY['Solidity','Chainlink','Polygon','TypeScript'], true, 'completed', 3),
('Web3 Identity Vault', 'web3-identity-vault', 'Self-sovereign identity management with zero-knowledge proofs.', 'web3', ARRAY['Circom','SnarkJS','Solidity','React'], false, 'completed', 4),
('Pentest Report Automation', 'pentest-automation', 'Automated penetration testing report generator integrating Burp, Nmap, and Metasploit outputs.', 'cybersecurity', ARRAY['Python','FastAPI','PostgreSQL'], false, 'completed', 5),
('NFT Royalty Splitter', 'nft-royalty-splitter', 'On-chain royalty distribution contract with gas-optimized batch payouts.', 'smart-contract', ARRAY['Solidity','Foundry'], false, 'completed', 6);

-- Seed data for experience
INSERT INTO experience (company, role, description, responsibilities, tech_used, start_date, end_date, is_current, sort_order) VALUES
('Freelance', 'Blockchain & Security Consultant', 'Independent consultant delivering blockchain development and security audits to clients worldwide.', ARRAY['Smart contract development','Security audits','DeFi architecture','Client consultation'], ARRAY['Solidity','Hardhat','Foundry','Python'], '2023-01-01', NULL, true, 1),
('CyberShield Labs', 'Penetration Tester', 'Conducted vulnerability assessments and red-team engagements for enterprise clients.', ARRAY['Web app pentesting','Network security audits','Report writing','Remediation guidance'], ARRAY['Kali Linux','Burp Suite','Metasploit'], '2022-03-01', '2023-01-01', false, 2),
('BlockForge Studio', 'Junior Smart Contract Developer', 'Built and deployed DeFi smart contracts and supporting dApp interfaces.', ARRAY['Solidity development','Frontend integration','Unit testing'], ARRAY['Solidity','React','Ethers.js'], '2021-06-01', '2022-03-01', false, 3);

-- Seed data for certifications
INSERT INTO certifications (name, issuer, issue_date, category, sort_order) VALUES
('Certified Ethical Hacker (CEH)', 'EC-Council', '2023-04-15', 'security', 1),
('Offensive Security Certified Professional', 'OffSec', '2023-09-20', 'security', 2),
('Certified Blockchain Developer', 'Blockchain Council', '2022-11-10', 'blockchain', 3),
('Solidity Smart Contract Audit', 'ConsenSys Academy', '2023-02-08', 'blockchain', 4),
('CompTIA Security+', 'CompTIA', '2022-05-22', 'security', 5),
('AWS Certified Solutions Architect', 'AWS', '2023-07-01', 'platform', 6);

-- Seed data for testimonials
INSERT INTO testimonials (client_name, client_title, client_company, content, rating, platform, project_type, is_featured, sort_order) VALUES
('Marcus Chen', 'CTO', 'DeFiVault', 'Ahmed delivered a flawless audit of our protocol. Found a critical reentrancy issue our team missed. Highly recommended.', 5, 'direct', 'Security Audit', true, 1),
('Sara Liu', 'Founder', 'MetaArt Studio', 'Top-tier Solidity work. Communication was excellent and the contracts shipped on time and under budget.', 5, 'upwork', 'Smart Contract', true, 2),
('David Park', 'Lead Engineer', 'ChainBridge', 'Knows blockchain inside out. Helped us architect a bridge with proper multi-sig from day one.', 5, 'direct', 'Consulting', true, 3),
('Olivia Brooks', 'Product Manager', 'SecureNet', 'Detailed pentest report with clear remediation steps. Will hire again.', 5, 'fiverr', 'Penetration Testing', false, 4);
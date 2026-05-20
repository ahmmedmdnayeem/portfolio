-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- PROJECTS TABLE
-- =====================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('blockchain', 'cybersecurity', 'web3', 'defi', 'smart-contract', 'audit', 'other')),
  tech_stack TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  status VARCHAR(30) DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'archived')),
  client_name VARCHAR(100),
  completion_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SKILLS TABLE
-- =====================
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('blockchain', 'cybersecurity', 'languages', 'tools', 'frameworks', 'platforms', 'marketing', 'fullstack')),
  proficiency INTEGER CHECK (proficiency BETWEEN 0 AND 100),
  icon_name VARCHAR(50),
  years_experience NUMERIC(3,1),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- EXPERIENCE TABLE
-- =====================
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company VARCHAR(200) NOT NULL,
  role VARCHAR(200) NOT NULL,
  description TEXT,
  responsibilities TEXT[],
  tech_used TEXT[],
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  company_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CERTIFICATIONS TABLE
-- =====================
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  issuer VARCHAR(200) NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_url TEXT,
  badge_url TEXT,
  category VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- TESTIMONIALS TABLE
-- =====================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(100) NOT NULL,
  client_title VARCHAR(150),
  client_company VARCHAR(150),
  client_avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  platform VARCHAR(50) CHECK (platform IN ('upwork', 'fiverr', 'direct', 'linkedin', 'x')),
  project_type VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CONTACT MESSAGES TABLE
-- =====================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) NOT NULL,
  subject VARCHAR(300),
  message TEXT NOT NULL,
  budget_range VARCHAR(50),
  project_type VARCHAR(100),
  status VARCHAR(30) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SITE STATS TABLE
-- =====================
CREATE TABLE site_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  contact_submissions INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);

CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access experience" ON experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public insert messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- =====================
-- AUTO-UPDATE TIMESTAMPS
-- =====================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- INDEXES
-- =====================
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_sort ON projects(sort_order);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_messages_status ON contact_messages(status);
CREATE INDEX idx_messages_created ON contact_messages(created_at DESC);
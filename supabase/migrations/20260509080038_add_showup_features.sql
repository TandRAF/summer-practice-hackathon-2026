-- =========================================
-- 1. SPORTS & PREFERENCES
-- =========================================
CREATE TABLE sports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  min_players INT NOT NULL,
  max_players INT NOT NULL
);

CREATE TABLE user_sport_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- Se leagă de tabela ta existentă
  sport_id UUID REFERENCES sports(id) ON DELETE CASCADE,
  skill_level TEXT DEFAULT 'Intermediate',
  UNIQUE(user_id, sport_id) -- Un user nu poate adăuga același sport de 2 ori
);

-- =========================================
-- 2. AVAILABILITY (ShowUpToday)
-- =========================================
CREATE TABLE daily_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  target_date DATE NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT false,
  responded_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, target_date) -- O singură intrare pe zi per user
);

-- =========================================
-- 3. MATCHING & GROUPS
-- =========================================
CREATE TABLE match_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sport_id UUID REFERENCES sports(id) ON DELETE CASCADE,
  match_date DATE NOT NULL,
  status TEXT DEFAULT 'Matched', -- Pending, Matched, Completed
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES match_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_captain BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Joined', -- Joined, Confirmed, Declined
  UNIQUE(group_id, user_id)
);

-- =========================================
-- 4. EVENTS & VENUES
-- =========================================
CREATE TABLE venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  coordinates TEXT, -- Ex: "45.7489, 21.2087" (Timișoara)
  price_estimate NUMERIC DEFAULT 0
);

CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES match_groups(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  event_time TIMESTAMPTZ NOT NULL,
  is_manual_creation BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Confirmed'
);

-- =========================================
-- 5. CHAT & POLLS (Bonus Features)
-- =========================================
CREATE TABLE chat_threads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES match_groups(id) ON DELETE CASCADE UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID REFERENCES chat_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE polls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES match_groups(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE poll_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  proposed_time TIMESTAMPTZ NOT NULL
);

CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  option_id UUID REFERENCES poll_options(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  UNIQUE(option_id, user_id)
);

-- =========================================
-- 6. MOCK DATA (Hackathon Speed Boost)
-- =========================================
-- Inserăm automat sporturile de bază
INSERT INTO sports (name, min_players, max_players) VALUES 
  ('Football (5v5)', 10, 14),
  ('Tennis (Singles)', 2, 2),
  ('Tennis (Doubles)', 4, 4),
  ('Basketball (3v3)', 6, 8);

-- Inserăm 2 locații fictive (Coordonate UPT / Timișoara)
INSERT INTO venues (name, address, coordinates, price_estimate) VALUES 
  ('Baza Sportivă UPT 1', 'Bulevardul Vasile Pârvan 2', '45.7473, 21.2315', 150.00),
  ('Teren Sintetic Complex', 'Aleea FC Ripensia', '45.7441, 21.2401', 120.00);
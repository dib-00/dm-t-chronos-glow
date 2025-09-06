-- Insert services data if not exists
INSERT INTO services (id, title, description, features, icon, is_active, display_order) VALUES
('service-1', 'Screen & Glass Replacement', 'Professional screen repairs for phones and tablets with genuine parts and precision installation.', ARRAY['iPhone & Android', 'Same-day service', 'Warranty included'], 'DeviceMobile', true, 1),
('service-2', 'Battery & Charging Fixes', 'Battery replacement, charging port repair, and power management IC troubleshooting.', ARRAY['Original batteries', 'Charging diagnostics', 'Power optimization'], 'BatteryCharging', true, 2),
('service-3', 'Water Damage Recovery', 'Ultrasonic cleaning, corrosion removal, and complete motherboard restoration services.', ARRAY['Ultrasonic clean', 'Corrosion treatment', 'Data recovery'], 'Drop', true, 3),
('service-4', 'Motherboard & Micro-Soldering', 'Advanced IC-level repairs, BGA rework, and component-level troubleshooting.', ARRAY['BGA rework', 'IC replacement', 'Circuit repair'], 'Cpu', true, 4),
('service-5', 'Laptop Services', 'Complete laptop repair including SSD/RAM upgrades, keyboard replacement, and hinge fixes.', ARRAY['Hardware upgrades', 'Keyboard replacement', 'Thermal management'], 'Laptop', true, 5),
('service-6', 'Data Recovery & Backup', 'Professional data recovery from damaged phones, hard drives, and SSDs with secure handling.', ARRAY['Phone data recovery', 'HDD/SSD recovery', 'Secure backup'], 'HardDrive', true, 6),
('service-7', 'Diagnostics & Tune-ups', 'Comprehensive device diagnostics, performance optimization, and thermal management.', ARRAY['Performance testing', 'Thermal analysis', 'Software optimization'], 'GearSix', true, 7),
('service-8', 'Custom Requests', 'Specialized repairs and custom modifications. Get a personalized quote within 24 hours.', ARRAY['Custom solutions', '24h quote', 'Specialized repairs'], 'Question', true, 8)
ON CONFLICT (id) DO NOTHING;
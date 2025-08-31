-- Create profile for existing user
INSERT INTO public.profiles (user_id, email, role, display_name)
VALUES (
  'bda0111d-8321-44da-9be9-a0be9b5b2bb0',
  'sidomi998877@gmail.com',
  'admin',
  'sidomi998877@gmail.com'
)
ON CONFLICT (user_id) DO UPDATE SET
  role = 'admin',
  email = 'sidomi998877@gmail.com';
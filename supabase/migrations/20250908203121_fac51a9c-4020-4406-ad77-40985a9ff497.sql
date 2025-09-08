-- Add map-related fields to contact_info table
ALTER TABLE public.contact_info 
ADD COLUMN map_embed_url text,
ADD COLUMN map_coordinates text,
ADD COLUMN map_address text;
-- Insert test user
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '5ae7a8ed-9636-4abe-a25e-ac795e070285',
    'authenticated',
    'authenticated',
    'test@test.test',
    '$2a$10$a4iJeerLoDRDFi4ZfAVJ3uP1xYJG8ZMiQMVXl4CiXfXWJiWSvKjpu',
    '2023-12-15 00:09:04.571078+00',
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    NULL,
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    NULL,
    '2023-12-15 00:09:04.563458+00',
    '2023-12-15 00:09:04.571233+00',
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL,
    false,
    NULL
);

INSERT INTO auth.identities (
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at,
    id
) VALUES (
    '5ae7a8ed-9636-4abe-a25e-ac795e070285',
    '5ae7a8ed-9636-4abe-a25e-ac795e070285',
    '{"sub": "5ae7a8ed-9636-4abe-a25e-ac795e070285", "email": "test@test.test", "email_verified": false, "phone_verified": false}',
    'email',
    '2023-12-15 00:09:04.566504+00',
    '2023-12-15 00:09:04.566538+00',
    '2023-12-15 00:09:04.566538+00',
    'b37c8f70-e6d1-4be4-988e-7f70801d26fe'
);


-- Insert root-level comment with an explicit UUID
INSERT INTO public.sc_comments (id, topic, comment, user_id)
VALUES
    ('00000001-0000-0000-0000-000000000001', 'Single Topic', 'This is the main root comment for the Single Topic.', '5ae7a8ed-9636-4abe-a25e-ac795e070285'),
    ('00000001-0000-0000-0000-000000000003', 'Single Topic', 'another another comment', '5ae7a8ed-9636-4abe-a25e-ac795e070285'),
    ('00000001-0000-0000-0000-000000000002', 'Single Topic', 'another comment', '5ae7a8ed-9636-4abe-a25e-ac795e070285');

-- Insert first level of nested comments referencing the root comment UUID
INSERT INTO public.sc_comments (id, topic, comment, user_id, parent_id)
VALUES
    ('00000002-0000-0000-0000-000000000001', 'Single Topic', 'This is the first nested comment under the main root comment.', '5ae7a8ed-9636-4abe-a25e-ac795e070285', '00000001-0000-0000-0000-000000000001'),
    ('00000002-0000-0000-0000-000000000002', 'Single Topic', 'This is the second nested comment under the main root comment.', '5ae7a8ed-9636-4abe-a25e-ac795e070285', '00000001-0000-0000-0000-000000000001');

-- Insert second level of nested comments (nested within the first nested comment)
INSERT INTO public.sc_comments (id, topic, comment, user_id, parent_id)
VALUES
    ('00000003-0000-0000-0000-000000000001', 'Single Topic', 'This is a second-level nested comment under the first nested comment.', '5ae7a8ed-9636-4abe-a25e-ac795e070285', '00000002-0000-0000-0000-000000000001');

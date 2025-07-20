CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(50) NOT NULL,
  secret VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

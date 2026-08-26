# First-time Setup Fix

- The Business Admin `/setup` page no longer polls `/api/setup/status` on mount.
- It no longer redirects to `/login` after a short delay when the existing engine reports that an administrator is already configured.
- The setup form remains visible and submits only when the administrator explicitly chooses **Create administrator account**.
- The existing Render/Amaal engine remains authoritative for whether setup is actually permitted. No database schema, data, migrations, resets, or SQL were changed.
- The login page may still redirect to `/setup` when the engine reports that setup is required.
- Security-code UI remains removed from the Business Admin login.

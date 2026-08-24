# Administrator Recovery

Use `/recovery` only when normal administrator access is unavailable.

Set `ADMIN_RECOVERY_TOKEN` only in Render Environment. Never commit the token to GitHub.

Recovery is non-destructive to business data. It suspends existing administrator accounts, revokes authentication state, clears administrator security state, enables first-time setup, and allows the same email to be reclaimed during setup.

Confirmation phrase: `AMAAL-RESET`.

After recovery succeeds, return to `/` and create the first administrator.

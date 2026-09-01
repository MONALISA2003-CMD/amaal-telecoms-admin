# Phase 21 Continuation

The next execution environment should run `phase21-build-gate.sh` from the livefix directory using Node 24.x and network access.

If the build passes, run the root audits and authenticated Playwright staging smoke tests. If any test fails, fix the source, rerun the affected gate, and regenerate the Phase 21 ZIP.

Never use production for synthetic transaction tests. Use a disposable Neon development branch and delete it after verification.

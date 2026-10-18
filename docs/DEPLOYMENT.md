# Publishing pills.fun

Push changes to `main` to publish automatically. For the game, edit
`public/shuangchengji/index.html`; its URL is https://pills.fun/shuangchengji/.

Check progress in GitHub's **Actions > Deploy pills.fun**. A green run means the
server built and published the site, then checked the homepage, game contents,
and the game's `Cache-Control: no-cache` response. To retry without a new commit,
use **Run workflow** on `main`.

Deployment uses the restricted `web` account. The dedicated SSH key only accepts
`deploy-main <commit SHA>`; shell access, forwarding and PTY allocation are
disabled for that key. The private key is encrypted in the repository secret
`PILLS_DEPLOY_KEY`; the pinned SSH host key is in `PILLS_KNOWN_HOSTS`. Never commit
either private keys or `.env.local`.

The trusted server entry is `/mnt/workspace/pills.fun/home/.local/bin/github-deploy-entry`.
It calls `/mnt/workspace/pills.fun/home/.local/bin/deploy-main`, whose reviewed source is
`scripts/deploy-main.sh`. Updating that repository file alone does not replace
the installed server copy; install a reviewed update over an ordinary SSH login.

The script serializes deployments, fast-forwards the server's `main`, runs
`npm ci` when the dependency lock or runtime version changes, and publishes with
`/mnt/workspace/pills.fun/bin/deploy-site`. Failed builds leave the current site
in place; failed post-deploy checks restore the previous build. A queued run
whose commit has already been superseded is skipped.

Manual rollback (using your ordinary SSH key):

```sh
ssh web@pills.fun /mnt/workspace/pills.fun/bin/deploy-site --rollback
```

The server's Nginx configuration is separate from Git and retains the no-cache
rule for `/shuangchengji/`. Production is served from `site/dist`; do not run
`npm run build` directly there, or upload changes only into `dist`.

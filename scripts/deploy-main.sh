#!/usr/bin/env bash
# Installed as /mnt/workspace/pills.fun/home/.local/bin/deploy-main.
set -euo pipefail
export PATH=/usr/local/bin:/usr/bin:/bin
export GIT_TERMINAL_PROMPT=0
base=/mnt/workspace/pills.fun
site="$base/site"
requested=${1:-}
[[ $# == 1 && "$requested" =~ ^[0-9a-f]{40}$ ]] || { echo 'Expected one commit SHA' >&2; exit 2; }

mkdir -p "$base/home/.cache/pills-deploy"
exec 9>"$base/home/.cache/pills-deploy/lock"
flock -w 1500 9
cd "$site"
[[ "$(git branch --show-current)" == main ]] || { echo 'Server must be on main' >&2; exit 1; }
git diff --quiet HEAD -- || { echo 'Tracked server files have local changes; refusing deployment' >&2; exit 1; }
git fetch origin main
latest=$(git rev-parse origin/main)
if [[ "$requested" != "$latest" ]]; then
    echo "Skipped superseded run $requested; latest main is $latest"
    exit 0
fi
git merge --ff-only "$latest"
[[ "$(git rev-parse HEAD)" == "$requested" ]]

stamp="$base/home/.cache/pills-deploy/dependencies.sha256"
signature=$( { sha256sum package.json package-lock.json; node --version; npm --version; } | sha256sum | cut -d' ' -f1)
if [[ ! -d node_modules || ! -f "$stamp" || "$(cat "$stamp")" != "$signature" ]]; then
    npm ci --no-audit --no-fund
    printf '%s\n' "$signature" > "$stamp"
fi

"$base/bin/deploy-site"
check_dir=$(mktemp -d "$base/home/.cache/pills-deploy/check.XXXXXX")
trap 'rm -rf "$check_dir"' EXIT
verify() {
    [[ "$(cat dist/.deployed-commit)" == "$requested" ]] || return 1
    curl --fail --silent --show-error --retry 3 --max-time 30 https://pills.fun/ -o /dev/null || return 1
    game_source="$base/home/.local/share/friends-live/index.html"
    [[ -f "$game_source" ]] || game_source=public/shuangchengji/index.html
    if [[ -f "$game_source" ]]; then
        curl --fail --silent --show-error --retry 3 --max-time 30 \
            -D "$check_dir/headers" https://pills.fun/shuangchengji/ -o "$check_dir/game.html" || return 1
        cmp -s "$game_source" "$check_dir/game.html" || return 1
        tr -d '\r' < "$check_dir/headers" | grep -Eiq '^Cache-Control:.*no-cache' || return 1
    fi
}
if ! verify; then
    echo 'Post-deploy verification failed; restoring previous build' >&2
    "$base/bin/deploy-site" --rollback
    exit 1
fi
echo "Deployment verified: $requested"

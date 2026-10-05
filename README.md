# [docs.tscircuit.com](https://docs.tscircuit.com)

The [tscircuit](https://github.com/tscircuit/tscircuit) docs

## Refreshing image caches

The **Warm docs images** GitHub workflow runs daily at 05:31 UTC and can also
be started manually from Actions. It builds the docs, finds every image URL in
the rendered HTML (including inactive CircuitPreview tabs and responsive image
variants), deduplicates them, and downloads each image with four concurrent
requests. Relative image paths resolve against `https://docs.tscircuit.com/`.

Requests preserve the original URL and send `Pragma: no-cache` and
`Cache-Control: no-cache` so stale Vercel image entries refresh synchronously.
Successful images stay fresh in the image service's CDN for 12 hours; visitors
can receive stale images while the service refreshes them in the background.
The warmer retries transient failures, fails the job if any image cannot be
refreshed, and uploads a JSON report with URLs and their source pages.

To inspect or refresh the images locally:

```sh
bun install --frozen-lockfile
bun run build
bun run warm:images --dry-run
bun run warm:images
```

Use `--limit 10` for a small live run, or `--concurrency 2` to reduce load.
The inventory and refresh report are saved to `build/image-cache-report.json`.
Live runs also write `.json.ndjson` progress alongside the report, preserving
completed requests if a run is interrupted.
The workflow does not rewrite docs URLs; it also recognizes `svg2.tscircuit.com`
and `svg3.tscircuit.com` if images move to those hosts during a future migration.

CDN caches are regional and can evict entries. The daily job refreshes the cache
it reaches; it cannot guarantee a warm cache in every region. A Cloudflare
service backed by durable image storage would address that separately.

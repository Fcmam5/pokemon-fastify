# Nginx sidecar

This is a simple definition of an NGINX sidecar for pokemon-app pods. It is expected to apply HTTP requests logging, SSL Termination ...

## Development

This image proxies all requests from `:80/api` to `:3000/`.

```bash

# Build the image
docker build . -t fcmam5/poke-sidecar:1.20.2-alpine-perl:v1.1.0

# Test it locally
docker run -p 8080:8080 fcmam5/poke-sidecar:1.20.2-alpine-perl

# Push
docker push fcmam5/poke-sidecar:1.20.2-alpine-perl
```
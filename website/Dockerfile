FROM nginxinc/nginx-unprivileged:1.27-alpine

LABEL org.opencontainers.image.title="akosp.app" \
      org.opencontainers.image.description="Personal website of Akos Papp" \
      org.opencontainers.image.source="https://github.com/AkosPapp/AkosPapp"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1

EXPOSE 8080

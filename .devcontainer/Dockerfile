FROM node:22-bookworm
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 ffmpeg chromium git-lfs gh ca-certificates openssh-client \
    && rm -rf /var/lib/apt/lists/*
ENV CHROME_PATH=/usr/bin/chromium
USER node

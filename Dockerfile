FROM denoland/deno:2.2.3
RUN apt-get -y update && apt-get -y upgrade && apt-get install -y --no-install-recommends ffmpeg
USER deno
WORKDIR /app
COPY deno.* /app/
COPY src/ /app/src/
EXPOSE $PORT
CMD ["deno", "run", "start"]

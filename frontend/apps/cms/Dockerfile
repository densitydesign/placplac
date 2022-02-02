
FROM node:16 as builder
ARG NODE_ENV
WORKDIR /app/builder
COPY . .
RUN npm ci
RUN npx nx build cms --prod


FROM nginx:stable
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/builder/dist/apps/cms ./

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/builder/apps/cms/nginx.conf /etc/nginx/conf.d
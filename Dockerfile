# First stage, build the frontend
FROM node:12.18.3

RUN npm config set registry https://registry.npm.taobao.org

ENV FRONTEND=/opt/frontend

WORKDIR $FRONTEND

COPY frontend/ $FRONTEND
RUN npm install
RUN npm run build

# Second stage for the backend
FROM python:3.8.5

ENV HOME=/opt/app

WORKDIR $HOME

COPY requirements.txt $HOME
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

COPY . $HOME

# Copy frontend from the first stage
FROM nginx:1.18.0

ENV HOME=/opt/app
WORKDIR $HOME

COPY --from=0 /opt/frontend/dist dist
COPY nginx/ nginx/

RUN rm -r /rtc/nginx/conf.d \
 && ln -s $HOME/nginx /etc/nginx/conf.d

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
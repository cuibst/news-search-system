# 新闻搜索系统

这里是软件工程 `rzotgorz` 组的新闻搜索系统项目

在开始开发前请保证：
```
python >= 3.7
django >= 3.0
@vue/cli >= 4.0
npm >= 6.13
```

如果还没有安装vue脚手架，请在控制台中执行以下命令：
```
npm install -g @vue/cli
```

执行程序时，请使用如下命令：

控制台1：` vue ui `，并在打开的网页中导入frontend中的项目

如果希望运行前端服务器，请在网页中选择`任务`,再选择`serve`，点击运行，即可在8080端口运行前端服务器了

控制台2: ` python manage.py runserver 8001 `，使得后端服务器在8001端口上运行

clone时，请先在gitlab中配置好自己的sshkey，然后使用以下命令将项目clone到本地：
```
git clone git@gitlab.secoder.net:rzotgorz/news-search-system.git
```

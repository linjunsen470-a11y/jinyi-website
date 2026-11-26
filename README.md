# 锦奕官网

广州锦奕咨询服务有限公司的公开网站，正式域名为 `jinyifangchan.com`。首页与业务介绍、公司介绍、联系方式、咨询指南和隐私说明均为静态页面。小程序、Payload 员工后台和 API 在 [zhaoshang](https://github.com/linjunsen470-a11y/zhaoshang)。

## 编辑与预览

网页和图片在 `public/`。首页样式在 `public/css/home.css`，五个内页共用 `public/css/style.css`。修改内页共享样式后，运行 `node scripts/sync-inline-css.mjs` 同步页面内联样式。

在仓库根目录执行以下命令进行检查和预览，然后打开 `http://localhost:8080/`。

```sh
node scripts/sync-inline-css.mjs --check
node --test tests/site.test.mjs
python3 -m http.server 8080 --bind 127.0.0.1 --directory public
```

## EdgeOne Pages

在腾讯云 EdgeOne Pages 中选择「导入 Git 仓库」，连接本仓库，生产分支选 `main`，项目根目录用仓库根目录，框架选静态站点。提交到生产分支后由平台自动发布。`edgeone.json` 定义构建检查、输出目录 `public` 以及 `/index.html` 到 `/` 的跳转。构建只需 Node.js，部署环境变量可留空。[腾讯云配置说明](https://edgeone.cloud.tencent.com/pages/document/162936771610066944)

首次部署后，用 Pages 预览地址检查六个页面、首页照片、微信搜索名称复制和页脚两个备案链接。在项目中绑定 `jinyifangchan.com`，按控制台给出的记录设置 DNS。解析生效后，用正式域名复核 HTTPS、页面和静态资源。原 VPS 官网已于 2026-11-26 下线。小程序 API 和员工后台继续使用 `api.cqwushi.com`。

官网首页和五个内页源自 [zhaoshang 的拆分前版本](https://github.com/linjunsen470-a11y/zhaoshang/tree/50e961d0c95dd0f728c798bd4378d3334c1a82ef)。

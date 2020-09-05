# bmc

> Baikal Mining Company

## Build Setup

```bash
# Установка зависимостей
$ npm install
```
```
# Запуск dev сборки с модулем hot reload по порту localhost:3000
$ npm run dev
```

```
# Команды сборки и запуска сервера на production
$ npm run build
$ npm run start
```
```bash
# /srv/git/repos/bmc.git/hooks/post-update
if [ "$branch" == "master" ]; then
        git --work-tree=$projectDir --git-dir=$projectDir/.git pull origin master &&
        echo "========= START INSTALL ==========" &&
        npm --prefix $projectDir install &&
        echo "========= START BULIDING PRODUCTION =========" &&
        npm --prefix $projectDir run build &&
        #echo "========= PM2 bmc-website reload ==========="
        #pm2 reload 0
        echo "========= BMC Nuxt successfully updated! ========="
fi
```

## Просмотр и запуск pm2 для nuxt.js
  О том, что такое [pm2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)  
`pm2` запускается автоматически при старте системы (`pm2 startup`)  
В папке проекта: `/srv/git/projects/bmc` расположен файл `ecosystem.config.js`  

```
# Посмотреть список запущенных процессов pm2 (выполнять из-под sudo -ugit)
pm2 list

root@v:/srv/git/projects/bmc# sudo -ugit pm2 list
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ bmc-website        │ fork     │ 48   │ online    │ 0%       │ 51.1mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘

# Команда для автозапуска (выполнять из-под sudo -ugit)
sudo -ugit pm2 start ecosystem.config.js --only bmc-website

# Дополнительные команды (выполнять из-под sudo -ugit)
pm2 restart app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name
pm2 logs --line 200 //Посмотр логов. --line и количество строк. (ctrl+c для выхода)

# Крайний случай. Команды для просмотра уже запущенных процессов системы. Возвразает PID процесса
pgrep -f nuxt // запущен ли nuxt
pgrep -f npm // запущен ли npm
# Чтобы убрать процесс, введите команду
kill -9 <PID>
```

### файл
```javascript
module.exports = {
  apps : [{
    name: 'bmc-website',
    script: 'npm',
    args: 'run start'
  }]
}
```


```
# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

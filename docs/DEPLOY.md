## Deploy

```
cd releases
wget https://github.com/pipan/log-outsourced-ui/releases/download/<version>/outsourced-<version>.zip
unzip outsourced-<version>.zip -d <release_number>
rm outsourced-<version>.zip
cd ../public
ln -sfn ../releases/<release_number> current
```
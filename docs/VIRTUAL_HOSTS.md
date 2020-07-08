# Virtual hosts

This is an example of standard virtual host for this outsourced log application.

## Apache

```
<VirtualHost *:80>
    DocumentRoot "/path/to/your/root/public/current"
    ServerName <your_domain>
    ServerAlias <subdomain>.<your_domain>

    Alias "/config.json" "/path/to/your/root/public/config.json"
    Alias "/.well-known" "/path/to/your/root/public/.well-known"

    <Directory "/path/to/your/root/public/current">
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteRule ^ index.html [L]
        </IfModule>

        <filesMatch ".(ico|jpg|jpeg|png|svg|gif|js|css|ttf|woff)$">
            Header set Cache-Control "max-age=62208000, public"
        </filesMatch>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Enable new virtual host `sudo a2ensite <subdomain>.<your_domain>` and restart apache `sudo service apache2 restart`.

## Nginx

```
server {
    listen 80;
    listen [::]:80;

    gzip on;
    gzip_vary on;
    gzip_types text/plain application/javascript application/font-woff text/css application/json application/octet-stream;

    root /path/to/outsourced/log/installation/folder/public;

    index current/index.php;
    server_name <subdomain>.<your_domain>;

    location ~* \.(?:ico|jpg|jpeg|gif|png|svg|js|css|ttf|woff)$ {
        expires 720d;
        add_header Pragma public;
        add_header Cache-Control "public";
        try_files $uri /current/$uri =404;
    }

    location / {
        try_files $uri /current/$uri /current/index.html;
    }

    # SSL
    # listen 443 ssl;
    # ssl_certificate /etc/letsencrypt/live/<subdomain>.<your_domain>/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/<subdomain>.<your_domain>/privkey.pem;
    # include /etc/letsencrypt/options-ssl-nginx.conf;

    # if ($scheme != "https") {
        # return 301 https://$host$request_uri;
    # }
}
```

Enable new virtual host `ln -s /etc/nginx/sites-available/<subdomain>.<your_domain> /etc/nginx/sites-enabled/<subdomain>.<your_domain>` and restart apache `sudo service nginx restart`.
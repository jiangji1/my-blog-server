# my-blog-server
个人博客后端

还在研究nginx代理网络接口请求到node，目前还没搞定。之后会把建站nginx配置加入

nginx配置  下面就是我服务器nginx配置了
需要更改注意的地方，我会标记上  #看这里看这里（共3个地方）
-------------------------------------------------------------
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;
    # 看这里看这里 以下3行是新加的，node后台启动用的是8088端口所以下面是8088端口
    upstream blognode {
      server 127.0.0.1:8088;
    }
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  www.jiangji1.com;
        root         /usr/share/nginx/web/dabao;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        # 看这里看这里    域名后跟着/api把服务转接到blognode
        # blognode在上面有，就是把服务转接到了8088端口
         location /api {
                proxy_pass http://blognode;
                root /;
                index index.html;
        }
        # 看这里看这里 域名后跟着/api，也把服务转接到blognode，
        # 图片链接是http://www.jiangji1.com/static/xxxxxx
        location /static {
                proxy_pass http://blognode;
                root /;
                autoindex on;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
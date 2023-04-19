# 环境配置

## centos7搭建环境

### docker配置

#### 1.安装docker

```shell
yum install docker -y
```

#### 2.启动和关闭Docker

```shell
service docker start
service docker stop
```

#### 3.查看docker镜像列表

 ```shell
 docker images
 ```

#### 4.查看正在运行的容器

```shell
docker ps/docker ps -a
```

#### 5.操作容器

```shell
docker start 容器id/容器name          # 启动容器
docker restart 容器id/容器name        # 重启容器
docker stop 容器id/容器name           # 停止当前运行的容器
docker kill 容器id/容器name           # 强制停止当前容器


docker exec -it 容器名称 bash         # 进入docker容器中
Ctrl+P+Q #快捷键，仅退出容器，不关闭容器
```



#### 6.移除镜像

```shell
docker rmi 镜像名字
```

#### 7.移除容器

```shell
docker rm -f 容器名
```

### docker安装MySQL

### 1.拉取镜像

 ```shell
 docker run \
 --name mysql \
 -d \
 -p 3306:3306 \
 --restart unless-stopped \
 -v /mydata/mysql/log:/var/log/mysql \
 -v /mydata/mysql/data:/var/lib/mysql \
 -v /mydata/mysql/conf:/etc/mysql \     
 -e MYSQL_ROOT_PASSWORD=123456 \
 mysql:8.0.23
 ```

#### 2.在CentOS中使用docker创建桥接网络，将docker的容器链接到桥接网络中，并做好端口映射，这样主机就可以链接到docker中容器的服务（这里以创建4个MySQL容器为例子）

 ```shell
 # 编辑 Docker Daemon 的配置文件 /etc/docker/daemon.json，添加bip：
 vi /etc/docker/daemon.json
 {
     "bip": "172.16.0.1/16"
 }
 
 # 启用主机的 IP 转发功能
 sysctl -w net.ipv4.ip_forward=1
 
 # 重启 Docker Daemon
 systemctl restart docker
 
 # 创建桥接网络mybridge
 docker network create --driver bridge mybridge
 
 # 若容器不存在，则创建运行容器并配置端口映射以及ip
 docker run -it -d --name mysql1 -p 12001:3306 \ # 端口映射
 --net mybridge --ip 172.18.0.2 \          # 连接到mybridge，ip映射
 -m 400m -v /root/mysql1/data:/var/lib/mysql \ # 数据文件映射
 -v /root/mysql1/config:/etc/mysql/conf.d \  # 配置文件映射
 -e MYSQL_ROOT_PASSWORD=123456 \
 -e TZ=Asia/Shanghai --privileged=true \
 --dns 8.8.8.8
 mysql:8.0.23 \
 --lower_case_table_names=1
 
 docker run -it -d --name mysql2 -p 12002:3306 \
 --net mybridge --ip 172.18.0.3 \
 -m 400m -v /root/mysql2/data:/var/lib/mysql \
 -v /root/mysql2/config:/etc/mysql/conf.d \
 -e MYSQL_ROOT_PASSWORD=123456 \
 -e TZ=Asia/Shanghai --privileged=true \
 --dns 8.8.8.8 \
 mysql:8.0.23 \
 --lower_case_table_names=1
 
 docker run -it -d --name mysql3 -p 12003:3306 \
 --net mybridge --ip 172.18.0.4 \
 -m 400m -v /root/mysql3/data:/var/lib/mysql \
 -v /root/mysql3/config:/etc/mysql/conf.d \
 -e MYSQL_ROOT_PASSWORD=123456 \
 -e TZ=Asia/Shanghai --privileged=true \
 mysql:8.0.23 \
 --lower_case_table_names=1
 
 docker run -it -d --name mysql4 -p 12004:3306 \
 --net mybridge --ip 172.18.0.5 \
 -m 400m -v /root/mysql4/data:/var/lib/mysql \
 -v /root/mysql4/config:/etc/mysql/conf.d \
 -e MYSQL_ROOT_PASSWORD=123456 \
 -e TZ=Asia/Shanghai --privileged=true \
 mysql:8.0.23 \
 --lower_case_table_names=1
 
 docker run -it -d --name mysql5 -p 12005:3306 \
 --net my-bridge-network --ip 172.17.0.6 \
 -m 400m -v /root/mysql2/data:/var/lib/mysql \
 -v /root/mysql2/config:/etc/mysql/conf.d \
 -e MYSQL_ROOT_PASSWORD=123456 \
 -e TZ=Asia/Shanghai --privileged=true \
 mysql \
 --lower_case_table_names=1
 
 
 # 若容器已存在,可以执行以下命令直接连接到自己的桥接网络
 docker network connect mybridge mysql1
 docker network connect mybridge mysql2
 docker network connect mybridge mysql3
 docker network connect mybridge mysql4
 
 # 查看容器的ip地址
 docker inspect 容器名字
 
 # 做端口映射
 docker container update -p 3306:12001 mysql1
 docker container update -p 3306:12002 mysql2
 docker container update -p 3306:12003 mysql3
 docker container update -p 3306:12004 mysql4
 
 # 如何远程访问
 ip: http://<远程服务器地址> ：映射的端口号
 ```

### docker为容器固定ip

 ```shell
 docker network create --subnet=172.18.0.0/16 mybridge
 // 默认172.18.0.1为网关地址
 ```

## mysql权限配置

```mysql
mysql -uroot -p123456
use mysql;
select host, user from user;查看root用户
    判断root是否存在一个，如果有两个先删除delete from user where host="%" and user="root";        
    再修改 update user set host = '%' where user = 'root';
    刷新权限 FLUSH PRIVILEGES;    
    授予远程权限 alter user 'root'@'%' identified with mysql_native_password by '123456';
```

## 配置sharding

```shell
1.将jdk上转至contos7

docker run -it -d --name ss -p 3307:3307 \
--net my-bridge-network --ip 172.17.0.10 \
-m 400m -v /root/ss:/root/ss \
-e TZ=Asia/Shanghai --privileged=true \
--dns=8.8.8.8 \
apache/shardingsphere-proxy


```

```shell

```


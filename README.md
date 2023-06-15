# 正常业务请使用 2.x 版本，4.X 系列为适配 SSR 的版本，无必要请勿升级到 4.x

# 3.x 版本为 Arise 使用

## 项目运行

```
tnpm install -g yarn

yarn install

yarn start
```

## Design

https://done.alibaba-inc.com/detail/project/lazada_ds/ipJf3aNk2TrS/file?categoryId=4lTZyYML1F0B

## Release tnpm package

```
yarn publish

```

#### Merge to Master, Create new version in Def Platform or just Run below commands(https://yuque.antfin-inc.com/def/def/publish-tnpm-run)

```
tnpm i -g @ali/def-pub-client

// 发布预发
dps -d

// 发布线上
dps -o
```

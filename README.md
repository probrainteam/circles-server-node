# circles-server-node [![Push in feature branches](https://github.com/probrainteam/circles-server-node/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/probrainteam/circles-server-node/actions/workflows/push.yml)

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white"/> <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/aws-232F3E?style=flat-square&logo=Amazonaws&logoColor=white"/>

| <a id="a1"></a>목차          |
| --------------------------- |
| [1. 프로젝트 개요](#1)<br/>    |
| [2. Development setting ](#2)<br/>       |
| [3. Trouble shooting ](#3)<br/>       |


<br/>

# <a id="1"></a>[1](#a1). 프로젝트 개요

# <a id="2"></a>[2](#a1). Development setting
## 필요사항
- yarn
- docker
- node
- vscode
  - eslint 확장
  - prettier 확장

## 세팅 방법
- Mac/linux

  👉 with docker
    - `yarn docker`
- Windows

  👉 with docker
    - `yarn docker`
 
# <a id="3"></a>[3](#a1). Trouble shooting
## Docker
docker container 내부 로그에서 inode 저장공간 관련 오류가 나는 경우 아래 명령어를 차래로 입력합니다.
``` shell
docker system prune
```
``` shell
docker volume prune
```
``` shell
docker volume ls
```
``` shell
docker system df
``` 

# circles-server-node [![Push in feature branches](https://github.com/probrainteam/circles-server-node/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/probrainteam/circles-server-node/actions/workflows/push.yml) [![Dev test with Docker and Jest](https://github.com/probrainteam/circles-server-node/actions/workflows/pull-request.yml/badge.svg)](https://github.com/probrainteam/circles-server-node/actions/workflows/pull-request.yml)

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
- yarn :: v1.22.17
- docker :: v20.10.12, build e91ed57
- vscode
  - [eslint :: v2.2.2](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [prettier :: v9.3.0](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [NGINX Confituation :: v0.7.2](https://marketplace.visualstudio.com/items?itemName=william-voyek.vscode-nginx)

## 세팅 방법
- Mac/linux/Windows

  👉 with docker
    - `yarn dev`
 
# <a id="3"></a>[3](#a1). Trouble shooting
## Docker
docker container 내부 로그에서 inode 저장공간 관련 오류가 나는 경우 아래 명령어를 차래로 입력하여 강제로 저장공간을 확보합니다.
- 이 때 docker container를 모두 삭제한 후 진행합니다.

  <img src=".github/img/docker-remove-containers.png" width="700"/>
``` shell
docker system prune
```
``` shell
docker volume prune
```
이 후 아래 명령어를 통해 정상적으로 삭제 되었는지 확인합니다.
``` shell
docker volume ls
```
``` shell
docker system df
``` 
- :bug: docker가 뻗은 경우 Quit Docker Desktop을 통해 docker를 강제 종료합니다.

  <img src=".github/img/docker-quit-force.png" width="280"/>
## NGINX 502
🌋 Node docker가 준비되지 않은 경우 NGINX 502가 발생합니다.
- 일정 시간 이 후 재시도하면 됩니다.
- Error page 제작 또는 docker depends on 설정을 통해 fix 예정

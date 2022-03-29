# circles-server-node

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)


| <a id="a1"></a>목차         |
| --------------------------- |
| [1. 프로젝트 init](#1)<br/> |
| [2. 브랜치 ](#2)<br/>       |

<br/>

# <a id="1"></a>[1](#a1). 프로젝트 init

> ---
>
> # docker
>
> - docker가 없다면 docker 설치 후 진행해주세요
>   - mac :: brew install docker
>
> # poetry
> - poetry가 없다면 poetry 설치 후 진행해주세요
>   - mac :: brew install poetry
>   - linux, wsl :: curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
> # local 세팅
>
>       git clone ${주소} && poetry install
>
> # 서버 구동
>
> ## build.sh main
>
> - 배포 서버를 위한 구동
> - Azure, domain setting으로 서버가 구동됩니다 ( 추후 구현 )
>
> ## build.sh dev
>
> - 로컬 개발 서버를 위한 구동
> - localhost db, domain setting으로 서버가 구동됩니다.
>
> ---

# <a id="2"></a>[2](#a1). 브랜치
> - main : release 
>   - hotfix
> - develop : feature / patch 
>   - feature
>   - patch
# <a id="3"></a>[3](#a1). 주의사항

# <a id="3"></a>[4](#a1). Trouble shooting

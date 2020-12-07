# 다나와 캡스톤 디자인 프로젝트

## 진행상황 엿보기! 
> [위키](https://github.com/Leeharin115/dnw2020/wiki/1.-%ED%99%9C%EB%8F%99-%EB%82%B4%EC%97%AD)

## 2020.11.01 


간단하게 사용하기로한 예제를 가져와서 코딩해보았음 Post 부분은 기능 소개로 활용하기로 하였기에 비슷하게 수정하였고 원래 로고를 넣기로 했던 부분이 포스트 용도로 사용하는 것이기에 날씨를 넣기로 한 부분에 위화감이 들어 다나와의 로고를 사용하여 다른 용도로 활용하였습니다. (Danawa 폴더)


### 그외 메인페이지 기능
 
>그 외 스크롤 구현은 시도해 보았으나 추가하지는 못했습니다. 별첨으로 스크롤이  되는 예제를 같이 첨부합니다. (Danawa-ex 폴더) 

## 2020.11.03
post 부분 안바뀐 내용 부분 간단히 수정, 제일 위에 메뉴를 누르면 부드럽게 원하는 페이지로 내려가는 기능 구현.<br>
로그인 페이지 추가(기능 구현 필요함!!!), 로고 배경투명색으로 변경함

> 오른쪽 상단 메뉴를 누르면 메뉴가 나오는데 메인 화면에서의 이동 말고 기능을 구현한 페이지로 이동하는 것이 더 괜찮을 것 같아서 스크롤 기능 넣지 않았습니다!


## 2020.11.05

익스프레스 서버를 구축하고 디자인이 완성된 페이지들을 연결하는 작업을 완료하였습니다. 라우터를 사용하였고 에러창과 미들웨어 등을 추가하였습니다.  
몽고DB를 세팅하고 진행중인 익스프레스 서버에 성공적으로 연결작업 성공하였습니다.
<br><br>회원가입과 옷장 페이지 추가 구현 - 기능구현필요

> 링크로 된 버튼을 눌렀을 때 다른 페이지로 넘어가는 기능을 구현하고자 했으나 error.html로 넘어가는 현상에<br>
  대해 수정하도록 노력하였으나 실패하여 추후 재시도 예정입니다.(해결)<br><br>
> 스키마 구성이 끝나는대로 로그인과 회원가입에 대한 기능구현을 예정중입니다.

## 2020.11.13

로그인과 회원가입 기능을 구현하였습니다. 회원가입때 입력한 정보가 몽고DB로 들어갈 수 있도록 코딩하였고 비크립트를 사용하여 비밀번호 암호화 해주었습니다.
로그인시 아이디가 없는 경우나 비밀번호가 올바르지 않을경우 다시 로그인 페이지로 넘어가며 회원가입후에도 로그인 페이지로 넘어갈 수 있도록 하였습니다.

> 로그인시 인덱시(메인페이지)로 넘어가도록 설정하였으나 메인페이지에서 로그인버튼이 그대로 나타나 있는 버그를 발견하였습니다.<br> 향후 로그아웃 버튼 및 권한설정에 관한 
작업이 필요합니다.<br><br>
> 사용자 로그인 정보를 Email이 아닌 id로 처리해주었기 때문에 중복확인에 대한 기능이 들어가있지 않습니다. 향후 추가할 예정입니다.


## 2020.11.17

코디룩을 위한 게시판 기능을 구현해보았습니다. 부분적인 내용을 추가하고 삭제하고 수정하기 위해 좋은 방법을 찾아보다가 처음 접해보지만 참고할 예시가 많았던 ejs를 사용해봤습니다.
bindex 페이지를 통해 글 확인+ 댓글 기능이 들어있는 board페이지, 글쓰기를 진행할 수 있는 write 페이지, 그리고 수정기능을 할 수 있는 update페이지로 이동할 수 있습니다.

> 데이터 베이스와 익스프레스등의 연결부분의 수정이 필요합니다. (write 부분은 완료)
> 연결이 끝나면 디자인도 손봐야합니다.
> html과 ejs를 같이 사용해서 그런지 ejs의 구현이 제대로 이루어지지 않았습니다. -> ejs로 아예 변경

## 2020.11.21

index 페이지에 날씨API를 사용하여 날씨를 확인하기가 가능해졌습니다. 게시판 부분 디자인을 수정했습니다. 옷장 구현 기능 중 필요한 사진이 누락되어 새로 추가했습니다.
search 페이지 연결했습니다. (기능 구현 필요)

> 게시판 부분-> 데이터베이스 연결 완료, bindex 화면에 작성했던 글 내용이 보이게 해야합니다.

## 2020.12.04

코디 작성 페이지 중 부위 설정에 필요한 사진을 포토샵해서 추가하고 배치 완료 했습니다.
옷장 페이지의 아이템 추가 기능 구현 및 mongoDB 연결 완료.

> 아이템 추가 기능 중 이미지 파일을 mongoDB에 연결하지 못해서 추가로 손봐야합니다.
> 그 후 각 카테고리 버튼 누르면 아이템 리스트가 나오는 팝업창의 구현이 필요합니다. (-> 코디하기의 부위설정도 비슷하게 구현해야합니다.)
> 리스트에서 아이템을 누르면 설명 나오는 팝업창도 구현하면 좋을 듯 합니다.

## 2020.12.07

몽고 DB에 있는 게시판 정보를 bindex.ejs로 불러오는 것에 성공하였습니다.
다만 ejs의 render가 제대로 working 하지 않습니다. 같이 해결 부탁드립니다.

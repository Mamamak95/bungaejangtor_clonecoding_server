# 번개장터 클론코딩
### 클라이언트 https://github.com/Mamamak95/bungaejangtor_clonecoding
### 서버 https://github.com/Mamamak95/bungaejangtor_clonecoding_server

클라이언트는 리액트를 사용했고 react-router를 통해 SPA 방식으로 구성했습니다.

그리고 axios와 socket.io-client 라이브러리를 사용하여 서버와 통신합니다.



서버는 Node.js와 Express.js를 메인으로 사용했고 채팅을 위한 실시간 통신은 socket.io를 사용했습니다. 

MVC 패턴으로 유지 보수가 용이하도록 구성했습니다.

![main](https://github.com/Mamamak95/bungaejangtor_clonecoding_server/assets/79183851/7c427adc-273d-4eed-bf80-26ebf54f5e44)


## 내용

중고거래를 위한 온라인 커뮤니티 사이트 '번개장터' 클론코딩



'번개장터'는 사용자가 자유롭게 중고물품을 사고팔 수 있는 사이트입니다.

사용자는 자신이 팔 물품을 등록하고 구매자와의 협의를 거쳐 최종적으로 물건을 판매하기까지 한 곳에서 가능합니다.

프로젝트에서는 '번개장터'의 메인 서비스인 중고 거래를 위한 기능들을 위주로 구현하였습니다.

주요 기능 :

회원가입 및 로그인 : 각종 유효성 검사와 함께 bcript로 암호화 해서 DB에 저장합니다.

판매등록 : multer 라이브러리를 이용해 서버에 이미지 파일과 함께 상품 정보를 등록할 수 있고, 로컬 스토리지를 통한 임시저장과 수정 기능이 있습니다.

실시간 채팅 : socket.io 라이브러리를 이용해 양방향 통신으로 실시간 채팅을 구현하였습니다. 

상품 진열 : 상품 테이블에 저장된 상품의 목록들을 쿼리문을 통해 페이지별로 불러옵니다.

검색 : 검색어에 해당하는 품목을 쿼리문을 통해 상품 테이블에서 불러옵니다.

리뷰 : 구매한 제품에 대한 리뷰를 평점과 함께 작성합니다.

개인상점 프로필 : 사용자에 대한 정보를 표시합니다. 평점, 판매상품 내역등을 표시합니다.

찜 : 사용자가 관심 있는 상품을 찜을 통해 북마크를 할 수 있고 찜 목록에서 확인할 수 있습니다.

상품 관리 : 등록한 상품을 삭제하거나 판매 완료로 상품 정보를 업데이트하거나 내용을 수정할 수 있습니다.


## 참여자
조장: 호준영 <https://github.com/Mamamak95>

조원: 음정태 <https://github.com/Eumjeongtae>

조원: 양근영 <https://github.com/ygy93>

조원: 이세영 <https://github.com/2se0>

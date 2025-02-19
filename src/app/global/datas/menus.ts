export const menus = {
  bank: [
    { code: 'accountlist', name: '계좌 목록 조회', url: '/bank/account/list' },
    {
      code: 'transactionlist',
      name: '거래내역 목록 조회',
      url: '/bank/transaction/list',
    },
    {
      code: 'transactionloan',
      name: '대출 추천',
      url: '/bank/transaction/loan',
    },
  ],

  card: [
    { code: 'cardlist', name: '카드 목록 조회', url: '/card/list' },
    { code: 'recommendlist', name: '추천 카드', url: '/card/recommend/list' },
    { code: 'usercardlist', name: '사용자 카드 목록', url: '/card/user/list' },
  ],
  loan: [
    { code: 'loanlist', name: '대출 목록 조회', url: '/loan/list' },
    { code: 'recommendlist', name: '대출 추천', url: '/loan/recommend/list' },
    { code: 'userloanlist', name: '사용자 대출 목록', url: '/loan/user/list' },
  ],
  board: [
    { code: 'boardlist', name: '게시판 목록 조회', url: '/board/list' },
    { code: 'boardwrite', name: '게시판 작성', url: '/board/write/{bid}' },
    { code: 'boardedit', name: '게시판 수정', url: '/board/edit/{seq}' },
  ],
}

export default function getMenus(menuCode) {
  return menus[menuCode] ?? []
}

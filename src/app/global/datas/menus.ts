export const menus = {
    bank: [
        { code: 'accountlist', name: '계좌 목록 조회', url: '/bank/account/list' },
        { code: 'transactionlist', name: '거래내역 목록 조회', url: '/bank/transaction/list' },
        { code: 'transactionloan', name: '대출 추천', url: '/bank/transaction/loan' },
    ]
}

export default function getMenus(menuCode) {
    return menus[menuCode] ?? []
  }
  
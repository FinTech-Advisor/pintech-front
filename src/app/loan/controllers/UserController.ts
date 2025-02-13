// 대출 정보 인터페이스 정의
interface LoanDetail {
  loanId: number
  amount: number
  status: string
  createdAt: string
}

export class UserController {
  // 유저 대출 생성 (일괄 등록)
  static async createLoans(reqBody: {
    userId: number
    loanDetails: LoanDetail[]
  }) {
    const { userId, loanDetails } = reqBody

    // DB 저장 로직 (가정)
    console.log(`User ${userId}의 대출 정보 등록:`, loanDetails)

    // 실제 DB 작업이 필요하면 여기에 삽입
    return {
      message: '대출 정보가 성공적으로 등록되었습니다.',
      userId,
      loanDetails,
    }
  }

  // 유저 대출 목록 수정 (SetDeletedAt 처리)
  static async updateLoans(reqBody: {
    userId: number
    loanDetails: LoanDetail[]
  }) {
    const { userId, loanDetails } = reqBody

    // DB에서 데이터 삭제 대신 SetDeletedAt 처리 (가정)
    console.log(
      `User ${userId}의 대출 정보 삭제 처리 (SetDeletedAt 적용):`,
      loanDetails,
    )

    // 실제 DB 업데이트 작업이 필요하면 여기에 삽입
    return {
      message: '대출 정보가 성공적으로 수정되었습니다.',
      userId,
      loanDetails,
    }
  }
}

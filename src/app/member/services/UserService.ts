// src/app/member/services/UserService.ts
export class UserService {
  // 회원 존재 여부 체크
  static async checkUserExists(email: string): Promise<boolean> {
    // 실제 DB 로직을 여기에 추가 (예: Prisma, TypeORM, Sequelize 등 사용 가능)
    console.log(`Checking if user exists: ${email}`)

    // 예제: DB에서 이메일 조회 (실제 DB 연결 필요)
    const user = await fakeDB.find((user) => user.email === email)
    return !!user
  }

  // 회원 단일 조회 (seq, email)
  static async getUserInfo(email: string) {
    // 실제 DB 로직을 여기에 추가
    console.log(`Fetching user info for: ${email}`)

    // 예제: DB에서 해당 이메일의 유저 정보 가져오기
    const user = await fakeDB.find((user) => user.email === email)
    return user || null
  }
}

// 가짜 DB 데이터 (예제용)
const fakeDB = [
  { seq: 1, email: 'test@example.com', name: '테스트 유저' },
  { seq: 2, email: 'user@example.com', name: '사용자 유저' },
]

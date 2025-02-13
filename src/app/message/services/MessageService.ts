// src/app/member/services/MessageService.ts
export class MessageService {
  // 미열람 쪽지 개수 확인
  static async getUnreadMessagesCount(): Promise<number> {
    try {
      const response = await fetch('/api/count', { method: 'GET' })
      const data = await response.json()

      if (response.ok) {
        return data.unreadCount
      } else {
        throw new Error(data.message || '알 수 없는 오류')
      }
    } catch (error) {
      console.error('미열람 쪽지 개수 조회 중 오류 발생:', error)
      throw new Error('미열람 쪽지 개수 조회 중 오류 발생')
    }
  }
}

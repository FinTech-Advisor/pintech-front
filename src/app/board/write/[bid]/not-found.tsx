import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>없는 게시판입니다.</h2>
      <Link href="/">Return Home</Link>
    </div>
  )
}

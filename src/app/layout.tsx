import StyledComponentsRegistry from './registry'
import Header from './global/ui/outlines/Header'
import Footer from './global/ui/outlines/Footer'
import { CommonProvider } from './global/contexts/CommonContext'
import { Metadata } from 'next'
import 'react-datepicker/dist/react-datepicker.css'
import './globals.css'

export const metadata: Metadata = {
  title: '핀테크 프로젝트',
  description: '게시판 댓글 메시지',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <CommonProvider>
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </CommonProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

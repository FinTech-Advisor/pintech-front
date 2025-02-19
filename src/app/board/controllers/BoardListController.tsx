'use client'

import React, { useState, useEffect } from 'react'
import useSkin from '../hooks/useSkin'
import { getBoard, getBoardList } from '../services/actions'
import { menus } from '@/app/global/datas/menus'
import Link from 'next/link'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
import sizes from '@/app/global/styles/sizes'

const { dark, white } = colors
const { medium } = sizes

const StyledMenu = styled.nav`
  box-shadow: 2px 2px 5px ${dark};
  display: flex;
  border-radius: 3px;
  height: 45px;
  margin-bottom: 40px;

  a {
    color: ${dark};
    line-height: 45px;
    font-size: ${medium};
    padding: 0 35px;
    margin: 0 auto;

    &.on {
      color: ${white};
      background: ${dark};
    }
  }
`

const BoardListController = () => {
  const [board, setBoard] = useState(null)
  const [data, setData] = useState(null)
  const [list, setList] = useState([]) // ✅ 초기값을 빈 배열로 설정
  const [selectedSeq, setSelectedSeq] = useState<string | null>(null)

  // 📌 게시판 목록 가져오기
  useEffect(() => {
    const fetchList = async () => {
      try {
        const _list = await getBoardList()
        setList(Array.isArray(_list) ? _list : []) // ✅ 배열인지 체크 후 설정
      } catch (error) {
        console.error('게시판 목록 가져오기 실패:', error)
        setList([]) // ✅ 오류 발생 시 빈 배열 유지
      }
    }

    fetchList()
  }, [])

  // 📌 선택한 게시글 상세 데이터 가져오기
  useEffect(() => {
    if (!selectedSeq) return

    const fetchData = async () => {
      try {
        const _data = await getBoard(selectedSeq)
        if (!_data || !_data.config) return

        setData(_data)
        setBoard(_data.config)
      } catch (error) {
        console.error('게시글 데이터 가져오기 실패:', error)
      }
    }

    fetchData()
  }, [selectedSeq])

  const List = useSkin(board?.skin, 'list')
  const View = useSkin(board?.skin, 'view')

  return (
    <div>
      {/* Add the StyledMenu above the board list */}
      <StyledMenu>
        {menus.board.map((item) => (
          <Link key={item.code} href={item.url}>
            {item.name}
          </Link>
        ))}
      </StyledMenu>

      {/* 게시판 목록 */}
      <ul>
        {Array.isArray(list) && list.length > 0 ? ( // ✅ 배열 체크 후 map 실행
          list.map((item) => (
            <li key={item.seq}>
              <button onClick={() => setSelectedSeq(item.seq)}>
                {item.title}
              </button>
            </li>
          ))
        ) : (
          <h1></h1> // ✅ 목록이 없을 경우 메시지 표시
        )}
      </ul>

      {/* 선택된 게시글이 있을 경우 상세보기 표시 */}
      {selectedSeq && View && <View data={data} />}
    </div>
  )
}

export default React.memo(BoardListController)

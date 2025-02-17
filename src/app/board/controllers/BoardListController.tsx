'use client'

import React, { useState, useLayoutEffect } from 'react'
import useSkin from '../hooks/useSkin'
import { getBoard, getBoardList } from '../services/actions'

const BoardListController = () => {
  const [board, setBoard] = useState<any>()
  const [data, setData] = useState<any>()
  const [list, setList] = useState<any[]>([])
  const [selectedSeq, setSelectedSeq] = useState<string | null>(null) // 선택된 게시글 seq

  // 게시판 목록을 가져오기
  useLayoutEffect(() => {
    const fetchList = async () => {
      const _list = await getBoardList()
      setList(_list || [])
    }

    fetchList()
  }, [])

  // 선택한 게시글 상세보기 데이터 로딩
  useLayoutEffect(() => {
    if (!selectedSeq) return

    const fetchData = async () => {
      const _data = await getBoard(selectedSeq)
      if (!_data || !_data.config) return

      setData(_data)
      setBoard(_data.config)
    }

    fetchData()
  }, [selectedSeq])

  const List = useSkin(board?.skin, 'list') // 'list'용 스킨 가져오기
  const View = useSkin(board?.skin, 'view') // 'view'용 스킨 가져오기 (상세보기)

  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item.seq}>
            <button onClick={() => setSelectedSeq(item.seq)}>
              {item.title}
            </button>
          </li>
        ))}
      </ul>

      {/* 선택된 게시글이 있을 경우 상세보기 표시 */}
      {selectedSeq && View && <View data={data} />}
    </div>
  )
}

export default React.memo(BoardListController)

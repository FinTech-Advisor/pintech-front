import React, { useEffect, useState } from 'react'

const List = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    // 예시로, 데이터를 가져오는 부분을 여기에 작성
    // 예: API 호출이나 다른 방식으로 데이터를 가져오는 로직 추가
    const fetchData = () => {
      // 예시 데이터 (실제로는 API 호출 등으로 대체)
      const fetchedData = [
        { id: 1, title: 'First Item' },
        { id: 2, title: 'Second Item' },
        // 데이터가 없을 경우를 가정
        // { id: 3, title: 'Third Item' }
      ]
      setData(fetchedData)
    }

    fetchData()
  }, []) // 컴포넌트가 마운트 될 때 한 번만 실행

  if (!data) {
    return <h1>Not Found</h1> // 데이터가 없으면 "Not Found" 표시
  }

  return (
    <div>
      <h1>List of Items</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default React.memo(List)

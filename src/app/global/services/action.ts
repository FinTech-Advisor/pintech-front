'use server'
import apiRequest from "../libs/apiRequest"
import { redirect } from "next/navigation"
import { toQueryString } from "../libs/utils"
import { SearchType } from "@/app/board/types/boardType"

export const deleteFile = async (seq) => {
  const apiUrl = process.env.API_URL + `/file/delete/${seq}`
  const res = await apiRequest(apiUrl, 'DELETE')
  const result = await res.json()
  if(res.status===200 && result.success){
    return result.data
  }
  
  return[]
}

// 게시글 한개 조회
export const get = async (seq)=>{
  let apiUrl = process.env.API_URL+ `/board/view/${seq}`

  const res = await apiRequest(apiUrl)
  const result = await res.json()
  if(res.status === 200 && result.success){
    const data = result.data
    //파일 데이터 조회 및 처리 S
    const {gid} = data
    apiUrl = process.env.API_URL + `/file/list/${gid}`
    const _res = await apiRequest(apiUrl    )
    const _result = await _res.json()
    if(_res.status === 200 && _result.success){
      const files = _result.data
      data.editorFiles = []
      data.attachFiles = []
    
    for (const file of files) {
      if(file.location === 'atach') data.attachFiles.push(file)
      else data.editorFiles.push(file)
    }
  }
    //E
    return data
  }
}

export const getList = async(search: SearchType) => {
  const qs = toQueryString(search)
  const apiUrl = process.env.API_URL + `/board/list${qs && qs.trim() ? '?' + qs : ''}` 
  const res = await apiRequest(apiUrl)
  const result = await res.json()

  if(res.status === 200 && result.success){
    return result.data
  }
}
'use client'
import React, {useState, useCallback} from "react"
import { deleteFile } from "@/app/global/services/action"


export default function useDelete(seq, setFiles){
  return( useCallback((seq) => {
    if(!window.confirm('삭제 ㄹㅇ?')){
      return
    }
    (async()=>{
      const deleted = await deleteFile(seq)
      if(deleted && deleted.length > 0){
        setFiles(files => files.filter(({file})=> file.seq !== seq))
      }
    })()
  },[setFiles]
  ))
}
'use client'
import React, {useState, useCallback} from "react";
import styled from "styled-components";
import { CommonType } from "../types/StyledType";
import FileItems from "./FileItems";
import { deleteFile } from "../services/action";
import useDelete from "@/app/board/hooks/useDelete";

type Props {
  gid: string,
  location?: string,
  single?: boolean,
  imageOnly: boolean,
  title?: string,}

  const Fileupload (callback: Props) => void

  const onDeleteFile = useDelete(setFiles)
  const Wrapper = styled.div<CommonType>

  return <Wrapper>
    {title && <div className="tit"></div>}
  </Wrapper>
}

export default React.memo(FileUpload)
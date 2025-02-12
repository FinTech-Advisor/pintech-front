'use client'
import React from 'react';
import loadable from '@loadable/component'
import { MainTitle } from "@/app/global/components/StyledTitle";
import { MainContentBox } from "@/app/global/components/ContentBox";
const JoinContainer = loadable(() => {
  return import('../containers/JoinContainer');
});
const JoinPage = () => {
  return (
    <MainContentBox max={750} min={650}>
      <h1>삐쀼</h1>
      <JoinContainer/>
    </MainContentBox>
)
}

export default React.memo(JoinPage);
import loadable from '@loadable/component'
import React from 'react'

type DefaultFormProps = {
  board: string
  onEditorChange: (content: string) => void
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onClick: (field: string, value: string | boolean) => void
  actionState: Record<string, unknown>
}

type DefaultViewProps = Record<string, unknown>
type DefaultListProps = Record<string, unknown>
type DefaultCommentProps = Record<string, unknown>

type AllProps =
  | DefaultFormProps
  | DefaultViewProps
  | DefaultListProps
  | DefaultCommentProps

const GalleryForm = loadable(() => import('../components/skins/gallery/Form'))
const GalleryView = loadable(() => import('../components/skins/gallery/View'))
const GalleryList = loadable(() => import('../components/skins/gallery/List'))
const GalleryComment = loadable(
  () => import('../components/skins/gallery/Comment'),
)

const DefaultForm = loadable(() => import('../components/skins/default/Form'))
const DefaultView = loadable(() => import('../components/skins/default/View'))
const DefaultList = loadable(() => import('../components/skins/default/List'))
const DefaultComment = loadable(
  () => import('../components/skins/default/Comment'),
)

const DefaultSkin: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<AllProps>>
> = {
  form: DefaultForm,
  view: DefaultView,
  list: DefaultList,
  comment: DefaultComment,
}

const GallerySkin: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<AllProps>>
> = {
  form: GalleryForm,
  view: GalleryView,
  list: GalleryList,
  comment: GalleryComment,
}

const SkinMap = {
  default: DefaultSkin,
  gallery: GallerySkin,
}

// ✅ useSkin이 올바른 타입을 반환하도록 수정
const useSkin = (
  skin: keyof typeof SkinMap,
  type: keyof typeof DefaultSkin,
): React.LazyExoticComponent<React.ComponentType<AllProps>> => {
  return SkinMap[skin]?.[type] ?? DefaultSkin[type]
}

export default useSkin

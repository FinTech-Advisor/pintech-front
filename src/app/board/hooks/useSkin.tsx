'use client'
import loadable from '@loadable/component'

/* default 스킨 S */
const DefaultForm = loadable(() => import('../components/skins/default/Form'))
const DefaultView = loadable(() => import('../components/skins/default/View'))
const DefaultList = loadable(() => import('../components/skins/default/List'))
const DefaultComment = loadable(
  () => import('../components/skins/default/Comment'),
)
const DefaultSkin = {
  form: DefaultForm,
  view: DefaultView,
  list: DefaultList,
  comment: DefaultComment,
}
/* default 스킨 E */

/* gallery 스킨 S */
const GalleryForm = loadable(() => import('../components/skins/gallery/Form'))
const GalleryView = loadable(() => import('../components/skins/gallery/View'))
const GalleryList = loadable(() => import('../components/skins/gallery/List'))
const GalleryComment = loadable(
  () => import('../components/skins/gallery/Comment'),
)

const GallerySkin = {
  form: GalleryForm,
  view: GalleryView,
  list: GalleryList,
  comment: GalleryComment,
}
/* gallery 스킨 E */

export default function useSkin(
  skin: string | undefined,
  mode: 'form' | 'view' | 'list' | 'comment',
) {
  if (!skin) return

  let _skin: any = {}
  switch (skin) {
    case 'gallery':
      _skin = GallerySkin
      break
    default:
      _skin = DefaultSkin
  }

  return _skin[mode]
}

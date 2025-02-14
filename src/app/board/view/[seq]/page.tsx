import BoardViewController from '../../controllers/BoardViewController'

const ViewPage = async ({params}) => {
  const {seq} = await params
  return <BoardViewController/>

}

export default ViewPage

import BoardViewController from '../../controllers/BoardViewController'

const ViewPage = async ({ params }) => {
  const { seq } = await params
  return <BoardViewController seq={seq} />
}

export default ViewPage

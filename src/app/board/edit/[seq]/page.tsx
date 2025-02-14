import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
import BoardFormController from '../../controllers/BoardFormController'

const EditPage = async ({params}) => {
  const {seq} = await params
  return BoardFormController(params)
}

export default EditPage

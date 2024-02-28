
import { useParams } from 'react-router-dom'


import { FormDep } from '../../components/FormDep'
export const EditDepartaments = () => {

  const {id} = useParams();

  return (
    <FormDep id={id} title='Edit Departments' />
  )
}


import Model from '../../model/model';
import { REGIONS } from '../../model/model-mode';

export default function(region_code,onSuccess){

  const Regions = new Model(REGIONS);

  Regions.set('paginate',{
    offset:0,
    p:0,
    max:'all',
    sort_by:'name',
    sort_type:'asc',
    parent_code:region_code
  });

  Regions.get((res)=>{
    onSuccess(res)
  })

}

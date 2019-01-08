
import Model from '../../model/model';
import { SUBREGIONS } from '../../model/model-mode';

export default function(region_code,onSuccess){

  const SubRegions = new Model(SUBREGIONS);

  SubRegions.set('paginate',{
    offset:0,
    p:0,
    max:'all',
    sort_by:'name',
    sort_type:'asc',
    parent_code:region_code
  });

  SubRegions.get((res)=>{
    onSuccess(res)
  })

}
